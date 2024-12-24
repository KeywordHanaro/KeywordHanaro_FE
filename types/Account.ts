import { Bank } from './Bank';
import { User } from './User';

// API 연동용 type
export type Account = {
  createAt: string;
  updateAt: string;
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

export type pswdReq = {
  accountNumber: string;
  password: string;
};

// Frontend 렌더링 용 type
export type MyAccount = {
  type: 'MyAccount';
  accountName: string;
  bankId: number;
  accountNumber: string;
};

export type OthersAccount = {
  type: 'OthersAccount';
  name: string;
  bankId: number;
  accountNumber: string;
};
