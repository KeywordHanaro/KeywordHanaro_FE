import { groupMember } from '@/types/Keyword';
import { ClassValue } from 'clsx';
import { Chip } from '../atoms/Chips';

type ChipsListProps = {
  items: groupMember[];
  canDelete?: boolean;
  canAdd?: boolean;
  onRemove?: (tel: string) => void;
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
          key={item.tel}
          item={item}
          canAdd={canAdd}
          canDelete={canDelete}
          onRemove={onRemove ? () => onRemove(item.tel) : undefined}
          className={className}
        />
      ))}
    </div>
  );
}
