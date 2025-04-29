import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { toggleWishlist, isInWishlist } = useShop();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button onClick={onClose} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
            
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xl">★</span>
                    <span className="ml-1">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <div className="space-y-4">
                  {/* <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button> */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-full py-3 rounded-md border ${
                      isInWishlist(product.id)
                        ? 'bg-red-50 border-red-500 text-red-500'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};