import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";

type PageType = "connectWallet" | "pay" | "payReview";

export default function Home() {
  const [page, setPage] = useState<PageType>("connectWallet");

  return <div>{page === "connectWallet" && <ConnectWallet />}</div>;
}
