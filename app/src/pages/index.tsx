import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import ConnectWallet from "../components/ConnectWallet/ConnectWallet";
import Pay from "../components/Pay/Pay";
import { get } from "../utils/axios";

type PageType = "connectWallet" | "pay" | "payReview";

export interface SmartWallet {
  address: string;
  nonces: any;
}

export default function Home() {
  const [page, setPage] = useState<PageType>("connectWallet");
  const { active, account, chainId } = useWeb3React();

  const getSmartWalletAPI = useCallback(
    async (address: string, chainId: number): Promise<SmartWallet> => {
      const response = await get<SmartWallet>(`http://localhost:3000/addresses/${address}`, {
        params: { chainId },
      });
      if (response) return response;
      else throw new Error("getSmartWalletAPI returned null");
    },
    []
  );

  useEffect(() => {
    // addNewUser("mm", "sw", null);
    if (active && account && chainId) {
      getSmartWalletAPI(account, chainId).then((res) => console.log(res));
    }

    return () => {};
  }, [active, account, chainId]);

  return (
    <div>
      {page === "connectWallet" && <ConnectWallet next={() => setPage("pay")} />}
      {page === "pay" && <Pay />}
    </div>
  );
}
