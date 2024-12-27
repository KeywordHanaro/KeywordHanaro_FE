'use client';

import Header from '@/components/atoms/Header';
import QnA from '@/components/molecules/QnA';
import Ticket from '@/components/molecules/Ticket';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function TicketDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const branchName = searchParams.get('branchName') || '';
  const waitingNumber = parseInt(searchParams.get('waitingNumber') || '0', 10);
  const waitingGuest = parseInt(searchParams.get('waitingGuest') || '0', 10);
  const router = useRouter();
  return (
    <Suspense>
      <div className='flex flex-col h-screen flex-grow-0'>
        <Header text='키워드 번호표 발급' onAction={() => router.push('/')} />
        <div className='flex flex-col px-4 pt-4'>
          <h1 className='text-[24px] font-semibold leading-8'>{branchName}</h1>
          <div>
            <Ticket
              now={new Date()}
              waitingQueue={waitingNumber}
              people={waitingGuest}
            />
          </div>
        </div>
        <div className='flex-grow h-full overflow-scroll p-4'>
          <QnA />
        </div>

        {children}
      </div>
    </Suspense>
  );
}
