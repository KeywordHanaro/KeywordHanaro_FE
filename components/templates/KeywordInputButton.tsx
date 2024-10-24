'use client';

import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ForwardedRef,
  useState,
} from 'react';
import { Button } from '../atoms/Button';
import { KeywordInputRef } from '../atoms/Inputs';

interface InputButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeHolder: string;
}

export default function KeywordInputButton(
  { title, placeHolder, ...props }: InputButtonProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const isInputFilled = inputValue.length > 0;

  return (
    <div className='flex flex-col items-center gap-[33px] '>
      {/*title*/}
      <div className='font-extrabold text-2xl mb-[50px]'>{title}</div>

      {/*keyword input*/}
      <KeywordInputRef
        className='text-hanaPrimary w-full'
        placeHolder={placeHolder}
        onChange={handleInputChange}
        ref={ref}
      />
      <Button isDisabled={!isInputFilled} className='w-full' {...props}>
        {isInputFilled ? '다음' : '완료'}
      </Button>
    </div>
  );
}
