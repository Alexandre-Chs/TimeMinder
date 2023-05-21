import React from "react";

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
        <p>Custom block list :</p>
        <ul>
          {allUrls.map((url, index) => (
            <div key={index} className="timeminder-blockedElement">
              <li>{url}</li>
              <button onClick={() => handleDelete(url)}>X</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CustomUrlsList;
