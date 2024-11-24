'use client';

import { MultiKeywordProvider } from '@/contexts/MultiKeywordContext';
import { ReactNode } from 'react';

export default function MultiKeywordLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MultiKeywordProvider>
      <MultiKeywordContent>{children}</MultiKeywordContent>
    </MultiKeywordProvider>
  );
}

function MultiKeywordContent({ children }: { children: ReactNode }) {
  return <div className='flex flex-col w-full h-full'>{children}</div>;
}
