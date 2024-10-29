import Header from '@/components/atoms/Header';
import QnA from '@/components/molecules/QnA';
import Ticket from '@/components/molecules/Ticket';
import { Suspense } from 'react';

export default function TicketDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const Bank = '성수역';
  return (
    <Suspense>
      <div className='flex flex-col h-screen flex-grow-0'>
        <Header text='키워드 번호표 발급' />
        <div className='flex flex-col px-4 pt-4'>
          <h1 className='text-[24px] font-semibold leading-8'>
            {`${Bank}점`}{' '}
          </h1>
          <div>
            <Ticket now={new Date()} waitingQueue={18} people={12} />
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
