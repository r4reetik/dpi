// import { Transaction } from 'firebase/firestore/lite';
import React from 'react';
import { usePayTC } from '../../contexts/usePaytc';
import TransactionCard from './TransactionCard';
import { UilArrowLeft } from '@iconscout/react-unicons'
// import {transactions} from "../../constants/testTransactions"

const History = ({ onBack }: { onBack: () => void }) => {
    const { transactions } = usePayTC();
    console.log('transactions: ', transactions);
    return (
        <div className='flex flex-col gap-1 mx-2 h-full'>
            <div className='flex justify-between mx-3'>
                <button className='my-2 flex align-middle text-lg text-gray-500' onClick={onBack}>
                    <UilArrowLeft />
                    <span className='-mt-1 font-semibold tracking-wide capitalize'>History</span>
                </button>
            </div>
            {/* {transactions && transactions.map((transaction : any)=>{ */}
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            <TransactionCard />
            {/* })} */}
        </div>
    )
}

export default History