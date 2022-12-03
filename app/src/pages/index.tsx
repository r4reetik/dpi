import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";

type PageType = "connectWallet" | "pay" | "payReview";

export interface SmartWallet {
  address: string;
  nonces: any;
}

export default function Home() {
  const [page, setPage] = useState<PageType>("connectWallet");

  return (
    <div>
      {page === "connectWallet" && <ConnectWallet next={() => setPage("pay")} />}
      {page === "pay" && <Pay />}
    </div>
  );
}
