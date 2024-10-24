import Header from '@/components/atoms/Header';
import QnA from '@/components/molecules/QnA';
import Ticket from '@/components/molecules/Ticket';


/** Need Fetching to get waitingQueue, people, etc */

export default function TicketDetailPage() {
  const Bank = '성수역';
  return (
    <div className='flex flex-col h-screen'>
      <Header text='키워드 번호표 발급' />
      <div className='p-4 h-full flex flex-col'>
        <h1 className='text-[24px] font-semibold leading-8'>{`${Bank}점`} </h1>
        <div className='h-fit'>
          <Ticket now={new Date()} waitingQueue={18} people={12} />
        </div>
        <div className='flex-grow'>
          <QnA />
        </div>
      </div>
    </div>
  );
}
