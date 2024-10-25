import { Account } from './keyword';

export type Transaction = {
  id: number;
  accountInfo: Account;
  dateTime: string;
  amount: number;
  balance: number;
};

export const transactionList: Transaction[] = [
  {
    id: 1,
    accountInfo: {
      bankId: 2,
      accountNumber: '123551231235',
      accountName: '정성엽',
    },
    dateTime: '2024-10-23T09:58:22Z',
    amount: 50000,
    balance: 20000000000,
  },
  {
    id: 2,
    accountInfo: {
      bankId: 3,
      accountNumber: '123551231235',
      accountName: '문서아',
    },
    dateTime: '2024-10-23T09:58:22Z',
    amount: -24000,
    balance: 20000000000,
  },
  {
    id: 3,
    accountInfo: {
      bankId: 4,
      accountNumber: '123551231235',
      accountName: '김도희',
    },
    dateTime: '2024-10-23T09:58:22Z',
    amount: 5000000,
    balance: 20000000000,
  },
  {
    id: 4,
    accountInfo: {
      bankId: 7,
      accountNumber: '123551231235',
      accountName: '코레일 유통',
    },
    dateTime: '2024-10-23T09:58:22Z',
    amount: 14200,
    balance: 20000000000,
  },
  {
    id: 6,
    accountInfo: {
      bankId: 11,
      accountNumber: '123551231235',
      accountName: '조민석',
    },
    dateTime: '2024-10-23T09:58:22Z',
    amount: 14200,
    balance: 20000000000,
  },
  {
    id: 8,
    accountInfo: {
      bankId: 20,
      accountNumber: '123551231235',
      accountName: '남인우',
    },
    dateTime: '2024-10-23T09:58:22Z',
    amount: 14200,
    balance: 20000000000,
  },
  {
    id: 45,
    accountInfo: {
      bankId: 23,
      accountNumber: '123551231235',
      accountName: '김인선',
    },
    dateTime: '2024-10-23T09:58:22Z',
    amount: -50000,
    balance: 20000000000,
  },
  {
    id: 12,
    accountInfo: {
      bankId: 27,
      accountNumber: '123551231235',
      accountName: 'CU 성수터틀넥점',
    },
    dateTime: '2024-10-23T23:58:22Z',
    amount: 14200,
    balance: 20000000000,
  },
  {
    id: 13,
    dateTime: '2024-11-27T09:58:22Z',
    accountInfo: {
      bankId: 31,
      accountNumber: '123551231235',
      accountName: '박준용',
    },
    amount: 14200,
    balance: 20000000000,
  },
  {
    id: 15,
    dateTime: '2024-10-23T09:58:22Z',
    accountInfo: {
      bankId: 32,
      accountNumber: '123551231235',
      accountName: '터틀넥즈 공통계좌',
    },
    amount: -1200,
    balance: 20000000000,
  },
  {
    id: 51,
    dateTime: '2023-10-24T09:58:22Z',
    accountInfo: {
      bankId: 35,
      accountNumber: '123551231235',
      accountName: '터틀넥즈 곗돈',
    },
    amount: 14200,
    balance: 20000000000,
  },
  {
    id: 16,
    dateTime: '2024-09-24T09:58:22Z',
    accountInfo: {
      bankId: 37,
      accountNumber: '123551231235',
      accountName: '터틀넥즈 꼬북꼬북계좌',
    },
    amount: 14200,
    balance: 20000000000,
  },
];
