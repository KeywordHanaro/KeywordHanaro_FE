'use client';

import { Button } from '@/components/atoms/Button';
import { AccountInputRef } from '@/components/atoms/Inputs';
import SelectBank from '@/components/molecules/SelectBank';
import { ChangeEvent, useState } from 'react';

export default function InputToAccount() {
  const [inputValue, setInputValue] = useState('');
  const [selectedID, setSelectedID] = useState<number>(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (id: number) => {
    setSelectedID(id);
  };

  const isInputFilled = inputValue.length > 0 && selectedID > 0;

  return (
    <div className='flex flex-col gap-[17px]'>
      <div>
        <h1 className='font-extrabold text-2xl'>어떤 계좌로 보낼까요?</h1>
      </div>
      <div>
        <AccountInputRef
          onChange={handleInputChange}
          placeHolder='계좌번호 입력'
        />
        <SelectBank onSelect={handleSelect} />
      </div>
      <Button isDisabled={!isInputFilled} className='w-full mt-[18px]'>
        다음
      </Button>
    </div>
  );
}
