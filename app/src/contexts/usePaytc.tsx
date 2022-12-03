import { useWeb3React } from "@web3-react/core";
import { getDefaultProvider } from "ethers";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SmartWalletBaseUrl } from "../constants/APIs";
import { ChainIdToNetwork } from "../constants/ChainIdNetwork";
import { SmartWallet } from "../pages";
import { get } from "../utils/axios";

import { addNewUser, getAddressData } from "../utils/firebase";

interface PayTcContextType {
  signIn: (_mmAddress: string) => Promise<void>;
  isInitialized: boolean;
  balances: { chainId: number; balance: string; symbol: string }[];
  fullScreenLoading: boolean;
}

const Context = createContext<PayTcContextType>({} as PayTcContextType);

const PayTCProvider = ({ children }: any) => {
  const { chainId, account } = useWeb3React();
  const [swAddress, setSwAddress] = useState<string | null>(null);
  const [balances, setBalances] = useState<any>();
  const [fullScreenLoading, setFullScreenLoading] = useState(false);

  const isInitialized = !!swAddress;

  const fetchAndSetBalances = useCallback(async () => {
    if (!swAddress) return;
    const _balances = []; // SW - 0x1085d0db6c015D3Ec73652e6Bb2790fC9A5E0464 // 0xDd66499a43bE05730Ec97a2aB25c1B534B46e8c1
    for (const _chainId of Object.keys(ChainIdToNetwork)) {
      const data = await get(
        `https://api.covalenthq.com/v1/${_chainId}/address/${swAddress}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
      );

      if (data) {
        // @ts-ignore
        const { items } = data.data;
        for (const _t of items) {
          if (_t.balance !== "0") {
            _balances.push({
              symbol: _t.contract_ticker_symbol,
              chainId: _chainId,
              balance: _t.balance,
            });
          }
        }
      }
    }
    setBalances(_balances);
  }, [swAddress]);

  const getOrDeploySmartWallet = useCallback(
    async (address: string, chainId: number): Promise<SmartWallet> => {
      const response = await get<SmartWallet>(`${SmartWalletBaseUrl}/addresses/${address}`, {
        params: { chainId },
      });
      if (response) return response;
      else throw new Error("getSmartWalletAPI returned null");
    },
    []
  );

  const signIn = useCallback(
    async (_mmAddress: string) => {
      setFullScreenLoading(true);
      const { address: swa } = await getOrDeploySmartWallet(_mmAddress, chainId!);
      const data = await getAddressData("swAddress", swa);

      if (!data) {
        await addNewUser(_mmAddress, swa);
      }

      setSwAddress(swa);
      await fetchAndSetBalances();
      setFullScreenLoading(false);
    },
    [chainId, fetchAndSetBalances, getOrDeploySmartWallet]
  );

  useEffect(() => {
    if (!isInitialized && account) {
      signIn(account);
    }
    return () => {};
  }, [account, isInitialized, signIn]);

  return (
    <Context.Provider value={{ signIn, isInitialized, balances, fullScreenLoading }}>
      {children}
    </Context.Provider>
  );
};

const usePayTC = () => {
  return useContext(Context);
};

export { PayTCProvider, usePayTC };
