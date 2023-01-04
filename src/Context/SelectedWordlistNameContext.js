import React, { useContext, useState } from "react";

// create context
const SelectedWordlistNameContext = React.createContext();

// provide context
function SelectedWordlistNameContextProvider({ children }) {
  const [selectedWordlistName, setSelectedWordlistName] = useState();
  const value = { selectedWordlistName, setSelectedWordlistName };

  return (
    <SelectedWordlistNameContext.Provider value={value}>
      {children}
    </SelectedWordlistNameContext.Provider>
  );
}
// use context
function useSelectedWordlistNameContext() {
  const context = useContext(SelectedWordlistNameContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedWordlistNameContext must be used within SelectedWordlistNameContextProvider"
    );
  }
  return context;
}

export { SelectedWordlistNameContextProvider, useSelectedWordlistNameContext };
