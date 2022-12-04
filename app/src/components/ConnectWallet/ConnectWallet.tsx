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
    <div className='mt-10'>
      <h2 className='text-4xl font-extrabold'>Welcome to the web3 UPI <br/>
      <span className="text-primary">No Gas <br/> No Complexity <br />Simplest UX <br /> One Address for any chain</span>
      </h2>
      <button
        className='text-xl mt-5 bg-primary p-4 mx-auto rounded-lg flex flex-col gap-1 overflow-y-auto max-h-[450px]'
        onClick={() => activate(MetaMask)}>
        Connect Wallet
      </button>
    </div>
  );
}

export default ConnectWallet;
