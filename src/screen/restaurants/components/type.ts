export interface ThucDonType {
  restaurantId: string;
  menuId: string;
  categoryId: string;
  name: string;
  images: string;
  description: string;
  price: number,
  originalPrice: number,
  like: number | null;
  sold: number | null;
  flashSale: boolean;
  timeFlastSale: string
  createdAt: Date;
}

export interface CategoryData {
    categoryId: string,
    restaurantId: string;
    name: string;
    code: string;
    createdAt: Date;
  }
  
