import { Account } from './Account';
import { TBranch } from './Bank';
import { UserDetail } from './User';

////////////////////////////////////////
// 키워드 생성 type 정의
export type CreateKeywordRequest =
  | InquiryKeywordRequest
  | TransferKeywordRequest
  | TicketKeywordRequest;

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

// 송금 키워드 요청 타입
type TransferKeywordRequest = BaseKeywordRequest & {
  type: 'TRANSFER';
  account: { id: number };
  subAccount: {
    accountNumber: string;
  };
  check_every_time: boolean;
  amount?: number; // check_every_time이 false일 때만 필요
};

// // 번호표 키워드 요청 타입
type TicketKeywordRequest = {
  type: 'TICKET';
  name: string;
  desc: string;
  branch: TBranch;
};

/////////////////////////////
export type UseKeywordResponse =
  | InquiryUsageResponse
  | TransferUsageResponse
  | TicketUsageResponse;

// 키워드 사용 type 정의
type InquiryUsageResponse = {
  id: number;
  user: UserDetail;
  type: 'INQUIRY';
  name: string;
  desc: string;
  seqOrder: number;
  account: Account;
  inquiryWord: string;
  favorite: boolean;
};

type TransferUsageResponse = {
  id: number;
  user: UserDetail;
  type: 'TRANSFER';
  name: string;
  desc: string;
  seqOrder: number;
  account: Account;
  subAccount: Account;
  favorite: boolean;
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
