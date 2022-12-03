import React, { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Image from "next/image";
import AngleDownCircle from "../icons/AngleDownCircle";
import { toFixed } from "../../utils/misc";
import { inputToFixed } from "../../utils/misc";
import { LoadingIndicator } from "../icons/LoadingIndicator";
import TokenCard, { TokenType } from "../Token/TokenCard";
import BottomSheet from "../BottomSheets/BottomSheet";
import { Tokens } from "../../constants/Tokens";
import { usePayTC } from "../../contexts/usePaytc";
import { PageType } from "../../pages";

const tokens = [...Tokens[5], ...Tokens[80001]];

interface TokenBalanceInputProps {
  token: TokenType,
  next: () => void
}

const TokenBalanceInput = ({ token,next }: TokenBalanceInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<number | null>();
  const [showTokens, setShowTokens] = useState<boolean>(false);
  const { setSelectedToken } = usePayTC();
  const handleTokenClick = async (_token: TokenType) => {
    setSelectedToken(_token);
    next();
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    const value: string = e.target.value;
    if (value.length > 11) {
      const pointIndex = value.indexOf(".");
      if (pointIndex === -1 || (pointIndex >= 0 && value.substring(0, pointIndex).length > 11)) {
        e.preventDefault();
        return;
      }
    }
  };

  const isValidNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only a digit or a dot/point
    if (/[0-9]/.test(e.key) || e.key === ".") {
      // Check for proper number or decimal
      if (!/^\d*\.?\d*$/.test(input + e.key)) {
        e.preventDefault();
        return false;
      }
    } else {
      e.preventDefault();
      return false;
    }

    return true;
  };

  const handleArrowClick = () => {

  }


  return (
    <div className='flex flex-col md:min-h-[72px] bg-black-900 md:bg-black-800 rounded-xl'>
      <div className='flex justify-between gap-4 px-4 pt-3 pb-1 sm:items-center sm:justify-between sm:flex-row '>
        <div className='flex items-center'>
          <div className='w-10 h-10 mr-4 pointer-events-none select-none'>
            <Image
              src={token.logoURI}
              alt={`${token.symbol} logo`}
              width={40}
              height={40}
              className='object-cover object-center w-full'
            />
          </div>
          <div>
            <div className='flex items-center font-bold'>
              <span className='tracking-wide md:text-lg'>{token.symbol}</span>
              <button onClick={() => setShowTokens(true)}>
                <AngleDownCircle className='ml-2' />
              </button>
            </div>

            <p
              className={`font-semibold flex justify-center text-grey-500 text-sm tracking-wide`}>
              {`${"Balance"}: ${''
                }`}
            </p>
          </div>
        </div>
        <div className='sm:w-[216px] p-0 border-0 inline-flex flex-col relative mt-2 md:mt-0'>
          <div
            className={`py-2 relative inline-flex font-[inherit] "opacity-50"}`}>
            <input
              type='number'
              inputMode='decimal'
              ref={inputRef}
              className='peer text-left md:text-right w-full border-none outline-none select-none font-[inherit] text-sm bg-inherit font-bold hide-arrows'
              onWheel={(e) => {
                e.currentTarget.blur();
                e.stopPropagation();
              }}
              step='any'
              onChange={handleChange}
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

      <BottomSheet open={showTokens} setOpen={setShowTokens}>
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
      </BottomSheet>
    </div>
  );
};

export default TokenBalanceInput;
