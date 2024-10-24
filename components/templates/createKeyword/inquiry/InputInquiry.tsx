'use client';

import KeywordInputButton from '../../KeywordInputButton';

export default function InputInquiry() {
  return (
    <div className='flex flex-col gap-[32px]'>
      <KeywordInputButton
        placeHolder='조회할 내용을 작성해주세요'
        title='어떤 내용을 조회할까요?'
      />

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
