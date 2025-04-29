import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define types
interface AuthUser {
  user: any;
  token: string;
  role: string;
}

interface UserContextType {
  auth: AuthUser;
  setAuth: React.Dispatch<React.SetStateAction<AuthUser>>;
  logout: () => void;
  loading: boolean;
}

// Create Context with type
const UserContext = createContext<UserContextType | undefined>(undefined);

// Define Provider props type
interface UserProviderProps {
  children: ReactNode;
}

// Create Provider Component
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthUser>({
    user: null,
    token: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);

  // Load auth data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      try {
        const parseData = JSON.parse(data);
        setAuth({
          user: parseData.user,
          token: parseData.token,
          role: parseData.role || "",
        });
      } catch (err) {
        console.error("Failed to parse auth data", err);
      }
    }
    setLoading(false); // done loading
  }, []);

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "", role: "" });
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ auth, setAuth, logout,loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Create custom hook with type safety
const useAuth = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useAuth };
