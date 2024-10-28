import { Member } from '@/data/member';
import { ClassValue } from 'clsx';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type ChipProps = {
  item: Member;
  canDelete?: boolean;
  onRemove?: (id: number) => void;
  className?: ClassValue;
};

export function Chip({ item, canDelete, onRemove, className }: ChipProps) {
  return (
    <Badge
      variant='hana'
      className={cn(
        'flex flex-shrink-0 gap-1 justify-between items-center pl-3 pr-2.5 py-[6px] rounded-xl',
        className
      )}
    >
      <span className='text-[14px]'>{item.name}</span>
      {canDelete && onRemove && (
        <div
          className='flex justify-center items-center bg-gray-300  w-3 h-3 rounded-full'
          onClick={() => onRemove(item.id)}
        >
          <XIcon className='w-2.5 h-2.5 text-gray-600' />
        </div>
      )}
    </Badge>
  );
}
