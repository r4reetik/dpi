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

import { addNewUser, db, getAddressData } from "../utils/firebase";

interface PayTcContextType {
  signIn: (_mmAddress: string) => Promise<void>;
  isInitialized: boolean;
  balances: { chainId: number; balance: string; symbol: string }[];
}

const Context = createContext<PayTcContextType>({} as PayTcContextType);

const PayTCProvider = ({ children }: any) => {
  const { chainId, account } = useWeb3React();
  const [swAddress, setSwAddress] = useState<string | null>(null);
  const [balances, setBalances] = useState<any>();

  const isInitialized = !!swAddress;

  const fetchAndSetBalances = useCallback(async () => {
    if (!swAddress) return;
    const _balances = []; // SW - 0x1085d0db6c015D3Ec73652e6Bb2790fC9A5E0464
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
      const data = await getAddressData("mmAddress", _mmAddress);
      let _swAddress: string | null = null;
      if (data) {
        // old account
        const { swAddress: swa } = data;
        _swAddress = swa;
      } else {
        // new account
        const { address: swa } = await getOrDeploySmartWallet(_mmAddress, chainId!);

        await addNewUser(_mmAddress, swa);
        _swAddress = swa;
      }

      setSwAddress(_swAddress);
      fetchAndSetBalances();
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
    <Context.Provider value={{ signIn, isInitialized, balances }}>{children}</Context.Provider>
  );
};

const usePayTC = () => {
  return useContext(Context);
};

export { PayTCProvider, usePayTC };
