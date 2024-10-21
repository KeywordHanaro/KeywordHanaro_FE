// Assuming shadcn's badge component is imported from this path
import { XIcon } from 'lucide-react';
import { Badge } from '../ui/badge';

type ChipProps = {
  item: { id: number; value: string };
  canDelete?: boolean;
  onRemove?: (id: number) => void;
};

export function Chip({ item, canDelete, onRemove }: ChipProps) {
  return (
    <Badge
      variant='hana'
      className='flex gap-1 justify-between items-center pl-1.5 pr-1 py-1 rounded-lg'
    >
      <span>{item.value}</span>
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
