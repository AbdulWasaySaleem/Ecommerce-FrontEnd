import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import axios from 'axios';
import api from '../services/api';

export const ProductDetail = () => {
  const { id } = useParams();
  const { toggleWishlist, isInWishlist } = useShop();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/getProduct/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={product.imageLink}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={product.imageLink}
                      alt={`${product.productName} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">{product.productName}</h1>

              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-gray-600">(No Reviews)</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">{product.salePrice}</span>
                  <span className="text-lg text-gray-500 line-through">
                    {product.regularPrice}
                  </span>
                </div>

                <p className="text-gray-600">
                  Brand: <span className="font-semibold">{product.brand}</span>
                </p>
              </div>

              <div className="flex items-center gap-4">
              <button
                  onClick={() => window.open(product.productLink, '_blank')}
                  className="px-6 py-3 rounded-md border bg-black text-white"
                >
                  Buy Now
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-md border ${
                    isInWishlist(product._id)
                      ? 'bg-red-50 border-red-500 text-red-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Best Selling section can be added here if needed */}
      </div>
    </div>
  );
};
