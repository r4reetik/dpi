import { useEffect, useState } from "react";

import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";
import RecipientAddressInput from "../components/RecipientAddressInput/RecipientAddressInput";
import History from "../components/TransactionsLog/History";

import AmountRecipient from "../components/Pay/AmountRecipient";

export type PageType =
  | "connectWallet"
  | "pay"
  | "reviewPay"
  | "inputRecipient"
  | "amountRecipient"
  | "history";

export interface SmartWallet {
  address: string;
  nonces: any;
}

export default function Home() {
  const [page, setPage] = useState<PageType>("connectWallet");

  return (
    <div>
      {page === "connectWallet" && <ConnectWallet next={() => setPage("pay")} />}
      {page === "pay" && <Pay next={() => setPage("inputRecipient")} setPage={setPage} />}
      {page === "inputRecipient" && (
        <RecipientAddressInput
          next={() => setPage("amountRecipient")}
          onBack={() => setPage("pay")}
        />
      )}
      {page === "amountRecipient" && (
        <AmountRecipient next={() => setPage("pay")} onBack={() => setPage("inputRecipient")} />
      )}
      {page === "history" && <History onBack={() => setPage("pay")} />}
    </div>
  );
}
