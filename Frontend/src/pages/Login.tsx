import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../img/image.png";
import api from "../services/api.tsx";
import { useAuth } from "../context/authContext";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/api/user/login", { email, password });
      const { token, user, role } = response.data;
      localStorage.setItem("auth", JSON.stringify({ token, user, role }));
      setAuth({ token, user, role });
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-6 md:p-12 md:min-h-[80vh]">
      <div className="hidden lg:flex lg:w-1/2">
        <img
          src={image}
          alt="Shopping"
          className="w-full h-[608px] object-cover rounded-lg"
        />
      </div>

      <div className="flex items-center justify-center w-full lg:w-1/2 p-6 md:p-12">
        <div className="max-w-md w-full mb-[70px] md:mb-[120px]">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-8">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-[#DB4444] rounded-[4px]"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-red-600 hover:text-red-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};