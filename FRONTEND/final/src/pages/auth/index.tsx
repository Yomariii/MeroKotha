import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextValue {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if the user is already logged in (e.g., from a persisted session)
    const storedUser = localStorage.getItem("user");
    console.log("Stored User: ", storedUser);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        console.log("User: ", user);
      } catch (error) {
        console.error("Error parsing user JSON from localStorage:", error);
      }
    }
  }, []);

  const logout = () => {
    // Remove the user data and token from the local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children} {/* Pass the children prop */}
    </AuthContext.Provider>
  );
};
