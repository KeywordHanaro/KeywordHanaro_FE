import { MultiTransferFinish } from '@/data/multiKeyword';

export default function MultiKeywordTransfer({
  data,
}: {
  data: MultiTransferFinish;
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-[11px]'>
      <p className='m text-[18px] font-normal'>
        {data.accountFrom.accountName}에서
      </p>
      <div className='flex flex-col text-center text-[24px] font-semibold'>
        <div>
          <span className='text-hanaPrimary'>
            {data.accountTo.type === 'MyAccount'
              ? data.accountTo.accountName
              : `${data.accountTo.name}님 `}
          </span>
          <span>계좌로</span>
        </div>
        <span className='text-subGray text-[16px]'>
          {data.accountTo.accountNumber}
        </span>
      </div>
      <div className='flex flex-col text-center text-[24px] font-semibold text-hanaPrimary'>
        <p className='text-[25px]'>{data.amount} 원을</p>
        <span className='text-[18px] '> 송금했어요</span>
      </div>
    </div>
  );
}
