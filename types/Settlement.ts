import { Account } from './Account';
import { groupMember } from './Keyword';

export type SettlementRequest = {
  code?: string;
  amount: number;
  account: Account;
  groupMember: groupMember[];
  type: 'Settlement' | 'Dues';
};

export type SettlementMultiRequest = {
  code: string;
  settlementList: SettlementRequest[];
};
