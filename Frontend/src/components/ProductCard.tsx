import React from "react";
import { Heart } from "lucide-react";
import { Product } from "../types";
import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useShop();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product?.imageLink}
            alt={product.name}
            className="w-full h-48 object-cover cursor-pointer"
          />
        </Link>
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
        >
          <Heart
            className={`h-5 w-5 ${
              isInWishlist(product._id) ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
         
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            -{product?.salePrice}%
          </span>
        
      </div>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600">
            {product?.productName}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold">${product.saleprice}</span>
            
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product?.regularPrice}
              </span>
            
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
