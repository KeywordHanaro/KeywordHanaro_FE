export type User = {
  id: string;
  name: string;
};

export type UserDetail = {
  id: string;
  name: string;
  status: 'ACTIVE' | 'DELETED';
  permission: number;
};
