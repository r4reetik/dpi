import React from "react";
import { usePayTC } from "../../contexts/usePaytc";
import { getAddressFromEns } from "../../utils/ens";
import { getAddressData } from "../../utils/firebase";
import Input from "./Input";
import ScanQR from "./ScanQR";

function RecipientAddressInput({ next }: { next: () => void }) {
  const { setFullScreenLoading, setRecipient } = usePayTC();

  const resolve = async (text: string) => {
    setFullScreenLoading(true);

    let recipientSwAddress;
    if (text.endsWith(".eth")) {
      const mm = await getAddressFromEns(text);
      if (!mm) throw new Error("Invalid ENS");

      const data = await getAddressData("mmAddress", mm);
      if (!data) throw new Error(`MM Address ${mm} not found`);

      recipientSwAddress = data.swAddress;
    } else {
      const mmData = await getAddressData("mmAddress", text);
      if (!mmData) {
        const swData = await getAddressData("swAddress", text);
        if (!swData) throw new Error(`${text} invalid wallet address`);

        recipientSwAddress = text;
      } else recipientSwAddress = mmData.swAddress;
    }

    setRecipient(text);
    setFullScreenLoading(false);
    next();
  };

  return (
    <div>
      <ScanQR resolve={resolve} />
      <Input resolve={resolve} />
    </div>
  );
}

export default RecipientAddressInput;
