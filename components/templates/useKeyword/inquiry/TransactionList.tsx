import TransactionHistory from '@/components/molecules/Transaction';
import { transactionList } from '@/data/transaction';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default function TransactionList() {
  const keyword = '터틀'; //input keyword
  // accountName에 keyword가 포함된 거래 내역만 필터링
  const filteredTransactions = transactionList
    .filter((transaction) =>
      transaction.accountInfo.accountName?.includes(keyword)
    )

    .sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );

  // 한글키워드 검색 시, 받침 유무에 따른 을/를 출력
  const hasBatchim = (word: string) => {
    const lastChar = word[word.length - 1];
    const code = lastChar.charCodeAt(0);
    if (code < 44032 || code > 55203) return false;
    return (code - 44032) % 28 !== 0;
  };
  let lastDate = '';

  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className='font-extrabold text-2xl'>
        {keyword}
        {hasBatchim(keyword) ? '을' : '를'} 기반으로
        <br />
        검색한 결과예요
      </h1>
      <div className=''>
        <h1 className='text-[18px] font-semibold mb-[16px]'>
          최근 거래내역{' '}
          <span className='text-[12px]'>({filteredTransactions.length}건)</span>
        </h1>
        <div className=''>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((data) => {
              const currentDate = formatDate(data.dateTime); // 현재 거래의 날짜
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
            <div>
              <Image
                src={'/images/alarts/noData.gif'}
                alt=''
                width={300}
                height={300}
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
