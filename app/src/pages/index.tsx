import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Layout from "../components/Layout";
import Pay from "../components/Pay/Pay";
import PayReview from "../components/Pay/PayReview";
import RecipientAddressInput from "../components/RecipientAddressInput/RecipientAddressInput";
import History from "../components/TransactionsLog/History";
import { Tokens } from "../constants/Tokens";

export type PageType = "connectWallet" | "pay" | "payReview" | "input" | "history";

export interface SmartWallet {
  address: string;
  nonces: any;
}

export default function Home() {
  const [page, setPage] = useState<PageType>("payReview");

  return (
    <div>
      {page === "connectWallet" && <Layout><ConnectWallet next={() => setPage("pay")} /></Layout>}
      {page === "pay" && <Layout>  <Pay next={() => setPage("input")} setPage={setPage} /> </Layout>}
      {page === "input" && <Layout>  <RecipientAddressInput onBack={()=> setPage("pay")} /> </Layout>}
      {page === "payReview" && <Layout> <PayReview next={() => setPage("input")} onBack={() => setPage("input")} token={Tokens[5][0]} /> </Layout>}
      {page === "history" && <History onBack={()=>setPage("pay")} />}
    </div>
  );
}
