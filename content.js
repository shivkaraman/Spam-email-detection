// Function to receive messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'displayPrediction') {
    console.log('message received');
    const prediction = request.prediction;

    // Display the prediction in the extension popup
    const resultElement = document.createElement('div');
    resultElement.textContent = prediction;
    document.body.appendChild(resultElement);
  }
});

// Notify background script when content script is loaded
chrome.runtime.sendMessage({ action: 'contentScriptLoaded' });
