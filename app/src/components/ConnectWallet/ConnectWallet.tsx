import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { MetaMask } from "../../constants/WalletInfo";

function ConnectWallet() {
  const { activate } = useWeb3React();

  return (
    <div className={""}>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <button onClick={() => activate(MetaMask)}>connect wallet</button>
    </div>
  );
}

export default ConnectWallet;
