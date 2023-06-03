import "../../styles/Buttons/FocusMode.css";
import { RiFocus2Line } from "react-icons/ri";
import { useState, useEffect } from "react";

const FocusMode = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocus((current) => !current);
    const key = "isFocusMode";
    if (isFocus === false) {
      chrome.runtime.sendMessage({ message: "startFocusMode" });
      chrome.storage.local.set({ [key]: true });
    } else {
      chrome.storage.local.set({ [key]: false });
      window.location.reload();
    }
  };

  useEffect(() => {
    chrome.storage.local.get("isFocusMode", (result) => {
      setIsFocus(result.isFocusMode);
    });
  }, []);

  return (
    <div
      className={
        isFocus
          ? "timeminder-focusIcon timeminder-focusIconActive"
          : "timeminder-focusIcon"
      }
      onClick={handleFocus}
    >
      <RiFocus2Line size={"2em"} className="timeminder-focusIconSidebar" />
    </div>
  );
};

export default FocusMode;
