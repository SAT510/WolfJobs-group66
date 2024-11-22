// content.js
const jobElement = document.querySelector("h2.ce-jazzhr-title");
if (jobElement) {
  const jobTitle = jobElement.textContent.trim();
  console.log("Job title found in content.js:", jobTitle); // Log for debugging
  chrome.runtime.sendMessage({ jobTitle }); // Send message to background.js
} else {
  console.error("Job title element not found on the page.");
}
