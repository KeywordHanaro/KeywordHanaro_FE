import AccountList from '@/components/organisms/AccountList';
import { MyAccounts } from '@/data/account';

export default function SelectFromAccount() {
  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className='font-extrabold text-2xl'>내 계좌를 선택해주세요</h1>
      <div>
        <AccountList accounts={MyAccounts} />
      </div>
    </div>
  );
}
