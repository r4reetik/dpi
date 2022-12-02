import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { MetaMask } from "../../constants/WalletInfo";
import { usePayTC } from "../../contexts/usePaytc";

function ConnectWallet({ next }: { next: () => void }) {
  const { activate } = useWeb3React();
  const { isInitialized } = usePayTC();

  useEffect(() => {
    if (isInitialized) next();
    return () => {};
  }, [isInitialized, next]);

  return (
    <div className={""}>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <button onClick={() => activate(MetaMask)}>connect wallet</button>
    </div>
  );
}

export default ConnectWallet;
