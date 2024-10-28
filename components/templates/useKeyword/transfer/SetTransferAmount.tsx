import { MoneyInputRef } from '@/components/atoms/Inputs';
import { TransferProps } from '@/data/transfer';
import { forwardRef } from 'react';
import { formatNumberWithCommas } from '@/lib/utils';

type SetTransferAmountProps = {
  data: TransferProps;
};

const SetTransferAmount = forwardRef<HTMLInputElement, SetTransferAmountProps>(
  ({ data }, ref) => {
    return (
      <div className='flex flex-col w-full  px-[20px] py-[24px] gap-6'>
        <div>
          <div className='text-[24px] font-semibold'>
            내 {data.fromAccount.accountName} 계좌에서
          </div>
          <div className='text-[12px] font-semibold'>
            잔액 {data.fromAccount.balance.toLocaleString()}원
          </div>
        </div>

        <div>
          <div className='text-[24px] font-semibold'>
            {data.toAccount.type === 'MyAccount'
              ? data.toAccount.accountName + ' '
              : data.toAccount.name + '님 '}
            계좌로
          </div>
          <div className='text-[12px] font-semibold'>
            {data.toAccount.accountNumber}
          </div>
        </div>
        {data.type === 'WithoutAmount' ? ( //amount가 존재하는 데이터는 amount를 가져온다
          <MoneyInputRef ref={ref} placeHolder='얼마를 요청할까요?' />
        ) : (
          //withAmount는 input 비활성화
          <div className='text-hanaPrimary font-semibold h-[32px] text-[24px] flex items-center'>
            <div>
              {data.type === 'WithAmount' &&
                `${formatNumberWithCommas(String(data.amount))}원`}
            </div>
          </div>
        )}
      </div>
    );
  }
);
SetTransferAmount.displayName = 'SetTransferAmount';
export default SetTransferAmount;
