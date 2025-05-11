import React, { createContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// UserContextProvider Component
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with user data or null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context for usage in other components
export default UserContext;
