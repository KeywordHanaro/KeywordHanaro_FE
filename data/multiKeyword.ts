import { TicketKeyword, TransferAmountKeyword } from './keyword';
import { FormData } from './settlement';
import { UseKeywordTransfer } from './transfer';

export const transferData = UseKeywordTransfer[0];

// 받아와야 하는 데이터
// 송금, 번호표, 정산
// 이때 송금과 정산은 값이 들어감. --> transferAmount, settlementAmount 형식

// type MultiSettlement = SettlementAmountKeyword & {
//   formData : FormData
// }

// TransferCompletion의 MSG에 들어가야 함.
// 멀티 키워드에서는 multiKeyword 들어감
// 추가
// Transfer도 불가능한게 TransferAmountKeyword 타입의 BaseKeyword 타입에 id, title 형식이 필요한데 키워드 생성 시기에 이게 있나? 없을 것 같아서 못쓸듯
export type MultiTransfer = TransferAmountKeyword & {
  multiKeyword: string;
};

// SettlementCompletion의 MSG에 들어가야 함
// 멀티 키워드에는 multiKeyword 들어가기에 nullable
export type MultiForm = FormData & {
  multiKeyword?: string;
};

export type MultiTicket = TicketKeyword & {
  waitNumber: number;
  multiKeyword: string;
  date: Date; // 서버시간 여기서 넣으면 서버랑 클라이언트 시간 불일치 오류 뜸. 백엔드에서 넣어주는 걸로 바꿔야 함.
  task: string;
};

export type MultiKeyword = MultiTransfer | MultiForm | MultiTicket;

// 송금은 다음과 같은 형식
// {
//   id: 1,
//   type: 'transferAmount',
//   title: '아빠 용돈',
//   accountFrom: {
//     type: 'MyAccount',
//     bankId: 81,
//     accountNumber: '456-4236-454-11',
//     accountName: '청년 힘내라 저축',
//   },
//   accountTo: {
//     bankId: 88,
//     type: 'OthersAccount',
//     accountNumber: '110-412-625368',
//     name: '정성호',
//   },
//   amount: '350000',
// },

// 정산은 다음과 같은 형식
// {
//   id: 2,
//   type: 'settlementAmount',
//   title: '터틀넥즈 정산',
//   accountFrom: {
//     type: 'MyAccount',
//     accountName: '하나패스 자유입출금',
//     bankId: 81,
//     accountNumber: '156-5483-111-6854',
//   },
//   memberList: [
//     { id: 1, name: '남인우', phoneNumber: '010-4824-1469' },
//     { id: 2, name: '박준용', phoneNumber: '010-9110-5864' },
//     { id: 3, name: '문서아', phoneNumber: '010-1541-2537' },
//     { id: 4, name: '정성엽', phoneNumber: '010-5392-3797' },
//     { id: 5, name: '김도희', phoneNumber: '010-4046-7672' },
//   ],
//   amount: 30000,
// },

// export type FormData = {
//   account: MyAccount;
//   members: Member[];
//   category: 'Settlement' | 'Dues';
//   checkEveryTime: boolean;
//   amount: string;
//   keywordName: string;
// };

//번호표는 다음과 같은 형식. 대기 번호는 뽑는 순간 정해져야하는데.. 백엔드에서 처리해야할듯?
// {
//   id: 3,
//   type: 'ticket',
//   title: '성수점 번호표',
//   bankName: '성수점',
//   waitNumber: 117
// },

// ================================================

export const multiKeywordData: MultiKeyword[] = [
  {
    id: 1,
    type: 'transferAmount',
    title: '아빠 용돈',
    accountFrom: {
      type: 'MyAccount',
      bankId: 81,
      accountNumber: '456-4236-454-11',
      accountName: '청년 힘내라 저축',
    },
    accountTo: {
      bankId: 88,
      type: 'OthersAccount',
      accountNumber: '110-412-625368',
      name: '정성호',
    },
    amount: '350000',
    multiKeyword: 'MultiTransfer',
  },

  {
    fromAccount: {
      accountName: '내 나라사랑 계좌',
      bankId: 111,
      accountNumber: '123-4567-2221',
      type: 'MyAccount',
    },
    members: [
      { id: 1, name: '김인선', phoneNumber: '010-4824-1469' },
      { id: 2, name: '김도희', phoneNumber: '010-9110-5864' },
      { id: 3, name: '남인우', phoneNumber: '010-1541-2537' },
      { id: 4, name: '조민석', phoneNumber: '010-5392-3797' },
      { id: 5, name: '박준용', phoneNumber: '010-4046-7672' },
      { id: 6, name: '정성엽', phoneNumber: '010-4046-7672' },
      { id: 7, name: '문서아', phoneNumber: '010-4046-7672' },
    ],
    category: 'Settlement',
    checkEveryTime: false,
    amount: '1,234',
    keywordName: 'test',
    multiKeyword: 'MultiForm',
  },

  {
    id: 4,
    type: 'ticket',
    title: '성수점 번호표',
    bankName: '성수역',
    waitNumber: 117,
    multiKeyword: 'MultiTicket',
    date: new Date(),
    task: '예금',
  },
];
