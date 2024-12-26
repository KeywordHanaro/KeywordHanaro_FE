import { Account } from './Account';
import { TBranch } from './Bank';
import { UserDetail } from './User';

////////////////////////////////////////
// 키워드 생성 type 정의
export type CreateKeywordRequest =
  | InquiryKeywordRequest
  | TransferKeywordRequest
  | TicketKeywordRequest
  | SettlementKeywordRequest;

// 공통 요청 타입
type BaseKeywordRequest = {
  type: 'INQUIRY' | 'TRANSFER' | 'TICKET' | 'SETTLEMENT';
  name: string;
  desc: string;
};

// 조회 키워드 요청 타입
type InquiryKeywordRequest = BaseKeywordRequest & {
  type: 'INQUIRY';
  account: { id: number };
  inquiryWord: string;
};

// 조회 거래 내역
export type Transaction = {
  id: string;
  account: Account;
  subAccount: Account;
  amount: number;
  type: string;
  alias: string;
  beforeBalance: number;
  afterBalance: number;
  createAt: string;
};

// 송금 키워드 요청 타입
type TransferKeywordRequest = BaseKeywordRequest & {
  type: 'TRANSFER';
  account: { id: number };
  subAccount: {
    accountNumber: string;
  };
  checkEveryTime: boolean;
  amount?: number; // check_every_time이 false일 때만 필요
};

// // 번호표 키워드 요청 타입
type TicketKeywordRequest = BaseKeywordRequest & {
  type: 'TICKET';
  branch: TBranch;
};

//**********정산 키워드 요청 타입****************//
//정산 생성 타입
type SettlementKeywordRequest = BaseKeywordRequest & {
  type: 'SETTLEMENT';
  amount?: number;
  checkEveryTime: boolean;
  groupMember: string;
  account: settlementAccount;
};

type settlementAccount = {
  id: number;
  accountNumber: string;
  accountName: string;
};

//정산 사용 시 카톡 메시지 요청용
export type activateSettlement = {
  amount: number;
  groupMember: string;
  account: Account;
};

/////////////////////////////
//*************************//
/////////////////////////////
export type UseKeywordResponse =
  | InquiryUsageResponse
  | TransferUsageResponse
  | TicketUsageResponse
  | SettlementUsageResponse;

// 키워드 사용 type 정의
export type InquiryUsageResponse = {
  id: number;
  user: UserDetail;
  type: 'INQUIRY';
  name: string;
  desc: string;
  seqOrder: number;
  account: Account;
  inquiryWord: string;
  favorite: boolean;
  transactions: Transaction[];
};

export type TransferUsageResponse = {
  id: number;
  user: UserDetail;
  type: 'TRANSFER';
  name: string;
  desc: string;
  seqOrder: number;
  account: Account;
  subAccount: Account;
  favorite: boolean;
  checkEveryTime: boolean;
};

export type TicketUsageResponse = {
  id: number;
  user: UserDetail;
  type: 'TICKET';
  name: string;
  desc: string;
  seqOrder: number;
  branch: TBranch;
  favorite: boolean;
};

export type SettlementUsageResponse = {
  id: number;
  user: UserDetail;
  type: 'SETTLEMENT';
  name: string;
  desc: string;
  seqOrder: number;
  account: Account;
  favorite: boolean;
  groupMember: groupMember[];
  amount: number;
  checkEveryTime: boolean;
};

type groupMember = {
  // id?: number;
  name: string;
  tel: string;
};
