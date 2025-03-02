console.log("Creating offscreen document...");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'copyToClipboard') {
    document.body.focus(); // Ensure document has focus
    const text = request.text;

    navigator.clipboard.writeText(text)
      .then(() => {
        sendResponse({ status: 'success' });
      })
      .catch((error) => {
        console.error('Clipboard copy failed:', error);
        sendResponse({ status: 'error', error: error.message, text });
      });

    return true; // Indicate asynchronous response
  }
});

setInterval(() => {
  console.log("Offscreen document is still running...");
}, 10000);