import React from "react";
import TokenCard from "../Token/TokenCard";

import { UilHistory, UilQrcodeScan, UilArrowUpRight } from "@iconscout/react-unicons";
import { TokenType } from "../../constants/Tokens";
import { usePayTC } from "../../contexts/usePaytc";

const Pay = ({ next }: { next: () => void }) => {
  const { setSelectedToken, tokens } = usePayTC();
  const handleTokenClick = async (_token: TokenType) => {
    setSelectedToken(_token);
    next();
  };

  return (
    <div className='flex flex-col gap-y-1'>
      <div className='flex mt-4 text-center justify-around items-center rounded-2xl md:min-w-[448px] py-8 text-white bg-black-800'>
        <div className='flex flex-col items-center justify-start'>
          <div className='flex items-center justify-center w-16 h-16 font-semibold rounded-full bg-primary'>
            <UilArrowUpRight />
          </div>
          <div className='mt-1'>Send</div>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center w-16 h-16 font-semibold rounded-full bg-primary'>
            <UilQrcodeScan />
          </div>
          <div className='mt-1'>Scan & Pay</div>
        </div>
        <div className='flex flex-col items-center justify-start'>
          <div className='flex items-center justify-center w-16 h-16 font-semibold rounded-full bg-primary'>
            <UilHistory />
          </div>
          <div className='mt-1'>History</div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-between mt-4 text-white align-middle rounded-2xl bg-black-800'>
        <div className='my-1 px-0.5 py-1 mr-auto ml-2 text-sm font-semibold tracking-wide capitalize text-gray-500'>
          Your Assets
        </div>
        <div className='w-full p-2'>
          <div className='flex flex-col gap-0.5 mb-2 justify-start'>
            {Object.values(tokens).map((_token) => (
              <TokenCard
                key={`${_token.chain}-${_token.symbol}`}
                token={_token}
                onClick={() => handleTokenClick(_token)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
