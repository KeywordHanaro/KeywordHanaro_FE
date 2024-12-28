'use client';

import MyAccountList from '@/components/organisms/MyAccountList';
import RecentAccountList from '@/components/organisms/RecentAccountList';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { Account, OthersAccount, RecentAccount } from '@/types/Account';
import { MyAccount } from '@/types/Account';
import { MyAccountWithBalance } from '@/types/Transfer';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type SelectToAccountType = {
  onUpdate: (account: MyAccount | OthersAccount) => void;
  onNext: (step?: number) => void;
  selectedAccountNumber: string;
  selectedAccountId: number;
};

export default function SelectToAccount({
  onUpdate,
  onNext,
  selectedAccountNumber,
  selectedAccountId,
}: SelectToAccountType) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccountList = () => {
    setIsOpen((prev) => !prev);
  };

  const handleInputClick = () => {
    onNext();
  };

  const handleListClick = () => {
    onNext(4);
  };

  const [accounts, setAccounts] = useState<Account[]>([]);
  const { showMyAccounts, showRecentAccountsbyAccountId } = useAccountApi();
  useEffect(() => {
    const fetchAccounts = async () => {
      console.log('isOpen : ', isOpen);
      await showMyAccounts().then((response) => {
        setAccounts(response);
        if (response.length === 1) {
          // 계좌가 1개라면 선택한 내 계좌라는 뜻. 비활성화
          setIsOpen(false);
        }
      });

      // try {
      //   const accounts = await showMyAccounts();
      //   setAccounts(accounts);

      // } catch (error) {
      //   console.error('Failed to fetch accounts:', error);
      // }
    };

    fetchAccounts();
  }, []);

  const [recentAccounts, setRecentAccounts] = useState<Account[]>([]);
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await showRecentAccountsbyAccountId(selectedAccountId);
        setRecentAccounts(accounts);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  const myRecentAccounts: RecentAccount[] = recentAccounts.map((account) => {
    return {
      balance: account.balance.toString(),
      type: 'OthersAccount',
      name: account.name,
      bankId: account.bank.id,
      accountNumber: account.accountNumber,
    };
  });

  const myAccounts: MyAccountWithBalance[] = accounts.map((account) => {
    return {
      balance: account.balance.toString(),
      type: 'MyAccount',
      accountName: account.name,
      bankId: account.bank.id,
      accountId: account.id,
      accountNumber: account.accountNumber,
    };
  });

  const myAccountWithoutSelected = myAccounts.filter((account) => {
    return account.accountNumber !== selectedAccountNumber;
  });

  const { result } = useVoiceInputSession();

  // 새로운 계좌번호 입력시(다른 사람, 은행 계좌)
  useEffect(() => {
    if (result) {
      const cleanedResult = result.replace(/[\s-]/g, '');
      if (/^\d+$/.test(cleanedResult)) {
        const othersAccount: OthersAccount = {
          type: 'OthersAccount',
          name: '',
          bankId: 0,
          accountNumber: cleanedResult,
        };
        onUpdate(othersAccount);
        handleInputClick();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className='flex flex-col gap-[17px] h-full'>
      <h1 className='font-extrabold text-2xl'>어디로 돈을 보낼까요?</h1>
      <div className=''>
        <button
          className='text-placeholderGray text-[18px] font-semibold border-b-2 py-2 w-full text-left'
          onClick={handleInputClick}
        >
          계좌번호 입력
        </button>
      </div>
      <div className='flex flex-col h-full overflow-y-scroll pb-24'>
        <div className='flex justify-between'>
          <div className='font-bold text-[18px]'>내 계좌</div>
          <div
            className='flex items-center gap-1 cursor-pointer'
            onClick={toggleAccountList}
          >
            {!isOpen && (
              <span className='font-bold text-[12px] text-hanaPrimary'>
                + {myAccountWithoutSelected.length}개
              </span>
            )}
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
          className={`flex transition-all duration-500 ease-in-out ${
            isOpen
              ? 'max-h-[500px] opacity-100'
              : 'max-h-0 opacity-0 overflow-y-scroll'
          }`}
        >
          <div className='transition-opacity duration-500 ease-in-out'>
            <MyAccountList
              accounts={myAccountWithoutSelected}
              onUpdate={onUpdate}
              onNext={handleListClick}
            />
          </div>
        </div>
        <div>
          <div className='font-bold text-[18px] mt-8'>최근 보낸 계좌</div>
          <div>
            {myRecentAccounts.length === 0 ? (
              <div className='text-black font-semibold text-[18px] text-center mt-[24px]'>
                최근 보낸 계좌가 없습니다.
              </div>
            ) : (
              <RecentAccountList
                accounts={myRecentAccounts}
                onUpdate={onUpdate}
                onNext={handleListClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
