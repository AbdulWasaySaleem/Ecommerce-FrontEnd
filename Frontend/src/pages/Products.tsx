import { useState, useEffect, useCallback } from "react";
import { ProductCard } from "../components/ProductCard";
import api from "../services/api";
import { useAuth } from "../context/authContext";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 100;
  const { auth } = useAuth();

  // Function to fetch wishlist - made reusable
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

  // Function to fetch products
  const fetchProducts = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const response = await api.get(
        `/api/products/getAll?page=${page}&limit=${productsPerPage}`
      );
      setProductList(response.data.products);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update wishlist function that can be passed to ProductCard
  const updateWishlist = async (productId, productLink, action) => {
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
      // Refresh wishlist in case of error to ensure UI is in sync
      fetchWishlist();
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Calculate page ranges for pagination
  const getPaginationRange = () => {
    const range = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }
    
    return range;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h2
            className="text-4xl font-bold border-l-8 pl-3 mb-6 transition-all duration-300 hover:pl-4"
            style={{ borderColor: "rgba(219, 68, 68, 1)" }}
          >
            All Products
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="h-10 w-10 text-red-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productList.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    wishlists={wishlist}
                    updateWishlist={updateWishlist}
                  />
                ))}
              </div>

              {/* Empty State */}
              {productList.length === 0 && !isLoading && (
                <div className="text-center py-10">
                  <h3 className="text-xl font-medium text-gray-600">No products found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10 gap-2 flex-wrap items-center">
                  {/* First Page */}
                  {currentPage > 2 && (
                    <button
                      onClick={() => handlePageChange(1)}
                      className="px-4 py-2 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition-colors"
                    >
                      1
                    </button>
                  )}

                  {/* Ellipsis */}
                  {currentPage > 3 && (
                    <span className="px-2">...</span>
                  )}

                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:hover:bg-gray-200 flex items-center justify-center"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Page Numbers */}
                  {getPaginationRange().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        currentPage === page
                          ? "bg-red-500 text-white shadow-md scale-110"
                          : "bg-gray-200 text-black hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:hover:bg-gray-200 flex items-center justify-center"
                  >
                    <ChevronRight size={20} />
                  </button>

                  {/* Ellipsis */}
                  {currentPage < totalPages - 2 && (
                    <span className="px-2">...</span>
                  )}

                  {/* Last Page */}
                  {currentPage < totalPages - 1 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="px-4 py-2 rounded-full bg-gray-200 text-black hover:bg-gray-300 transition-colors"
                    >
                      {totalPages}
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};