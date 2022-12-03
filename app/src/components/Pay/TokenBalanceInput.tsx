import React, { useRef } from "react";
import Image from "next/image";
import AngleDownCircle from "../icons/AngleDownCircle";
import { toFixed } from "../../utils/misc";
import { inputToFixed } from "../../utils/misc";
import { LoadingIndicator } from "../icons/LoadingIndicator";
import { TokenType } from "../Token/TokenCard";

interface TokenBalanceInputProps {
  balance: number;
  showTokenChange?: boolean;
  onChange: (v: string) => void;
  changeToken?: () => void;
  onMaxClick?: () => void;
  showMMBalance?: boolean;
  input?: string;
  isMax?: boolean;
  maxDecimals?: number;
  tokenFiatValue: number;
  balanceClass?: string;
  maxBtnClass?: string;
  token: TokenType;
  showFiat: boolean;
  addressTokenBalance: number;
  isDeposit?: boolean;
  gas?: number;
  disabled?: boolean;
  loading?: boolean;
}

const TokenBalanceInput = ({
  showTokenChange = true,
  changeToken,
  balance,
  token,
  input,
  maxDecimals = 6,
  showMMBalance = false,
  onChange,
  isMax,
  tokenFiatValue,
  balanceClass: balanceClassName = "",
  maxBtnClass = "",
  onMaxClick,
  disabled = false,
  loading = false,
}: TokenBalanceInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const fiatAmount = Number(input) * tokenFiatValue;
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

    if (maxDecimals) {
      const pointIndex = value.indexOf(".");
      if (pointIndex >= 0 && value.substring(pointIndex + 1).length > maxDecimals) {
        e.preventDefault();
        return;
      }
    }

    onChange(value);
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

  const handleFocus = () => input === "0" && onChange("");
  const handlePaste = (e: any) => e.preventDefault();

  return (
    <div className='flex flex-col md:min-h-[72px] bg-black-900 md:bg-black-800 rounded-xl'>
      <div className='flex flex-col px-4 pt-3 pb-1 sm:items-center sm:justify-between sm:flex-row '>
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
              {showTokenChange && (
                <button onClick={changeToken}>
                  <AngleDownCircle className='ml-2' />
                </button>
              )}
            </div>

            <p
              className={`font-semibold flex justify-center text-grey-500 text-sm tracking-wide ${balanceClassName}`}>
              {showMMBalance && `${"Balance"}: ${
                    !isNaN(balance) ? toFixed(balance) : 'Loading...'
                  }`}
            </p>
          </div>
        </div>
        <div className='sm:w-[216px] p-0 border-0 inline-flex flex-col relative mt-2 md:mt-0'>
          <div
            className={`py-2 relative inline-flex font-[inherit] ${loading ? "opacity-50" : ""}`}>
            <input
              type='number'
              inputMode='decimal'
              ref={inputRef}
              className='peer text-left md:text-right w-full border-none outline-none select-none font-[inherit] text-current bg-inherit font-bold hide-arrows'
              value={inputToFixed(input ?? "")}
              onWheel={(e) => {
                e.currentTarget.blur();
                e.stopPropagation();
              }}
              step='any'
              onChange={handleChange}
              onKeyPress={isValidNumber}
              onPaste={handlePaste}
              onFocus={handleFocus}
              disabled={isNaN(balance) || disabled}
              min={0}
              placeholder={isNaN(balance) ? `${"Fetching values" + "..."}` : ""}
            />
            {loading ? (
              <div>
                <LoadingIndicator />
              </div>
            ) : null}
            <fieldset
              aria-hidden='true'
              className='absolute inset-0 px-2 py-0 m-0 overflow-hidden transition-colors border-b-2 border-solid rounded-sm pointer-events-none border-b-black-600 peer-focus:border-b-primary'></fieldset>
            {onMaxClick && (
              <div className='flex items-center justify-center ml-2 '>
                <button
                  disabled={isNaN(balance)}
                  className={`ml-2 text-xs tracking-wide bg-black-900 rounded-md border-solid border-2 px-1 font-semibold ${
                    isMax || isNaN(balance)
                      ? "text-black-600 cursor-default border-black-600"
                      : "border-primary text-primary"
                  } ${maxBtnClass}`}
                  onClick={onMaxClick}>
                  MAX
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {fiatAmount !== 0 ? (
        <span className='self-end mb-2 mr-4 text-sm font-semibold text-[#c3c3c4] '>
          {`~ $${fiatAmount.toFixed(2)}`}
        </span>
      ) : (
        <div className='mb-2' />
      )}
    </div>
  );
};

export default TokenBalanceInput;
