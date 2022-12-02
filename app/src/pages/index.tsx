import { useWeb3React } from "@web3-react/core";

import { MetaMask } from "../constants/WalletInfo";

export default function Home() {
  const context = useWeb3React();

  return (
    <div className={""}>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button onClick={() => context.activate(MetaMask)}>connect wallet</button>
    </div>
  );
}
