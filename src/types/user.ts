export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  password: string;
  ttd: string;
  verified: boolean;
  authcode: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateUserRequest = {
  id?: string;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
};

export type WithToken = {
  token: string;
};
