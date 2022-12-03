import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";
import ScanQR from "../components/QR/ScanQR"

type PageType = "connectWallet" | "pay" | "payReview" | "scan";

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
      {page === "scan" && <ScanQR/>}
    </div>
  );
}
