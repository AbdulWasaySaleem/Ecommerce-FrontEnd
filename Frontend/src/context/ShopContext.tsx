import React, { createContext, useContext, useState } from 'react';
import { Product, WishlistItem } from '../types';

interface ShopContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item._id === product._id);
      if (exists) {
        return prevWishlist.filter((item) => item._id !== product._id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <ShopContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
