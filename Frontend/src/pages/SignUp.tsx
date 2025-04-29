import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image from "../img/image.png";
import { useAuth } from '../context/authContext';
import api from '../services/api.tsx';


export const SignUp: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("/api/user/register", {
        name,
        email,
        password,
      });
      console.log(response.data);

      const { token, user, role } = response.data;
      localStorage.setItem("auth", JSON.stringify({ token, user, role }));
      setAuth({ token, user, role });
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-6 md:p-12 md:min-h-[100vh]">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2">
        <img src={image} alt="Shopping" className="w-full h-[608px] object-cover rounded-lg" />
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full mb-[70px] md:mb-[120px]">
          <h2 className="text-4xl font-bold text-center text-black mb-4">Sign Up</h2>

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
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
              className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              style={{ backgroundColor: "rgba(219, 68, 68, 1)", borderRadius: "0px" }}
            >
              Sign up
            </button>
           
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};