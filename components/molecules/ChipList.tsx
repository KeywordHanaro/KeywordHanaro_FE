import { Member } from '@/data/member';
import { ClassValue } from 'clsx';
import { Chip } from '../atoms/Chips';

type ChipsListProps = {
  items: Member[];
  canDelete?: boolean;
  onRemove?: (id: number) => void;
  className?: ClassValue;
};

export function ChipsList({
  items,
  canDelete,
  onRemove,
  className,
}: ChipsListProps) {
  return (
    <div className='flex overflow-x-auto space-x-2'>
      {items.map((item) => (
        <Chip
          key={item.id}
          item={item}
          canDelete={canDelete}
          onRemove={onRemove ? () => onRemove(item.id) : undefined}
          className={className}
        />
      ))}
    </div>
  );
}
