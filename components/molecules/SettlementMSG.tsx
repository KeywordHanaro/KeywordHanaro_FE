import { SettlementUsageResponse, UseKeywordResponse } from '@/types/Keyword';
import { formatNumberWithCommas } from '@/lib/utils';

export default function MultiKeywordSettlement({
  data,
}: {
  data: {
    keyword: SettlementUsageResponse;
    amount?: number;
  };
}) {
  return (
    <div className='flex flex-col gap-[11px]'>
      <div className='flex flex-col items-center justify-center gap-[11px] flex-grow break-keep'>
        <p className='text-[18px] font-normal'>{data.keyword.account.name}로</p>
        <div className='text-[#069894] text-[24px] font-semibold px-[20px] text-center'>
          {data.keyword.groupMember.map((member, idx) =>
            idx !== data.keyword.groupMember.length - 1 ? (
              <span key={member.tel} className='mr-[3px]'>
                {member.name},
              </span>
            ) : (
              <span key={member.tel}>{member.name}</span>
            )
          )}
          <span className='text-black ml-[3px]'>님에게</span>
          <p className='text-[18px] text-center mt-[11px]'>
            {data.amount ? data?.amount.toLocaleString() : data.keyword.amount}{' '}
            원이 요청됐어요
          </p>
        </div>
      </div>
    </div>
  );
}
