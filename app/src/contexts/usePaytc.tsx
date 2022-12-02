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

const Context = createContext({});

const PayTCProvider = ({ children }: any) => {
  useEffect(() => {
    return () => {};
  }, []);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

const usePayTC = () => {
  return useContext(Context);
};

export { PayTCProvider, usePayTC };
