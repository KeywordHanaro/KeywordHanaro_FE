import { MyAccount, OthersAccount } from '@/types/Account';
import { groupMember } from '@/types/Keyword';

export type Account = {
  bankId: number;
  accountNumber: string;
  accountName?: string;
};

export type Keyword = {
  id: number;
  type:
    | 'transfer'
    | 'transferAmount'
    | 'inquiry'
    | 'ticket'
    | 'settlement'
    | 'settlementAmount'
    | 'multiKeyword';
  // 송금, 조회, 번호표, 정산
  title: string;
  description: string;
  isFavorite: boolean;
};

export type KeywordDetail =
  | TransferKeyword
  | TransferAmountKeyword
  | InquiryKeyword
  | TicketKeyword
  | SettlementKeyword
  | SettlementAmountKeyword;

type BaseKeyword = {
  id: number;
  title: string;
};

export type TransferKeyword = BaseKeyword & {
  type: 'transfer';
  accountFrom: MyAccount;
  accountTo: OthersAccount | MyAccount;
};

export type TransferAmountKeyword = BaseKeyword & {
  type: 'transferAmount';
  accountFrom: MyAccount;
  accountTo: OthersAccount | MyAccount;
  amount: string;
};

export type InquiryKeyword = BaseKeyword & {
  type: 'inquiry';
  accountFrom: MyAccount;
  searchKeyword: string;
};

export type TicketKeyword = BaseKeyword & {
  type: 'ticket';
  bankName: string;
};

export type SettlementKeyword = BaseKeyword & {
  type: 'settlement';
  accountFrom: MyAccount;
  memberList: groupMember[];
};

export type SettlementAmountKeyword = BaseKeyword & {
  type: 'settlementAmount';
  accountFrom: MyAccount;
  memberList: groupMember[];
  amount: number;
};

// export type MultiKeyword = BaseKeyword & {
//   type: 'multiKeyword';
//   keywordList?: MultiKeywordDetail[];
// };

export const getColorByType = (type: string) => {
  switch (type) {
    case 'TRANSFER':
      return 'pink';
    case 'INQUIRY':
      return 'green';
    case 'TICKET':
      return 'yellow';
    case 'SETTLEMENT':
    case 'DUES':
      return 'blue';
    case 'MULTI':
      return 'orange';
    default:
      return '';
  }
};

export const getNameByType = (type: string) => {
  switch (type) {
    case 'TRANSFER':
      return '송금';
    case 'INQUIRY':
      return '조회';
    case 'TICKET':
      return '번호표';
    case 'SETTLEMENT':
    case 'DUES':
      return '정산/회비';
    case 'MULTI':
      return '키워드 조합';
    default:
      return '';
  }
};
