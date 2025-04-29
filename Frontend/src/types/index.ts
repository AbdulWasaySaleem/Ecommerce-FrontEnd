export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  discount?: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}