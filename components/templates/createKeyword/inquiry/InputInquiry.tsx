'use client';

import { Button } from '@/components/atoms/Button';
import { KeywordInputRef } from '@/components/atoms/Inputs';

export default function InputInquiry() {
  return (
    <div className='flex flex-col gap-[32px]'>
      <h1 className='font-extrabold text-2xl mb-[50px]'>
        어떤 내용을 조회할까요?
      </h1>
      <div className='flex flex-col items-center mt-[10px]'>
        <KeywordInputRef
          placeHolder='조회할 내용을 작성해주세요'
          className='text-hanaPrimary'
        />
      </div>
      <div className='mx-[10px] flex items-center'>
        <Button size='lg' isDisabled={true}>
          완료
        </Button>
      </div>
      <div className='flex flex-col gap-5 text-center font-semibold text-[14px]'>
        <h1>거래 내역에 적히는 내용으로만 조회돼요</h1>
        <h1>
          ex) 9월 급여, 10월 급여와 같이 매달 달라진다면 <br />
          공통 단어인 “급여”를 작성해주세요
        </h1>
      </div>
    </div>
  );
}
