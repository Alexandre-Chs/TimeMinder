chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  let tab = tabs[0];

  if (data.message === "startFocusMode") {
    console.log("click");
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: `
      body header,
      body footer,
      body nav,
      body [class*="social"],
      body [class*="share"],
      body [class*="like"],
      body [class*="comment"],
      body [class*="follow"],
      body [class*="tweet"],
      body [class*="instagram"],
      body [class*="facebook"],
      body [class*="youtube"],
      body div[class*="pub"],
      body div[id*="pub"] {
        display: none !important;
      }
    
      main > :last-child {
        margin-top: min(10vmax, 10rem);
        margin-bottom: min(10vmax, 10rem);
      }
    
      .timeminder.sidebar {
        position: fixed;
      }
    
      .timeminder {
        display: block;
      }

    `,
    });
  }
});
