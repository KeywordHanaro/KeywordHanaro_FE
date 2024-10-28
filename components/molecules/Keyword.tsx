'use client';

import { Keyword as TKeyword } from '@/data/keyword';
import { BsStarFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card } from '../atoms/Card';

type KeywordProps = {
  data: TKeyword;
};

const Keyword = ({
  data: { id, type, title, description, isFavorite },
}: KeywordProps) => {
  const router = useRouter();
  return (
    <Card
      className='flex flex-row justify-between items-center rounded-[12px]'
      onClick={() => {
        router.push(`/${type}?id=${id}`);
      }}
    >
      <div className='flex flex-col gap-[8px]'>
        <span className='text-hanaPrimary text-[15px] font-semibold'>
          {title}
        </span>
        <span className='text-subGray text-[11px]'>{description}</span>
      </div>
      <BsStarFill
        className={cn(
          'w-[27px] h-[27px]',
          isFavorite ? 'text-yellow-300' : 'text-[#D9D9D9]'
        )}
      />
    </Card>
  );
};
export default Keyword;
