'use client';

import { Button } from '@/components/atoms/Button';
import LocationAgreement from '@/components/templates/createKeyword/ticket/LocationAgreement';
import { useTicket } from '@/contexts/TicketContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CreateTicketStep1Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const { isCheck, isTerms, setIsCheck, setIsTerms } = useTicket();

  console.log('session', session?.user);

  useEffect(() => {
    if (session?.user?.permission === '1') {
      // console.log('Permission 있어서 통과');
      router.push('/keyword/create/ticket/step2');
    }
  }, [session, router]);

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
