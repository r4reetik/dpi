import { config } from "dotenv";
import cors from "cors";
import express from "express";
import {
  ECDSAWalletFactory,
  IConnext__factory,
  IWallet,
  SmartWallet__factory,
} from "../typechain-types";
import { BigNumberish, ethers as Ethers } from "ethers";
import { ethers } from "hardhat";
import { AbiCoder } from "@ethersproject/abi";
import { ERC20__factory } from "@connext/nxtp-contracts";
import { JsonRpcProvider } from "@ethersproject/providers";

config();
const CONNEXT_Goerli = "0xb35937ce4fFB5f72E90eAD83c10D33097a4F18D2";
const CONNEXT_Polygon = "0xa2F2ed226d4569C8eC09c175DDEeF4d41Bab4627";

const app = express();
const port = process.env.PORT ? process.env.PORT : 4000;
app.use(express.json());
app.use(cors({ origin: "*" }));
import { Tokens, TokenType } from "../../app/src/constants/Tokens";

const providers = new Map<number, JsonRpcProvider>([
  [
    5,
    new Ethers.providers.JsonRpcProvider(
      "https://goerli.infura.io/v3/ac9d2c8a561a47739b23c52e6e7ec93f"
    ),
  ],
  [80001, new Ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com/")],
]);

const getConnextAddress = (chainId: number) => (chainId === 5 ? CONNEXT_Goerli : CONNEXT_Polygon);

const FACTORY_ABI = [
  "function createWallet(address _owner) external returns (address)",
  "function walletAddress(address _owner, uint256 _nonce) external view returns (address)",
];
const ERC20_ABI = `[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
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
    "inputs": [],
    "name": "totalSupply",
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
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]`;

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

export const getMetaTx = (
  userOps: UserOp[],
  smartWalletAddress: string,
  nonce: number,
  chainID: number,
  signatureChainID: number
) => {
  const domain = {
    name: "ECDSAWallet",
    version: "0.0.1",
    chainId: chainID,

    verifyingContract: smartWalletAddress,
  };

  const types = {
    UserOp: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "data", type: "bytes" },
    ],
    ECDSAExec: [
      { name: "userOps", type: "UserOp[]" },
      { name: "nonce", type: "uint256" },
      { name: "chainID", type: "uint256" },
      { name: "sigChainID", type: "uint256" },
    ],
  };

  const value = {
    userOps: userOps,
    nonce: nonce,
    chainID: chainID,
    sigChainID: signatureChainID,
  };

  // const signature = await ethers.provider.getSigner()._signTypedData(domain, types, value);
  // const signatureEncoded = new AbiCoder().encode(
  //   ["uint256", "bytes"],
  //   [signatureChainID, signature]
  // );

  return { domain, types, value };
};

export interface SmartWallet {
  address: string;
  wallet?: IWallet;
}

export interface UserOp {
  to: string;
  amount: BigNumberish;
  data: Ethers.utils.BytesLike;
}

interface Transaction {
  userOps: UserOp[];
  chainID: number;
  signature: string;
}

function getProvider(chainID: number): JsonRpcProvider {
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

function getSigner(chainID: number): Ethers.Signer {
  return new Ethers.Wallet(process.env.PK1!, getProvider(chainID)!);
}

async function getNonceMap(address: string, id: string): Promise<Map<string, BigNumberish>> {
  let nonceMap = new Map<string, number>();
  providers.forEach(async (provider, chainId) => {
    let nonce: number = 0;
    if ((await provider.getCode(address)) !== "0x") {
      nonce = (await getWallet(address, chainId).nonce()).toNumber();
    }
    nonceMap = nonceMap.set(chainId.toString(), nonce);
  });
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

app.get("/getBalanceOf", async (req, res) => {
  let balances: { [x: string]: string } = {};
  const address = req.query.address as string;
  let tokens = Object.keys(Tokens);
  for (const token of tokens) {
    const provider = getProvider(Tokens[token].chainId);
    const contract = new ethers.Contract(Tokens[token].address, ERC20_ABI, provider);
    const balance = await contract.balanceOf(address);
    balances[token] = balance.toString();
  }

  res.status(200).send({ result: balances });
});

app.get("/getBalanceOfV2", async (req, res) => {
  let balances: { [x: string]: string } = {};
  const address = req.query.address as string;
  let tokens = Object.keys(Tokens);

  const promises = tokens.map(async (token) => {
    const provider = getProvider(Tokens[token].chainId);
    const contract = new ethers.Contract(Tokens[token].address, ERC20_ABI, provider);
    const balance = await contract.balanceOf(address);
    return balance.toString();
  });

  const balanceList = await Promise.all(promises);
  for (let i = 0; i < tokens.length; i++) {
    balances[tokens[i]] = balanceList[i];
  }

  res.status(200).send({ result: balances });
});

app.get("/addresses/:address", async (req, res) => {
  const signerAddress = req.params.address;
  const id = req.query.id ? req.query.id.toString() : "0";

  if (!req.query.chainId) {
    const smartWallet = await getSmartWallet(signerAddress, id, 5);
    res.status(200).send({
      address: smartWallet.address,
      nonces: JSON.stringify(Object.fromEntries(await getNonceMap(signerAddress, id))),
    });
    return;
  }

  const smartWallet = await getSmartWallet(
    signerAddress,
    id,
    parseInt(req.query.chainId.toString()),
    true
  );

  const nonce = smartWallet.wallet ? await smartWallet.wallet.nonce() : 0;
  res.status(200).send({
    address: smartWallet.address,
    nonces: { [req.query.chainId.toString()]: nonce },
  });
});

app.post("/getTypedData", async (req, res) => {
  let { domainID, address, chainID, recipient, asset, delegate, amount, slippage } = req.body;
  chainID = parseInt(chainID);
  const connextContract = IConnext__factory.connect(
    getConnextAddress(parseInt(chainID)),
    getSigner(chainID)
  );
  const metaData = await connextContract.populateTransaction.xcall(
    domainID,
    recipient,
    asset,
    delegate,
    amount,
    slippage,
    "0x"
  );

  const wallet = SmartWallet__factory.connect(address, getSigner(chainID));

  const token = ERC20__factory.connect(asset, getSigner(chainID));

  const approveTx = await token.populateTransaction.approve(connextContract.address, amount);

  const userOp: UserOp[] = [
    {
      to: approveTx.to!,
      data: approveTx.data!,
      amount: "0",
    },

    {
      to: metaData.to!,
      data: metaData.data!,
      amount: "0",
    },
  ];

  const metaTx = getMetaTx(userOp, address, +(await wallet.nonce()), chainID, chainID);

  res.status(200).json({ ...metaTx, userOps: userOp });
});

app.get("/relayer", async (req, res) => {
  const chainid = parseInt(req.query.chainId!.toString());
  res.status(200).send({ address: await getSigner(chainid).getAddress() });
});

app.post("/transactions", async (req, res) => {
  let { chainID, address, userOps, signature } = req.body;
  chainID = parseInt(chainID);
  const wallet = SmartWallet__factory.connect(address, getSigner(chainID));

  const walletTx = await wallet.exec(userOps, signature, { gasLimit: 3000000 });
  const reciept = await walletTx.wait(1);
  res.status(201).send({ txHash: reciept.transactionHash });
});

app.listen(port, async () => {
  console.log(`listening at http://localhost:${port}`);
});
