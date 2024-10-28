'use client';

import { type RecentAccount } from '@/data/account';
import AccountListItem, {
  type MyOrOthersAccountItemProps,
} from '../molecules/AccountListItem';

type AccountListProp = {
  accounts: RecentAccount[];
  onUpdate: (account: MyOrOthersAccountItemProps) => void;
  onNext: () => void;
  onSkip?: (step: number) => void;
};

export default function RecentAccountList({
  accounts,
  onUpdate,
  onNext,
}: AccountListProp) {
  const handleAccountClick = (account: MyOrOthersAccountItemProps) => {
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
