
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deploy, get} = hre.deployments;
    const {deployer} = await hre.getNamedAccounts();
    const smartWallet = await get("SmartWalletFactory");
    await deploy('ECDSAWalletFactory', {
      from: deployer,
      args: [smartWallet.address],
      log: true,
    });
};
export default func;

func.tags = ['ECDSAWalletFactory'];