import Image from "next/image";
import React from "react";
import { UilMoneyInsert } from "@iconscout/react-unicons";
import Badge from "../Badge";
import { colors } from "../../constants/chain";
import { TokenType } from "../../constants/Tokens";
import BigNumber from "bignumber.js";

interface TokenCardProps {
  token: TokenType;
  onClick: () => void;
}

type chain = "Ethereum" | "Polygon";

const TokenCard = ({ token, onClick }: TokenCardProps) => {
  return (
    <div className={`flex flex-col items-center p-4 sm:flex-row bg-black-900 rounded-xl`}>
      <div className='flex items-center self-start w-full gap-3 '>
        <span className='relative'>
          <Image src={token.image} width={48} height={48} alt={`logo`} />
        </span>

        <div className='flex flex-col flex-1 '>
          <div className='flex gap-2'>
            <span className='text-base font-semibold tracking-wide md:text-lg'>{token.symbol}</span>
            <Badge className={colors[token.chain as chain]} text={token.chain} />
          </div>
          <span className='text-[13px] flex w-max justify-center mt-1 md:text-base text-sm font-semibold tracking-wide capitalize text-gray-500'>
            Balance :{" "}
            {token.balance
              ? new BigNumber(token.balance).shiftedBy(-token.decimals).toFixed(4)
              : "0.0000"}
          </span>
        </div>

        <button className='bg-black-800 p-[10px] rounded-full' onClick={onClick}>
          <UilMoneyInsert className='text-white' />
        </button>
      </div>
    </div>
  );
};

export default TokenCard;
