import React, { useContext, useState } from "react";

// create context
const SelectedWordlistIdContext = React.createContext();

// provide context
function SelectedWordlistIdContextProvider({ children }) {
  const [selectedWordlistId, setSelectedWordlistId] = useState();
  const value = { selectedWordlistId, setSelectedWordlistId };

  return (
    <SelectedWordlistIdContext.Provider value={value}>
      {children}
    </SelectedWordlistIdContext.Provider>
  );
}
// use context - I may not actually need this but I'll write it anyway
function useSelectedWordlistIdContext() {
  const context = useContext(SelectedWordlistIdContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedWordlistIdContext must be used within SelectedWordlistIdContextProvider"
    );
  }
  return context;
}

export { SelectedWordlistIdContextProvider, useSelectedWordlistIdContext };
