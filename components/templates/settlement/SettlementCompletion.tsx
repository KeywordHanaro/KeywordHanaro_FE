'use client';

import { Button } from '@/components/atoms/Button';
import { FormData } from '@/data/settlement';
import { useRouter } from 'next/navigation';

export default function SettlementCompletion({
  formData,
}: {
  formData: FormData;
}) {
  const router = useRouter();

  const handleSubmit = () => {
    console.log('데이터 제출됨', formData.members, formData.amount);
    router.push('/');
  };

  return (
    <div className='w-full h-full flex flex-col gap-[30px] pt-[69px] pb-[34px] justify-between  px-[20px]'>
      <div className='flex flex-col gap-[11px]'>
        <p className='text-[24px] font-semibold text-center mb-[61.5px]'>
          {formData.category === 'Settlement' ? '정산' : '회비'} 요청이
          완료되었어요
        </p>

        <div className='flex flex-col items-center justify-center gap-[11px] flex-grow break-keep'>
          <p className='text-[18px] font-normal'>
            {formData.account.accountName}로
          </p>
          <div className='text-[#069894] text-[24px] font-semibold px-[20px] text-center'>
            {formData.members.map((member, idx) =>
              idx !== formData.members.length - 1 ? (
                <span key={member.id} className='mr-[3px]'>
                  {member.name},
                </span>
              ) : (
                <span key={member.id}>{member.name}</span>
              )
            )}
            <span className='text-black ml-[3px]'>님에게</span>
            <p className='text-[18px] text-center mt-[11px]'>
              {formData.amount} 원이 요청됐어요
            </p>
          </div>
        </div>
      </div>
      <Button className='w-full ' onClick={handleSubmit}>
        완료
      </Button>
    </div>
  );
}
