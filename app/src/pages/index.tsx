import { useEffect, useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";

type PageType = "connectWallet" | "pay" | "payReview";

export default function Home() {
  const [page, setPage] = useState<PageType>("pay");

  useEffect(() => {
    // addNewUser("mm", "sw", null);

    return () => {};
  }, []);

  return (
    <div>
      {page === "connectWallet" && <ConnectWallet next={() => setPage("pay")} />}
      {page === "pay" && <Pay />}
    </div>
  );
}
