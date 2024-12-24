import { RecentAccount } from '@/types/Account';
import { MyAccountWithBalance } from '@/types/Transfer';

// export type MyAccount = {
//   type: 'MyAccount';
//   accountName: string;
//   bankId: number;
//   accountNumber: string;
// };

// export type OthersAccount = {
//   type: 'OthersAccount';
//   name: string;
//   bankId: number;
//   accountNumber: string;
// };

// export type RecentAccount = MyAccount | OthersAccount;

export const MyAccounts: MyAccountWithBalance[] = [
  {
    type: 'MyAccount',
    accountName: '성엽이 용돈',
    bankId: 81,
    accountId: 1,
    balance: '220,400',
    accountNumber: '156-5483-111-6854',
  },
  {
    type: 'MyAccount',
    accountName: '청년 힘내라 저축',
    bankId: 81,
    balance: '1,800,000',
    accountId: 2,
    accountNumber: '456-4236-454-11',
  },
  {
    type: 'MyAccount',
    accountName: '수수료패스 여행',
    bankId: 81,
    balance: '80,000',
    accountId: 3,
    accountNumber: '222-3423-2223',
  },
  {
    type: 'MyAccount',
    accountName: '보금자리 주택청약',
    bankId: 81,
    balance: '9,000,000',
    accountId: 4,
    accountNumber: '222-3444-34-2224',
  },
];

export const RecentAccounts: RecentAccount[] = [
  {
    type: 'MyAccount',
    accountName: '서아의 예적금통장',
    bankId: 81,
    accountId: 1,

    accountNumber: '222-2222-2225',
  },
  {
    type: 'OthersAccount',
    name: '도희',
    bankId: 3,
    accountNumber: '223-2222-2221',
  },
  {
    type: 'OthersAccount',
    name: '인선',
    bankId: 11,
    accountNumber: '224-2222-2222',
  },
  {
    type: 'OthersAccount',
    name: '준용',
    bankId: 20,
    accountNumber: '225-2222-2223',
  },
  {
    type: 'OthersAccount',
    name: '성엽',
    bankId: 32,
    accountNumber: '226-2222-2224',
  },
  {
    type: 'OthersAccount',
    name: '인우',
    bankId: 48,
    accountNumber: '227-2222-2225',
  },
  {
    type: 'OthersAccount',
    name: '민석',
    bankId: 88,
    accountNumber: '228-2222-2226',
  },
];

/** account list item type test
export const MyAccounts = [
  {
    accountName: '문서아 취미 계쫘',
    bankId: 81,
    accountNumber: '222-2222-2221',
  },
  {
    accountName: '문서아 적금',
    bankId: 81,
    isFavorite: true,
    accountNumber: '222-2222-2222',
  },
  {
    accountName: '문서아 여행계좌',
    bankId: 81,
    isFavorite: false,
    accountNumber: '222-2222-2223',
  },
  {
    name: '문서아 파이팅',
    bankId: 81,
    accountNumber: '222-2222-2224',
  },
  {
    name: '문서아 즐거워',
    bankId: 81,
    isFavorite: true,
    accountNumber: '222-2222-2225',
  },
];
*/
