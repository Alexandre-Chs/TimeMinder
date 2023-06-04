import React from "react";
import ReactDOM from "react-dom";
import "./styles/Support/Support.css";

function Popup() {
  const handleSupportClick = () => {
    chrome.tabs.create({ url: "https://www.buymeacoffee.com/alexandreChs" });
  };

  return (
    <div className="timeminder-SupportContainer">
      <h1 className="timeminder-SupportTitle">Support me !</h1>
      <p>
        If you enjoy the project and would like to express your gratitude or
        show support, you have the option to make a donation that will
        contribute to funding new projects.
      </p>
      <button className="timeminder-SupportButton" onClick={handleSupportClick}>
        Support
      </button>
    </div>
  );
}

ReactDOM.render(<Popup />, document.getElementById("root"));
