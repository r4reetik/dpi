import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";
import RecipientAddressInput from "../components/RecipientAddressInput/RecipientAddressInput";
import History from "../components/TransactionsLog/History";

import AmountRecipient from "../components/Pay/AmountRecipient";
import Layout from "../components/Layout";

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
      {page === "connectWallet" && (
        <Layout>
          <ConnectWallet next={() => setPage("pay")} />
        </Layout>
      )}
      {page === "pay" && (
        <Layout>
          <Pay next={() => setPage("inputRecipient")} setPage={setPage} />
        </Layout>
      )}
      {page === "inputRecipient" && (
        <Layout>
          <RecipientAddressInput
            next={() => setPage("amountRecipient")}
            onBack={() => setPage("pay")}
          />
        </Layout>
      )}
      {page === "amountRecipient" && (
        <Layout>
          <AmountRecipient next={() => setPage("pay")} onBack={() => setPage("inputRecipient")} />
        </Layout>
      )}
      {page === "history" && <History onBack={() => setPage("pay")} />}
    </div>
  );
}
