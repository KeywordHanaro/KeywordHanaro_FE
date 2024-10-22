import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = 'p-[15px_20px]', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col rounded-2xl bg-white shadow-[0px_2px_8px_0px_rgba(136,137,157,0.30)]',
        padding,
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export { Card };
