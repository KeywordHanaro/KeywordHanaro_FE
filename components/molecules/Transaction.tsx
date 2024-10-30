'use client';

import { Transaction } from '@/data/transaction';
import { formatTime } from '@/lib/utils';
import { BankLogoImg } from '../atoms/BankLogoImg';

type TransactionHistoryProps = {
  data: Transaction;
};

export const TransactionHistory = ({
  data: { accountInfo, dateTime, amount, balance },
}: TransactionHistoryProps) => {
  return (
    <div className='bg-White  text-hanaPrimary py-[24px]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <BankLogoImg bankId={+accountInfo.bankId} />
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
