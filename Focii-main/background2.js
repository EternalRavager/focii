var a= true;
if(a=false){
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ whitelist: ["youtube.com", "twitter.com"] });
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var block = true;
    var urlToCheck = new URL(details.url);
    chrome.storage.sync.get('whitelist', function(data) {
      var whitelist = data.whitelist || [];
      for (var i = 0; i < whitelist.length; i++) {
        if (urlToCheck.hostname.includes(whitelist[i])) {
          block = false;
          break;
        }
      }

      if (block) {
        chrome.tabs.update(details.tabId, {url: chrome.runtime.getURL("blocked.html")});
      }
    });
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
}