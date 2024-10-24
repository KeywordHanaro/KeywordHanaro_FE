'use client';

import { Member } from '@/data/member';
import UserCheckBox from '../atoms/UserCheckBox';

type ContactItemProps = {
  member: Member;
  isSelected: boolean;
  onChange: (id: number) => void;
};

export default function ContactItem({
  member: { id, name, phoneNumber },
  isSelected,
  onChange,
}: ContactItemProps) {
  return (
    <div
      className='flex w-full py-[12px] gap-[16px]'
      onClick={() => onChange(id)}
    >
      <div className='flex items-center'>
        <UserCheckBox checked={isSelected} onChange={() => onChange(id)} />
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='font-medium'>{name}</h1>
        <h1 className='text-gray-400 text-xs'>{phoneNumber}</h1>
      </div>
    </div>
  );
}
