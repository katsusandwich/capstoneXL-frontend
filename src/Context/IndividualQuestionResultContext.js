import React, { useContext, useState } from "react";

// create context
const IndividualQuestionResultContext = React.createContext();

// provide context
function IndividualQuestionResultContextProvider({ children }) {
  const [individualQuestionResult, setIndividualQuestionResult] = useState();
  const value = { individualQuestionResult, setIndividualQuestionResult };

  return (
    <IndividualQuestionResultContext.Provider value={value}>
      {children}
    </IndividualQuestionResultContext.Provider>
  );
}
// use context
function useIndividualQuestionResultContext() {
  const context = useContext(IndividualQuestionResultContext);
  if (context === undefined) {
    throw new Error(
      "useIndividualQuestionResultContext must be used within IndividualQuestionResultContextProvider"
    );
  }
  return context;
}

export {
  IndividualQuestionResultContextProvider,
  useIndividualQuestionResultContext,
};
