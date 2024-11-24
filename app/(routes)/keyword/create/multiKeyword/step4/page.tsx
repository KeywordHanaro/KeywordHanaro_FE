'use client';

import Header from '@/components/atoms/Header';
import KeywordCompletion from '@/components/templates/KeywordCompletion';
import { useMultiKeywordForm } from '@/contexts/MultiKeywordContext';
import { keywordList } from '@/data/keyword';
import { useRouter } from 'next/navigation';

export default function Step4() {
  const { formData } = useMultiKeywordForm();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleComplete = () => {
    router.push('/keyword');
  };

  return (
    <div className='flex flex-col h-full'>
      <Header
        text='멀티 키워드 생성하기'
        onBack={handleBack}
        actionLabel='다음'
        showActionButton={false}
      />
      <KeywordCompletion onClick={handleComplete}>
        <div className='flex flex-col items-center justify-center gap-[11px]'>
          <div className='text-[18px]'>
            <span className='text-hanaPrimary'>
              {formData.keywordName + ' '}
            </span>
            멀티 키워드를 호출하면
          </div>
          <div className='text-[24px] text-hanaPrimary font-semibold'>
            {formData.keywordIdArr.map((keywordId) => {
              const data = keywordList.find((el) => el.id === keywordId);
              if (!data) return null;
              return (
                <div key={keywordId} className='pt-[11px]'>
                  {data.title}
                </div>
              );
            })}
          </div>
          <div className='text-[18px] pt-14 font-semibold'>
            {formData.keywordIdArr.length}가지 키워드가 한번에 호출돼요
          </div>
        </div>
      </KeywordCompletion>
    </div>
  );
}
