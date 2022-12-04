import React, { Dispatch, SetStateAction } from "react";
import TokenCard from "../Token/TokenCard";

import { UilHistory, UilQrcodeScan, UilArrowUpRight } from "@iconscout/react-unicons";
import { TokenType } from "../../constants/Tokens";
import { usePayTC } from "../../contexts/usePaytc";
import { PageType } from "../../pages";

const Pay = ({
  next,
  setPage,
}: {
  next: () => void;
  setPage: Dispatch<SetStateAction<PageType>>;
}) => {
  const { setSelectedToken, tokens, swAddress } = usePayTC();
  const handleTokenClick = async (_token: TokenType) => {
    setSelectedToken(_token);
    setPage("btcDeposit");
    next();
  };

  return (
    <div className='flex flex-col w-full gap-y-1'>
      <div className='flex mt-4 text-center justify-around items-center rounded-2xl md:min-w-[448px] py-8 text-white bg-black-800'>
        <div
          onClick={() => setPage("amountRecipient")}
          className='flex flex-col items-center justify-start'>
          <div className='flex items-center justify-center w-16 h-16 font-semibold rounded-full bg-primary'>
            <UilArrowUpRight />
          </div>
          <div className='mt-1'>Send</div>
        </div>
        <div
          onClick={() => setPage("inputRecipient")}
          className='flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center w-16 h-16 font-semibold rounded-full bg-primary'>
            <UilQrcodeScan />
          </div>
          <div className='mt-1'>Scan & Pay</div>
        </div>
        <div
          onClick={() => setPage("history")}
          className='flex flex-col items-center justify-start'>
          <div className='flex items-center justify-center w-16 h-16 font-semibold rounded-full bg-primary'>
            <UilHistory />
          </div>
          <div className='mt-1'>History</div>
        </div>
      </div>
      <p className='my-2'>
        Send funds at <span className='text-sm'>{swAddress}</span> to have them show up here
      </p>
      <div className='flex flex-col items-center justify-between mt-4 text-white align-middle rounded-2xl bg-black-800'>
        <div className='my-1 px-0.5 py-1 mr-auto ml-2 text-sm font-semibold tracking-wide capitalize text-gray-500'>
          Your Assets
        </div>
        <div className='w-full p-2'>
          <div className='flex flex-col gap-0.5 mb-2 justify-start'>
            <>
              <TokenCard
                key={"gfhvjbkn"}
                token={{
                  decimals: 8,
                  domainId: "1",
                  symbol: "BTC",
                  address: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
                  chain: "Ethereum",
                  chainId: 5,
                  priceUSD: 16976,
                  image:
                    "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Bitcoin-BTC-icon.png",
                }}
                onClick={() =>
                  handleTokenClick({
                    decimals: 8,
                    domainId: "1",
                    symbol: "BTC",
                    address: "0x880Ad65DC5B3F33123382416351Eef98B4aAd7F1",
                    chain: "Ethereum",
                    chainId: 5,
                    priceUSD: 16976,
                    image:
                      "https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Bitcoin-BTC-icon.png",
                  })
                }
              />
            </>
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
