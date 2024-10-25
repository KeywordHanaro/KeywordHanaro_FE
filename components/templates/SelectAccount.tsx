import { MyAccount } from '@/app/(routes)/keyword/create/inquiry/page';
import AccountListItem from '@/components/molecules/AccountListItem';
import { MyAccounts } from '@/data/account';

type SelectAccountProps = {
  // account: string;
  onUpdate: (account: MyAccount) => void;
  onNext: () => void;
};

export default function SelectAccount({
  // account,
  onUpdate,
  onNext,
}: SelectAccountProps) {
  // 선택된 계좌 handle
  const handleAccountClick = (account: MyAccount) => {
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
            onclick={() => handleAccountClick(account)}
          />
        ))}
      </div>
    </div>
  );
}
