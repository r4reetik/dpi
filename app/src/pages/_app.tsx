import "../styles/globals.css";
import type { AppProps } from "next/app";

import { PayTCProvider } from "../contexts/usePaytc";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={(p) => new Web3Provider(p)}>
      <PayTCProvider>
        <Layout>
        <Component {...pageProps} />
        </Layout>
      </PayTCProvider>
    </Web3ReactProvider>
  );
}
