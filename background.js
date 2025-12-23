let phishingStatus = {
  isPhishing: false,
  message: "Checking...",
};

const API_KEY = "AIzaSyDZR7RT3-dkTj5gHon4_OncJJAKN-Yyogc"; // ⛔ Replace with your actual key
const API_URL = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`;

// Listen for tab updates (URL loads, changes, etc.)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.startsWith("http")
  ) {
    checkUrlForThreats(tab.url);
  }
});

// Function to check the URL using Google Safe Browsing API
async function checkUrlForThreats(url) {
  phishingStatus = {
    isPhishing: false,
    message: "Checking...",
  };

  const requestBody = {
    client: {
      clientId: "PhishShield",
      clientVersion: "1.0",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: url }],
    },
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (data && data.matches && data.matches.length > 0) {
      phishingStatus = {
        isPhishing: true,
        message: "⚠️ Phishing or Malware Detected!",
      };
    } else {
      phishingStatus = {
        isPhishing: false,
        message: "✅ Site is Safe.",
      };
    }
  } catch (error) {
    console.error("Safe Browsing API error:", error);
    phishingStatus = {
      isPhishing: false,
      message: "❌ Error checking URL.",
    };
  }
}

// Respond to popup.js requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_PHISHING_STATUS") {
    sendResponse(phishingStatus);
  }
});
