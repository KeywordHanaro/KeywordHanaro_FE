'use client';

import Header from '@/components/atoms/Header';
import AddNewKeyword from '@/components/molecules/AddNewKeyword';
import EditKeyword from '@/components/molecules/EditKeyword';
import Keyword from '@/components/molecules/Keyword';
import { TicketKeyword } from '@/data/keyword';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function KeywordPage() {
  const router = useRouter();
  const [actionLabel, setActionLabel] = useState('편집');

  const tempData = [
    {
      id: 1,
      type: 'transfer' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '성엽이 용돈',
      description: '정성엽 > 5만원',
      isFavorite: true,
    },
    {
      id: 2,
      type: 'inquiry' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '월급 확인',
      description: '조회 > 급여',
      isFavorite: true,
    },
    {
      id: 3,
      type: 'ticket' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '번호표',
      description: '번호표 > 성수역점',
      isFavorite: false,
    },
    {
      id: 4,
      type: 'settlement' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '월세내줘',
      description: '송금 > 집주인 > 50만원',
      isFavorite: true,
    },
    {
      id: 5,
      type: 'transfer' as 'transfer' | 'inquiry' | 'ticket' | 'settlement',
      title: '아빠 용돈',
      description: '송금 > 박준용 > 금액 미정',
      isFavorite: true,
    },
  ];

  const tempData2: TicketKeyword[] = [
    {
      id: 1,
      title: 'aa',
      type: 'ticket' as const,
      bankName: '하나',
    },
    {
      id: 2,
      title: 'aa',
      type: 'ticket' as const,
      bankName: '하나',
    },
    {
      id: 3,
      title: 'aa',
      type: 'ticket' as const,
      bankName: '하나',
    },
    {
      id: 4,
      title: 'aa',
      type: 'ticket' as const,
      bankName: '하나',
    },
    {
      id: 5,
      title: 'aa',
      type: 'ticket' as const,
      bankName: '하나',
    },
  ];

  const handleOnBack = () => {
    router.back();
  };

  const handleOnAction = () => {
    if (actionLabel === '편집') {
      setActionLabel('완료');
      // 추가 로직
    } else {
      setActionLabel('편집');
      // 추가 로직
    }
  };

  return (
    <div>
      <Header
        text='나의 키워드'
        onBack={handleOnBack}
        actionLabel={actionLabel}
        onAction={handleOnAction}
      />
      <div className='flex flex-col gap-[10px] px-[20px] mt-[10px]'>
        {actionLabel === '편집' ? (
          <>
            <p className='text-center text-lightGray text-[14px]'>
              키워드 순서는 꾸욱 눌러서 이동할 수 있어요
            </p>
            {tempData.map((data) => (
              <Keyword key={data.id} data={data} />
            ))}
          </>
        ) : (
          <>
            {tempData2.map((data) => (
              <EditKeyword key={data.id} data={data} />
            ))}
          </>
        )}
        <AddNewKeyword />
      </div>
    </div>
  );
}
