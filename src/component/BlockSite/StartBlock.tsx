const StartBlock = ({
  isStart,
  setIsStart,
}: {
  isStart: boolean;
  setIsStart: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
  return (
    <>
      <div className="timeminder-buttonBlockSite" onClick={handleStart}>
        {isStart ? (
          <button className="timeminder-endButton">End</button>
        ) : (
          <button className="timeminder-startButton">Start</button>
        )}
      </div>
    </>
  );
};

export default StartBlock;
