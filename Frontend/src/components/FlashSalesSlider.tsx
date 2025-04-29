import React, { useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { ProductCard } from './ProductCard';
import api from '../services/api';
import { useAuth } from '../context/authContext';

export const FlashSalesSlider = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const itemsPerPage = 4;
  const { auth } = useAuth();

  // Function to fetch products
  const fetchProducts = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/api/products/getAll?page=${page}&limit=${itemsPerPage}`);
      setProducts(response.data.products);
      setTotalPages(response.data.pages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  // Function to fetch wishlist
  const fetchWishlist = useCallback(async () => {
    if (!auth?.token) return;
    
    try {
      const response = await api.get("/api/user/wishlist", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setWishlist(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [auth?.token]);

  // Update wishlist function for ProductCard
  const updateWishlist = async (productId, productLink, action) => {
    if (!auth?.token) {
      alert("Please login to add items to your wishlist");
      return;
    }
    
    try {
      if (action === "add") {
        await api.post(
          "/api/user/addtowishlist",
          { productId },
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        // Optimistically update wishlist
        setWishlist(prev => [...prev, { productId, productLink }]);
      } else {
        const wishlistItem = wishlist.find(item => item.productLink === productLink);
        if (wishlistItem) {
          await api.delete(`/api/user/removefromwishlist/${wishlistItem._id}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
          // Optimistically update wishlist
          setWishlist(prev => prev.filter(item => item.productLink !== productLink));
        }
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      // Refresh wishlist in case of error
      fetchWishlist();
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const nextSlide = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
    } else {
      // Loop back to first page
      setCurrentPage(1);
    }
  };

  const prevSlide = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      setCurrentPage(prevPage);
    } else {
      // Loop to last page
      setCurrentPage(totalPages);
    }
  };

  // Find products with highest discount
  const getSortedProducts = () => {
    return products.slice();
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 
            className="text-4xl font-bold border-l-8 pl-3 transition-all duration-300 hover:pl-4" 
            style={{ borderColor: "rgba(219, 68, 68, 1)" }}
          >
            High Discounts Sales
          </h2>
          <p className="text-gray-600 mt-2">Discover our best deals and biggest savings</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            disabled={isLoading}
            className="p-2 rounded-full border hover:bg-gray-50 transition-colors disabled:opacity-50"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isLoading}
            className="p-2 rounded-full border hover:bg-gray-50 transition-colors disabled:opacity-50"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="h-10 w-10 text-red-500 animate-spin" />
        </div>
      ) : (
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  wishlists={wishlist}
                  updateWishlist={updateWishlist}
                />
              ))
            ) : (
              <div className="col-span-4 text-center py-10">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
          
          {/* Page indicator */}
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div 
                key={page} 
                className={`w-2 h-2 rounded-full mx-1 ${
                  currentPage === page ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};