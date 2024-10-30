'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card } from '../atoms/Card';

const categories = [
  {
    name: '송금',
    path: '/keyword/create/transfer/step1',
    src: '/images/icons/transfer.png',
  },
  {
    name: '조회',
    path: '/keyword/create/inquiry/step1',
    src: '/images/icons/inquiry.png',
  },
  {
    name: '모바일 번호표',
    path: '/keyword/create/ticket/step1',
    src: '/images/icons/ticket.png',
  },
  {
    name: '정산하기/회비걷기',
    path: '/keyword/create/settlement/step1',
    src: '/images/icons/settlement.png',
  },
];

const KeywordCategory = () => {
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
          <div className='flex flex-row gap-5 items-center'>
            <Image
              src={category.src}
              alt=''
              width={30}
              height={30}
              className='rounded-lg'
            ></Image>
            <h1 className='font-bold text-[17px]'>{category.name}</h1>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default KeywordCategory;
