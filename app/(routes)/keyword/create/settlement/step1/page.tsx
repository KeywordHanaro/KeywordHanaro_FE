'use client';

import SpeechToText from '@/components/SpeechToText';
import SelectAccount from '@/components/templates/SelectAccount';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { MyAccounts } from '@/data/account';
import { MyAccountWithBalance } from '@/data/transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { levenshtein } from '@/lib/utils';

export default function SettlementStep1() {
  const { updateFormData } = useSettlementContext();
  const router = useRouter();

  const nextStep = useCallback(() => {
    router.push('/keyword/create/settlement/step2');
  }, [router]);

  const { result, setResult } = useVoiceInputSession();

  const handleAccountClick = useCallback(
    (fromAccount: MyAccountWithBalance) => {
      updateFormData({ fromAccount });
      nextStep();
    },
    [updateFormData, nextStep]
  );

  useEffect(() => {
    if (result) {
      const threshold = 1; // 허용할 최대 편집 거리
      let bestMatch = null;
      let minDistance = Infinity;

      for (const account of MyAccounts) {
        const distance = levenshtein(
          account.accountName.toLowerCase(),
          result.toLowerCase()
        );
        if (distance < minDistance && distance <= threshold) {
          minDistance = distance;
          bestMatch = account;
        }
      }

      if (bestMatch) {
        setResult('');
        handleAccountClick(bestMatch);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <>
      <SelectAccount
        onUpdate={(fromAccount) => updateFormData({ fromAccount })}
        onNext={nextStep}
      />
      <SpeechToText autoStart placeholder='내 계좌를 선택해주세요' />
    </>
  );
}
