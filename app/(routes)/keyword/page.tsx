'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import AddNewKeyword from '@/components/molecules/AddNewKeyword';
import Keyword from '@/components/molecules/Keyword';
import { keywordList } from '@/data/keyword';
import { useRouter } from 'next/navigation';

export default function KeywordPage() {
  const router = useRouter();
  const onEdit = () => {
    router.push('/keyword/edit');
  };
  return (
    <div className='flex flex-col h-full'>
      <Header
        text='나의 키워드'
        actionLabel='편집'
        onBack={() => router.push('/')}
        onAction={onEdit}
      ></Header>
      <div className='flex flex-col flex-grow  overflow-y-scroll pt-[10px] px-5 pb-24 gap-2.5'>
        {/* <span className='text-center text-subGray text-[14px]'>
          키워드 순서는 꾸욱 눌러서 변경할 수 있어요
        </span> */}
        {keywordList.map((each) => (
          <Keyword key={each.id} data={each}></Keyword>
        ))}
        <AddNewKeyword></AddNewKeyword>
      </div>
      <MicRef></MicRef>
    </div>
  );
}
