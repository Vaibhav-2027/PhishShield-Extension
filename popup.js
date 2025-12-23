const API_KEY = "AIzaSyDZR7RT3-dkTj5gHon4_OncJJAKN-Yyogc"; // Replace with your real key

// Function to check website using Google Safe Browsing API
async function checkWebsiteSafety(urlToCheck) {
  const requestBody = {
    client: {
      clientId: "phishshield",
      clientVersion: "1.0",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url: urlToCheck }],
    },
  };

  const response = await fetch(
    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  const data = await response.json();
  return data && data.matches ? "unsafe" : "safe";
}

// On DOM load
document.addEventListener("DOMContentLoaded", () => {
  const statusDiv = document.getElementById("status");
  const iconDiv = document.getElementById("status-icon");

  // Get current tab URL
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const url = tabs[0].url;

    statusDiv.textContent = "Checking URL...";
    iconDiv.textContent = "⏳";

    try {
      const result = await checkWebsiteSafety(url);

      if (result === "safe") {
        statusDiv.textContent = "✅ This website is safe.";
        iconDiv.textContent = "🟢";
        statusDiv.classList.remove("loading");
        statusDiv.classList.add("safe");
      } else {
        statusDiv.textContent = "⚠️ This website may be dangerous!";
        iconDiv.textContent = "🔴";
        statusDiv.classList.remove("loading");
        statusDiv.classList.add("unsafe");
      }
    } catch (error) {
      statusDiv.textContent = "❌ Error checking website.";
      iconDiv.textContent = "⚠️";
      console.error("API error:", error);
    }
  });
});
