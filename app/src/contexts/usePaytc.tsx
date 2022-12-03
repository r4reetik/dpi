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

type PayTCAccountContextType = {
  mmAddress: string | null;
};

const Context = createContext<PayTCAccountContextType>({} as PayTCAccountContextType);

const PayTCProvider = ({ children }: any) => {
  const { chainId } = useWeb3React();

  const [mmAddress, setMmAddress] = useState<string | null>(null);
  const [swAddress, setSwAddress] = useState<string | null>(null);

  const isLoggedIn = !!swAddress;

  useEffect(() => {
    return () => {};
  }, []);

  const signIn = async (_mmAddress: string) => {
    const data = await getAddressData("mmAddress", _mmAddress);
    if (data) {
      // old account
      const { swAddress: _swAddress } = data;
      setSwAddress(_swAddress);
    } else {
      // new account

      const _swAddress = ""; // make api call
      const ens = await getEnsNameFromAddress(_mmAddress);
      await addNewUser(_mmAddress, _swAddress, ens);
    }
    setMmAddress(_mmAddress);
  };

  return <Context.Provider value={{
    mmAddress
  }}>{children}</Context.Provider>;
};

const usePayTC = () => {
  return useContext(Context);
};

export { PayTCProvider, usePayTC };
