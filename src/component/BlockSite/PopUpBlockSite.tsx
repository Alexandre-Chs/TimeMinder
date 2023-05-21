import "../../styles/BlockSite/PopUp.css";

import { useState, useEffect } from "react";
import StartBlock from "./StartBlock";
import AddUrl from "./AddUrl";
import CurrentUrl from "./CurrentUrl";
import CustomUrlsList from "./CustomUrlsList";

const PopUpBlockSite = () => {
  const [allUrls, setAllUrls] = useState<string[]>([]);
  const [isStart, setIsStart] = useState<boolean>(false);

  useEffect(() => {
    chrome.storage.local.get("allUrlsBlocked", (result) => {
      const value = result["allUrlsBlocked"];
      setAllUrls(value);
    });

    chrome.storage.local.get("startBlockSite", (result) => {
      const value = result["startBlockSite"];
      setIsStart(value);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.get("allUrlsBlocked", (result) => {
      const key = "allUrlsBlocked";
      let storedUrls = result[key];
      if (storedUrls === undefined) {
        storedUrls = [];
        chrome.storage.local.set({ [key]: storedUrls }, () => {
          console.log(`Key '${key}' has been created with an empty array.`);
        });
      }
    });
  }, []);

  return (
    <div className="timeminder-popUp">
      <div className="timeminder-title_popup">
        <h1>Site blocker</h1>
      </div>
      <AddUrl allUrls={allUrls} setAllUrls={setAllUrls} />
      <CurrentUrl />
      <CustomUrlsList allUrls={allUrls} setAllUrls={setAllUrls} />
      <StartBlock isStart={isStart} setIsStart={setIsStart} />
    </div>
  );
};

export default PopUpBlockSite;
