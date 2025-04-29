import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Uncommented
import { ProductCard } from './ProductCard'; // Uncommented
// import { products } from '../data/products';
import axios from 'axios';

export const FlashSalesSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProduct] = useState([]);
  const itemsPerPage = 4;

  let page=1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/getAll?page=${page}&limit=${itemsPerPage}`);

        setProduct(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(); // Call it properly
  }, []);

  const flashSaleProducts = products
  const nextSlide = async() => {
    // setStartIndex((prev) =>
    //   prev + itemsPerPage >= flashSaleProducts.length ? 0 : prev + itemsPerPage
    
    // );
    page++
    try {
      const response = await axios.get(`http://localhost:3000/api/products/getAll?page=${page}&limit=${itemsPerPage}`);

      setProduct(response.data.products);
    } catch (error) {
      console.error(error);
    }

  };

  const prevSlide =async () => {
    // setStartIndex((prev) =>
    //   prev === 0 ? Math.max(0, flashSaleProducts.length - itemsPerPage) : prev - itemsPerPage
    // );
    page--
    if (page<=0) page=1
    try {
      const response = await axios.get(`http://localhost:3000/api/products/getAll?page=${page}&limit=${itemsPerPage}`);

      setProduct(response.data.products);
    } catch (error) {
      console.error(error);
    }

  };


  const visibleProducts = flashSaleProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-4xl font-bold border-l-8 pl-3" style={{ borderColor: "rgba(219, 68, 68, 1)" }}>
            High Discounts Sales
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border hover:bg-gray-50"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border hover:bg-gray-50"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              // onProductClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
