'use client';

// import AccountListItem from '@/components/molecules/AccountListItem';
import SpeechToText from '@/components/SpeechToText';
import SelectAccount from '@/components/templates/SelectAccount';
import { useInquiry } from '@/contexts/InquiryContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { Account, MyAccount } from '@/types/Account';
// import { useAccountApi } from '@/hooks/useAccount/useAccount';
// import { Account } from '@/types/Account';
import { MyAccountWithBalance } from '@/types/Transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback, useState } from 'react';
import { levenshtein } from '@/lib/utils';

export default function Step1() {
  const router = useRouter();
  const { updateFormData, resetFormData } = useInquiry();
  const { result, setResult } = useVoiceInputSession();
  const { showMyAccounts } = useAccountApi();
  const [myAccounts, setMyAccounts] = useState<Account[]>([]);
  // const [myAccounts, setMyAccounts] = useState<Account[]>();
  // const { showMyAccounts } = useAccountApi();

  useEffect(() => {
    resetFormData();
    const fetchMyAccounts = async () => {
      const response = await showMyAccounts();
      setMyAccounts(response);
    };
    fetchMyAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // const fetchMyAccounts = async () => {
    //   const response = await showMyAccounts();
    //   setMyAccounts(response);
    // }

    // fetchMyAccounts();
  }, []);

  const nextStep = useCallback(() => {
    router.push('/keyword/create/inquiry/step2');
  }, [router]);

  const handleAccountClick = useCallback(
    (account: MyAccountWithBalance) => {
      setResult('');
      updateFormData({ account });
      nextStep();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateFormData, nextStep]
  );

  useEffect(() => {
    console.log('result : ', result);
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
  }, [result, handleAccountClick]);

  return (
    <>
      <SelectAccount
        onUpdate={(account: MyAccount) => updateFormData({ account })}
        onNext={nextStep}
      />
      <SpeechToText autoStart placeholder='내 계좌를 선택해주세요' />
    </>
  );
}
