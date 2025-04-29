import React, { useState ,useEffect} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Link } from "react-router-dom";
import { products } from '../data/products';
import axios from 'axios';


export const ExploreProducts = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProduct] = useState([]);
  const itemsPerPage = 8;

  let page=1

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


  const nextSlide =async () => {
    page++
    try {
      const response = await axios.get(`http://localhost:3000/api/products/getAll?page=${page}&limit=${itemsPerPage}`);

      setProduct(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const prevSlide = async() => {
    page--
    if (page<=0) page=1
    try {
      const response = await axios.get(`http://localhost:3000/api/products/getAll?page=${page}&limit=${itemsPerPage}`);

      setProduct(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
      <h2 className="text-4xl font-bold border-l-8 pl-3 mb-6" style={{ borderColor: "rgba(219, 68, 68, 1)" }}> Explore Our Products</h2>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={() => {}}
          />
        ))}
      </div>

      <div className="text-center mt-8">
  <Link to="/products">
  <button
  className="text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors"
  style={{ backgroundColor: "rgba(219, 68, 68, 1)", borderRadius: "0px" }}
>
  View All Products
</button>

  </Link>
</div>
    </div>
  );
};