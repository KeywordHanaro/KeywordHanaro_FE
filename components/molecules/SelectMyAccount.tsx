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
import { MyAccount, MyAccounts } from '@/data/account';
import { FaAngleDown } from 'react-icons/fa';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import AccountListItem from './AccountListItem';

type SelectBankProps = {
  selected?: MyAccount;
  onSelect: (account: MyAccount) => void;
};

const SelectMyAccount: React.FC<SelectBankProps> = ({ selected, onSelect }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [myAccount, SetMyAccount] = useState<MyAccount | null>(
    selected ?? null
  );

  const handleScroll = () => {
    setHasScrolled(true);
  };
  const handleSelect = (account: MyAccount) => {
    SetMyAccount(account);
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
