'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import AddNewKeyword from '@/components/molecules/AddNewKeyword';
import EditKeyword from '@/components/molecules/EditKeyword';
import { KeywordDetailList } from '@/data/keyword';
import { useRouter } from 'next/navigation';

export default function EditKeywordPage() {
  const router = useRouter();
  const onComplete = () => {
    router.push('/keyword');
  };
  const onEditKeyword = (id: number) => {
    alert(`edit ${id}`);
  };
  const onDeleteKeyword = (id: number) => {
    alert(`delete ${id}`);
  };
  return (
    <div className='flex flex-col h-full'>
      <Header
        text='나의 키워드'
        actionLabel='완료'
        onBack={() => router.push('/keyword')}
        onAction={onComplete}
      ></Header>
      <div className='flex flex-col flex-grow  overflow-y-scroll pt-[10px] px-5 pb-24 gap-2.5'>
        {KeywordDetailList.map((each) => (
          <EditKeyword
            key={each.id}
            data={each}
            onEdit={onEditKeyword}
            onDelete={onDeleteKeyword}
          ></EditKeyword>
        ))}
        <AddNewKeyword></AddNewKeyword>
      </div>
      <MicRef></MicRef>
    </div>
  );
}