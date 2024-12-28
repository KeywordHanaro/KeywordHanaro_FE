'use client';

import SpeechToText from '@/components/SpeechToText';
import SelectAccount from '@/components/templates/SelectAccount';
import { useTransferForm } from '@/contexts/TransferContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { Account } from '@/types/Account';
import type { MyAccountWithBalance } from '@/types/Transfer';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { levenshtein } from '@/lib/utils';

export default function Step1() {
  const router = useRouter();
  const { updateFormData } = useTransferForm();
  const { result, setResult } = useVoiceInputSession();
  const { showMyAccounts } = useAccountApi();
  const [myAccounts, setMyAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchMyAccounts = async () => {
      const response = await showMyAccounts();
      setMyAccounts(response);
    };
    fetchMyAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStep = useCallback(() => {
    router.push('/keyword/create/transfer/step2');
  }, [router]);

  const handleAccountClick = useCallback(
    (fromAccount: MyAccountWithBalance) => {
      setResult('');
      updateFormData({ fromAccount });
      nextStep();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateFormData, nextStep]
  );

  useEffect(() => {
    if (result) {
      const threshold = 1; // 허용할 최대 편집 거리
      let bestMatch = null;
      let minDistance = Infinity;

      for (const account of myAccounts) {
        const distance = levenshtein(
          account.name.toLowerCase(),
          result.replaceAll(' ', '').toLowerCase()
        );
        if (distance < minDistance && distance <= threshold) {
          minDistance = distance;
          bestMatch = {
            type: 'MyAccount',
            accountName: account.name,
            bankId: account.bank.id,
            accountId: account.id,
            accountNumber: account.accountNumber,
            balance: account.balance.toString(),
          } as MyAccountWithBalance;
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
        onUpdate={(fromAccount: MyAccountWithBalance) =>
          updateFormData({ fromAccount })
        }
        onNext={nextStep}
      />
      <SpeechToText placeholder={'내 계좌를 선택해주세요'} autoStart />
    </>
  );
}
