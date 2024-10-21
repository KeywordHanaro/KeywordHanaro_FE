'use client';


import {
  AccountInputRef,
  DefaultInputRef,
  SearchInpuRef,
  AccountRefProps,
} from '@/components/atoms/Inputs';
import { useEffect, useRef } from 'react';
import { DefaultInputRef, SearchInpuRef } from '@/components/atoms/Inputs';
import { Chip } from '@/components/atoms/chips';


export default function CompsTestPage() {
  const AccoutRef = useRef<AccountRefProps>(null);

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
    </>
  );
}
