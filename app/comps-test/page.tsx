'use client';

import { DefaultInputRef, SearchInpuRef } from '@/components/atoms/Inputs';

export default function CompsTestPage() {
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
      </div>
    </>
  );
}
