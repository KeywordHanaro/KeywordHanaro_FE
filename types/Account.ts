import { Bank } from './Bank';
import { User } from './User';

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
