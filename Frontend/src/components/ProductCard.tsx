import React, { useState } from "react";
import { Heart, Star, ShoppingCart, Loader2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface ProductCardProps {
  product: {
    _id: string;
    productName: string;
    productLink: string;
    imageLink: string;
    salePrice: string; // Price with discount (e.g., "Rs.7,118")
    regularPrice: string; // Regular price (e.g., "Rs.9,490")
    rating?: number;
    brand?: string;
  };
  wishlists: Array<{ _id: string; productId: string; productLink: string }>;
  updateWishlist?: (productId: string, productLink: string, action: string) => Promise<void>;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  wishlists,
  updateWishlist
}) => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if the current product's link exists in the wishlist
  const isInWishlist = wishlists?.some(
    (item) => item.productLink === product.productLink
  );

  const handleWishlist = async () => {
    if (!auth?.token) {
      alert("Please login to add items to your wishlist");
      return;
    }

    setIsLoading(true);
    try {
      if (updateWishlist) {
        // Use the callback function passed from parent
        await updateWishlist(
          product._id, 
          product.productLink, 
          isInWishlist ? "remove" : "add"
        );
      }
    } catch (error) {
      console.error("Error managing wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract numeric values from price strings
  const extractPriceValue = (priceString) => {
    // Remove currency symbol and commas, then convert to number
    if (!priceString) return 0;
    return parseFloat(priceString.replace(/[^0-9.,]/g, '').replace(',', ''));
  };
  
  const regularPriceValue = extractPriceValue(product.regularPrice);
  const salePriceValue = extractPriceValue(product.salePrice);
  
  // Calculate discount percentage
  const discountPercentage = regularPriceValue && salePriceValue 
    ? Math.round(((regularPriceValue - salePriceValue) / regularPriceValue) * 100) 
    : 0;
  
  // Calculate savings amount
  const savingsAmount = regularPriceValue - salePriceValue;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <div className="overflow-hidden" style={{ height: "200px" }}>
            <img
              src={product?.imageLink}
              alt={product.productName}
              className={`w-full h-full object-cover cursor-pointer transition-transform duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
            />
          </div>
        </Link>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          disabled={isLoading}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all duration-300 ${
            isInWishlist 
              ? "bg-red-50 text-red-500 hover:bg-red-100" 
              : "bg-white text-gray-400 hover:text-red-500"
          }`}
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Heart 
              fill={isInWishlist ? "currentColor" : "none"} 
              size={20}
              className={isInWishlist ? "animate-pulse" : ""}
            />
          )}
        </button>

        {/* Discount badge */}
        {discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium shadow-sm">
            -{discountPercentage}%
          </span>
        )}
        
        {/* Brand badge (if available) */}
        {product?.brand && (
          <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
            {product.brand}
          </span>
        )}
      </div>

      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold mb-2 cursor-pointer hover:text-red-600 transition-colors line-clamp-2 h-14">
            {product?.productName}
          </h3>
        </Link>
        
        {/* Rating - Only show if available */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
              <Star size={16} className="text-yellow-500 fill-current" />
              <span className="ml-1 text-sm font-medium">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
        )}
        
        {/* Price info */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-xl font-bold text-red-600">{product.salePrice}</span>
              {regularPriceValue > salePriceValue && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {product.regularPrice}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className="text-xs text-green-600 font-medium">
                You save: {discountPercentage}%
              </span>
            )}
          </div>
          
          {/* Quick view */}
          <div className="flex gap-2">
            <a 
              href={product.productLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="View on website"
            >
              <ExternalLink size={18} className="text-gray-700" />
            </a>
            <Link 
              to={`/product/${product._id}`}
              className="p-2 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
              aria-label="View product details"
            >
              <ShoppingCart size={18} className="text-red-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};