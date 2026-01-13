export interface Category {
  id: string;
  name: string;
  handle: string;
  description?: string;
  imageUrl?: string;
  productCount?: number;
  createdAt: Date;
  updatedAt: Date;
  image?: CategoryImage;
}

interface CategoryImage {
  id: string;
  url: string;
}