'use client';

import {
  getColorByType,
  getNameByType,
  Keyword as TKeyword,
} from '@/data/keyword';
import { BsStarFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';

type KeywordProps = {
  data: TKeyword;
  'data-keyword-id'?: string | number;
  canDelete?: boolean;
  onDelete?: (id: number) => void;
};

const Keyword = ({
  data: { id, type, title, description, isFavorite },
  'data-keyword-id': dataKeywordId,
  canDelete,
  onDelete,
}: KeywordProps) => {
  const router = useRouter();
  const chipColor = getColorByType(type);
  const chipName = getNameByType(type);

  return (
    <Card
      className='flex flex-row justify-between items-center rounded-[12px]'
      data-keyword-id={dataKeywordId}
      onClick={() => {
        router.push(
          type.includes('transfer') || type.includes('settlement')
            ? `/${type.toLowerCase().replace('amount', '')}/step1?id=${id}`
            : `/${type.toLowerCase().replace('amount', '')}?id=${id}`
        );
      }}
    >
      <div className='flex flex-col gap-[10px]'>
        <div className='flex gap-2 items-center'>
          <span className='text-fontBlack text-[16px] font-semibold'>
            {title}
          </span>
          <ColorChip color={chipColor}>{chipName}</ColorChip>
        </div>
        <span className='text-subGray text-[11px]'>{description}</span>
      </div>

      {canDelete ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          style={{ cursor: 'pointer', zIndex: '99' }}
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(id);
          }}
        >
          <circle cx='10' cy='10' r='10' fill='#454381' />
          <path
            d='M6.5 10H13.5'
            stroke='white'
            stroke-width='1.5'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      ) : (
        <BsStarFill
          className={cn(
            'w-[27px] h-[27px]',
            isFavorite ? 'text-yellow-300' : 'text-[#D9D9D9]'
          )}
        />
      )}
    </Card>
  );
};
export default Keyword;
