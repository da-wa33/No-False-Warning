function tryBackOrClose() {
  history.back();

  const currentUrl = location.href;
  setTimeout(() => {
    if (location.href === currentUrl) {
      chrome.runtime.sendMessage({ action: "closeTab" });
    }
  }, 500);
}

function doRedirect(url) {
  window.location.href = url;
}

function doNothing() {
 
}

function handleAction(action, redirectUrl) {
  if (document.title === "セキュリティセンター") {
    switch (action) {
      case 'back':
        tryBackOrClose();
        break;
      case 'redirect':
        if (redirectUrl) doRedirect(redirectUrl);
        break;
      case 'none':
      default:
        doNothing();
        break;
    }
  }
}

chrome.storage.local.get(['action', 'redirectUrl'], (data) => {

  handleAction(data.action, data.redirectUrl);

  const observer = new MutationObserver(() => {
    handleAction(data.action, data.redirectUrl);
  });
  const titleElement = document.querySelector('title');
  if (titleElement) {
    observer.observe(titleElement, { childList: true });
  }
});
