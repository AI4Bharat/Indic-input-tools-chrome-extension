chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason === "install") {
    chrome.tabs.create({ url: "https://ai4bharat.iitm.ac.in/" });
  }
});
