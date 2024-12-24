'use client';

import { DatePicker } from '@/components/atoms/DatePicker';
import Header from '@/components/atoms/Header';
import TransactionList from '@/components/templates/useKeyword/inquiry/TransactionList';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { Transaction } from '@/types/Keyword';
import { DateRange } from 'react-day-picker';
// import { InquiryList } from '@/data/inquiry';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InquiryPage() {
  const router = useRouter();
  const { getKeywordById } = useKeywordApi();
  const searchParams = useSearchParams();
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      getKeywordById(parseInt(id))
        .then((res) => {
          console.log(res);
          setTransactionList(res.transactions);
        })
        .catch((error) => {
          console.error('Failed to fetch keyword:', error);
        });
    }
  }, [searchParams]);

  const defaultStartDate = new Date();
  defaultStartDate.setMonth(defaultStartDate.getMonth() - 3);
  const defaultEndDate = new Date();

  const [range, setRange] = useState<DateRange | undefined>({
    from: defaultStartDate,
    to: defaultEndDate,
  });

  const handleOnBack = () => {
    router.push('/keyword');
  };

  const handleApply = () => {
    console.log('시작 날짜 : ' + range?.from + ', 끝 날짜 : ' + range?.to);
  };

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
        {/* {transactionList.length > 0 && (
          <TransactionList keyword={keyword} tranactions={transactionList} />
        )} */}
        <TransactionList keyword={keyword} tranactions={transactionList} />
      </div>
    </div>
  );
}
