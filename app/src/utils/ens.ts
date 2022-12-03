import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider("goerli", "8127a04bb3ea4cd39511696573cefe56");

export const getEnsNameFromAddress = async (metamaskAddress: string, chainId = 5) => {
  const address = ethers.utils.getAddress(metamaskAddress);
  const ens = await provider.lookupAddress(address);
  return ens;
};

export const getAddressFromEns = async (ensName: string, chainId = 5) => {
  const address = await provider.resolveName(ensName);
  return address;
};

export const getEnsOrAddress = (data: string, chainId = 5) => {
  if (data.includes(".eth")) {
    return getAddressFromEns(data);
  } else {
    return getEnsNameFromAddress(data);
  }
};
