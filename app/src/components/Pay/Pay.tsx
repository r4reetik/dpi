import React from "react";
import TokenCard from "../Token/TokenCard";
import { UilMoneyInsert, UilSetting } from "@iconscout/react-unicons";

const Pay = () => {
  return (
    <div className='flex flex-col gap-y-1'>
      <div className='flex mt-4 justify-between text-center rounded-2xl items-center h-32 text-white md:px-8 lg:h-auto lg:min-h-screen bg-black-800'>
        <div className='flex flex-col px-12 py-16 justify-start align-middle'>
          <div className='bg-primary rounded-[50%] text-4xl w-16 h-16'>
            <UilMoneyInsert />
          </div>
          <div>Send</div>
        </div>
        <div className='flex flex-col px-12 py-16 justify-end align-middle'>
          <div className='bg-primary rounded-[50%] w-16 h-16'>
            <UilSetting />
          </div>
          <div>Transfers</div>
        </div>
      </div>
      <div className='flex flex-col mt-4 justify-between align-middle rounded-2xl items-center h-full text-white md:px-8 lg:h-auto lg:min-h-screen bg-black-800'>
        <div className='mt-1 mb-2 p-2 mr-auto ml-2 text-sm font-semibold tracking-wide capitalize text-gray-500'>
          Your Assets
        </div>
        <div className='flex flex-col gap-2 mb-2 justify-between align-middle'>
          <TokenCard />
          <TokenCard />
          <TokenCard />
          <TokenCard />
          <TokenCard />
        </div>
      </div>
    </div>
  );
};

export default Pay;
