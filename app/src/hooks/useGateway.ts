import { Bitcoin, Ethereum } from "@renproject/chains";
import RenJS from "@renproject/ren";
import { ethers, providers } from "ethers";
import { useEffect } from "react";

export const useGateway = (cb: (status: string, hash?: string) => Promise<void>) => {
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
    gateway.on("transaction", (tx) => {
      (async () => {
        console.log(tx.params);
        await cb("tx1_pending");

        await tx.in.wait();
        await cb("tx2_pending");
        await tx.renVM.submit().on("progress", console.log);
        await tx.renVM.wait();
        await cb("tx3_pending");

        await tx.out.submit!({
          txConfig: {
            gasLimit: 1000000,
          },
        });
        await tx.out.wait();

        const outTx = tx.out.progress.transaction!;
        console.log("Done:", outTx.txHash);
        await cb("tx3_done", outTx.txHash);

        console.log(tx.toChain.transactionExplorerLink(outTx));
      })().catch(console.error);
    });
  };
  useEffect(() => {
    listen();
  }, []);
};
