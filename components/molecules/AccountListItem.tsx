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

  // 즐겨찾기 상태 변경 함수
  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev); // 클릭 시 상태를 반전시킴
  };
  const bankImage = bankList.find((i) => i.bankname === bank)?.image;

  return (
    <div className='w-80 h-fit p-2 bg-white border border-green-100'>
      <div className='grid grid-cols-6 gap-4 justify-center items-center'>
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
        <div className='col-span-4 flex flex-col gap-1 ml-2'>
          <h1 className='text-hanaPrimary font-bold'>{name}</h1>
          <h1 className='text-gray-400 text-xs flex flex-row gap-2'>
            <div>{bank}</div>
            <div>{accountNumber}</div>
          </h1>
        </div>

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
