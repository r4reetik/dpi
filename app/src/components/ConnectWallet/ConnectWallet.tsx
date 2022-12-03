import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { MetaMask } from "../../constants/WalletInfo";

function ConnectWallet() {
  const { activate } = useWeb3React();

  return (
    <div className="mt-40">
      <button className="text-xl bg-primary p-4 rounded-lg flex flex-col gap-1 overflow-y-auto max-h-[450px]" onClick={() => activate(MetaMask)}>Connect Wallet</button>
    </div>
  );
}

export default ConnectWallet;
