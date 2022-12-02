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
import { getEnsNameFromAddress } from "../utils/ens";
import { addNewUser, db, getAddressData } from "../utils/firebase";

interface PayTcContextType {
  signIn: (_mmAddress: string) => Promise<void>;
  isInitialized: boolean;
}

const Context = createContext<PayTcContextType>({} as PayTcContextType);

const PayTCProvider = ({ children }: any) => {
  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [swAddress, setSwAddress] = useState<string | null>(null);

  const isInitialized = !!swAddress;

  useEffect(() => {
    return () => {};
  }, []);

  const signIn = async (_mmAddress: string) => {
    const data = await getAddressData("mmAddress", _mmAddress);
    let _swAddress = null;
    if (data) {
      // old account
      const { swAddress: swa } = data;
      _swAddress = swa;
    } else {
      // new account

      const swa = ""; // make api call
      const ens = await getEnsNameFromAddress(_mmAddress);
      await addNewUser(_mmAddress, swa, ens);
      _swAddress = swa;
    }
    setMmAddress(_mmAddress);
    setSwAddress(_swAddress);
  };

  return <Context.Provider value={{ signIn, isInitialized }}>{children}</Context.Provider>;
};

const usePayTC = () => {
  return useContext(Context);
};

export { PayTCProvider, usePayTC };
