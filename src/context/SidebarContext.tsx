import { createContext, useContext, useState, ReactNode } from "react";

type SidebarContextType = {
  openSidebar: boolean;
  handleOpenSidebar: () => void;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

type SidebarProviderProps = { children: ReactNode };

const Context = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar((current) => !current);
  };
  const values = { openSidebar, handleOpenSidebar, setOpenSidebar };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
