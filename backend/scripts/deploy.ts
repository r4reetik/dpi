import { ethers } from "hardhat";

const deploy = async () => {
  const smFac = await ethers.getContractFactory("SmartWalletFactory");
  const sw = await smFac.deploy();
  const factory = await ethers.getContractFactory("ECDSAWalletFactory");
  const ecdsa = await factory.deploy(sw.address);
  console.log("smf", sw.address);
  console.log("ec", ecdsa.address);
};
deploy();
