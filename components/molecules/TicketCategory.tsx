'use client';

import { useRouter } from 'next/navigation';
import { Card } from '../atoms/Card';

const categories = [
  {
    name: '예금',
    description: '(송금, 입금, 출금, 예적금 등)',
    path: '/ticket/detail?task=예금',
  },
  { name: '개인 대출', description: '', path: '/ticket/detail?task=개인 대출' },
  { name: '기업 대출', description: '', path: '/ticket/detail?task=기업 대출' },
];

export default function TicketCategory() {
  const router = useRouter();

  const handleCategory = (path: string) => router.push(path);

  return (
    <div className='flex flex-col gap-3 p-[8px]'>
      {categories.map((category) => (
        <Card
          key={category.name}
          onClick={() => handleCategory(category.path)}
          padding='p-[25px]'
          className='hover:bg-hanaPrimary hover:text-white'
        >
          <div className='flex flex-row gap-[8px] items-center'>
            <div className='w-5 h-5 rounded-lg bg-gray-300'></div>
            <h1 className='font-bold text-[17px]'>{category.name}</h1>
            <small className='text-[12px] font-bold text-descriptionGray'>
              {category.description}
            </small>
          </div>
        </Card>
      ))}
    </div>
  );
}
