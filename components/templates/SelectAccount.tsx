import AccountListItem from '@/components/molecules/AccountListItem';
import { MyAccount, MyAccounts } from '@/data/account';
import { MyAccountWithBalance } from '@/data/transfer';

type SelectAccountProps = {
  onUpdate: (account: MyAccountWithBalance) => void;
  onNext: () => void;
  selectedAccount?: MyAccount;
};

export default function SelectAccount({
  onUpdate,
  onNext,
  selectedAccount,
}: SelectAccountProps) {
  const handleAccountClick = (account: MyAccountWithBalance) => {
    onUpdate(account);
    onNext();
  };
  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className='font-extrabold text-2xl'>내 계좌를 선택해주세요</h1>
      <div>
        {MyAccounts.map((account) => (
          <AccountListItem
            key={account.accountNumber}
            account={account}
            isSelected={
              account.accountNumber === selectedAccount?.accountNumber
            }
            onclick={() => handleAccountClick(account)}
          />
        ))}
      </div>
    </div>
  );
}
