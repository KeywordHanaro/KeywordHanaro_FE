'use client';

import { bankList } from '@/data/bank';
import { BsStarFill } from 'react-icons/bs';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type AccountItemProps = {
  id: number;
  name: string;
  bank: string;
  accountNumber: string;
  isFavorite: boolean;
};

type AccountListType = {
  account: AccountItemProps;
};

export default function AccountListItem({ account }: AccountListType) {
  const { name, bank, accountNumber } = account;
  const [isFavorite, setIsFavorite] = useState(account.isFavorite);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
  const bankImage = bankList.find((i) => i.bankname === bank)?.image;

  return (
    <div className='flex flex-row justify-between w-full h-fit py-[12px] bg-white border'>
      <div className='flex gap-2'>
        {bankImage ? (
          <div className='relative w-11 h-11'>
            <Image
              src={bankImage}
              alt={bank}
              className='rounded-full'
              layout='fill'
            />
          </div>
        ) : (
          <span className='w-11 h-11 rounded-full bg-slate-200 '></span>
        )}
        <div className='flex flex-col gap-1 ml-2'>
          <h1 className='text-hanaPrimary font-bold'>{name}</h1>
          <h1 className='text-gray-400 text-xs flex flex-row gap-2'>
            <div>{bank}</div>
            <div>{accountNumber}</div>
          </h1>
        </div>
      </div>
      <div className='flex items-center'>
        <BsStarFill
          onClick={toggleFavorite}
          className={cn(
            'w-[27px] h-[27px]',
            'cursor-pointer',
            isFavorite ? 'text-yellow-300' : 'text-[#D9D9D9]'
          )}
        />
      </div>
    </div>
  );
}
