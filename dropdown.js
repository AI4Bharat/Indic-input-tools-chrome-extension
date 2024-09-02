const languageSelect = document.querySelector("#languageSelect");

languageSelect.addEventListener("change", function () {
  localStorage.setItem("selectedLanguage", this.value);
});

const selectedLanguage = localStorage.getItem("selectedLanguage");
if (selectedLanguage) {
  languageSelect.value = selectedLanguage;
}

document.addEventListener("DOMContentLoaded", function () {
  const languageSelect = document.getElementById("languageSelect");

  languageSelect.addEventListener("change", function () {
    const selectedLanguage = languageSelect.value;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { languageCode: selectedLanguage });
    });
  });
});
