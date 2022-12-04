import React from 'react';
import { usePayTC } from '../../contexts/usePaytc';
import TransactionCard from './TransactionCard';
import { UilArrowLeft } from '@iconscout/react-unicons'
import {sTransactions} from "../../constants/testTransactions"
export interface transactionType{
    timestamp: string;
    status: string;
    type: string;
    value: number;
    displayAddress: string;
    token: string;
    chain: string;
    decimals: number;
    image: string;
    amount:number
}

const History = ({ onBack }: { onBack: () => void }) => {
    // const { transactions } = usePayTC();
    return (
        <div className='flex flex-col gap-1 mx-2 h-full'>
            <div className='flex justify-between mx-3'>
                <button className='my-2 flex align-middle text-lg text-gray-500' onClick={onBack}>
                    <UilArrowLeft />
                    <span className='-mt-1 font-semibold tracking-wide capitalize'>History</span>
                </button>
            </div>
            {sTransactions && sTransactions.map((transaction: transactionType) => <TransactionCard key={transaction.timestamp} transaction={transaction} />
            )}
        </div>
    )
}

export default History