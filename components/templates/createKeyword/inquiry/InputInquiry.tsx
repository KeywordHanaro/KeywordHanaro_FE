'use client';

import { KeywordInputRef } from '@/components/atoms/Inputs';

export default function InputInquiry() {
  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className='font-extrabold text-2xl'>어떤 내용을 조회할까요?</h1>
      <div className='flex flex-col items-center mt-[50px]'>
        <KeywordInputRef
          placeHolder='조회할 내용을 작성해주세요'
          classNames='text-hanaPrimary'
        />
      </div>
      <div className='flex flex-col gap-6 text-center font-'>
        <h1>거래 내역에 적히는 내용으로만 조회돼요</h1>
        <h1>
          ex) 9월 급여, 10월 급여와 같이 매달 달라진다면 공통 단어인 “급여”를
          작성해주세요
        </h1>
      </div>
    </div>
  );
}
