import React, { useContext, useState } from "react";

// create context
const BackOfCardContext = React.createContext();

// provide context
function BackOfCardContextProvider({ children }) {
  const [backOfCard, setBackOfCard] = useState();
  const value = { backOfCard, setBackOfCard };

  return (
    <BackOfCardContext.Provider value={value}>
      {children}
    </BackOfCardContext.Provider>
  );
}
// use context
function useBackOfCardContext() {
  const context = useContext(BackOfCardContext);
  if (context === undefined) {
    throw new Error(
      "useBackOfCardContext must be used within BackOfCardContextProvider"
    );
  }
  return context;
}

export { BackOfCardContextProvider, useBackOfCardContext };
