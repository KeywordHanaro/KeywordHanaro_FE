'use client';

import {
  AccountInputRef,
  DefaultInputRef,
  SearchInpuRef,
  AccountRefProps,
} from '@/components/atoms/Inputs';
import { Button } from '@/components/atoms/button';
import { Chip } from '@/components/atoms/chips';
import { Modal } from '@/components/atoms/modal';
import { useEffect, useRef, useState } from 'react';

export default function CompsTestPage() {
  const AccoutRef = useRef<AccountRefProps>(null);
  const [isopen, setIsopen] = useState(true);
  const closeModal = () => {
    setIsopen(!isopen);
  };

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
      <div className='flex'>
        <Modal
          open={isopen}
          onChange={closeModal}
          title='미리 서류를 작성해주세요'
        >
          <div></div>
          <div className='grid gap-4 py-4'>
            <Button>송금</Button>
            <Button>입금</Button>
            <Button>출금</Button>
            <Button>다른업무</Button>
          </div>
        </Modal>
      </div>
    </>
  );
}
