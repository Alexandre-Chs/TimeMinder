import { useState, useEffect } from "react";
import { ImEyeBlocked } from "react-icons/im";
import "../../styles/Buttons/BlockSite.css";
import PopUpBlockSite from "./PopUpBlockSite";

const BlockSite = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [startBlock, setStartBlock] = useState(false);
  const handlePopup = () => {
    setOpenPopup((current) => !current);
  };

  useEffect(() => {
    chrome.storage.local.get("startBlockSite", (result) => {
      if (result.startBlockSite) {
        setStartBlock(true);
      } else {
        setStartBlock(false);
      }
    });
  }, []);

  return (
    <>
      <div
        className={
          startBlock
            ? "timeminder-BlockSite timeminder-BlockSiteActive"
            : "timeminder-BlockSite"
        }
        onClick={handlePopup}
      >
        <ImEyeBlocked
          size={"1.7em"}
          className="timeminder-blockSiteIconSidebar"
        />
      </div>
      {openPopup ? <PopUpBlockSite /> : null}
    </>
  );
};

export default BlockSite;
