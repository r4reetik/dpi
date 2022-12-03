import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";
import AmountInput from "../components/Pay/AmountInput";
import RecipientAddressInput from "../components/RecipientAddressInput/RecipientAddressInput";

type PageType = "connectWallet" | "pay" | "reviewPay" | "inputRecipient" | "amountRecipient";

export interface SmartWallet {
  address: string;
  nonces: any;
}

export default function Home() {
  const [page, setPage] = useState<PageType>("connectWallet");

  return (
    <div>
      {page === "connectWallet" && <ConnectWallet next={() => setPage("pay")} />}
      {page === "pay" && <Pay next={() => setPage("inputRecipient")} />}
      {page === "inputRecipient" && (
        <RecipientAddressInput next={() => setPage("amountRecipient")} />
      )}
      {page === "amountRecipient" && <AmountInput reset={() => setPage("pay")} />}
    </div>
  );
}
