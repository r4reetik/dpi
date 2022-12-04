import Image from 'next/image';
import React from 'react';
import { UilArrowDownLeft, UilArrowUpRight } from "@iconscout/react-unicons";
import { transactionType } from './History';

const TransactionCard = ({ transaction }: { transaction: transactionType }) => {
  const hasSent = transaction.type === "sent";
  return (
    <div className='flex w-full p-4 justify-between align-middle sm:flex-row bg-black-900 rounded-xl'>
      <div className='flex justify-between items-center self-start w-full gap-3 '>
        <div className='flex gap-4 justify-start items-center'>
          <div className='flex justify-center items-center font-semibold rounded-full w-12 h-12 bg-primary'>
            {hasSent ? <UilArrowUpRight /> : <UilArrowDownLeft />}
          </div>
          <div className='mt-1'>
            <div>
              {hasSent ? "Sent To" : "Received From"}
            </div>
            <div className='flex'>
              <span className='text-[13px] flex w-max justify-center mt-1 md:text-base text-sm font-semibold tracking-wide capitalize text-gray-500'>
                address :
              </span>
              <span className='text-md text-white'>
                {transaction.displayAddress.substr(0, 3) + "...." + transaction.displayAddress.substr(-3)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 mt-1 '>
        <div className='flex justify-between gap-2'>
          <Image src={transaction.image} alt="token_image" width={24} height={24} className='object-contain' />
          <span className='text-base font-semibold tracking-wide md:text-lg'>
            {transaction.token}
          </span>
        </div>
        <div className='flex'>
          <span className='text-[13px] flex w-max justify-center mt-1 md:text-base text-sm font-semibold tracking-wide capitalize text-gray-500'>
            Amount :
          </span>
          <span className='text-md text-white opacity-50'>
            ${transaction.amount}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TransactionCard;