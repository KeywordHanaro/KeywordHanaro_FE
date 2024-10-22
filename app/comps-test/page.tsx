'use client';

import {
  AccountInputRef,
  DefaultInputRef,
  SearchInpuRef,
  AccountRefProps,
} from '@/components/atoms/Inputs';
import CheckBox from '@/components/atoms/checkBox';
import { Chip } from '@/components/atoms/chips';
import ColorChip from '@/components/atoms/color_chips';
import { useEffect, useRef, useState } from 'react';

export default function CompsTestPage() {
  const AccoutRef = useRef<AccountRefProps>(null);

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(AccoutRef.current?.bankId);
      console.log(AccoutRef.current?.inputRef.current?.value);
    }, 1000);
    return () => {
      clearInterval(intervalId);
      console.log('인터벌 정리됨');
    };
  }, []);

  const handleSubmit = () => {
    return;
  };
  return (
    <>
      <div>
        <form>
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
        </form>
        <SearchInpuRef name='hi' onSubmit={handleSubmit} />
        <AccountInputRef placeHolder='hi' ref={AccoutRef} />
      </div>
      <hr />
      <div className='flex'>
        <Chip item={{ id: 1, value: '김인선' }} />
      </div>
      <div className='flex'>
        <Chip
          item={{ id: 1, value: '김인선' }}
          canDelete={true}
          onRemove={() => alert('x')}
        />
      </div>
      <div className='mt-4 flex flex-row gap-3'>
        <ColorChip color='grey'>Grey</ColorChip>
        <ColorChip color='pink'>Pink</ColorChip>
        <ColorChip color='green'>Green</ColorChip>
        <ColorChip color='yellow'>Yellow</ColorChip>
        <ColorChip color='blue'>Blue</ColorChip>
      </div>
      <div className='mt-4'>
        <CheckBox checked={isChecked} onChange={setIsChecked} />
      </div>
    </>
  );
}
