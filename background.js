chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "closeTab" && sender.tab) {
    chrome.tabs.remove(sender.tab.id);
  }
});
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName === 'local' && changes.action) {
    console.log('設定actionが変更されました:', changes.action.newValue);
  }
});
