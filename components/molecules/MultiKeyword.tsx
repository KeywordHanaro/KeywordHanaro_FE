'use client';

import {
  getColorByType,
  getNameByType,
  Keyword as TKeyword,
} from '@/data/keyword';
import { BsStarFill } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';

type KeywordProps = {
  data: TKeyword;
  onClick: () => void;
  isSelected: boolean;
};

const MultiKeyword = ({
  data: { type, title, description, isFavorite },
  onClick,
  isSelected,
}: KeywordProps) => {
  const chipColor = getColorByType(type);
  const chipName = getNameByType(type);

  return (
    <Card
      className={cn(
        'flex flex-row justify-between items-center rounded-[12px]',
        isSelected ? '!text-white !bg-hanaPrimary' : 'bg-white'
      )}
      onClick={onClick}
    >
      <div className='flex flex-col gap-[10px]'>
        <div className='flex gap-2 items-center'>
          <span
            className={cn(
              'text-[16px] font-semibold',
              isSelected ? 'text-white' : 'text-fontBlack'
            )}
          >
            {title}
          </span>
          <ColorChip color={chipColor}>{chipName}</ColorChip>
        </div>
        <span
          className={cn(
            'text-[11px]',
            isSelected ? 'text-white' : 'text-subGray'
          )}
        >
          {description}
        </span>
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

export default MultiKeyword;
