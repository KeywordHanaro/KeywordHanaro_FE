'use client';

import SpeechToText from '@/components/SpeechToText';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useTicket } from '@/contexts/TicketContext';
import { useBranchApi } from '@/hooks/useBranch/useBranch';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { useRouter } from 'next/navigation';

export default function CreateTicketStep3Page() {
  const router = useRouter();
  const { setKeywordName, keywordName, selectedBranch } = useTicket();
  const { createKeyword } = useKeywordApi();
  const { savePermission } = useBranchApi();

  const handleComplete = async () => {
    try {
      console.log(selectedBranch);
      await createKeyword({
        type: 'TICKET',
        name: keywordName,
        desc: '번호표 > ' + selectedBranch.placeName,
        branch: selectedBranch,
      });

      await savePermission();
      router.push('/keyword/create/ticket/step4');
    } catch (err) {
      console.log('createKeyword error: ' + err);
    }
  };

  return (
    <>
      <KeywordInputButton
        title='키워드의 이름을 설정해주세요'
        placeHolder='키워드 이름을 작성해주세요'
        onUpdate={setKeywordName}
        onNext={handleComplete}
        initialValue={keywordName ? keywordName : ''}
      />
      <SpeechToText autoStart placeholder='키워드의 이름을 설정해주세요' />
    </>
  );
}
