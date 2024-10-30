'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import TransactionList from '@/components/templates/useKeyword/inquiry/TransactionList';
import { useRouter } from 'next/navigation';

export default function InquiryPage() {
  const router = useRouter();

  const handleOnBack = () => {
    router.push('/keyword');
  };

  return (
    <div className='flex flex-col h-full'>
      <Header
        text='키워드 내역 조회'
        onBack={handleOnBack}
        showActionButton={false}
      />
      <div className='flex flex-col flex-grow  overflow-y-scroll pt-[10px] px-5 pb-24 gap-2.5'>
        <TransactionList />
      </div>
      <MicRef />
    </div>
  );
}
