'use client';

import { bankList } from '@/data/bank';
import type { OthersAccount } from '@/types/Account';
import { MyAccount } from '@/types/Account';
import { FaCheck } from 'react-icons/fa';
import { cn } from '@/lib/utils';
// import { BsStarFill } from 'react-icons/bs';
import { BankLogoImg } from '../atoms/BankLogoImg';

// import { useState } from 'react';
// import { cn } from '@/lib/utils';

// type AccountItemFavoriteProps = (
//   | MyAccountItemProps
//   | OthersAccountItemProps
// ) & { isFavorite: boolean };

export type AccountListType = {
  account: MyAccount | OthersAccount;
  isSelected?: boolean;
  // | AccountItemFavoriteProps;
  onclick: () => void;
};

export default function AccountListItem({
  account,
  isSelected,
  onclick,
}: AccountListType) {
  const { bankId, accountNumber } = account;

  // const name =
  //   'accountName' in account
  //     ? account.accountName
  //     : 'name' in account
  //       ? account.name
  //       : undefined;

  const name =
    account.type === 'MyAccount' ? account.accountName : account.name;

  // const isFavorite = 'isFavorite' in account ? account.isFavorite : undefined;

  // const [favoriteState, setFavoriteState] = useState(isFavorite);

  // const toggleFavorite = () => {
  //   setFavoriteState((prev) => !prev);
  // };
  const bank = bankList.find((i) => i.id === bankId);
  return (
    <div
      className={cn(
        'flex flex-row justify-between w-full h-fit py-[12px]',
        isSelected ? 'border-y border-y-hanaPrimary text-white' : 'bg-white'
      )}
    >
      <div className='flex gap-[16px]' onClick={onclick}>
        {bank ? (
          <div className='relative w-11 h-11'>
            <div
              className={`h-[40px] w-[40px] flex items-center justify-center border-1 rounded-full bg-white text-hanaPrimary text-xl
    ${isSelected ? ' border border-hanaPrimary' : ' border border-gray-100 '}`}
            >
              {isSelected ? <FaCheck /> : <BankLogoImg bankId={bankId} />}
            </div>
          </div>
        ) : (
          <span className='w-11 h-11 rounded-full bg-slate-200 '></span>
        )}
        <div className='flex flex-col gap-1'>
          <h1 className='text-hanaPrimary font-bold'>{name}</h1>
          <h1 className='text-gray-400 text-xs flex flex-row gap-2'>
            <div>{bank?.bankname}</div>
            <div>{accountNumber}</div>
          </h1>
        </div>
      </div>
      {/* <div className='flex items-center'>
        {typeof favoriteState !== 'undefined' && (
          <BsStarFill
            onClick={toggleFavorite}
            className={cn(
              'w-[27px] h-[27px]',
              'cursor-pointer',
              isFavorite ? 'text-yellow-300' : 'text-[#D9D9D9]'
            )}
          />
        )}
      </div> */}
    </div>
  );
}
