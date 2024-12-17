'use client';

import Header from '@/components/atoms/Header';
import { KeywordInputRef } from '@/components/atoms/Inputs';
import { useRouter } from 'next/navigation';

export default function EditMultiKeywordPage() {
  const router = useRouter();

  const onComplete = () => {
    router.push('/keyword');
  };

  return (
    <>
      <Header
        text='멀티키워드 수정하기'
        actionLabel='완료'
        onBack={() => router.push('/keyword')}
        onAction={onComplete}
      />
      <div className='flex flex-col h-full p-[20px] gap-[24px]'>
        <div className='flex flex-col'>
          <p className='font-semibold text-[24px]'>키워드의 이름을</p>
          <p className='font-semibold text-[24px]'>설정해주세요</p>
        </div>
        <KeywordInputRef
          className='text-hanaPrimary w-full'
          placeHolder='키워드 이름을 작성해주세요'
        />
      </div>
    </>
  );
}
