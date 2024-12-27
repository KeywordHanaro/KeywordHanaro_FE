import { Account } from './Account';
import { TBranch } from './Bank';
import { UserDetail } from './User';

////////////////////////////////////////
// 키워드 생성 type 정의
export type CreateKeywordRequest =
  | InquiryKeywordRequest
  | TransferKeywordRequest
  | TicketKeywordRequest
  | SettlementKeywordRequest
  | MultiKeywordRequest;

// 공통 요청 타입
type BaseKeywordRequest = {
  type: 'INQUIRY' | 'TRANSFER' | 'TICKET' | 'SETTLEMENT' | 'DUES' | 'MULTI';
  name: string;
  desc: string;
};

// 조회 키워드 요청 타입
export type InquiryKeywordRequest = BaseKeywordRequest & {
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
export type TransferKeywordRequest = BaseKeywordRequest & {
  type: 'TRANSFER';
  account: { id: number };
  subAccount: {
    accountNumber: string;
  };
  checkEveryTime: boolean;
  amount?: number; // check_every_time이 false일 때만 필요
};

// // 번호표 키워드 요청 타입
export type TicketKeywordRequest = {
  type: 'TICKET';
  name: string;
  desc: string;
  branch: TBranch;
};

//**********정산 키워드 요청 타입****************//
//정산 생성 타입
type SettlementKeywordRequest = BaseKeywordRequest & {
  type: 'SETTLEMENT' | 'DUES';
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

export type MultiKeywordRequest = BaseKeywordRequest & {
  type: 'MULTI';
  multiKeywordIds: number[];
};

/////////////////////////////
//*************************//
/////////////////////////////
export type UseKeywordResponse =
  | InquiryUsageResponse
  | TransferUsageResponse
  | TicketUsageResponse
  | SettlementUsageResponse
  | MultiUsageResponse;

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

// amount 수정 페이지에서 있어야 해서 추가 -- 우선 nullable로 할게요
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
  amount?: number;
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
  type: 'SETTLEMENT' | 'DUES';
  name: string;
  desc: string;
  seqOrder: number;
  account: Account;
  favorite: boolean;
  groupMember: groupMember[];
  amount: number;
  checkEveryTime: boolean;
};

export type MultiUsageResponse = {
  id: number;
  user: UserDetail;
  type: 'MULTI';
  name: string;
  desc: string;
  seqOrder: number;
  favorite: boolean;
  multiKeyword: MultiKeywordDetail[];
};

export type MultiKeywordDetail = {
  id: number;
  parentId: number;
  keyword: UseKeywordResponse;
  seqOrder: number;
  serviceId?: number;
  amount?: number;
};

export type groupMember = {
  // id?: number;
  name: string;
  tel: string;
};
