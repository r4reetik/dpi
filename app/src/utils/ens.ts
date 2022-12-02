import { getDefaultProvider } from "ethers";

export const getEnsNameFromAddress = async (_mmAddress: string, chainId = 5) => {
  const provider = getDefaultProvider(chainId);
  return provider.lookupAddress(_mmAddress);
};

export const getAddressFromEns = async (ens: string, chainId = 5) => {
  const provider = getDefaultProvider(chainId);
  return provider.resolveName(ens);
};
