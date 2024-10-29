'use client';

import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useInquiry } from '@/contexts/InquiryContext';
import { useRouter } from 'next/navigation';

export default function Step2() {
  const router = useRouter();
  const { updateFormData } = useInquiry();

  const nextStep = () => {
    router.push('/keyword/create/inquiry/step3');
  };

  return (
    <KeywordInputButton
      title='어떤 내용을 조회할까요?'
      placeHolder='조회할 내용을 작성해주세요'
      onUpdate={(inquiry) => updateFormData({ inquiry })}
      onNext={nextStep}
    >
      <h1>거래 내역에 적히는 내용으로만 조회돼요</h1>
      <h1>
        ex) 9월 급여, 10월 급여와 같이 매달 달라진다면 <br />
        공통 단어인 “급여”를 작성해주세요
      </h1>
    </KeywordInputButton>
  );
}
