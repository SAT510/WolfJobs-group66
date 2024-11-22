document.addEventListener("DOMContentLoaded", () => {
  // Fetch the API result from the background script
  chrome.runtime.sendMessage({ action: "getApiResult" }, (response) => {
    const jobTitleElement = document.getElementById("jobTitle");
    const popupContent = document.getElementById("popupContent");
    const redirectButton = document.getElementById("redirectButton");

    // Log the elements to ensure they exist
    console.log("jobTitleElement:", jobTitleElement);
    console.log("popupContent:", popupContent);
    console.log("redirectButton:", redirectButton);

    if (!jobTitleElement || !popupContent || !redirectButton) {
      console.error("One or more elements are missing in the DOM.");
      return;
    }

    if (chrome.runtime.lastError) {
      console.error("Error fetching API result:", chrome.runtime.lastError.message);
      popupContent.textContent = "Error retrieving data.";
      return;
    }

    if (response && response.apiResult) {
      const apiResult = response.apiResult;
      jobTitleElement.textContent = apiResult.status;

      if (apiResult.message === "Job ID found successfully") {
        popupContent.textContent = `Job ID: ${apiResult.data.jobId}`;
        
        // Set the redirect button to go to the explore page with the jobId
        redirectButton.addEventListener('click', () => {
          window.open(`http://localhost:5173/explore?jobId=${apiResult.data.jobId}`, '_blank');
        });
      } else {
        popupContent.textContent = "Job not found in the database. If you are a manager, please add the job to the database.";
        
        // Set the redirect button to go to the register page
        redirectButton.addEventListener('click', () => {
          window.open('http://localhost:5173/register', '_blank');
        });
      }
    } else {
      jobTitleElement.textContent = "Job title not found.";
      popupContent.textContent = "No API result available.";
    }
  });
});
