'use client';

import { groupMember } from '@/types/Keyword';
import UserCheckBox from '../atoms/UserCheckBox';

type ContactItemProps = {
  member: groupMember;
  isSelected: boolean;
  onChange: (tel: string) => void;
};

export default function ContactItem({
  member: { name, tel },
  isSelected,
  onChange,
}: ContactItemProps) {
  return (
    <div
      className='flex w-full py-[12px] gap-[16px]'
      onClick={() => onChange(tel)}
    >
      <div className='flex items-center'>
        <UserCheckBox checked={isSelected} onChange={() => onChange(tel)} />
      </div>
      <div className='flex flex-col gap-1'>
        <h1 className='font-medium'>{name}</h1>
        <h1 className='text-gray-400 text-xs'>{tel}</h1>
      </div>
    </div>
  );
}
