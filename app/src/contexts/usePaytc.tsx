import { useWeb3React } from "@web3-react/core";

import { ethers } from "ethers";
import { AbiCoder } from "ethers/lib/utils";

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
import { Tokens, TokenType } from "../constants/Tokens";
import { MetaMask } from "../constants/WalletInfo";
import { SmartWallet } from "../pages";
import { get, post } from "../utils/axios";

import { addNewUser, getAddressData } from "../utils/firebase";

interface PayTcContextType {
  signIn: (_mmAddress: string) => Promise<void>;
  isInitialized: boolean;
  tokens: { [x: string]: TokenType };
  fullScreenLoading: boolean;
  recipient: string | null;
  setFullScreenLoading: Dispatch<SetStateAction<boolean>>;

  setRecipient: Dispatch<SetStateAction<string | null>>;

  selectedToken: any;
  setSelectedToken: Dispatch<SetStateAction<any>>;
}

const Context = createContext<PayTcContextType>({} as PayTcContextType);

const PayTCProvider = ({ children }: any) => {
  const { chainId, account, activate } = useWeb3React();
  const [swAddress, setSwAddress] = useState<string | null>(null);
  const [tokens, setTokens] = useState<{ [x: string]: TokenType }>(Tokens);
  const [fullScreenLoading, setFullScreenLoading] = useState(false);
  const [recipient, setRecipient] = useState<string | null>(null);

  const [selectedToken, setSelectedToken] = useState<TokenType | null>(null);

  const isInitialized = !!swAddress;

  const fetchAndSetBalances = useCallback(
    async (_swAddress?: string) => {
      const localSwAddress = _swAddress ?? swAddress;
      if (!localSwAddress) return;
      // const _balances = []; // SW - 0x1085d0db6c015D3Ec73652e6Bb2790fC9A5E0464 // 0xDd66499a43bE05730Ec97a2aB25c1B534B46e8c1
      const _tokens = { ...Tokens };
      for (const _chainId of Object.keys(ChainIdToNetwork)) {
        const data = await get(
          `https://api.covalenthq.com/v1/${_chainId}/address/${localSwAddress}/balances_v2/?key=${process.env.NEXT_PUBLIC_COVALENT_API_KEY}`
        );

        if (data) {
          // @ts-ignore
          const { items } = data.data;
          for (const _t of items) {
            if (_t.balance !== "0") {
              const contractAddress = _t.contract_address.toUpperCase();
              if (_tokens[contractAddress]) _tokens[contractAddress].balance = _t.balance;
            }
          }
        }
      }

      setTokens(_tokens);
      return _tokens;
    },
    [swAddress]
  );

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

      await fetchAndSetBalances(swa);
      setSwAddress(swa);
      setFullScreenLoading(false);
    },
    [chainId, fetchAndSetBalances, getOrDeploySmartWallet]
  );

  const submitTransfer = async (recipientSwAddress: string, amount: string) => {
    if (!selectedToken) return;

    const recipientData = await getAddressData("swAddress", recipientSwAddress);
    if (!recipientData) return;

    const targetDomainId = !recipientData.defaultChainId
      ? selectedToken.domainId
      : recipientData.defaultChainId === 5
      ? "1735353714"
      : "9991";

    const { address: tokenAddress } = selectedToken;
    const res: any = await post(`${SmartWalletBaseUrl}/getTypedData`, {
      domainID: targetDomainId,
      address: swAddress,
      chainID: chainId,
      recipient: recipientSwAddress,
      asset: tokenAddress,
      delegate: swAddress,
      amount,
      slippage: "10",
    });
    const provider = new ethers.providers.Web3Provider((window as any).ethereum as any, "any");

    const signature = await provider.getSigner()._signTypedData(res.domain, res.types, res.value);
    const signatureEncoded = new AbiCoder().encode(["uint256", "bytes"], [chainId, signature]);
    const rrr = await post(`${SmartWalletBaseUrl}/transactions`, {
      chainID: chainId,
      signature: signatureEncoded,
      userOps: res.userOps,
      address: swAddress, // my sw address?
    });
    console.log(rrr);
    // TODO: show toast saying tx was a success
  };

  useEffect(() => {
    if (!isInitialized && account) signIn(account);
    return () => {};
  }, [account, isInitialized, signIn]);

  useEffect(() => {
    activate(MetaMask);

    return () => {};
  }, [activate]);

  return (
    <Context.Provider
      value={{
        signIn,
        isInitialized,
        tokens,
        fullScreenLoading,
        setFullScreenLoading,
        selectedToken,
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
