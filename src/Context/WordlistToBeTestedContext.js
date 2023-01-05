import React, { useContext, useState } from "react";

// create context
const WordlistToBeTestedContext = React.createContext();

// provide context
function WordlistToBeTestedContextProvider({ children }) {
  const [wordlistToBeTested, setWordlistToBeTested] = useState();
  const value = { wordlistToBeTested, setWordlistToBeTested };

  return (
    <WordlistToBeTestedContext.Provider value={value}>
      {children}
    </WordlistToBeTestedContext.Provider>
  );
}
// use context
function useWordlistToBeTestedContext() {
  const context = useContext(WordlistToBeTestedContext);
  if (context === undefined) {
    throw new Error(
      "useWordlistToBeTestedContext must be used within WordlistToBeTestedContextProvider"
    );
  }
  return context;
}

export { WordlistToBeTestedContextProvider, useWordlistToBeTestedContext };
