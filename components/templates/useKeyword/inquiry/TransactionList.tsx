import TransactionHistory from '@/components/molecules/Transaction';
import { Transaction } from '@/types/Keyword';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

type TransactionListProps = {
  tranactions: Transaction[];
};

export default function TransactionList({ tranactions }: TransactionListProps) {
  let lastDate = '';

  return (
    <div className='flex flex-col gap-[24px]'>
      <div className=''>
        <h1 className='text-[18px] font-semibold mb-[16px]'>
          최근 거래내역{' '}
          <span className='text-[12px]'>({tranactions.length}건)</span>
        </h1>
        <div className=''>
          {tranactions.length > 0 ? (
            tranactions.map((data) => {
              const currentDate = formatDate(data.createAt); // 현재 거래의 날짜
              const showDate = lastDate !== currentDate; // 날짜가 달라지면 표시
              lastDate = currentDate; // 마지막 표시된 날짜 업데이트

              return (
                <div key={data.id} className=''>
                  {showDate && (
                    <h2 className='text-[12px] text-subGray'>{currentDate}</h2>
                  )}
                  <TransactionHistory data={data} />
                </div>
              );
            })
          ) : (
            <div className='flex-col flex justify-center'>
              <Image
                src={'/images/alarts/noData.gif'}
                alt=''
                width={150}
                height={150}
                className='mx-auto'
              />
              <p className='text-center font-bold text-[20px]'>
                해당 키워드의 거래내역이 없어요!
              </p>
              <p className='text-center'>
                (예)홍길동, 000곗돈 등으로 검색해보세요!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
