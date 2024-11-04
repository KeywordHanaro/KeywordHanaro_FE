// 'use client';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import Header from '../atoms/Header';

export default function SettlementUsageLayout({ children }: PropsWithChildren) {
  const { formData } = useSettlementContext();
  const pathname = usePathname();
  const router = useRouter();
  const path = pathname.split('/step')[1];

  // const keyword = KeywordDetailList.find((item) => item.id === Number(id));

  const handleSubmit = () => {
    console.log(formData.amount, 'top');

    if (formData.amount === '' || formData.amount === '0') {
      console.log(formData.amount);
      alert('유효한 금액을 입력해주세요');
      return;
    }

    router.push('/settlement/step2');
  };

  return (
    <div className='w-full h-full relative flex flex-col'>
      <Header
        text={'키워드 정산'}
        showActionButton={
          path === '1' && formData.members.length > 0 ? true : false
        }
        actionLabel={path === '1' ? '다음' : ''}
        onAction={path === '1' ? handleSubmit : undefined}
        showBackButton={path === '2' ? false : true}
      />
      {children}
    </div>
  );
}
