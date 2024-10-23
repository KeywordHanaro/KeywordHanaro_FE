'use client';

import { useState } from 'react';
import UserCheckBox from '../atoms/UserCheckBox';

type ContactItemProps = {
  name: string;
  phoneNumber: string;
};

export default function ContactItem({ name, phoneNumber }: ContactItemProps) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='flex w-full border py-[12px] gap-[16px]'>
      <div className='flex items-center'>
        <UserCheckBox checked={isChecked} onChange={setIsChecked} />
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='text-hanaPrimary font-bold'>{name}</h1>
        <h1 className='text-gray-400 text-xs'>{phoneNumber}</h1>
      </div>
    </div>
  );
}
