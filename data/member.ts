import { groupMember } from '@/types/Keyword';

export type Member = {
  id: number;
  name: string;
  tel: string;
};

export const MemberList: groupMember[] = [
  { name: '남인우', tel: '010-1111-1111' },
  { name: '김인선', tel: '010-2222-2222' },
  { name: '김도희', tel: '010-3333-3333' },
  { name: '문서아', tel: '010-4444-4444' },
  { name: '조민석', tel: '010-5555-5555' },
  { name: '정성엽', tel: '010-6666-6666' },
  { name: '박준용', tel: '010-7777-7777' },
];
