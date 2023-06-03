import React from "react";
import { GrFormClose } from "react-icons/gr";

const CustomUrlsList = ({
  allUrls,
  setAllUrls,
}: {
  allUrls: string[];
  setAllUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleDelete = (url: string) => {
    const key = "allUrlsBlocked";
    const urlToDelete = url;
    const newArrayUrls = allUrls.filter((url) => url !== urlToDelete);
    setAllUrls(newArrayUrls);
    chrome.storage.local.set({ [key]: newArrayUrls });
  };
  return (
    <>
      <div className="timeminder-showUrlsBlock">
        <p className="timeminder-BlockShowUrlsText">Custom block list :</p>
        <ul className="timeminder-BlockListUL">
          {allUrls.map((url, index) => (
            <div key={index} className="timeminder-blockedElement">
              <li>{url}</li>
              <button
                className="timeminder-BlockDeleteURLS"
                onClick={() => handleDelete(url)}
              >
                <GrFormClose
                  size={"2em"}
                  className="timeminder-BlockDeleteIcon"
                />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CustomUrlsList;
