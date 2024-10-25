import { MyAccount, OthersAccount } from '@/data/account';
import AccountListItem from '../molecules/AccountListItem';

type AccountListProp = {
  accounts: MyAccount[] | OthersAccount[];
};

export default function AccountList({ accounts }: AccountListProp) {
  return (
    <div>
      {accounts.map((account) => (
        <AccountListItem key={account.accountNumber} account={account} />
      ))}
    </div>
  );
}
