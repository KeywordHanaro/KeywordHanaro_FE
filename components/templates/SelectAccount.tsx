'use client';

import AccountListItem from '@/components/molecules/AccountListItem';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
// import { MyAccount, MyAccounts } from '@/types/Account';
import { Account, MyAccount } from '@/types/Account';
import { MyAccountWithBalance } from '@/types/Transfer';
import { useEffect, useState } from 'react';

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
  const [accountList, setAccountList] = useState<Account[]>([]);
  const { showMyAccounts } = useAccountApi();
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accounts = await showMyAccounts();
        setAccountList(accounts);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className='font-extrabold text-2xl'>내 계좌를 선택해주세요</h1>
      <div>
        {accountList.map((account) => (
          <AccountListItem
            key={account.accountNumber}
            account={{
              type: 'MyAccount',
              accountName: account.name,
              bankId: account.bank.id,
              accountId: account.id,
              accountNumber: account.accountNumber,
            }}
            isSelected={
              account.accountNumber === selectedAccount?.accountNumber
            }
            onclick={() =>
              handleAccountClick({
                type: 'MyAccount',
                accountName: account.name,
                bankId: account.bank.id,
                accountNumber: account.accountNumber,
                accountId: account.id,
                balance: account.balance.toLocaleString(),
              })
            }
          />
        ))}
      </div>
    </div>
  );
}
