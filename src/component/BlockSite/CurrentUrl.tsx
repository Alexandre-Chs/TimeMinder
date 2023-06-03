import "../../styles/BlockSite/PopUp.css";

const CurrentUrl = () => {
  const currentUrl = window.location.href;
  const parsedUrl = new URL(currentUrl);
  const domain = parsedUrl.hostname;

  return (
    <>
      <div className="timeminder-currentUrl">
        <p className="timeminder-BlockShowCurrentURL">Current URL : {domain}</p>
      </div>
    </>
  );
};

export default CurrentUrl;
