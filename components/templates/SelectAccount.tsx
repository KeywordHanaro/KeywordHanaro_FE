import { type MyAccountItemProps } from '@/components/molecules/AccountListItem';
import { MyAccounts } from '@/data/account';
import MyAccountList from '../organisms/MyAccountList';

type SelectAccountProps = {
  onUpdate: (account: MyAccountItemProps) => void;
  onNext: () => void;
};

export default function SelectAccount({
  onUpdate,
  onNext,
}: SelectAccountProps) {
  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className='font-extrabold text-2xl'>내 계좌를 선택해주세요</h1>
      <div>
        <MyAccountList
          accounts={MyAccounts}
          onUpdate={onUpdate}
          onNext={onNext}
        />
      </div>
    </div>
  );
}
