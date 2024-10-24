'use client';

import { ButtonHTMLAttributes, ChangeEvent, useState } from 'react';
import { Button } from '../atoms/Button';
import { KeywordInputRef } from '../atoms/Inputs';

interface InputButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeHolder: string;
}

export default function KeywordInputButton({
  placeHolder,
  ...props
}: InputButtonProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const isInputFilled = inputValue.length > 0;

  return (
    <div className='flex flex-col items-center gap-[33px] '>
      <KeywordInputRef
        className='text-hanaPrimary'
        placeHolder={placeHolder}
        onChange={handleInputChange}
      />
      <Button isDisabled={!isInputFilled} size='lg' {...props}>
        {isInputFilled ? '다음' : '완료'}
      </Button>
    </div>
  );
}
