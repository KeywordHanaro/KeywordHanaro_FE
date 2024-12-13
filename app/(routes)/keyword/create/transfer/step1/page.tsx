'use client';

import SelectAccount from '@/components/templates/SelectAccount';
import { useTransferForm } from '@/contexts/TransferContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { MyAccounts } from '@/data/account';
import type { MyAccountWithBalance } from '@/data/transfer';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { levenshtein } from '@/lib/utils';

export default function Step1() {
  const router = useRouter();
  const { updateFormData } = useTransferForm();
  const { result, setResult } = useVoiceInputSession();

  const nextStep = useCallback(() => {
    router.push('/keyword/create/transfer/step2');
  }, [router]);

  const handleAccountClick = useCallback(
    (fromAccount: MyAccountWithBalance) => {
      setResult('');
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
    <SelectAccount
      onUpdate={(fromAccount: MyAccountWithBalance) =>
        updateFormData({ fromAccount })
      }
      onNext={nextStep}
    />
  );
}
