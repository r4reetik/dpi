import React from 'react';
import { usePayTC } from '../../contexts/usePaytc';
import ContentWrapper from '../wrappers/ContentWrapper';
import TokenBalanceInput from './TokenBalanceInput';
import { UilArrowLeft } from '@iconscout/react-unicons'
import { TokenType } from '../../constants/Tokens';

interface PayReviewProps {
    token: TokenType,
    onBack: () => void,
    next : () => void
}

const PayReview = ({ token, onBack,next }: PayReviewProps) => {
    const { recipient } = usePayTC();
    return (
        <div >
            <div className='px-6 py-2 flex justify-between'>
            <div className='text-xl font-extrabold'>
                Pay
            </div>
            <div onClick={onBack} className='absolute flex items-center w-8 h-8 p-1 rounded-full bg-black-900 md:p-2 md:w-10 md:h-10 sm:top-6 right-4 xs:right-6 sm:right-24'>
                <UilArrowLeft className='flex w-full h-full m-auto text-gray-400' />
            </div>
            </div>
            <div className='flex flex-col justify-around gap-10 mt-10'>
                <ContentWrapper label={"You Send"}>
                    <div className='flex flex-col gap-1'>
                        <TokenBalanceInput next={next} token={token} />
                    </div>
                </ContentWrapper>
                <ContentWrapper label={"To"}>
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-col md:min-h-[72px] bg-black-900 md:bg-black-800 rounded-xl'>
                            <div className='flex justify-between gap-4 px-2 py-4 sm:items-center sm:justify-between sm:flex-row '>
                                Recipient : {recipient}
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
                <button className="absolute text-xl -m-2  bg-primary p-4 bottom-0 w-screen max-h-[450px]">
                    Send
                </button>
            </div>
        </div>
    );
}

export default PayReview