'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
// import MultiKeywordCompletion from '@/components/templates/multiKeyword/MultiKeywordCompletion';
import { useRouter } from 'next/navigation';

export default function MultiKeywordCompletePage() {
  const router = useRouter();

  return (
    <div className='flex flex-col h-full p-[20px] gap-[24px]'>
      <Header
        text={'멀티 키워드 실행하기'}
        showActionButton={false}
        showBackButton={false}
      />
      <div className='flex flex-col gap-[24px] px-[20px]'>
        <div className='text-[24px] font-semibold'>
          키워드 실행이 완료되었어요
        </div>

        {/* {multiKeywordFinishData.map((data, idx) => (
          <div key={idx}>
            <MultiKeywordCompletion data={data} />
          </div>
        ))} */}
      </div>

      <Button className='w-full' onClick={() => router.push('/')}>
        완료
      </Button>
    </div>
  );
}
