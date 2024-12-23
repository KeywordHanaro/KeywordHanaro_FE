import Header from '@/components/atoms/Header';
// import BankInfoItem from '@/components/molecules/BankInfoItem';
import TicketCategory from '@/components/molecules/TicketCategory';

// import { branchList } from '@/data/bank';

export default function TicketPage() {
  return (
    <>
      <div className='flex flex-col'>
        <Header text='키워드 번호표 발급' />

        <div className='flex flex-col p-4'>
          <h1 className='text-[24px] font-semibold leading-8 mb-2'>
            어떤 업무를 보시겠어요?{' '}
          </h1>
          {/* <BankInfoItem data={branchList[0]} /> */}
          <TicketCategory />
        </div>
      </div>
    </>
  );
}
