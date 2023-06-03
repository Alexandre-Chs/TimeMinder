let interval = null;

chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  let tab = tabs[0];

  if (data.message === "startFocusMode") {
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

let isBlockingEnabled = false;
let blockSiteListener;

chrome.runtime.onMessage.addListener(async (data, sender, sendResponse) => {
  if (data.message === "startBlockSite" && !isBlockingEnabled) {
    const allUrlsBlocked = data.allUrlsBlockedData.allUrlsBlocked;

    blockSiteListener = function (tabId, changeInfo, tab) {
      if (changeInfo.status === "loading") {
        const url = tab.url;
        const parsedUrl = new URL(url);
        const domain = parsedUrl.hostname;

        if (allUrlsBlocked.includes(domain)) {
          const redirectUrl =
            "https://www.youtube.com/watch?v=l60MnDJklnM&ab_channel=ArnavSharan";
          chrome.tabs.update(tabId, { url: redirectUrl });
        }
      }
    };

    chrome.tabs.onUpdated.addListener(blockSiteListener);
    isBlockingEnabled = true;
  }

  if (data.message === "endBlockSite" && isBlockingEnabled) {
    console.log("end");
    chrome.tabs.onUpdated.removeListener(blockSiteListener);
    isBlockingEnabled = false;
  }

  if (data.message === "startTimer") {
    if (!interval) {
      let msRemaining = data.timeRemaining;
      interval = setInterval(() => {
        msRemaining = msRemaining - 1000;
        console.log(msRemaining);
        const updateTimer = calculateMsToTime(msRemaining);
        const minutes = updateTimer.minutes + 1;
        const hours = updateTimer.hours;
        if (hours > 0 && hours < 10) {
          if (minutes >= 10) {
            chrome.action.setBadgeText({
              text: `0${hours.toString()}:${minutes.toString()}`,
            });
          } else {
            chrome.action.setBadgeText({
              text: `0${hours.toString()}:0${minutes.toString()}`,
            });
          }
        } else if (hours > 0 && hours > 10) {
          if (minutes >= 10) {
            chrome.action.setBadgeText({
              text: `0${hours.toString()}:${minutes.toString()}`,
            });
          } else {
            chrome.action.setBadgeText({
              text: `0${hours.toString()}:0${minutes.toString()}`,
            });
          }
        } else {
          if (minutes < 10) {
            chrome.action.setBadgeText({
              text: `00:0${minutes.toString()}`,
            });
          } else {
            chrome.action.setBadgeText({
              text: `00:${minutes.toString()}`,
            });
          }
        }

        if (msRemaining === 0 || msRemaining <= 0) {
          const options = {
            type: "basic",
            title: "Timer Completed !",
            message: "Your timer has finished. Take a well-deserved break! 🥳",
            iconUrl: "../icon128.png",
            requireInteraction: true,
          };

          chrome.notifications.create("", options, (notificationId) => {
            console.log("Notifications:", notificationId);
          });
          clearInterval(interval);
          msRemaining = 0;
          interval = null;
          chrome.action.setBadgeText({
            text: "00:00",
          });
        }
      }, 1000);
    }
  } else if (data.message === "pauseTimer") {
    if (interval) {
      clearInterval(interval);
      interval = null;
      console.log("PAUSE INTERVAL");
    }
  }

  if (data.message === "stopTimer") {
    console.log("STOP TIMER");
    clearInterval(interval);
    interval = null;
    chrome.action.setBadgeText({
      text: "00:00",
    });
  }
});

const calculateMsToTime = (totalMilliseconds) => {
  const hours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
  return {
    hours,
    minutes,
  };
};
