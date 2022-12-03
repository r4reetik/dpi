import { InjectedConnector } from "@web3-react/injected-connector";

export const MetaMask = new InjectedConnector({ supportedChainIds: [5, 80001] });
