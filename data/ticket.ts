import { TBranch } from '@/types/Branch';

export type TicketProps = {
  branch: TBranch | null;
  keyword: string | null;
};

export const ticketKeyword: TicketProps[] = [
  {
    branch: {
      id: '1',
      placeName: '성수역',
      distance: '100',
      addressName:
        '서울특별시 성동구 성수이로 113 [성수2가 3동 289010 제강빌딩 2층]',
      phone: '02)462-7627',
    },
    keyword: '성수 번호표',
  },
  {
    branch: {
      id: '2',
      placeName: '성수역',
      distance: '100',
      addressName:
        '서울특별시 성동구 성수이로 113 [성수2가 3동 289010 제강빌딩 2층]',
      phone: '02)462-7627',
    },
    keyword: '성수 번호표',
  },
];
