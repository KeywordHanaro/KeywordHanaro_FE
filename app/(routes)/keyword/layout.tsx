import { MicRef } from '@/components/atoms/Mic';
import { PropsWithChildren } from 'react';

export default function KeywordLayout({ children }: PropsWithChildren) {
  return (
    <div className='w-full h-screen relative'>
      {children}
      <MicRef />
    </div>
  );
}
