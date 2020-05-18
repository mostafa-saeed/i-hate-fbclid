const facebookURL = 'facebook.com';

// Attach event whenver chrome page is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const { status, url } = tab;

  if (status === 'complete' && url.indexOf(facebookURL)) {
    chrome.tabs.executeScript(tabId, {
      file: 'main.js'
    });
  }
});