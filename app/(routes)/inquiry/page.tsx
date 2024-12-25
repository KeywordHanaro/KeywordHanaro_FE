'use client';

import { DatePicker } from '@/components/atoms/DatePicker';
import Header from '@/components/atoms/Header';
import TransactionList from '@/components/templates/useKeyword/inquiry/TransactionList';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { InquiryUsageResponse, Transaction } from '@/types/Keyword';
import { DateRange } from 'react-day-picker';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InquiryPage() {
  const router = useRouter();
  const { getKeywordById } = useKeywordApi();
  const { showMyTransactions } = useAccountApi();
  const searchParams = useSearchParams();
  const [inquiryKeyword, setInquiryKeyword] = useState<InquiryUsageResponse>();
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      getKeywordById(parseInt(id))
        .then((res) => {
          console.log(res);
          setInquiryKeyword(res as InquiryUsageResponse);
          setTransactionList((res as InquiryUsageResponse).transactions);
        })
        .catch((error) => {
          console.error('거래 내역 가져오기 실패:', error);
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

  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleApply = () => {
    const fromDate = formatDate(range?.from);
    const toDate = formatDate(range?.to);
    if (inquiryKeyword) {
      showMyTransactions(
        parseInt(inquiryKeyword.account.id.toString()),
        fromDate,
        toDate,
        'all',
        'latest',
        inquiryKeyword?.inquiryWord
      )
        .then((res) => {
          console.log(res);
          setTransactionList(res);
        })
        .catch((error) => {
          console.error('거래 내역 가져오기 실패:', error);
        });
    }
  };

  // 한글키워드 검색 시, 받침 유무에 따른 을/를 출력
  const hasBatchim = (word: string) => {
    if (!word) return false;
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
          {inquiryKeyword?.inquiryWord}
          {hasBatchim(inquiryKeyword?.inquiryWord || '') ? '을' : '를'} 기반으로
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
        <TransactionList
          keyword={inquiryKeyword?.inquiryWord || ''}
          tranactions={transactionList}
        />
      </div>
    </div>
  );
}
