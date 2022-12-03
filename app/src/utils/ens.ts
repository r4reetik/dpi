import { getDefaultProvider } from "ethers";
import truncateEthAddress from 'truncate-eth-address'

export const getEnsNameFromAddress = async (_mmAddress: string, chainId = 5) => {
  const provider = getDefaultProvider(chainId);
  return provider.lookupAddress(_mmAddress);
};

export const getAddressFromEns = async (ens: string, chainId = 5) => {
  const provider = getDefaultProvider(chainId);
  return provider.resolveName(ens);
};

export const getENSOrAddress = async (_mmAddress: string | null,chainId = 5) => {
  const provider = getDefaultProvider(chainId);
  const hasENS = await provider.lookupAddress(_mmAddress as string);
  return hasENS ? hasENS : truncateEthAddress(_mmAddress as string);
};
