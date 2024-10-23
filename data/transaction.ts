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
      accountName: 'TEST',
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
      accountName: 'TEST1',
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
      accountName: 'TEST3',
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
      accountName: 'TEST4',
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
      accountName: 'TEST5',
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
      accountName: 'TEST8',
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
      accountName: 'TEST45',
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
      accountName: 'TEST12',
    },
    dateTime: '2024-10-22T09:58:22Z',
    amount: 14200,
    balance: 20000000000,
  },
  {
    id: 13,
    dateTime: '2024-10-27T09:58:22Z',
    accountInfo: {
      bankId: 31,
      accountNumber: '123551231235',
      accountName: 'TEST13',
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
      accountName: 'TEST15',
    },
    amount: -1200,
    balance: 20000000000,
  },
  {
    id: 16,
    dateTime: '2024-10-24T09:58:22Z',
    accountInfo: {
      bankId: 35,
      accountNumber: '123551231235',
      accountName: 'TEST16',
    },
    amount: 14200,
    balance: 20000000000,
  },
  {
    id: 16,
    dateTime: '2024-10-24T09:58:22Z',
    accountInfo: {
      bankId: 37,
      accountNumber: '123551231235',
      accountName: 'TEST16',
    },
    amount: 14200,
    balance: 20000000000,
  },
];
