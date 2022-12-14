import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";

import { PayTCProvider } from "../contexts/usePaytc";

import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import Layout from "../components/Layout";

const toastConfig = {
  autoClose: 6000,
  closeButton: true,
  closeOnClick: false,
  theme: "dark",
  draggable: false,
  pauseOnHover: true,
  progressStyle: { visibility: "visible", animationDirection: "reverse" },
} as ToastContainerProps;

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
