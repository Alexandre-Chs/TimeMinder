import { createContext, useContext, useState } from "react";

const Context = createContext(false);

const SidebarContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

const ContextProvider = ({ children }) => {
  const [someState, setSomeState] = useState("light");

  const values = { someState };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
