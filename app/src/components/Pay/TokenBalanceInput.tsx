import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import AngleDownCircle from "../icons/AngleDownCircle";
import { toFixed } from "../../utils/misc";
import { inputToFixed } from "../../utils/misc";
import { LoadingIndicator } from "../icons/LoadingIndicator";
import TokenCard from "../Token/TokenCard";
import BottomSheet from "../BottomSheets/BottomSheet";
import { Tokens, TokenType } from "../../constants/Tokens";
import { usePayTC } from "../../contexts/usePaytc";
import { PageType } from "../../pages";
import BigNumber from "bignumber.js";

interface TokenBalanceInputProps {
  token: TokenType,
  next: () => void
}

const TokenBalanceInput = ({ token,next }: TokenBalanceInputProps) => {
  const { tokens, setSelectedToken, setAmount, selectedToken } = usePayTC();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputChangeRef = useRef<any>(null);

  const [input, setInput] = useState<string>("");
  const [showTokensBottomSheet, setShowTokensBottomSheet] = useState(false);

  useEffect(() => {
    inputChangeRef.current = setTimeout(() => {
      setAmount(new BigNumber(input).shiftedBy(selectedToken!.decimals).toString());
    }, 700);

    return () => {
      clearTimeout(inputChangeRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <div className='flex flex-col md:min-h-[72px] bg-black-900 md:bg-black-800 rounded-xl'>
      <div className='flex justify-between gap-4 px-4 pt-3 pb-1 sm:items-center sm:justify-between sm:flex-row '>
        <div className='flex items-center'>
          <div className='w-10 h-10 mr-4 pointer-events-none select-none'>
            <Image
              src={token.image}
              alt={`${token.symbol} logo`}
              width={40}
              height={40}
              className='object-cover object-center w-full'
            />
          </div>
          <div className=''>
            <div className='flex items-center font-bold'>
              <span className='tracking-wide md:text-lg'>{token.symbol}</span>
              <button
                onClick={() => {
                  setShowTokensBottomSheet(true);
                }}>
                <AngleDownCircle className='ml-2' />
              </button>
            </div>

            <p className={`font-semibold flex self-start text-grey-500 text-sm tracking-wide`}>
              {`${"Balance"}: ${new BigNumber(selectedToken?.balance ?? 0)
                .shiftedBy(-selectedToken!.decimals)
                .toFixed(4)}`}
            </p>
          </div>
        </div>
        <div className='sm:w-[216px] p-0 border-0 inline-flex flex-col relative mt-2 md:mt-0'>
          <div className={`py-2 relative inline-flex font-[inherit] "opacity-50"}`}>
            <input
              type='number'
              inputMode='decimal'
              value={input}
              ref={inputRef}
              className='peer text-left md:text-right w-full border-none outline-none select-none font-[inherit] text-sm bg-inherit font-bold hide-arrows'
              onWheel={(e) => {
                e.currentTarget.blur();
                e.stopPropagation();
              }}
              step='any'
              onChange={(e) => setInput(e.target.value)}
              min={0}
              placeholder={`Enter Amount here`}
            />
            {/* <div>
                <LoadingIndicator />
              </div> */}
            <fieldset
              aria-hidden='true'
              className='absolute inset-0 px-2 py-0 m-0 overflow-hidden transition-colors border-b-2 border-solid rounded-sm pointer-events-none border-b-black-600 peer-focus:border-b-primary'></fieldset>
          </div>
        </div>
      </div>
      {/* {fiatAmount !== 0 ? (
        <span className='self-end mb-2 mr-4 text-sm font-semibold text-[#c3c3c4] '>
          {`~ $${fiatAmount.toFixed(2)}`}
        </span> */}
      {/* ) : ( */}
      <div className='mb-2' />
      {showTokensBottomSheet && (
        <BottomSheet title='Select tokens' open setOpen={setShowTokensBottomSheet}>
          <div className='flex flex-col gap-1 pt-6'>
            {Object.values(tokens).map((_t) => {
              return (
                <TokenCard
                  key={_t.address}
                  token={_t}
                  onClick={() => {
                    setSelectedToken(_t);
                    setShowTokensBottomSheet(false);
                  }}
                />
              );
            })}
          </div>
        </BottomSheet>
      )}
    </div>
  );
};

export default TokenBalanceInput;
