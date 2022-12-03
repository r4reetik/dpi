import Image from "next/image";
import React from "react";
import { UilMoneyInsert } from "@iconscout/react-unicons";
import Badge from "../Badge";
import { colors } from "../../constants/chain";

export type TokenType = {
  address: string,
  chainId: number,
  symbol: string,
  decimals: number,
  name: string,
  priceUSD: string,
  logoURI: string,
  coinKey: string,
  chain: string
}
interface TokenCardProps {
  token: TokenType
}
type chain = "Ethereum" | "Polygon"
const TokenCard = ({ token }: TokenCardProps) => {
  return (
    <div
      className={`flex flex-col items-center px-8 py-4 sm:flex-row bg-black-900 md:bg-black-800 rounded-xl`}>
      <div className='flex items-center self-start w-full gap-3 '>
        <span className='relative'>
          <Image src={token.logoURI} width={48} height={48} alt={`logo`} />
        </span>

        <div className='flex flex-col flex-1 '>
          <div className='flex gap-2'>
            <span className='text-base font-semibold tracking-wide md:text-lg'>
              {token.coinKey}
            </span>
            <Badge className={colors[token.chain as chain]} text={token.chain} />
          </div>
          <span className='text-[13px] flex w-max justify-center mt-1 md:text-base text-sm font-semibold tracking-wide capitalize text-gray-500'>
            Balance :
          </span>
        </div>

        <button className='bg-black-700 p-[10px] rounded-full md:hidden' onClick={() => { }}>
          <UilMoneyInsert className='text-white' />
        </button>
      </div>
    </div>
  );
};

export default TokenCard
