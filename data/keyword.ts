export type Keyword = {
  id: number;
  type: 'transfer' | 'inquiry' | 'ticket' | 'settlement';
  // 송금, 조회, 번호표, 정산
  title: string;
  description: string;
  isFavorite: boolean;
};

export const keywordList: Keyword[] = [
  {
    id: 1,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 2,
    type: 'inquiry',
    title: '월급 확인',
    description: '조회 > 급여',
    isFavorite: true,
  },
  {
    id: 3,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 4,
    type: 'ticket',
    title: '성수점 번호표',
    description: '번호표 > 성수역점',
    isFavorite: true,
  },
  {
    id: 5,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: false,
  },
  {
    id: 6,
    type: 'transfer',
    title: '성엽이 용돈',
    description: '송금 > 정성엽 > 5만원',
    isFavorite: true,
  },
];
