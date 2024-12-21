'use client';

import { DatePicker } from '@/components/atoms/DatePicker';
import Header from '@/components/atoms/Header';
import TransactionList from '@/components/templates/useKeyword/inquiry/TransactionList';
import { DateRange } from 'react-day-picker';
// import { InquiryList } from '@/data/inquiry';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function InquiryPage() {
  const router = useRouter();
  const [range, setRange] = useState<DateRange | undefined>();

  const handleOnBack = () => {
    router.push('/keyword');
  };

  const handleApply = () => {
    console.log('시작 날짜 : ' + range?.from + ', 끝 날짜 : ' + range?.to);
  };

  // const searchParams = useSearchParams();
  // const id = searchParams.get('id');

  // const keywordDetail = InquiryList.find(
  //   (keyword) => keyword.id === Number(id)
  // );

  const keyword = '월급';

  // 한글키워드 검색 시, 받침 유무에 따른 을/를 출력
  const hasBatchim = (word: string) => {
    const lastChar = word[word.length - 1];
    const code = lastChar.charCodeAt(0);
    if (code < 44032 || code > 55203) return false;
    return (code - 44032) % 28 !== 0;
  };

  return (
    <div className='flex flex-col h-full'>
      <Header
        text='키워드 내역 조회'
        onBack={handleOnBack}
        showActionButton={false}
      />
      <div className='flex flex-col flex-grow  overflow-y-scroll pt-[10px] px-5 pb-24 gap-2.5'>
        <h1 className='font-bold text-2xl'>
          {keyword}
          {hasBatchim(keyword) ? '을' : '를'} 기반으로
          <br />
          검색한 결과예요
        </h1>
        <div className='flex justify-between items-center'>
          <DatePicker range={range} onChange={setRange} />
          <p className='font-semibold cursor-pointer' onClick={handleApply}>
            적용
          </p>
        </div>

        <TransactionList keyword={keyword} />
      </div>
    </div>
  );
}
