import React from "react";
import TokenCard, { TokenType } from "../Token/TokenCard";
import { UilMoneyInsert, UilQrcodeScan, UilArrowUpRight } from "@iconscout/react-unicons";
import { Tokens } from "../../constants/Tokens";
import { usePayTC } from "../../contexts/usePaytc";
import next from "next";

const tokens = [...Tokens[5], ...Tokens[80001]];

const Pay = ({ next }: { next: () => void }) => {
  const { setSelectedToken } = usePayTC();
  const handleTokenClick = async (_token: TokenType) => {
    setSelectedToken(_token);
    next();
  };

  return (
    <div className='flex flex-col gap-y-1'>
      <div className='flex mt-4 text-center justify-around items-center rounded-2xl md:min-w-[448px] py-8 text-white bg-black-800'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center items-center font-semibold rounded-full w-16 h-16 bg-primary'>
            <UilQrcodeScan />
          </div>
          <div className='mt-1'>Scan & Pay</div>
        </div>
        <div className='flex flex-col justify-start items-center'>
          <div className='flex justify-center items-center font-semibold rounded-full w-16 h-16 bg-primary'>
            <UilArrowUpRight />
          </div>
          <div className='mt-1'>Send</div>
        </div>
      </div>
      <div className='flex flex-col mt-4 justify-between align-middle rounded-2xl items-center text-white bg-black-800'>
        <div className='my-1 px-0.5 py-1 mr-auto ml-2 text-sm font-semibold tracking-wide capitalize text-gray-500'>
          Your Assets
        </div>
        <div className='w-full p-2'>
          <div className='flex flex-col gap-0.5 mb-2 justify-start'>
            {tokens.map((token) => (
              <TokenCard
                key={`${token.chain}-${token.symbol}`}
                token={token}
                onClick={() => handleTokenClick(token)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
