'use client';

import { MyAccountWithBalance } from '@/data/transfer';
import AccountListItem from '../molecules/AccountListItem';

type AccountListProp = {
  accounts: MyAccountWithBalance[];
  onUpdate: (account: MyAccountWithBalance) => void;
  onNext: () => void;
  onSkip?: (step: number) => void;
};

export default function MyAccountList({
  accounts,
  onUpdate,
  onNext,
}: AccountListProp) {
  const handleAccountClick = (account: MyAccountWithBalance) => {
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
