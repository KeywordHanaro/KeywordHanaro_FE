'use client';

import { AccountInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';

export default function InputToAccount() {
  return (
    <>
      <h1 className='font-extrabold text-2xl'>어떤 계좌로 보낼까요?</h1>
      <AccountInputRef />
      <SelectBank />
    </>
  );
}
