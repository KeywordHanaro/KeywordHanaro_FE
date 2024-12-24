import { Account, MyAccount, OthersAccount } from './Account';

// API 연동용 type
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

// Frontend 렌더링 용 type
export type MyAccountWithBalance = {
  balance: string;
} & MyAccount;

export type TransferProps =
  | {
      type: 'WithoutAmount';
      fromAccount: MyAccountWithBalance;
      toAccount: OthersAccount | MyAccount;
      checkEverytime: true;
      amount: number;
      keyword: string;
    }
  | {
      type: 'WithAmount';
      fromAccount: MyAccountWithBalance;
      toAccount: OthersAccount | MyAccount;
      checkEverytime: false;
      amount: number;
      keyword: string;
    };
