import "../../styles/Buttons/FocusMode.css";
import { RiFocus2Line } from "react-icons/ri";
import { useState, useEffect } from "react";

const FocusMode = () => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus((current) => !current);
    if (isFocus === false) {
      chrome.runtime.sendMessage({ message: "startFocusMode" });
    } else {
      window.location.reload();
    }
  };

  return (
    <div
      className={
        isFocus
          ? "timeminder-focusIcon timeminder-focusIconActive"
          : "timeminder-focusIcon"
      }
      onClick={handleFocus}
    >
      <RiFocus2Line size={"2em"} />
    </div>
  );
};

export default FocusMode;
