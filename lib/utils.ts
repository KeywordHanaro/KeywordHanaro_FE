import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 *
 * @param dateTime
 * @returns
 *
 * @description 거래시간 타입 hh:mm
 */
export function formatTime(dateTime: Date): string {
  return dateTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
