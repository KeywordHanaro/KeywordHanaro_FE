import { Account } from './Account';

export type TransferData = {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
};

export type TransferResponse = {
  id: number;
  account: Account;
  subAccount: Account;
  amount: number;
  type: string;
  alias: string;
  beforeBalance: number;
  afterBalance: number;
  createAt: string;
  status: string;
};
