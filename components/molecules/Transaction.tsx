'use client';

import { bankList } from '@/data/bank';
import { Transaction } from '@/data/transaction';
import Image from 'next/image';
import { formatTime } from '@/lib/utils';

type TransactionHistoryProps = {
  data: Transaction;
};

export const TransactionHistory = ({
  data: { accountInfo, dateTime, amount, balance },
}: TransactionHistoryProps) => {
  const bankImage = bankList.find((i) => i.id === accountInfo.bankId)?.image;

  return (
    <div className='bg-White  text-hanaPrimary py-[24px]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {bankImage ? (
            <Image
              src={bankImage}
              alt={accountInfo.accountNumber}
              className='rounded-full aspect-square object-contain '
              width={40}
              height={40}
              sizes='w-[40px] h-[40px]'
            />
          ) : (
            <span className='w-11 h-11 rounded-full bg-slate-200 '></span>
          )}
          <div>
            <div className='text-[15px] font-medium'>
              {accountInfo.accountName}
            </div>
            <p className='text-[14px] text-iconGray'>
              {formatTime(new Date(dateTime))}
            </p>
          </div>
        </div>
        <div className=' text-iconGray text-right '>
          <p
            className={`font-bold text-[15px] ${
              amount < 0 ? 'text-fontBlack' : 'text-hanaPrimary'
            }`}
          >
            {amount < 0
              ? `- ${Math.abs(amount).toLocaleString()}원`
              : `${amount.toLocaleString()}원`}
          </p>
          <p>{balance.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
