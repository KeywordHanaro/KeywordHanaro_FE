'use client';

import { type MyAccount } from '@/data/account';
import AccountListItem, {
  type MyAccountItemProps,
} from '../molecules/AccountListItem';

type AccountListProp = {
  accounts: MyAccount[];
  onUpdate: (account: MyAccountItemProps) => void;
  onNext: () => void;
  onSkip?: (step: number) => void;
};

export default function MyAccountList({
  accounts,
  onUpdate,
  onNext,
}: AccountListProp) {
  const handleAccountClick = (account: MyAccountItemProps) => {
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
