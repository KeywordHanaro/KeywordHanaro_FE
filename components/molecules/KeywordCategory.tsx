'use client';

import { useRouter } from 'next/navigation';
import { Card } from '../atoms/Card';

const categories = [
  { name: '송금', path: '/keyword/create/transfer' },
  { name: '조회', path: '/keyword/create/inquiry' },
  { name: '모바일 번호표', path: '/keyword/create/ticket' },
  { name: '정산하기/회비걷기', path: '/keyword/create/settlement' },
];

const KeywordCategory = () => {
  const router = useRouter();

  const handleCategory = (path: string) => router.push(path);

  return (
    <div className='flex flex-col gap-3 '>
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
          </div>
        </Card>
      ))}
    </div>
  );
};

export default KeywordCategory;
