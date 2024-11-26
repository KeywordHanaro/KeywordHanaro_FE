import { Member } from '@/data/member';
import { ClassValue } from 'clsx';
import { Chip } from '../atoms/Chips';

type ChipsListProps = {
  items: Member[];
  canDelete?: boolean;
  canAdd?: boolean;
  onRemove?: (id: number) => void;
  className?: ClassValue;
};

export function ChipsList({
  items,
  canDelete,
  canAdd,
  onRemove,
  className,
}: ChipsListProps) {
  return (
    <div className='flex flex-wrap overflow-x-auto gap-x-2 gap-y-2 w-full '>
      {items.map((item) => (
        <Chip
          key={item.id}
          item={item}
          canAdd={canAdd}
          canDelete={canDelete}
          onRemove={onRemove ? () => onRemove(item.id) : undefined}
          className={className}
        />
      ))}
    </div>
  );
}
