import "./styles/App.css";
import { useState, useEffect } from "react";
import ButtonSidebar from "./component/ButtonSidebar";
import Sidebar from "./component/Sidebar";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isMouseNearRightEdge, setIsMouseNearRightEdge] = useState(false);

  console.log(openSidebar);
  const handleOpenSidebar = () => {
    setOpenSidebar((current) => !current);
  };

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

      {openSidebar ? (
        <Sidebar handleOpenSidebar={handleOpenSidebar} isOpen={openSidebar} />
      ) : null}
    </>
  );
}

export default App;
