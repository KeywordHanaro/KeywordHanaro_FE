'use client';

import { ChangeEvent, useState } from 'react';
import { Button } from '../atoms/Button';
import { KeywordInputRef } from '../atoms/Inputs';

type InputButtonProps = {
  placeHolder: string;
};

export default function InputButton({
  placeHolder,
}: InputButtonProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const isInputFilled = inputValue.length > 0;

  return (
    <div>
      <KeywordInputRef
        className='text-hanaPrimary'
        placeHolder={placeHolder}
        props={}
        onChange={handleInputChange}
      />
      <Button
        isDisabled={!isInputFilled}
      >
        {isInputFilled ? '다음' : '완료'}
      </Button>
    </div>
  );
}
