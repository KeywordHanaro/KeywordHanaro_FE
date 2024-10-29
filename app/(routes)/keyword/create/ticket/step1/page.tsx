'use client';

import { Button } from '@/components/atoms/Button';
import LocationAgreement from '@/components/templates/createKeyword/ticket/LocationAgreement';
import { useTicket } from '@/contexts/TicketContext';
import { useRouter } from 'next/navigation';

export default function CreateTicketStep1Page() {
  const router = useRouter();
  const { isCheck, isTerms, setIsCheck, setIsTerms } = useTicket();

  const handleNext = () => {
    if (isTerms || isCheck) {
      setIsTerms(false);
      if (!isCheck) {
        setIsCheck(true);
      }
      router.push('/keyword/create/ticket/step2');
    }
  };

  return (
    <>
      <LocationAgreement
        isCheck={isCheck}
        isTerms={isTerms}
        setIsCheck={setIsCheck}
        handelTerms={() => setIsTerms(!isTerms)}
      />
      <Button
        isDisabled={isCheck || isTerms ? false : true}
        className='w-full text-[15px] text-semibold text-[#FFF] mt-[24px]'
        onClick={handleNext}
      >
        {isTerms ? '동의' : '다음'}
      </Button>
    </>
  );
}
