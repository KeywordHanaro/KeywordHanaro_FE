'use client';

import SpeechToText from '@/components/SpeechToText';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { useRouter } from 'next/navigation';

export default function SettlementStep4() {
  const { formData, updateFormData } = useSettlementContext();
  const router = useRouter();
  const { createKeyword } = useKeywordApi();

  const nextStep = () => {
    const groupMembers = formData.members.map((member) => ({
      name: member.name,
      tel: member.tel,
    }));
    const desc = `${formData.category === 'Settlement' ? '정산' : '회비'} > ${formData.checkEveryTime ? '' : formData.amount + ' >'} ${groupMembers.map(
      (member) => member.name
    )}`;
    try {
      console.log(formData);
      createKeyword({
        type: formData.category === 'Settlement' ? 'SETTLEMENT' : 'DUES',
        name: formData.keywordName,
        desc: desc,
        account: {
          id: formData.fromAccount.accountId,
          accountNumber: formData.fromAccount.accountNumber,
          accountName: formData.fromAccount.accountName,
        },
        checkEveryTime: formData.checkEveryTime,
        amount: parseInt(formData.amount.replace(/,/g, ''), 10),
        groupMember: JSON.stringify(groupMembers),
      });
    } catch {
      throw new Error('Fetching Error');
    }
    router.push('/keyword/create/settlement/step5');
  };
  return (
    <>
      <KeywordInputButton
        placeHolder={'키워드 이름을 작성해주세요'}
        title={'키워드 이름을 설정해주세요'}
        onUpdate={(keywordName) => updateFormData({ keywordName })}
        onNext={nextStep}
        initialValue={formData.keywordName}
      />
      <SpeechToText autoStart placeholder='키워드 이름을 설정해주세요' />
    </>
  );
}
