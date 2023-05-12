import "./styles/App.css";
import { useState, useEffect } from "react";
import ButtonSidebar from "./component/ButtonSidebar";
import Sidebar from "./component/Sidebar";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleOpenSidebar = () => {
    setOpenSidebar((current) => !current);
  };

  return (
    <>
      {!openSidebar ? (
        <ButtonSidebar handleOpenSidebar={handleOpenSidebar} />
      ) : (
        <Sidebar handleOpenSidebar={handleOpenSidebar} />
      )}
    </>
  );
}

export default App;
