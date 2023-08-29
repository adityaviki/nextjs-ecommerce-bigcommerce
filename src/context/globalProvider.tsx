"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";

export const GlobalContext = createContext({
  error: "",
  setError: (error: string) => {},
});

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState("");

  return (
    <GlobalContext.Provider value={{ error, setError }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
