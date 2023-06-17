// Function to make a POST request to the Flask server
async function predictSpam(email) {
  const response = await fetch('http://localhost:8000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();

  if (data.prediction === 'Ham mail') {
    return 'Ham mail';
  } else {
    return 'Spam mail';
  }
}

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  if (request.action === 'emailInput') {
    const emailInput = request.input;

    // Call the spam prediction function with the email input
    try {
      const prediction = await predictSpam(emailInput);
      console.log(prediction)
      
      chrome.action.setBadgeText({ text: prediction });

      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
          const activeTab = tabs[0];
          chrome.scripting.executeScript(
            {
              target: { tabId: activeTab.id },
              function: displayPrediction,
              args: [prediction],
            },
            () => {}
          );
        }
      });
    } catch (error) {
      console.error('Error predicting spam:', error);
    }
  }
});
