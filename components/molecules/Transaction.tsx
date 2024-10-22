'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import type { Transaction } from '@/data/transactions';
import { transactions } from '@/data/transactions';
import { useEffect, useState } from 'react';

// 날짜 포맷 함수
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const isCurrentYear = date.getFullYear() === now.getFullYear();

  // 현재 연도라면 "MM월 DD일" 형식으로 출력, 아니면 "YYYY년 MM월 DD일" 출력
  const options: Intl.DateTimeFormatOptions = isCurrentYear
    ? { month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric' };

  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const TransactionHistory: React.FC = () => {
  const [balance, setBalance] = useState<
    { transaction: Transaction; balance: number }[]
  >([]);

  useEffect(() => {
    let currentBalance = 1000; // 초기 잔액 설정
    const sortedTransactions = [...transactions].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    const historyWithBalance = sortedTransactions.map((transaction) => {
      currentBalance += transaction.amount;
      return { transaction, balance: currentBalance };
    });
    setBalance(historyWithBalance);
  }, []);
  let previousDate = '';

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-2'>
        최근 거래내역 ({transactions.length}건)
      </h1>
      {balance.map(({ transaction, balance }) => {
        const showDate = transaction.date !== previousDate; // 날짜가 바뀔 때만 true
        previousDate = transaction.date; // 현재 날짜를 previousDate로 업데이트

        return (
          <div key={transaction.id}>
            {showDate && (
              <div className='bg-iconGray pl-2'>
                {/* 날짜가 바뀔 때만 포맷팅하여 날짜 출력 */}
                <p className='font-bold text-lg'>
                  {formatDate(transaction.date)}
                </p>
              </div>
            )}
            <Card className='bg-White shadow-sm rounded-none text-hanaPrimary'>
              <CardHeader>
                {/* 거래 내역 */}
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <img
                      src={
                        transaction.image || '/images/transactions/Basic.png'
                      }
                      alt={transaction.description}
                      className='w-20 h-20 shadow-md rounded-full border mr-4 object-scale-down'
                    />
                    <div>
                      <CardTitle className='text-2xl'>
                        {transaction.description}
                      </CardTitle>
                      <p className='text-iconGray'>{transaction.time}</p>
                    </div>
                  </div>
                  <div className=' text-iconGray text-right '>
                    <p
                      className={`font-bold text-xl ${
                        transaction.amount < 0
                          ? 'text-fontBlack'
                          : 'text-hanaPrimary'
                      }`}
                    >
                      {transaction.amount < 0
                        ? `- ${Math.abs(transaction.amount).toLocaleString()}원`
                        : `${transaction.amount.toLocaleString()}원`}
                    </p>
                    <p>{balance.toLocaleString()}원</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionHistory;
