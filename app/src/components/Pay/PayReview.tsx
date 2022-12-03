import React from "react";
import { usePayTC } from "../../contexts/usePaytc";

import ContentWrapper from "../wrappers/ContentWrapper";
import TokenBalanceInput from "./TokenBalanceInput";

const PayReview = ({ next }: { next: () => void }) => {
  const { recipient, selectedToken } = usePayTC();
  return (
    <div className='flex flex-col items-stretch justify-around gap-8 mt-10 h-[90%]'>
      <ContentWrapper label={"You Send"}>
        <div className='flex flex-col gap-1'>
          <TokenBalanceInput token={selectedToken} />
        </div>
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
      <div className='grow' />

      <button className='text-xl bg-primary p-4 rounded-3xl max-h-[450px]'>Send</button>
    </div>
  );
};

export default PayReview;
