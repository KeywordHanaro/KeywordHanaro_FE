import { Bank } from './Bank';
import { User } from './User';

// API 연동용 type
export type Account = {
  id: number;
  accountNumber: string;
  user: User;
  bank: Bank;
  name: string;
  balance: number;
  transferLimit: number;
  type: string;
  status: string;
};

export type masterPswdReq = {
  id: string;
  password: string;
};

export type pswdReq = {
  accountNumber: string;
  password: string;
};

// Frontend 렌더링 용 type
export type MyAccount = {
  type: 'MyAccount';
  accountName: string;
  bankId: number;
  accountId: number;
  accountNumber: string;
};

export type OthersAccount = {
  user?: user;
  type: 'OthersAccount';
  name: string;
  bankId: number;
  accountNumber: string;
};

type user = {
  id: string;
  name: string;
};

export type AccountUserNameRequest = {
  accountNumber: string;
  bankId: number;
};

export type AccountUserNameResponse = {
  name: string;
};

export type RecentAccount = MyAccount | OthersAccount;
