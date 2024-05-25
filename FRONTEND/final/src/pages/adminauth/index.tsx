import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AdminAuthContextValue {
  adminUser: any;
  setAdminUser: (user: any) => void;
  logoutAdmin: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextValue>({
  adminUser: null,
  setAdminUser: () => {},
  logoutAdmin: () => {},
});

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({
  children,
}) => {
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    // Check if the admin user is already logged in (e.g., from a persisted session)
    const storedAdminUser = localStorage.getItem("adminUser");
    console.log("Stored Admin User: ", storedAdminUser);
    if (storedAdminUser) {
      try {
        setAdminUser(JSON.parse(storedAdminUser));
        console.log("Admin User: ", adminUser);
      } catch (error) {
        console.error(
          "Error parsing admin user JSON from localStorage:",
          error
        );
      }
    }
  }, []);

  const logoutAdmin = () => {
    // Remove the admin user data and token from the local storage
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, setAdminUser, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
