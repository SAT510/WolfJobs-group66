// background.js
console.log("Background script loaded");

let jobTitle = null;
let apiResult = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.jobTitle) {
    jobTitle = message.jobTitle; // Store the job title in a variable
    console.log("Job title received in background.js:", jobTitle);

    // Make the POST request to the API with the extracted job title
    console.log(jobTitle.split("-")[0].trim())
    fetch("http://localhost:8000/api/v1/users/getJobId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: jobTitle.split(/\s*[\u2013]\s*/)[0] }) // Send the job title dynamically
    })
      .then(response => response.json())
      .then(data => {
        apiResult = data; // Store API result
        console.log("API result received:", apiResult);
        sendResponse({ success: true, apiResult });
      })
      .catch(error => {
        console.error("Error calling API:", error);
        sendResponse({ success: false, error: error.message });
      });

    // Indicate asynchronous response
    return true;
  } else if (message.action === "getApiResult") {
    sendResponse({ apiResult });
  }
});
