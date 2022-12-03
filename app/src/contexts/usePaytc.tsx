import { useWeb3React } from "@web3-react/core";

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
import { unstable_batchedUpdates } from "react-dom";
import { SmartWallet } from "../pages";
import { get } from "../utils/axios";

import { addNewUser, getAddressData } from "../utils/firebase";

export type Flow = "connectWallet" | "pay" | "payReview" | "input" | "history"

interface PayTcContextType {
  signIn: (_mmAddress: string) => Promise<void>;
  isInitialized: boolean;
  balances: { chainId: number; balance: string; symbol: string }[];
  transactions : any;
  fullScreenLoading: boolean;
  recipient: string | null;
  setFullScreenLoading: Dispatch<SetStateAction<boolean>>;
  setRecipient: Dispatch<SetStateAction<string | null>>;
  setSelectedToken: Dispatch<SetStateAction<any>>;
}

const Context = createContext<PayTcContextType>({} as PayTcContextType);

const PayTCProvider = ({ children }: any) => {
  const { chainId, account } = useWeb3React();
  const [swAddress, setSwAddress] = useState<string | null>(null);
  const [balances, setBalances] = useState<any>();
  const [transactions, setTransactions] = useState<any>();
  const [fullScreenLoading, setFullScreenLoading] = useState(false);
  const [recipient, setRecipient] = useState<string | null>(null);

  const [selectedToken, setSelectedToken] = useState();
  const [flow, setFlow] = useState<Array<Flow>>(["pay"]);

  const isInitialized = !!swAddress;
  const fetchAndSetTransactions = useCallback(async () => {
    if (!swAddress) return;
    const _transactions = []; // SW - 0x1085d0db6c015D3Ec73652e6Bb2790fC9A5E0464 // 0xDd66499a43bE05730Ec97a2aB25c1B534B46e8c1
    for (const _chainId of Object.keys(ChainIdToNetwork)) {
      // @ts-ignore
      const data = await get(
        `https://api.covalenthq.com/v1/${_chainId}/address/${swAddress}/transactions_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
      );

      if (data) {
        console.log('data: ', data);
        // @ts-ignore
        const { items } = data.data;
        // @ts-ignore
        for (const _t of items) {
          const hasSent = _t.from_address === swAddress;
          const hasReceived = _t.to_address === swAddress;
          if (_t.balance !== "0") {
            _transactions.push({
              timestamp: _t.block_signed_at,
              status: _t.successful,
              type: hasSent? "sent" : hasReceived ? "received" : "",
              value: _t.value,
              displayAddress: hasSent ? _t.to_address : hasReceived ? _t.from_address :"",
              txHash: _t.tx_hash,
              token: _t.log_events && _t.log_events[0].sender_contract_ticker_symbol,
              decimals: _t.log_events && _t.log_events[0].sender_contract_decimals,
            });
          }
        }
      }
    }
    setBalances(_transactions);
  }, [swAddress]);
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
      await fetchAndSetTransactions()
      setFullScreenLoading(false);
    },
    [chainId, fetchAndSetBalances, fetchAndSetTransactions, getOrDeploySmartWallet]
  );

  // useEffect(()=>{
  //   (async () => {
  //     await fetchAndSetTransactions();
  //   })()
  // },[fetchAndSetTransactions])

  useEffect(() => {
    if (!isInitialized && account) signIn(account);
    return () => { };
  }, [account, isInitialized, signIn]);

  return (
    <Context.Provider
      value={{
        signIn,
        transactions,
        isInitialized,
        balances,
        fullScreenLoading,
        setFullScreenLoading,
        setSelectedToken,
        recipient,
        setRecipient,
      }}>
      {children}
    </Context.Provider>
  );
};

const usePayTC = () => {
  return useContext(Context);
};

export { PayTCProvider, usePayTC };
