'use client';

// import { Transaction } from '@/data/transaction';
import { Transaction } from '@/types/Keyword';
import { formatTime } from '@/lib/utils';
import { BankLogoImg } from '../atoms/BankLogoImg';

type TransactionHistoryProps = {
  data: Transaction;
};

export const TransactionHistory = ({
  // data: { accountInfo, dateTime, amount, balance },
  data,
}: TransactionHistoryProps) => {
  return (
    <div className='bg-White  text-hanaPrimary py-[24px]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <BankLogoImg bankId={+data.subAccount.bank.id} />
          <div>
            <div className='text-[15px] font-medium'>
              {data.subAccount.name}
            </div>
            <p className='text-[14px] text-iconGray'>
              {formatTime(new Date(data.createAt))}
            </p>
          </div>
        </div>
        <div className=' text-iconGray text-right '>
          <p
            className={`font-bold text-[15px] ${
              data.amount < 0 ? 'text-fontBlack' : 'text-hanaPrimary'
            }`}
          >
            {data.amount < 0
              ? `- ${Math.abs(data.amount).toLocaleString()}원`
              : `${data.amount.toLocaleString()}원`}
          </p>
          <p>{data.afterBalance.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
