'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { Account, MyAccount } from '@/types/Account';
import { FaAngleDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import AccountListItem from './AccountListItem';

type SelectBankProps = {
  selected?: MyAccount;
  onSelect: (account: MyAccount) => void;
};

const SelectMyAccount = ({ selected, onSelect }: SelectBankProps) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [myAccount, setMyAccount] = useState<MyAccount | null>(
    selected ?? null
  );

  const [MyAccounts, setMyAccounts] = useState<MyAccount[]>([]);

  const { showMyAccounts } = useAccountApi();

  useEffect(() => {
    showMyAccounts().then((res) => {
      const myAccounts: MyAccount[] = res.map((account: Account) => ({
        type: 'MyAccount' as const,
        accountName: account.name,
        bankId: account.bank.id,
        accountId: account.id,
        accountNumber: account.accountNumber,
      }));
      setMyAccounts(myAccounts);
    });
  }, []);

  const handleScroll = () => {
    setHasScrolled(true);
  };
  const handleSelect = (account: MyAccount) => {
    setMyAccount(account);
    onSelect(account);
  };
  return (
    <>
      <div className='w-full'>
        <Drawer>
          <DrawerTrigger className='w-full rounded-lg after:w-full after:border flex flex-col'>
            <div className='flex flex-row justify-between w-full h-full font-semibold text-[18px] items-center'>
              <p
                className={cn(
                  ' text-left py-2',
                  myAccount ? 'text-hanaPrimary' : 'text-placeholderGray'
                )}
              >
                {myAccount ? myAccount.accountNumber : '내 계좌 선택'}
              </p>
              <FaAngleDown />
            </div>
          </DrawerTrigger>
          <DrawerContent className='min-h-[300px] max-h-[calc(100vh-200px)] overflow-hidden transition-all duration-500 ease-out'>
            <DrawerHeader className='text-left'>
              <DrawerTitle>계좌를 선택해주세요</DrawerTitle>
              <DrawerDescription />
            </DrawerHeader>
            <DrawerFooter
              onScroll={handleScroll}
              className={cn(
                ' overflow-y-scroll transition-all duration-500 ease-out',
                hasScrolled ? 'h-screen' : 'h-[300px]'
              )}
            >
              <div className='grid gap-3 '>
                {MyAccounts.map((account, index) => (
                  <DrawerClose
                    key={index}
                    onClick={() => handleSelect(account)}
                  >
                    <span>
                      <AccountListItem account={account} onclick={() => {}} />
                    </span>
                  </DrawerClose>
                ))}
              </div>
              <DrawerClose className='bg-disableGray p-3 flex justify-center items-center rounded-lg'>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default SelectMyAccount;
