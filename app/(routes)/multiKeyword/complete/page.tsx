'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import MultiKeywordCompletion from '@/components/templates/multiKeyword/MultiKeywordCompletion';
import { useMultiKeywordResponse } from '@/contexts/MultiKeywordUseContext';
import { ticketTasks } from '@/data/ticket';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { MultiUsageResponse } from '@/types/Keyword';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MultiKeywordCompletePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id')!);
  const { response } = useMultiKeywordResponse();

  const { getKeywordById } = useKeywordApi();
  const [MultiKeyword, setMultiKeyword] = useState<MultiUsageResponse>();
  useEffect(() => {
    getKeywordById(id).then((data) => {
      if (data.type === 'MULTI') {
        const sortedKeywordList = [...(data.multiKeyword || [])].sort(
          (a, b) => (a.seqOrder || 0) - (b.seqOrder || 0)
        );
        setMultiKeyword({ ...data, multiKeyword: sortedKeywordList });
      }
    });
  }, []);
  return (
    <div className='flex flex-col h-full  gap-[24px]'>
      <Header
        text={'멀티 키워드 실행하기'}
        showActionButton={false}
        showBackButton={false}
      />
      <div className='flex flex-col gap-[24px] px-[20px]'>
        <div className='text-[24px] font-semibold'>
          키워드 실행이 완료되었어요
        </div>
        {response.map((data, idx) => (
          <div key={idx}>
            <MultiKeywordCompletion data={data} />
          </div>
        ))}
      </div>
      <div className='px-5'>
        <Button className='w-full' onClick={() => router.push('/')}>
          완료
        </Button>
      </div>
    </div>
  );
}
