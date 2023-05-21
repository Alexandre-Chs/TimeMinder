const CurrentUrl = () => {
  const currentUrl = window.location.href;
  const parsedUrl = new URL(currentUrl);
  const domain = parsedUrl.hostname;

  return (
    <>
      <div className="timeminder-currentUrl">
        <p>Current URL : {domain}</p>
      </div>
    </>
  );
};

export default CurrentUrl;
