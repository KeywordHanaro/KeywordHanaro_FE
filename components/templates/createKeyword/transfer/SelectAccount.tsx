import AccountListItem from '@/components/molecules/AccountListItem';
import { MyAccounts } from '@/data/account';

export default function SelectAccount() {
  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className='font-extrabold text-2xl'>내 계좌를 선택해주세요</h1>
      <div>
        {MyAccounts.map((account) => (
          <AccountListItem key={account.accountNumber} account={account} />
        ))}
      </div>
    </div>
  );
}
