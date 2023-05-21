import "../../styles/BlockSite/PopUp.css";
import { useState, useEffect } from "react";

const PopUpBlockSite = () => {
  const [allUrls, setAllUrls] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [isStart, setIsStart] = useState<boolean>(false);

  const handleUrlsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submitValue = formData.get("text") as string;

    if (!allUrls.includes(submitValue)) {
      setAllUrls((prevUrls) => [...prevUrls, submitValue]);
      chrome.storage.local.get("allUrlsBlocked", (result) => {
        const key = "allUrlsBlocked";
        const storedUrls = result["allUrlsBlocked"];
        const updateUrls = [...storedUrls, submitValue];
        chrome.storage.local.set({ [key]: updateUrls }).then(() => {
          console.log("Value is set to " + updateUrls);
        });
      });

      document.getElementById("myForm").reset();
      setError("");
    } else {
      setError("Wrong type urls or already blocked");
    }
  };

  const handleDelete = (url: string) => {
    const key = "allUrlsBlocked";
    const urlToDelete = url;
    const newArrayUrls = allUrls.filter((url) => url !== urlToDelete);
    setAllUrls(newArrayUrls);
    chrome.storage.local.set({ [key]: newArrayUrls });
  };

  const handleStart = () => {
    setIsStart((current) => !current);

    chrome.storage.local.get("allUrlsBlocked", (result) => {
      const key = "startBlockSite";
      if (isStart === false) {
        chrome.runtime.sendMessage({
          message: "startBlockSite",
          allUrlsBlockedData: result,
        });
        chrome.storage.local.set({ [key]: true });
      } else {
        chrome.runtime.sendMessage({ message: "endBlockSite" });
        chrome.storage.local.set({ [key]: false });
      }
    });
  };

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

  const currentUrl = window.location.href;
  const parsedUrl = new URL(currentUrl);
  const domain = parsedUrl.hostname;

  return (
    <div className="timeminder-popUp">
      <div className="timeminder-title_popup">
        <h1>Site blocker</h1>
      </div>
      <div className="timeminder-customUrls">
        <h2>Customizable blocked sites. Add yours !</h2>
        <div className="timeminder-contentAddUrls">
          <form
            onSubmit={handleUrlsSubmit}
            id="myForm"
            className="timeminder-myForm"
          >
            <input type="text" name="text" placeholder="www.google.com" />
            <input type="submit" className="timeminder-textAdd" value="Add" />
            {error ? <p>{error}</p> : null}
          </form>
        </div>
      </div>

      <div className="timeminder-currentUrl">
        <p>Current URL : {domain}</p>
      </div>

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
      <div className="timeminder-buttonBlockSite" onClick={handleStart}>
        {isStart ? (
          <button className="timeminder-endButton">End</button>
        ) : (
          <button className="timeminder-startButton">Start</button>
        )}
      </div>
    </div>
  );
};

export default PopUpBlockSite;
