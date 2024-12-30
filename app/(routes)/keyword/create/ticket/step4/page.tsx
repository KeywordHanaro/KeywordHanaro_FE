'use client';

import KeywordCompletion from '@/components/templates/KeywordCompletion';
import { useTicket } from '@/contexts/TicketContext';
import { useRouter } from 'next/navigation';

export default function CreateTicketStep4Page() {
  const { selectedBranch, keywordName } = useTicket();
  const router = useRouter();

  const handleComplete = () => {
    router.push('/');
  };

  return (
    <KeywordCompletion onClick={handleComplete}>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex font-medium text-[18px] gap-[2px]'>
          <p className='text-[#069894]'>{keywordName}</p>
          <p>키워드로</p>
        </div>
        <div className='flex font-semibold text-[24px] gap-[2px] mt-[11px]'>
          <p className='text-[#069894]'>{selectedBranch?.placeName}</p>
          <p>에서</p>
        </div>
        <p className='font-semibold text-[24px]'>모바일 번호표가 발급돼요</p>
      </div>
    </KeywordCompletion>
  );
}
