export type User = {
  id: string;
  nama: string;
  email: string;
  nomor_telepon: string;
  password: string;
  nrp: string;
  created_at: string;
  role: string;
};

export type UpdateUserRequest = {
  id?: string;
  nama?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
};

export type WithToken = {
  token: string;
};
