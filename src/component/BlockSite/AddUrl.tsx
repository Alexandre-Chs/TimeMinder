import { useState } from "react";

const AddUrl = ({
  allUrls,
  setAllUrls,
}: {
  allUrls: string[];
  setAllUrls: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [error, setError] = useState<string>();
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

  return (
    <>
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
    </>
  );
};

export default AddUrl;
