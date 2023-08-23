import React, { createContext, useState, useEffect, ReactNode } from "react";

export const GlobalContext = createContext<any>(null);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  // Your state and logic here
  const [state, setState] = useState<any>(/* initial state here */);

  useEffect(() => {
    // Your effect logic here
  }, []);

  return (
    <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
