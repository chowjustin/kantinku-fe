export type User = {
  id: string;
  nama: string;
  email: string;
  nomor_telepon: string;
  nrp: string;
  created_at: string;
  role: string;
  canteen_id: string;
  nama_tenant: string;
  image_url: string;
};

export type UpdateUserRequest = {
  id?: string;
  nama?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
  nama_tenant?: string;
  nomor_telepon?: string;
  file?: File;
};

export type WithToken = {
  token: string;
};
