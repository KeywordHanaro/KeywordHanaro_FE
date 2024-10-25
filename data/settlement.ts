import { MyAccount } from '@/data/account';
import { Member } from '@/data/member';

// 내 .... 계좌로 -> MyAccount

// .... 님에게 정산요청 할게요 -> member

export type settlement = {
  MyAccount: MyAccount;
  Members: Member[];
  // 정산이냐 회비냐 이거 판단하는 플래그 추가해야할듯
  isAdjustment: boolean;
};

export const settlementData = {
  myAccunt: {
    accountName: '내 나라사랑 계좌',
    bankId: 111,
    accountNumber: '123-4567-2221',
  },
  Members: [
    { id: 1, name: '김인선', phoneNumber: '010-4824-1469' },
    { id: 2, name: '김도희', phoneNumber: '010-9110-5864' },
    { id: 3, name: '남인우', phoneNumber: '010-1541-2537' },
    { id: 4, name: '조민석', phoneNumber: '010-5392-3797' },
    { id: 5, name: '박준용', phoneNumber: '010-4046-7672' },
    { id: 6, name: '정성엽', phoneNumber: '010-4046-7672' },
    { id: 7, name: '문서아', phoneNumber: '010-4046-7672' },
  ],
  isAdjustment: true,
};
