/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "@openzeppelin/hardhat-upgrades";
import "solidity-coverage";
import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  namedAccounts: {
    deployer: 0,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    polygon: {
      chainId: 80001,
      url: "https://rpc-mumbai.maticvigil.com/",
      gas: 3000000,
      accounts: [process.env.PK1!],
    },
    goerli: {
      chainId: 5,
      url: process.env.ETHEREUM_GOERLI_URL,
      gas: 3000000,
      accounts: [process.env.PK1!],
    },
  },
  paths: {
    sources: "contracts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
