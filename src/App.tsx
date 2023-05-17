import "./styles/App.css";
import { useState, useEffect } from "react";
import ButtonSidebar from "./component/ButtonSidebar";
import Sidebar from "./component/Sidebar";
import { SidebarProvider, useSidebarContext } from "./context/SidebarContext";
import {
  MouseProvider,
  useMouseRightEdge,
} from "./context/MouseRightEdgeContext";

function AppWithContext() {
  return (
    <SidebarProvider>
      <MouseProvider>
        <App />
      </MouseProvider>
    </SidebarProvider>
  );
}

function App() {
  const { openSidebar, handleOpenSidebar } = useSidebarContext();
  const { isMouseNearRightEdge } = useMouseRightEdge();

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
