const facebookURL = 'facebook.com';
const tabs = {};

// Attach event whenver chrome page is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const { url } = tab;

  if (url.indexOf(facebookURL) < 0 && tabs[tabId]) {
    delete tabs[tabId];
    return;
  }

  if (tabs[tabId]) return;

  tabs[tabId] = true;
  chrome.tabs.executeScript(tabId, {
    file: 'main.js',
    runAt: 'document_start'
  });
});