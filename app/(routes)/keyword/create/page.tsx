'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import KeywordCategory from '@/components/molecules/KeywordCategory';

const headerText = '키워드 생성하기';

export default function KeywordCreatePage() {
  return (
    <div className='h-screen relative'>
      <Header text={headerText} showActionButton={false} />

      <div className='px-[20px] '>
        <div className='font-semibold text-[24px] my-[24px] mr-[70px] leading-[31px] w-[300px]'>
          생성할 키워드 카테고리를 선택해주세요
        </div>
        <KeywordCategory />
      </div>

      <MicRef />
    </div>
  );
}
