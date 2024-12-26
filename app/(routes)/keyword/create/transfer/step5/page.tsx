'use client';

import SpeechToText from '@/components/SpeechToText';
import KeywordInputButton from '@/components/templates/KeywordInputButton';
import { useTransferForm } from '@/contexts/TransferContext';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { useRouter } from 'next/navigation';

export default function Step5() {
  const { formData, updateFormData } = useTransferForm();
  const router = useRouter();

  const { createKeyword } = useKeywordApi();

  const handleComplete = async () => {
    await createKeyword({
      type: 'TRANSFER',
      name: formData.keyword,
      desc: formData.checkEverytime
        ? formData.fromAccount.accountName +
          ' > ' +
          formData.toAccount.accountNumber +
          ' > 금액 미정'
        : formData.fromAccount.accountName +
          ' > ' +
          formData.toAccount.accountNumber +
          ' > ' +
          formData.amount,
      account: { id: formData.fromAccount.accountId },
      subAccount: { accountNumber: formData.toAccount.accountNumber },
      checkEveryTime: formData.checkEverytime,
      amount: formData.amount,
    })
      .then(() => {
        router.push('/keyword/create/transfer/step6');
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <KeywordInputButton
        title='키워드의 이름을 설정해주세요'
        placeHolder='키워드 이름을 작성해주세요'
        onUpdate={(keyword: string) => updateFormData({ keyword })}
        onNext={handleComplete}
      />
      <SpeechToText placeholder={'키워드 이름을 작성해주세요'} autoStart />
    </>
  );
}
