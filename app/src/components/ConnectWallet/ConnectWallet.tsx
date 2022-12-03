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
    <div className='mt-30'>
      <button
        className='text-xl bg-primary p-4 mx-auto rounded-lg flex flex-col gap-1 overflow-y-auto max-h-[450px]'
        onClick={() => activate(MetaMask)}>
        Connect Wallet
      </button>
    </div>
  );
}

export default ConnectWallet;
