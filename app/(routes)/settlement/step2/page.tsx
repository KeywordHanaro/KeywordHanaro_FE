'use client';

import { Button } from '@/components/atoms/Button';
import SettlementMSG from '@/components/molecules/SettlementMSG';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useRouter } from 'next/navigation';

export default function SettlementUsageStep2() {
  const { formData, response } = useSettlementContext();
  const router = useRouter();
  console.log(response);
  const handleSubmit = () => {
    // console.log('데이터 제출됨', formData.members, formData.amount);
    router.push('/');
  };

  return (
    <div className='w-full h-full flex flex-col gap-[30px] pt-[69px] pb-[34px] justify-between  px-[20px]'>
      <div className='w-full flex flex-col gap-[30px]'>
        <p className='text-[24px] font-semibold text-center mb-[61.5px]'>
          {formData.category === 'Settlement' ? '정산' : '회비'} 요청이
          완료되었어요
        </p>
        <SettlementMSG
          data={{
            keyword: response,
            amount: Number(formData.amount),
            members: formData.members,
          }}
        />
      </div>

      <Button className='w-full ' onClick={handleSubmit}>
        완료
      </Button>
    </div>
  );
}
