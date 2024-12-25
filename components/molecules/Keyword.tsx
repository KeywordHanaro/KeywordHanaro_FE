'use client';

import { getColorByType, getNameByType } from '@/data/keyword';
import { UseKeywordResponse } from '@/types/Keyword';
import { BsStarFill } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';

type KeywordProps = {
  data: UseKeywordResponse;
  'data-keyword-id'?: string | number;
  canDelete?: boolean;
  onDelete?: (id: number) => void;
  onFavoriteChange?: (id: number, isFavorite: boolean) => void;
};

const Keyword = ({
  data: { id, type, name, desc, favorite },
  'data-keyword-id': dataKeywordId,
  canDelete,
  onDelete,
  onFavoriteChange,
}: KeywordProps) => {
  const router = useRouter();
  const chipColor = getColorByType(type);
  const chipName = getNameByType(type);

  const handleFavorite = () => {
    if (onFavoriteChange) {
      onFavoriteChange(id, !favorite);
    }
  };

  return (
    <Card
      className='flex flex-row justify-between items-center rounded-[12px]'
      data-keyword-id={dataKeywordId}
      onClick={() => {
        router.push(
          type.includes('TRANSFER') || type.includes('SETTLEMENT')
            ? `/${type.toLowerCase().replace('amount', '')}/step1?id=${id}`
            : type.includes('multiKeyword')
              ? `/${type}/step1/?id=${id}`
              : `/${type.toLowerCase().replace('amount', '')}?id=${id}`
        );
      }}
    >
      <div className='flex flex-col gap-[10px]'>
        <div className='flex gap-2 items-center'>
          <span className='text-fontBlack text-[16px] font-semibold'>
            {name}
          </span>
          <ColorChip color={chipColor}>{chipName}</ColorChip>
        </div>
        <span className='text-subGray text-[11px]'>{desc}</span>
      </div>

      {canDelete ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation();
            if (onDelete) onDelete(id);
          }}
        >
          <circle cx='10' cy='10' r='10' fill='#454381' />
          <path
            d='M6.5 10H13.5'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ) : (
        <BsStarFill
          className={cn(
            'w-[27px] h-[27px]',
            favorite ? 'text-yellow-300' : 'text-[#D9D9D9]'
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleFavorite();
          }}
        />
      )}
    </Card>
  );
};
export default Keyword;
