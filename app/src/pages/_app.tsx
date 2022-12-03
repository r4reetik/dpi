import "../styles/globals.css";
import type { AppProps } from "next/app";

import { PayTCProvider } from "../contexts/usePaytc";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={(p) => new Web3Provider(p)}>
      <PayTCProvider>
        <Component {...pageProps} />
      </PayTCProvider>
    </Web3ReactProvider>
  );
}
