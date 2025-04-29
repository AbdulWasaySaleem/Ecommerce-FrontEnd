import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import api from "../services/api";


export const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState([]);
  const { auth, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !auth.token) {
      navigate("/login");
    }
  }, [auth.token, loading, navigate]);

  useEffect(() => {
    if (!loading && auth.token) {
      fetchWishlist();
    }
  }, [auth.token, loading]);

  const fetchWishlist = async () => {
    try {
      const response = await api.get(
        "/api/user/wishlist",
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setWishlist(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handelRemoveFromWishlist = async (productId: string) => {
    try {
      await api.delete(`/api/user/removefromwishlist/${productId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handelNaviation = (item: any) => {
    try {
      window.open(item.productLink, "_blank"); // ✅ Opens in new tab
    } catch (error) {
      console.error("Error opening product link:", error);
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{item.productName}</h3>
                <p>sale Price{item.salePrice}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handelRemoveFromWishlist(item._id)}
                    className="p-2 text-red-500 hover:text-red-700 border rounded-md"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handelNaviation(item)}
                    className="flex-1 p-2 text-blue-500 hover:text-blue-700 border rounded-md"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
