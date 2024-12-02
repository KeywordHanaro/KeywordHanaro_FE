'use client';

import AccountListItem from '@/components/molecules/AccountListItem';
// import SelectAccount from '@/components/templates/SelectAccount';
import { useInquiry } from '@/contexts/InquiryContext';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { MyAccounts } from '@/data/account';
import { MyAccountWithBalance } from '@/data/transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';
import { levenshtein } from '@/lib/utils';

export default function Step1() {
  const router = useRouter();
  const { updateFormData, resetFormData } = useInquiry();
  const { result, setResult } = useVoiceInputSession();
  // console.log('result', result);

  useEffect(() => {
    resetFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const nextStep = useCallback(() => {
  //   setResult('');
  //   router.push('/keyword/create/inquiry/step2');
  // }, [router, setResult]);
  const nextStep = useCallback(() => {
    setResult('');
    let isCancelled = false;

    setTimeout(() => {
      if (!isCancelled) {
        router.push('/keyword/create/inquiry/step2');
      }
    }, 0);

    return () => {
      isCancelled = true;
    };
  }, [router, setResult]);

  const handleAccountClick = useCallback(
    (account: MyAccountWithBalance) => {
      updateFormData({ account });
      setTimeout(() => {
        nextStep();
      }, 17);
    },
    [updateFormData, nextStep]
  );

  // useEffect(() => {
  //   if (result) {
  //     const matchedAccount = MyAccounts.find(
  //       (account) => account.accountName.toLowerCase() === result.toLowerCase()
  //     );
  //     if (matchedAccount) {
  //       handleAccountClick(matchedAccount);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [result]);
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
        // console.log(bestMatch);
        // setResult('');
        handleAccountClick(bestMatch);
      }
    }
  }, [result, handleAccountClick]);

  return (
    // <SelectAccount
    //   // account={formData.account}
    //   onUpdate={(account: MyAccount) => updateFormData({ account })}
    //   onNext={nextStep}
    // />
    <div className='flex flex-col gap-[24px]'>
      <h1 className='font-extrabold text-2xl'>내 계좌를 선택해주세요</h1>
      <div>
        {MyAccounts.map((account) => (
          <AccountListItem
            key={account.accountNumber}
            account={account}
            onclick={() => handleAccountClick(account)}
          />
        ))}
      </div>
    </div>
  );
}
