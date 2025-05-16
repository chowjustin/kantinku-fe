export type Menu = {
  id: string;
  nama: string;
  deskripsi: string;
  harga: number;
  stok: number;
  image_url: string | null;
};

export type UpdateMenuRequest = {
  nama?: string;
  deskripsi?: string;
  harga?: number;
  stok?: number;
  image: File;
};
