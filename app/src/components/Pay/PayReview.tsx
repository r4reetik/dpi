import React from 'react';
import { TokenType } from '../Token/TokenCard';
import ContentWrapper from '../wrappers/ContentWrapper';
import TokenBalanceInput from './TokenBalanceInput';

interface PayReviewProps {
    token : TokenType
}

const PayReview = ({token}:PayReviewProps) => {
    return (
        <div className='w-full mt-10'>
          <ContentWrapper label={"You Send"}>
          <div className='flex flex-col gap-1'>
            <TokenBalanceInput token = {token}/>
          </div>
        </ContentWrapper>
        </div>
    );
}

export default PayReview