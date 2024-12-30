'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

type DatePickerProps = {
  range: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
};

export function DatePicker({ range, onChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[320px] justify-start text-left font-normal',
            !range?.from && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {range?.from && range?.to ? (
            <span className='font-semibold'>
              {format(range.from, 'yyyy-MM-dd')} ~{' '}
              {format(range.to, 'yyyy-MM-dd')}
            </span>
          ) : range?.from ? (
            <span>{format(range.from, 'yyyy년 MM월 dd일')}</span>
          ) : (
            <span>조회할 시작 날짜와 끝 날짜를 선택해 주세요</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='range'
          selected={range}
          onSelect={(selectedRange) => {
            onChange(selectedRange || undefined);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
