const facebookURL = 'facebook.com';

// Attach event whenver chrome page is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.tabs.executeScript(tabId, {
    file: 'main.js',
    runAt: 'document_start'
  });
});