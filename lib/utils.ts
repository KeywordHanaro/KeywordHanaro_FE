import { Bank, bankList } from '@/data/bank';
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

export function formatAccountNumber(
  bankId: number,
  accountNumber: string
): string {
  const cleanNumber = accountNumber.replace(/-/g, '');
  const bank = bankList.find((b) => b.id === bankId);

  if (!bank) return accountNumber;

  switch (bank.id) {
    case 4: // 국민은행
      return cleanNumber.replace(/(\d{6})(\d{2})(\d{6})/, '$1-$2-$3');
    case 88: // 신한은행
      return cleanNumber.replace(/(\d{3})(\d{3})(\d{6})/, '$1-$2-$3');
    case 20: // 우리은행
      return cleanNumber.replace(/(\d{4})(\d{3})(\d{6})/, '$1-$2-$3');
    case 81: // 하나은행
      return cleanNumber.replace(/(\d{3})(\d{6})(\d{5})/, '$1-$2-$3');
    case 11: // NH농협
      return cleanNumber.replace(/(\d{3})(\d{4})(\d{4})(\d{2})/, '$1-$2-$3-$4');
    case 3: // IBK기업
      return cleanNumber.replace(/(\d{3})(\d{2})(\d{7})/, '$1-$2-$3');
    case 90: // 카카오뱅크
      return cleanNumber.replace(/(\d{4})(\d{2})(\d{7})/, '$1-$2-$3');
    case 92: // 토스뱅크
      return cleanNumber.replace(/(\d{3})(\d{4})(\d{4})(\d)/, '$1-$2-$3-$4');
    default:
      return accountNumber;
  }
}
