import { config } from "dotenv";
import cors from "cors";
import express from "express";
import { BigNumberish, ethers } from "ethers";
import { ECDSAWalletFactory, IWallet } from "../typechain-types";

config();

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;
app.use(express.json());
app.use(cors({ origin: "*" }));

const providers = new Map<number, ethers.providers.Provider>([
  [5, new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_GOERLI_URL!)],
  [80001, new ethers.providers.JsonRpcProvider(process.env.POLYGON_TESTNET_URL!)],
]);

const FACTORY_ABI = [
  "function createWallet(address _owner) external returns (address)",
  "function walletAddress(address _owner, uint256 _nonce) external view returns (address)",
];

const WALLET_ABI_EXACT = `[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_contract",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "LogCall",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "LogReceivedEther",
    "type": "event"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct IWallet.UserOp[]",
        "name": "userOps",
        "type": "tuple[]"
      },
      {
        "internalType": "bytes",
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "exec",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`;

export interface SmartWallet {
  address: string;
  wallet?: IWallet;
}

export interface UserOp {
  to: string;
  amount: BigNumberish;
  data: ethers.utils.BytesLike;
}

interface Transaction {
  userOps: UserOp[];
  chainID: number;
  signature: string;
}

function getProvider(chainID: number): ethers.providers.Provider {
  const provider = providers.get(chainID);
  return provider ? provider : new ethers.providers.JsonRpcProvider("http://localhost:8545");
}

function getFactoryAddresses(chainID: number): string {
  if (chainID === 5) {
    return process.env.ECDSA_WALLET_FACTORY_GOERLI!;
  } else {
    return process.env.ECDSA_WALLET_FACTORY_POLYGON!;
  }
}

function getFactory(chainID: number): ECDSAWalletFactory {
  return new ethers.Contract(
    getFactoryAddresses(chainID),
    FACTORY_ABI,
    getSigner(chainID)
  ) as ECDSAWalletFactory;
}

function getWallet(address: string, chainID: number): IWallet {
  return new ethers.Contract(address, WALLET_ABI_EXACT, getSigner(chainID)) as IWallet;
}

async function getSmartWallet(
  addr: string,
  nonce: string,
  chainID: number,
  deploy?: boolean
): Promise<SmartWallet> {
  const factory = getFactory(chainID);
  let wallet: SmartWallet = {
    address: await factory.walletAddress(addr, nonce),
  };

  const code = await getProvider(chainID)!.getCode(wallet.address);
  if (code === "0x") {
    if (!deploy) {
      return wallet;
    }
    const tx = await factory.createWallet(addr);
    console.log(tx.hash);

    await tx.wait(1);
  }
  wallet.wallet = getWallet(wallet.address, chainID);
  return wallet;
}

function getSigner(chainID: number): ethers.Signer {
  return new ethers.Wallet(process.env.PRIVATE_KEY!, getProvider(chainID)!);
}

async function getNonceMap(address: string, id: string): Promise<Map<string, BigNumberish>> {
  let nonceMap = new Map<string, number>();
  providers.forEach(async (provider, chainId) => {
    let nonce: number = 0;
    if ((await provider.getCode(address)) !== "0x") {
      nonce = (await getWallet(address, chainId).nonce()).toNumber();
    }
    console.log(chainId, nonce);
    nonceMap = nonceMap.set(chainId.toString(), nonce);
  });
  console.log(nonceMap);
  return nonceMap;
}

function parseContractError(err: any): string {
  return (
    err as {
      reason: string;
    }
  ).reason;
}

app.get("/", (req, res) => {
  res.status(200).send({ result: "ok" });
});

app.get("/addresses/:address", async (req, res) => {
  const signerAddress = req.params.address;
  const id = req.query.id ? req.query.id.toString() : "0";

  if (!req.query.chainId) {
    const smartWallet = await getSmartWallet(signerAddress, id, 1);
    res.status(200).send({
      address: smartWallet.address,
      nonces: JSON.stringify(Object.fromEntries(await getNonceMap(signerAddress, id))),
    });
    return;
  }
  const smartWallet = await getSmartWallet(
    signerAddress,
    id,
    parseInt(req.query.chainId.toString())
  );

  const nonce = smartWallet.wallet ? await smartWallet.wallet.nonce() : 0;
  res.status(200).send({
    address: smartWallet.address,
    nonces: { [req.query.chainId.toString()]: nonce },
  });
});

app.get("/relayer", async (req, res) => {
  const chainid = parseInt(req.query.chainId!.toString());
  res.status(200).send({ address: await getSigner(chainid).getAddress() });
});

app.post("/transactions/:address", async (req, res) => {
  const id = req.query.id ? req.query.id.toString() : "0";
  const chainid = parseInt(req.query.chainId!.toString());
  const addr = req.params.address;
  const tx: Transaction = req.body;
  const wallet = await getSmartWallet(addr, id, tx.chainID, true);

  const gasPrice = await wallet.wallet!.provider.getGasPrice();
  try {
    const gas = await wallet.wallet!.estimateGas.exec(tx.userOps, tx.signature);
    const txCost = gasPrice.mul(gas);
    if (
      tx.userOps[0].to !== (await getSigner(tx.chainID).getAddress()) ||
      txCost.gt(await tx.userOps[0].amount)
    ) {
      res.status(402).send({ error: "Insufficient fee payment" });
      return;
    }
  } catch (err: any) {
    console.log(400, parseContractError(err));
    res.status(400).send({ error: parseContractError(err) });
    return;
  }
  const walletTx = await wallet.wallet!.exec(tx.userOps, tx.signature);
  const reciept = await walletTx.wait(1);
  res.status(201).send({ txHash: reciept.transactionHash });
});

app.post("/createWallet", async (req, res) => {
  const chainid = parseInt(req.query.chainId!.toString());
  const id = req.body.id ? req.body.id.toString() : "0";
  const addr = req.body.address;
  const wallet = await getSmartWallet(addr, id, chainid, true);
  res.status(201).send({ address: wallet.address });
});

app.listen(port, async () => {
  console.log(`listening at http://localhost:${port}`);
});
