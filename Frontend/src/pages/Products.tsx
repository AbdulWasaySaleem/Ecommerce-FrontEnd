import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import axios from 'axios';

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const productsPerPage = 100;

  const fetchProducts = async (page) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/products/getAll?page=${page}&limit=${productsPerPage}`);
      setProductList(response.data.products);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-4xl font-bold border-l-8 pl-3 mb-6" style={{ borderColor: "rgba(219, 68, 68, 1)" }}>
            All Products
          </h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productList.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onProductClick={() => {}}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-10 gap-2 flex-wrap">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-full bg-gray-200 text-black"
            >
              &lt; Prev
            </button>

            {/* Current and next few pages */}
            {Array.from({ length: Math.min(5, totalPages - currentPage + 1) }, (_, i) => currentPage + i).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === page ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-full bg-gray-200 text-black"
            >
              Next &gt;
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
