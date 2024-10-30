import { Branch } from './bank';

export type TicketProps = {
  branch: Branch | null;
  keyword: string | null;
};

export const ticketKeyword: TicketProps[] = [
  {
    branch: {
      branchId: 1,
      branchName: '성수역',
      distance: 100,
      address:
        '서울특별시 성동구 성수이로 113 [성수2가 3동 289010 제강빌딩 2층]',
      contact: '02)462-7627',
      businessHours: '평일 09:00 ~ 16:00(영업일 기준)',
    },
    keyword: '성수 번호표',
  },
  {
    branch: {
      branchId: 2,
      branchName: '서울숲',
      distance: 200,
      address:
        '서울특별시 성동구 아차산로 6, 누디트서울숲 2층 (성수1가2동 656-1731번지)',
      contact: '02-469-1111',
      businessHours: '평일 09:00 ~ 16:00(영업일 기준)',
    },
		keyword:'서울숲 번호표'
  },
];
