import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";
import RecipientAddressInput from "../components/RecipientAddressInput/RecipientAddressInput";

type PageType = "connectWallet" | "pay" | "payReview" | "input";

export interface SmartWallet {
  address: string;
  nonces: any;
}

export default function Home() {
  const [page, setPage] = useState<PageType>("payReview");

  return (
    <div>
      {page === "connectWallet" && <ConnectWallet next={() => setPage("pay")} />}
      {page === "pay" && <Pay next={() => setPage("input")} />}
      {page === "input" && <RecipientAddressInput />}
    </div>
  );
}
