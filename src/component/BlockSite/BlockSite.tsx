import { useState } from "react";
import { ImEyeBlocked } from "react-icons/im";
import "../../styles/Buttons/BlockSite.css";
import PopUpBlockSite from "./PopUpBlockSite";

const BlockSite = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handlePopup = () => {
    setOpenPopup((current) => !current);
  };

  return (
    <>
      <div className="timeminder-BlockSite" onClick={handlePopup}>
        <ImEyeBlocked size={"1.7em"} />
      </div>
      {openPopup ? <PopUpBlockSite /> : null}
    </>
  );
};

export default BlockSite;
