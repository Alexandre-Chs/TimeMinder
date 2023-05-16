import "./styles/App.css";
import { useState, useEffect } from "react";
import ButtonSidebar from "./component/ButtonSidebar";
import Sidebar from "./component/Sidebar";
import { SidebarProvider, useSidebarContext } from "./context/SidebarContext";

function AppWithContext() {
  return (
    <SidebarProvider>
      <App />
    </SidebarProvider>
  );
}

function App() {
  const [isMouseNearRightEdge, setIsMouseNearRightEdge] = useState(false);

  const { openSidebar, handleOpenSidebar } = useSidebarContext();
  console.log(openSidebar);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX } = event;
      const widthScreen = window.innerWidth;
      const isNearRightEdge = clientX > widthScreen - 60;
      const isOutFromRightEdge = clientX < widthScreen - 60;
      if (isNearRightEdge) {
        const timeoutId = setTimeout(() => {
          if (!openSidebar) {
            setIsMouseNearRightEdge(true);
          }
        }, 400);

        return () => {
          clearTimeout(timeoutId);
        };
      }

      if (isOutFromRightEdge) {
        const timeoutId = setTimeout(() => {
          if (!openSidebar) {
            setIsMouseNearRightEdge(false);
          }
        }, 400);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <ButtonSidebar
        handleOpenSidebar={handleOpenSidebar}
        mouseOnRightScreen={isMouseNearRightEdge}
        isOpen={openSidebar}
      />

      {openSidebar ? <Sidebar isOpen={openSidebar} /> : null}
    </>
  );
}

export default AppWithContext;
