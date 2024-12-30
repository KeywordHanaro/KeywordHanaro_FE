'use client';

import SpeechToText from '@/components/SpeechToText';
import SelectAccount from '@/components/templates/SelectAccount';
import { useSettlementContext } from '@/contexts/SettlementContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { Account } from '@/types/Account';
import { MyAccountWithBalance } from '@/types/Transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
import { levenshtein } from '@/lib/utils';

export default function SettlementStep1() {
  const { updateFormData } = useSettlementContext();
  const { showMyAccounts } = useAccountApi();
  const [myAccounts, setMyAccounts] = useState<Account[]>([]);
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
    const fetchMyAccounts = async () => {
      const response = await showMyAccounts();
      setMyAccounts(response);
    };
    fetchMyAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        onUpdate={(fromAccount) => updateFormData({ fromAccount })}
        onNext={nextStep}
      />
      <SpeechToText autoStart placeholder='내 계좌를 선택해주세요' />
    </>
  );
}
