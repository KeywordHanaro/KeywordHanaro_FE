'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import SpeechToText from '../SpeechToText';
import { Button } from '../atoms/Button';
import { KeywordInputRef } from '../atoms/Inputs';

interface InputButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeHolder: string;
  title: string;
  onUpdate: (inputValue: string) => void;
  onNext: () => void;
  children?: ReactNode;
  initialValue?: string;
}

const KeywordInputButton = forwardRef(
  (
    {
      title,
      placeHolder,
      onUpdate,
      onNext,
      initialValue = '',
      children,
      ...props
    }: InputButtonProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [inputValue, setInputValue] = useState('');
    const { result, setResult } = useVoiceInputSession();

    useEffect(() => {
      setInputValue(initialValue);
    }, [initialValue]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleSubmit = () => {
      onUpdate(inputValue);
      onNext();
    };

    useEffect(() => {
      if (result.length > 0) {
        setInputValue(result);
        onUpdate(result);
        setResult('');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result]);

    const isInputFilled = inputValue.length > 0;

    return (
      <div className='flex flex-col gap-[33px] '>
        {/*title*/}
        <div className='font-semibold text-2xl mb-[50px]'>{title}</div>

        {/*keyword input*/}
        <KeywordInputRef
          className='text-hanaPrimary w-full'
          placeHolder={placeHolder}
          onChange={handleInputChange}
          ref={ref}
          value={inputValue}
        />
        <Button
          isDisabled={!isInputFilled}
          className='w-full'
          onClick={handleSubmit}
          {...props}
        >
          {isInputFilled ? '다음' : '완료'}
        </Button>
        <div className='flex flex-col gap-5 text-center font-semibold text-[14px]'>
          {children}
        </div>
        <SpeechToText />
      </div>
    );
  }
);

KeywordInputButton.displayName = 'KeywordInputButton';
export default KeywordInputButton;
