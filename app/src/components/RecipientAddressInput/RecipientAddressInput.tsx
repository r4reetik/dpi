import React from "react";
import { usePayTC } from "../../contexts/usePaytc";
import { getAddressFromEns } from "../../utils/ens";
import { getAddressData } from "../../utils/firebase";
import Input from "./Input";
import ScanQR from "./ScanQR";
import { UilArrowLeft } from "@iconscout/react-unicons";

function RecipientAddressInput({ onBack, next }: { onBack: () => void; next: () => void }) {
  const { setFullScreenLoading, setRecipient } = usePayTC();

  const resolve = async (text: string) => {
    let recipientSwAddress;

    try {
      setFullScreenLoading(true);

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
      next();
    } catch (e) {
      console.error(e);
    }
    setFullScreenLoading(false);
  };

  return (
    <div className='flex flex-col justify-center align-middle'>
      <div className='flex justify-between px-6 py-2 mb-4'>
        <div className='text-xl font-extrabold'>Scan</div>
        <div
          onClick={onBack}
          className='absolute flex items-center w-8 h-8 p-1 rounded-full bg-black-900 md:p-2 md:w-10 md:h-10 sm:top-6 right-4 xs:right-6 sm:right-24'>
          <UilArrowLeft className='flex w-full h-full m-auto text-gray-400' />
        </div>
      </div>
      <ScanQR resolve={resolve} />
      <div className='mb-10 -mt-20 text-3xl text-center'>OR</div>
      <Input resolve={resolve} />
    </div>
  );
}

export default RecipientAddressInput;
