import { Chip } from '../atoms/Chips';

type ChipsListProps = {
  items: { id: number; value: string }[];
  canDelete?: boolean;
  onRemove?: (id: number) => void;
};

export function ChipsList({ items, canDelete, onRemove }: ChipsListProps) {
  return (
    <div className='flex overflow-x-auto space-x-2 pl-4'>
      {items.map((item) => (
        <Chip
          key={item.id}
          item={item}
          canDelete={canDelete}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
