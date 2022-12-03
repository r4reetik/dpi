import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Layout from "../components/Layout";
import Pay from "../components/Pay/Pay";
import AmountInput from "../components/Pay/AmountInput";
import RecipientAddressInput from "../components/RecipientAddressInput/RecipientAddressInput";
import History from "../components/TransactionsLog/History";
import { Tokens } from "../constants/Tokens";

import { useGateway } from "../hooks/useGateway";
import PayReview from "../components/Pay/PayReview";

export type PageType = "connectWallet" | "pay" | "reviewPay" | "inputRecipient" | "amountRecipient" | "history";

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
      {page === "connectWallet" && <Layout><ConnectWallet next={() => setPage("pay")} /></Layout>}
      {page === "pay" && <Layout>  <Pay next={() => setPage("inputRecipient")} setPage={setPage} /> </Layout>}
      {page === "inputRecipient" && <Layout>  <RecipientAddressInput onBack={()=> setPage("pay")} /> </Layout>}
      {/* {page === "amountRecipient" && <Layout> <PayReview next={() => setPage("inputRecipient")} onBack={() => setPage("inputRecipient")} /> </Layout>} */}
      {page === "history" && <History onBack={()=>setPage("pay")} />}
    </div>
  );
}
