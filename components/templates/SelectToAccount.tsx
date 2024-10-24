import { AccountInputRef } from '@/components/atoms/Inputs';
import AccountList from '@/components/organisms/AccountList';
import { MyAccounts, OthersAccounts } from '@/data/account';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function SelectToAccount() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccountList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='flex flex-col gap-[15px]'>
      <h1 className='font-extrabold text-2xl'>어디로 돈을 보낼까요?</h1>
      <div className=''>
        <AccountInputRef placeHolder='계좌번호 입력' />
      </div>
      <div className='flex justify-between'>
        <div className='font-bold text-[18px]'>내 계좌</div>
        <div
          className='flex items-center gap-1 cursor-pointer'
          onClick={toggleAccountList}
        >
          <span className='font-bold text-[12px] text-hanaPrimary'>
            + {MyAccounts.length}개
          </span>
          <span
            className={`transition-transform duration-300 ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          >
            <ChevronRight className='w-[20px] h-[20px] text-slate-500 hover:text-black' />
          </span>
        </div>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='transition-opacity duration-500 ease-in-out'>
          <AccountList accounts={MyAccounts} />
        </div>
      </div>
      <div>
        <div className='font-bold text-[18px]'>최근 보낸 계좌</div>
        <div>
          <AccountList accounts={OthersAccounts} />
        </div>
      </div>
    </div>
  );
}
