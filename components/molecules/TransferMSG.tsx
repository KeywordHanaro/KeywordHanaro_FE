import { TransferResponse } from '@/types/Transfer';

export default function MultiKeywordTransfer({
  data,
}: {
  data: TransferResponse;
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-[11px]'>
      <p className='m text-[18px] font-normal'>{data.account.name}에서</p>
      <div className='flex flex-col text-center text-[24px] font-semibold'>
        <div>
          <span className='text-hanaPrimary'>
            {data.subAccount.user === data.account.user
              ? data.subAccount.name
              : `${data.subAccount.user.name}님 `}
          </span>
          <span>계좌로</span>
        </div>
        <span className='text-subGray text-[16px]'>
          {data.subAccount.accountNumber}
        </span>
      </div>
      <div className='flex flex-col text-center text-[24px] font-semibold text-hanaPrimary'>
        <p className='text-[25px]'>{data.amount} 원을</p>
        <span className='text-[18px] '> 송금했어요</span>
      </div>
    </div>
  );
}
