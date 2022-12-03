import Image from "next/image";
import React from "react";
import { UilMoneyInsert } from "@iconscout/react-unicons";

const TokenCard = () => {
  return (
    <div>
      <div
        className={`flex flex-col items-center px-4 py-3 sm:flex-row bg-black-900 md:bg-black-800 rounded-xl`}>
        <div className='flex items-center self-start w-full gap-3 '>
          <span className='relative'>
            <Image src={""} width={48} height={48} alt={`logo`} />
          </span>

          <div className='flex flex-col flex-1 '>
            <div className='flex gap-2'>
              <span className='text-base font-semibold tracking-wide md:text-lg'>
                {/* {token.symbol} */}
              </span>
            </div>
          </div>

          <button className='bg-black-700 p-[10px] rounded-full md:hidden' onClick={() => {}}>
            <UilMoneyInsert className='text-gray-600 ' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
