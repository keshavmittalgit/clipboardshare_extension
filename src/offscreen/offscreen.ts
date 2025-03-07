console.log("Creating offscreen document...");
console.log(window)

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyToClipboard") {
    
    navigator.clipboard
      .writeText(request.text)
      .then(() => {
        sendResponse({ status: "success" });
      })
      .catch((error) => {
        console.error("Clipboard copy failed:", error, request.text);
        sendResponse({ status: "error", error: error.message,  });
      });

    return true; // Indicate asynchronous response
  }
});

setInterval(() => {
  console.log("Offscreen document is still running...");
}, 3000);


