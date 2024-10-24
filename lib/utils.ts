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
// 날짜 형식을 "YYYY-MM-DD"로 변환하는 함수
//   export const foramtDate = (dateTime: string) => {
//     return new Date(dateTime).toISOString().split('T')[0];
// };
export function formatDate(dateTime: string | Date): string {
  const date = new Date(dateTime);
  const now = new Date(); // 현재 날짜
  const year = date.getFullYear(); // 거래의 연도
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 +1)
  const day = date.getDate(); // 일

  const currentYear = now.getFullYear(); // 현재 연도

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
