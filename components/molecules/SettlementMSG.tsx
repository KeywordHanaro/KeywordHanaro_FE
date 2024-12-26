import { MultiFormFinish } from '@/data/multiKeyword';
import { formatNumberWithCommas } from '@/lib/utils';

export default function MultiKeywordSettlement({
  data,
}: {
  data: MultiFormFinish;
}) {
  return (
    <div className='flex flex-col gap-[11px]'>
      <div className='flex flex-col items-center justify-center gap-[11px] flex-grow break-keep'>
        <p className='text-[18px] font-normal'>
          {data.fromAccount.accountName}로
        </p>
        <div className='text-[#069894] text-[24px] font-semibold px-[20px] text-center'>
          {data.members.map((member, idx) =>
            idx !== data.members.length - 1 ? (
              <span key={member.id} className='mr-[3px]'>
                {member.name},
              </span>
            ) : (
              <span key={member.id}>{member.name}</span>
            )
          )}
          <span className='text-black ml-[3px]'>님에게</span>
          <p className='text-[18px] text-center mt-[11px]'>
            {formatNumberWithCommas(data.amount)} 원이 요청됐어요
          </p>
        </div>
      </div>
    </div>
  );
}
