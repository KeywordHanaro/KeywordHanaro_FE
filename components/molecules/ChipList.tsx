import { Member } from '@/data/member';
import { Chip } from '../atoms/Chips';

type ChipsListProps = {
  items: Member[];
  canDelete?: boolean;
  onRemove?: (id: number) => void;
};

export function ChipsList({ items, canDelete, onRemove }: ChipsListProps) {
  return (
    <div className='flex overflow-x-auto space-x-2'>
      {items.map((item) => (
        <Chip
          key={item.id}
          item={item}
          canDelete={canDelete}
          onRemove={onRemove ? () => onRemove(item.id) : undefined}
        />
      ))}
    </div>
  );
}
