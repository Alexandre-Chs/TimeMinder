import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useSidebarContext } from "./SidebarContext";

type typeMouseContextType = {
  isMouseNearRightEdge: React.Dispatch<React.SetStateAction<boolean>>;
};

type MouseProviderProps = {
  children: ReactNode;
};

const Context = createContext<typeMouseContextType | undefined>(undefined);

export const useMouseRightEdge = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useMouseRightEdge must be used within a MouseProvider");
  }
  return context;
};

export const MouseProvider = ({ children }: MouseProviderProps) => {
  const [isMouseNearRightEdge, setIsMouseNearRightEdge] = useState(false);
  const { openSidebar } = useSidebarContext();
  console.log(openSidebar);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!openSidebar) {
        const { clientX } = event;
        const widthScreen = window.innerWidth;
        const isNearRightEdge = clientX > widthScreen - 60;
        const isOutFromRightEdge = clientX < widthScreen - 60;
        if (isNearRightEdge && !openSidebar) {
          const timeoutId = setTimeout(() => {
            setIsMouseNearRightEdge(!openSidebar);
          }, 400);

          return () => {
            clearTimeout(timeoutId);
          };
        }

        if (isOutFromRightEdge && !openSidebar) {
          const timeoutId = setTimeout(() => {
            setIsMouseNearRightEdge(openSidebar);
          }, 400);

          return () => {
            clearTimeout(timeoutId);
          };
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [openSidebar]);

  const values = { isMouseNearRightEdge };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
