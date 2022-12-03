import { ethers } from "hardhat";
import { ERC20__factory, SmartWallet } from "../typechain-types";
import axios from "axios";
import { BigNumber, BigNumberish, utils } from "ethers";
// import { signTypedData } from "@wagmi/core";
import { IConnext } from "../typechain-types/@connext/nxtp-contracts/contracts/core/connext/interfaces";
import { IConnext__factory } from "../typechain-types/factories/@connext/nxtp-contracts/contracts/core/connext/interfaces";
import { AbiCoder } from "@ethersproject/abi";
import { parseEther } from "ethers/lib/utils";
// import { defaultAbiCoder } from "@ethersproject/abi";

export interface UserOp {
  to: string;
  amount: BigNumberish;
  data: utils.BytesLike;
}
export const signTx = async (
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

  const signature = await ethers.provider.getSigner()._signTypedData(domain, types, value);
  const signatureEncoded = new AbiCoder().encode(
    ["uint256", "bytes"],
    [signatureChainID, signature]
  );

  return signatureEncoded;
};

const abi = `[{"inputs":[{"internalType":"address","name":"_contractOwner","type":"address"},{"components":[{"internalType":"address","name":"facetAddress","type":"address"},{"internalType":"enum IDiamondCut.FacetCutAction","name":"action","type":"uint8"},{"internalType":"bytes4[]","name":"functionSelectors","type":"bytes4[]"}],"internalType":"struct IDiamondCut.FacetCut[]","name":"_diamondCut","type":"tuple[]"},{"components":[{"internalType":"address","name":"initContract","type":"address"},{"internalType":"bytes","name":"initData","type":"bytes"}],"internalType":"struct ConnextDiamond.Initialization[]","name":"_initializations","type":"tuple[]"}],"stateMutability":"payable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"stateMutability":"payable","type":"receive"}]`;
const test = async () => {
  const connext = "0xb35937ce4fFB5f72E90eAD83c10D33097a4F18D2";

  const connextC = IConnext__factory.connect(connext, ethers.provider);
  const data = await connextC.populateTransaction.xcall(
    9991, // _destination: Domain ID of the destination chain
    "0xD380f62448F8a8C5E6c22F47ab575266924306D8", // _to: address receiving the funds on the destination
    "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1", // _asset: address of the token contract
    "0xD380f62448F8a8C5E6c22F47ab575266924306D8", // _delegate: address that can revert or forceLocal on destination
    "10000000000000000", // _amount: amount of tokens to transfer
    "10", // _slippage: the maximum amount of slippage the user will accept in BPS
    "0x"
  );
  const wallet = (await ethers.getContractAt(
    "SmartWallet",
    "0xD380f62448F8a8C5E6c22F47ab575266924306D8"
  )) as SmartWallet;
  //   const tx = await wallet.e
  console.log("fchgvjbn");
  const testToken = ERC20__factory.connect(
    "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
    ethers.provider.getSigner()
  );
  const approveTx = await testToken.populateTransaction.approve(connext, "10000000000000000");

  const userOp: UserOp[] = [
    {
      to: approveTx.to!,
      data: approveTx.data!,
      amount: "0",
    },

    {
      to: data.to!,
      data: data.data!,
      amount: "0",
    },
  ];
  console.log("fchgvjbn");
  console.log(+(await wallet.nonce()));

  const sig = await signTx(
    userOp,
    "0xD380f62448F8a8C5E6c22F47ab575266924306D8",
    +(await wallet.nonce()),
    5,
    5
  );
  console.log("fchgvjbn");

  //   await testToken.approve(connext, "1000000000000000");
  const tx = await wallet.exec(userOp, sig);
  //   const tx = await ethers.provider.getSigner().sendTransaction(data);
  console.log(tx.hash);
  await tx.wait();
  console.log(+(await testToken.balanceOf(await ethers.provider.getSigner().getAddress())));
};
test();
