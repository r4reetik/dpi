import Image from 'next/image';
import React from 'react';
import { UilDownLeft, UilArrowUpRight } from "@iconscout/react-unicons";

const TransactionCard = () => {
  const type = "sent"
  const hasSent = type === "sent";
  return (
    <div className={`flex w-full p-4 justify-between align-middle sm:flex-row bg-black-900 rounded-xl`}>
      <div className='flex justify-between items-center self-start w-full gap-3 '>
        <div className='flex gap-4 justify-start items-center'>
          <div className='flex justify-center items-center font-semibold rounded-full w-12 h-12 bg-primary'>
            {hasSent ? <UilArrowUpRight /> : <UilDownLeft />}
          </div>
          <div className='mt-1'>
            <div>
              {hasSent ? "Sent To" : "Received From"}
            </div>
            <div>
            <span className='text-[13px] flex w-max justify-center mt-1 md:text-base text-sm font-semibold tracking-wide capitalize text-gray-500'>
            address
          </span>
            </div>
          </div>
        </div>
      </div>
        <div className='flex flex-col flex-1 mt-1 '>
          <div className='flex gap-2'>
            <Image src={'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png'} alt="token_image" width={24} height={24} className='object-contain'/>
            <span className='text-base font-semibold tracking-wide md:text-lg'>
              ETH
            </span>
          </div>
          <span className='text-[13px] flex w-max justify-center mt-1 md:text-base text-sm font-semibold tracking-wide capitalize text-gray-500'>
            Amount :
          </span>
        </div>
    </div>
  )
}

export default TransactionCard