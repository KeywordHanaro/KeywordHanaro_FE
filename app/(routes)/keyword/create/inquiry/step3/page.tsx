'use client';

import SpeechToText from '@/components/SpeechToText';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useInquiry } from '@/contexts/InquiryContext';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { useRouter } from 'next/navigation';

export default function Step3() {
  const router = useRouter();
  const { formData, updateFormData } = useInquiry();

  const { createKeyword } = useKeywordApi();

  const handleComplete = async () => {
    console.log(formData);
    await createKeyword({
      type: 'INQUIRY',
      name: formData.keywordName,
      account: { id: formData.account.accountId },
      inquiryWord: formData.inquiry,
      desc: formData.account.accountName + '에서 조회 > ' + formData.inquiry,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const nextStep = () => {
    handleComplete();
    router.push('/keyword/create/inquiry/step4');
  };

  return (
    <>
      <KeywordInputButton
        title='키워드 이름을 설정해주세요'
        placeHolder='키워드 이름을 작성해주세요'
        initialValue={formData.keywordName}
        onUpdate={(keywordName) => updateFormData({ keywordName })}
        onNext={nextStep}
      />
      <SpeechToText autoStart placeholder='키워드 이름을 설정해주세요' />
    </>
  );
}
