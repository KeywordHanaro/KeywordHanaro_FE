'use client';

import { MultiKeywordProvider } from '@/contexts/MultiKeywordContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { ReactNode } from 'react';

export default function MultiKeywordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MultiKeywordProvider>
      <VoiceInputProvider>
        <MultiKeywordContent>{children}</MultiKeywordContent>
      </VoiceInputProvider>
    </MultiKeywordProvider>
  );
}

function MultiKeywordContent({ children }: { children: ReactNode }) {
  return <div className='flex flex-col w-full h-full'>{children}</div>;
}
