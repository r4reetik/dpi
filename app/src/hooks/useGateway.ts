import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS from "@renproject/ren";
import { ethers, providers } from "ethers";
import { useEffect, useState } from "react";

export const useGateway = (cb: (status: string, hash?: string) => void) => {
  const [gatewayAddress, setGatewayAddress] = useState<string | null>(null);
  const listen = async () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
    const signer = provider.getSigner();
    const network = "testnet";
    const bitcoin = new Bitcoin({ network });
    const ethereum = new Ethereum({
      network,
      defaultTestnet: "goerli",
      provider: new providers.JsonRpcProvider(
        "https://goerli.infura.io/v3/ac9d2c8a561a47739b23c52e6e7ec93f"
      ),
      signer,
    });
    const renJS = new RenJS(network).withChains(bitcoin, ethereum);
    const gateway = await renJS.gateway({
      asset: bitcoin.assets.BTC, // "BTC"
      from: bitcoin.GatewayAddress(),
      to: ethereum.Account(),
    });

    setGatewayAddress(gateway.gatewayAddress!);

    gateway.on("transaction", (tx) => {
      (async () => {
        cb("tx1_pending");

        await tx.in.wait();
        cb("tx2_pending");
        await tx.renVM.submit();
        await tx.renVM.wait();
        cb("tx3_pending");
        if (tx.out.submit) {
          await tx.out.submit!({
            txConfig: {
              gasLimit: 1000000,
            },
          });
          await tx.out.wait();

          const outTx = tx.out.progress.transaction!;
          cb("tx3_done", outTx.txHash);
        }
      })().catch(console.error);
    });
  };
  useEffect(() => {
    if (gatewayAddress === null) listen();
  }, []);
  return gatewayAddress;
};
