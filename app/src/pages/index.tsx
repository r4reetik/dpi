import { ethers } from "ethers";
import { AbiCoder } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";
import AmountInput from "../components/Pay/AmountInput";
import RecipientAddressInput from "../components/RecipientAddressInput/RecipientAddressInput";
import { Tokens } from "../constants/Tokens";
import { post } from "../utils/axios";
import { useGateway } from "../hooks/useGateway";

type PageType = "connectWallet" | "pay" | "reviewPay" | "inputRecipient" | "amountRecipient";

export interface SmartWallet {
  address: string;
  nonces: any;
}

export default function Home() {
  const [page, setPage] = useState<PageType>("connectWallet");
  // useGateway(async (status, hash) => {
  //   console.log(status, hash);
  // });
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
