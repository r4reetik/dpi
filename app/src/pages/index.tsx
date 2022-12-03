import { ethers } from "ethers";
import { AbiCoder } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";
import AmountInput from "../components/Pay/AmountInput";
import RecipientAddressInput from "../components/RecipientAddressInput/RecipientAddressInput";
import { Tokens } from "../constants/Tokens";
import { post } from "../utils/axios";

type PageType = "connectWallet" | "pay" | "reviewPay" | "inputRecipient" | "amountRecipient";

export interface SmartWallet {
  address: string;
  nonces: any;
}

export default function Home() {
  const [page, setPage] = useState<PageType>("connectWallet");
  const getMetaTypedTx = useCallback(async () => {
    const res: any = await post("http://localhost:4000/getTypedData", {
      domainID: "9991",
      address: "0x3F4Fb122823905Ea2A57B0DDfd805cE1066E7d3e",
      chainID: "5",
      recipient: "0x3F4Fb122823905Ea2A57B0DDfd805cE1066E7d3e",
      asset: "0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1",
      delegate: "0x3F4Fb122823905Ea2A57B0DDfd805cE1066E7d3e",
      amount: "10000000000000000",
      slippage: "10",
    });
    const provider = new ethers.providers.Web3Provider((window as any).ethereum as any, "any");
    console.log(res.userOps);

    const signature = await provider.getSigner()._signTypedData(res.domain, res.types, res.value);
    const signatureEncoded = new AbiCoder().encode(["uint256", "bytes"], ["5", signature]);
    const rrr = await post("http://localhost:4000/transactions", {
      chainID: "5",
      signature: signatureEncoded,
      userOps: res.userOps,
      address: "0x3F4Fb122823905Ea2A57B0DDfd805cE1066E7d3e",
    });
    console.log(rrr);
  }, []);

  // useEffect(() => {
  //   getMetaTypedTx();
  // }, []);

  return (
    <div>
      {page === "connectWallet" && <ConnectWallet next={() => setPage("pay")} />}
      {page === "pay" && <Pay next={() => setPage("inputRecipient")} />}
      {page === "inputRecipient" && (
        <RecipientAddressInput next={() => setPage("amountRecipient")} />
      )}
      {page === "amountRecipient" && <AmountInput next={() => setPage("reviewPay")} />}
    </div>
  );
}
