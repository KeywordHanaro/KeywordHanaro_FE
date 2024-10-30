'use client';

import type { RecentAccount, MyAccount, OthersAccount } from '@/data/account';
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
