import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param {Date} dateTime
 * @returns 거래시간 출력 형식 hh:mm
 *
 * @description
 */
export function formatTime(dateTime: Date): string {
  return dateTime.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 *
 * @param {string | Date} dateTime
 * @returns 거래날짜 출력 형식00월 00일
 *
 * @description
 */
export function formatDate(dateTime: string | Date): string {
  const date = new Date(dateTime);
  const now = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const currentYear = now.getFullYear();

  // 현재 연도와 같으면 월, 일만 출력하고 다르면 년, 월, 일을 모두 출력
  if (year === currentYear) {
    return `${month}월 ${day}일`;
  } else {
    return `${year}년 ${month}월 ${day}일`;
  }
}
export function goBack() {
  return window.history.back();
}
