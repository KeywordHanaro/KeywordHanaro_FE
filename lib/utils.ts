import { bankList } from '@/data/bank';
import { Keyword } from '@/data/keyword';
import { TicketTask } from '@/data/ticket';
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

export const formatNumberWithCommas = (inputValue: string): string => {
  if (!inputValue) return '';
  const numericValue = inputValue.replace(/[^0-9]/g, '');
  const parsedValue = numericValue ? parseInt(numericValue, 10) : 0;
  return new Intl.NumberFormat('ko-KR').format(parsedValue);
};

export const levenshtein = (a: string, b: string) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

export function koreanCurrencyToNumber(currencyStr: string): number {
  const units: { [key: string]: number } = {
    십: 10,
    백: 100,
    천: 1000,
    만: 10000,
    억: 100000000,
  };

  const numMap: { [key: string]: number } = {
    일: 1,
    이: 2,
    삼: 3,
    사: 4,
    오: 5,
    육: 6,
    칠: 7,
    팔: 8,
    구: 9,
  };

  const postfixes: { [key: string]: number } = {
    원: 1,
    만: 10000,
    억: 100000000,
  };

  function parseKoreanNumber(s: string): number {
    let value = 0;
    let current = 0;
    for (const char of s) {
      if (char in numMap) {
        current += numMap[char];
      } else if (char in units) {
        current = current ? current * units[char] : units[char];
        value += current;
        current = 0;
      } else if (char in postfixes) {
        value += current;
        value *= postfixes[char];
        current = 0;
      }
    }
    value += current;
    return value;
  }

  // Remove spaces and commas
  // currencyStr = currencyStr.replace(/[\s,]/g, '');

  // // Parse the string and convert to number
  const result = parseKoreanNumber(currencyStr);

  // Return the result with thousands separators
  return result;
}

export const findSimilarKeywords = (
  keywordList: Keyword[],
  input: string,
  threshold: number = 0.3
) => {
  const inputWords = input.toLowerCase().split(' ');
  const similarKeywords: typeof keywordList = [];

  keywordList.forEach((keyword) => {
    const keywordWords = keyword.title.toLowerCase().split(' ');
    const keywordLength = keywordWords.length;

    for (let i = 0; i <= inputWords.length - keywordLength; i++) {
      const inputSubset = inputWords.slice(i, i + keywordLength).join(' ');
      const distance = levenshtein(inputSubset, keyword.title.toLowerCase());
      const similarity =
        1 - distance / Math.max(inputSubset.length, keyword.title.length);

      if (similarity >= threshold) {
        similarKeywords.push(keyword);
        break;
      }
    }
  });

  return similarKeywords;
};

export const findTicketTask = (
  keywordList: TicketTask[],
  input: string,
  threshold: number = 0.3
) => {
  const inputWords = input.toLowerCase().split(' ');
  const similarKeywords: typeof keywordList = [];

  keywordList.forEach((keyword) => {
    const keywordWords = keyword.name.toLowerCase().split(' ');
    const keywordLength = keywordWords.length;

    for (let i = 0; i <= inputWords.length - keywordLength; i++) {
      const inputSubset = inputWords.slice(i, i + keywordLength).join(' ');
      const distance = levenshtein(inputSubset, keyword.name.toLowerCase());
      const similarity =
        1 - distance / Math.max(inputSubset.length, keyword.name.length);

      if (similarity >= threshold) {
        similarKeywords.push(keyword);
        break;
      }
    }
  });

  return similarKeywords;
};
