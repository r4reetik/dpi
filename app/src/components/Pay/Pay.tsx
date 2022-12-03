import React from "react";
import TokenCard, { TokenType } from "../Token/TokenCard";
import { UilMoneyInsert, UilQrcodeScan,UilArrowUpRight } from "@iconscout/react-unicons";
import {Tokens} from "../../constants/Tokens"


const Pay = () => {
  const tokens = [...Tokens[5],...Tokens[80001]]
  return (
    <div className='flex flex-col gap-y-1'>
      <div className='flex mt-4 justify-between text-center rounded-2xl items-center h-32 text-white md:px-8 lg:h-auto lg:min-h-screen bg-black-800'>
        <div className='flex flex-col px-12 py-16 justify-end align-middle'>
          <div className='flex justify-center align-middle items-center font-semibold rounded-full w-16 h-16 bg-primary'>
            <UilQrcodeScan />
          </div>
          <div className="mt-1">Scan & Pay</div>
        </div>
        <div className='flex flex-col px-12 py-16 justify-start align-middle'>
          <div className='flex justify-center align-middle items-center font-semibold rounded-full w-16 h-16 bg-primary'>
            <UilArrowUpRight />
          </div>
          <div className="mt-1">Send</div>
        </div>
      </div>
      <div className='flex flex-col mt-4 justify-between align-middle rounded-2xl items-center h-full text-white md:px-8 lg:h-auto lg:min-h-screen bg-black-800'>
        <div className='my-1 px-0.5 py-1 mr-auto ml-2 text-sm font-semibold tracking-wide capitalize text-gray-500'>
          Your Assets
        </div>
        <div className='flex flex-col gap-0.5 mb-2 justify-between align-middle'>
          {tokens.map((token)=> <TokenCard key={token.name} token = {token} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Pay;
