export type CreateKeywordRequest =
  | InquiryKeywordRequest
  | TransferKeywordRequest;

// 공통 요청 타입
type BaseKeywordRequest = {
  type: 'INQUIRY' | 'TRANSFER' | 'TICKET' | 'SETTLEMENT';
  name: string;
  desc: string;
};

// // 계좌 정보 타입
// interface AccountInfo {
//   id: number;
// }

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
// interface TicketKeywordRequest extends BaseKeywordRequest {
//   type: 'TICKET';
//   branch: {
//     address_name: string;
//     distance: string;
//     id: string;
//     phone: string;
//     place_name: string;
//     road_address_name: string;
//     x: string;
//     y: string;
//   };
// }

// // 정산 키워드 요청 타입
// interface SettlementKeywordRequest extends BaseKeywordRequest {
//   type: 'SETTLEMENT';
//   account: AccountInfo;
//   groupMember: Array<{
//     name: string;
//     tel: string;
//   }>;
//   check_every_time: boolean;
//   amount?: number; // check_every_time이 false일 때만 필요
// }

// // 키워드 요청 타입 (모든 가능한 요청 타입의 유니온)
// type KeywordRequest =
//   | InquiryKeywordRequest
//   | TransferKeywordRequest
//   | TicketKeywordRequest
//   | SettlementKeywordRequest;

// // 응답 타입
// interface KeywordResponse {
//   id: number;
//   userId: string;
//   type: 'INQUIRY' | 'TRANSFER' | 'TICKET' | 'SETTLEMENT';
//   name: string;
//   desc: string;
//   seqOrder: number;
//   account?: {
//     createAt: string;
//     updateAt: string;
//     id: number;
//     accountNumber: string;
//     userId: string;
//     bankId: number;
//     name: string;
//     password: string;
//     balance: number;
//     transferLimit: number;
//     type: string;
//     mine: boolean;
//     status: string;
//   };
//   subAccount?: {
//     accountNumber: string;
//   } | null;
//   inquiryWord?: string;
//   checkEveryTime?: boolean | null;
//   amount?: number | null;
//   groupMember?: Array<{
//     name: string;
//     tel: string;
//   }> | null;
//   branch?: {
//     address_name: string;
//     distance: string;
//     id: string;
//     phone: string;
//     place_name: string;
//     road_address_name: string;
//     x: string;
//     y: string;
//   } | null;
//   favorite: boolean;
// }
