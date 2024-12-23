'use client';

import SpeechToText from '@/components/SpeechToText';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useTicket } from '@/contexts/TicketContext';
import { useRouter } from 'next/navigation';

export default function CreateTicketStep3Page() {
  const router = useRouter();
  const { setKeywordName, keywordName } = useTicket();

  const handelStep = () => {
    router.push('/keyword/create/ticket/step4');
  };
  console.log(keywordName);

  return (
    <>
      <KeywordInputButton
        title='키워드의 이름을 설정해주세요'
        placeHolder='키워드 이름을 작성해주세요'
        onUpdate={setKeywordName}
        onNext={handelStep}
        initialValue={keywordName ? keywordName : ''}
      />
      <SpeechToText autoStart placeholder='키워드의 이름을 설정해주세요' />
    </>
  );
}
