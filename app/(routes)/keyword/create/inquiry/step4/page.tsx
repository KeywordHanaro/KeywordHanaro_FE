'use client';

import KeywordCompletion from '@/components/templates/KeywordCompletion';
import { useInquiry } from '@/contexts/InquiryContext';
// import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { useRouter } from 'next/navigation';

export default function Step4() {
  const router = useRouter();
  const { formData } = useInquiry();

  // const { createKeyword } = useKeywordApi();

  const handleComplete = async () => {
    console.log(formData.account);
    console.log(formData.inquiry);
    console.log(formData.keywordName);
    router.push('/');
    // await createKeyword({
    //   type: 'INQUIRY',
    //   name: formData.keywordName,
    //   account: { id: formData.account.accountId },
    //   inquiryWord: formData.inquiry,
    //   desc: formData.keywordName,
    // })
    //   .then(() => {
    //     router.push('/keyword');
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  };

  return (
    <KeywordCompletion onClick={handleComplete}>
      <div className='flex flex-col items-center justify-center gap-2'>
        <p className='text-[18px]'>
          <span className='text-hanaPrimary'>{formData.keywordName}</span>{' '}
          키워드를 호출하면
        </p>
        <p className='text-[18px]'>{formData.account.accountName} 계좌에서</p>
        <p className='font-semibold text-[24px]'>
          <span className='text-hanaPrimary'>{formData.inquiry}</span>가
          조회돼요
        </p>
      </div>
    </KeywordCompletion>
  );
}
