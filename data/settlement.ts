import { Member } from '@/data/member';
import { MyAccount } from '@/types/Account';

export type FormData = {
  fromAccount: MyAccount;
  members: Member[];
  category: 'Settlement' | 'Dues';
  checkEveryTime: boolean;
  amount: string;
  keywordName: string;
};

export const settlementData: FormData = {
  fromAccount: {
    accountName: '내 나라사랑 계좌',
    bankId: 111,
    accountId: 1,
    accountNumber: '123-4567-2221',
    type: 'MyAccount',
  },
  members: [
    { id: 1, name: '김인선', phoneNumber: '010-2222-2222' },
    { id: 2, name: '김도희', phoneNumber: '010-3333-3333' },
    { id: 3, name: '남인우', phoneNumber: '010-1111-1111' },
    { id: 4, name: '조민석', phoneNumber: '010-5555-5555' },
    { id: 5, name: '박준용', phoneNumber: '010-7777-7777' },
    { id: 6, name: '정성엽', phoneNumber: '010-6666-6666' },
    { id: 7, name: '문서아', phoneNumber: '010-4444-4444' },
  ],
  category: 'Settlement',
  checkEveryTime: false,
  amount: '1,234',
  keywordName: 'test',
};
