import "./styles/App.css";
import ButtonSidebar from "./component/ButtonSidebar";
import Sidebar from "./component/Sidebar";
import { SidebarProvider, useSidebarContext } from "./context/SidebarContext";
import { MouseProvider } from "./context/MouseRightEdgeContext";

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
  const { openSidebar } = useSidebarContext();
  return (
    <>
      <ButtonSidebar />

      {openSidebar ? <Sidebar isOpen={openSidebar} /> : null}
    </>
  );
}

export default AppWithContext;
