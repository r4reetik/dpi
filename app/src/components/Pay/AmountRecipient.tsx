import React, { useEffect, useState } from "react";
import { usePayTC } from "../../contexts/usePaytc";
import ContentWrapper from "../wrappers/ContentWrapper";
import TokenBalanceInput from "./TokenBalanceInput";
import { UilArrowLeft } from "@iconscout/react-unicons";
import BottomSheet from "../BottomSheets/BottomSheet";

interface AmountRecipient {
  onBack: () => void;
  next: () => void;
}

const AmountRecipient = ({ onBack }: AmountRecipient) => {
  const {
    recipient,
    selectedToken: token,
    setFullScreenLoading,
    setSelectedToken,
    submitTransfer,
    swAddress,
    tokens,
  } = usePayTC();
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (!token && tokens) {
      setSelectedToken(tokens["0x7ea6eA49B0b0Ae9c5db7907d139D9Cd3439862a1".toUpperCase()]);
    }
    return () => {};
  }, [setSelectedToken, token, tokens]);

  return (
    <div className='grid  min-h-[80vh]'>
      <div className='grid justify-between grid-flow-col px-6 py-2'>
        <span className=''>Pay</span>
        <div
          onClick={onBack}
          className='flex items-center w-8 h-8 p-1 rounded-full bg-black-900 md:p-2 md:w-10 md:h-10 sm:top-6 right-4 xs:right-6 sm:right-24'>
          <UilArrowLeft className='flex w-full h-full m-auto text-gray-400' />
        </div>
      </div>
      <div className='flex flex-col justify-around gap-10'>
        <ContentWrapper label={"You Send"}>
          <div className='flex flex-col gap-1'>{token && <TokenBalanceInput token={token} />}</div>
        </ContentWrapper>
        <ContentWrapper label={"To"}>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-col md:min-h-[72px] bg-black-900 md:bg-black-800 rounded-xl'>
              <div className='flex justify-between gap-4 px-2 py-4 sm:items-center sm:justify-between sm:flex-row '>
                Recipient : {recipient}
              </div>
            </div>
          </div>
        </ContentWrapper>
        <div className='grow'></div>
        <button
          onClick={async () => {
            setFullScreenLoading(true);
            const res = await submitTransfer();
            setFullScreenLoading(false);
            if (res.hash) {
              setShowStatus(true);
            }
          }}
          className='text-xl  bg-primary p-4 m-4 max-h-[450px]'>
          Send
        </button>
        {showStatus && (
          <BottomSheet setOpen={setShowStatus} open title='Status'>
            <div className='flex flex-col items-center p-6 m-6'>
              <div className='mx-auto text-center '>Your transaction has been submitted.</div>
              <a
                className='text-primary'
                href={`https://testnet.amarok.connextscan.io/address/${swAddress}`}>
                Please Check here
              </a>
            </div>
          </BottomSheet>
        )}
      </div>
    </div>
  );
};

export default AmountRecipient;
