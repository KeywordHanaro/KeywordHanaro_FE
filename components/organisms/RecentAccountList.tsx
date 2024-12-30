'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import type { RecentAccount, OthersAccount } from '@/types/Account';
import { MyAccount } from '@/types/Account';
import { useEffect } from 'react';
import { levenshtein } from '@/lib/utils';
import AccountListItem from '../molecules/AccountListItem';

type AccountListProp = {
  accounts: RecentAccount[];
  onUpdate: (account: MyAccount | OthersAccount) => void;
  onNext: () => void;
  onSkip?: (step: number) => void;
};

export default function RecentAccountList({
  accounts,
  onUpdate,
  onNext,
}: AccountListProp) {
  const handleAccountClick = (account: MyAccount | OthersAccount) => {
    onUpdate(account);
    onNext();
  };

  const { result, setResult } = useVoiceInputSession();

  useEffect(() => {
    console.log('result in recentx list', result);
    console.log('test myAccount list', !/^\d+$/.test(result));
    if (result && !/^\d+$/.test(result)) {
      const threshold = 1; // 허용할 최대 편집 거리
      let bestMatch = null;
      let minDistance = Infinity;

      for (const account of accounts) {
        const distance = levenshtein(
          account.type === 'MyAccount' ? account.accountName : account.name,
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
    <div>
      {accounts.map((account) => (
        <AccountListItem
          key={account.accountNumber}
          account={account}
          onclick={() => handleAccountClick(account)}
        />
      ))}
    </div>
  );
}
