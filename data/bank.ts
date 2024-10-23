type Bank = {
  id: number;
  bankname: string;
  image: string;
};

export type Branch = {
  branchId: number;
  branchName: string;
  distance: number;
  address: string;
  contact: string;
  businessHours: string;
};

export const bankList: Bank[] = [
  {
    id: 2,
    bankname: '산업은행',
    image: '/images/banks/KDB.jpg',
  },
  {
    id: 3,
    bankname: '기업은행',
    image: '/images/banks/IBK.jpg',
  },
  {
    id: 4,
    bankname: '국민은행',
    image: '/images/banks/KB.jpg',
  },
  {
    id: 7,
    bankname: '수협은행',
    image: '/images/banks/SH.jpg',
  },
  {
    id: 11,
    bankname: '농협은행',
    image: '/images/banks/NH.jpg',
  },
  {
    id: 20,
    bankname: '우리은행',
    image: '/images/banks/Woori.jpg',
  },
  {
    id: 23,
    bankname: 'SC은행',
    image: '/images/banks/SC.jpg',
  },
  {
    id: 27,
    bankname: '씨티은행',
    image: '/images/banks/Citi.jpg',
  },
  {
    id: 31,
    bankname: '대구은행',
    image: '/images/banks/DGB.jpg',
  },
  {
    id: 32,
    bankname: '부산은행',
    image: '/images/banks/BNK.jpg',
  },
  {
    id: 34,
    bankname: '광주은행',
    image: '/images/banks/GJ.jpg',
  },
  {
    id: 35,
    bankname: '제주은행',
    image: '/images/banks/Shinhan.jpg',
  },
  {
    id: 37,
    bankname: '전북은행',
    image: '/images/banks/GJ.jpg',
  },
  {
    id: 39,
    bankname: '경남은행',
    image: '/images/banks/BNK.jpg',
  },
  {
    id: 45,
    bankname: '새마을금고',
    image: '/images/banks/SME.jpg',
  },
  {
    id: 48,
    bankname: '신협은행',
    image: '/images/banks/Shinhyup.jpg',
  },
  {
    id: 71,
    bankname: '우체국',
    image: '/images/banks/Post.jpg',
  },
  {
    id: 81,
    bankname: 'KEB하나은행',
    image: '/images/banks/Hana.jpg',
  },
  {
    id: 88,
    bankname: '신한은행',
    image: '/images/banks/Shinhan.jpg',
  },
  {
    id: 89,
    bankname: 'K뱅크',
    image: '/images/banks/Kbank.jpg',
  },
  {
    id: 90,
    bankname: '카카오뱅크',
    image: '/images/banks/Kakao.jpg',
  },
  {
    id: 92,
    bankname: '토스뱅크',
    image: '/images/banks/Toss.jpg',
  },
  {
    id: 103,
    bankname: 'SBI저축은행',
    image: '/images/banks/SBI.jpg',
  },
];

export const branchList = [
  {
    branchId: 1,
    branchName: '도심',
    distance: 2,
    address: '대한민국 서울특별시 중구',
    contact: '010-1234-5678',
    businessHours: '월-금: 오전 9시 - 오후 5시',
  },
  {
    branchId: 2,
    branchName: '서쪽',
    distance: 18,
    address: '대한민국 서울특별시 서대문구',
    contact: '010-2345-6789',
    businessHours: '월-금: 오전 11시 - 오후 5시',
  },
  {
    branchId: 3,
    branchName: '교외',
    distance: 40,
    address: '대한민국 경기도 성남시 분당구',
    contact: '010-3456-7890',
    businessHours: '월-토: 오전 10시 - 오후 6시',
  },
  {
    branchId: 4,
    branchName: '중앙',
    distance: 14,
    address: '대한민국 서울특별시 강남구',
    contact: '010-4567-8901',
    businessHours: '월-일: 오전 9시 - 오후 9시',
  },
  {
    branchId: 5,
    branchName: '동쪽',
    distance: 27,
    address: '대한민국 서울특별시 동대문구',
    contact: '010-5678-9012',
    businessHours: '월-토: 오전 10시 - 오후 6시',
  },
  {
    branchId: 6,
    branchName: '북쪽',
    distance: 25,
    address: '대한민국 서울특별시 노원구',
    contact: '010-6789-0123',
    businessHours: '월-금: 오전 11시 - 오후 5시',
  },
  {
    branchId: 7,
    branchName: '남쪽',
    distance: 37,
    address: '대한민국 서울특별시 송파구',
    contact: '010-7890-1234',
    businessHours: '월-금: 오전 11시 - 오후 5시',
  },
  {
    branchId: 8,
    branchName: '상류',
    distance: 9,
    address: '대한민국 서울특별시 용산구',
    contact: '(456)7890-1234',
    businessHours: '월-금 오전8시 - 오후4시',
  },
];
