# 🛡️ PhishShield – Real-Time Phishing Detection Browser Extension

## 📌 Overview

**PhishShield** is a browser extension designed to **detect phishing websites in real time** and **alert users before they become victims** of online scams.  
The extension continuously analyzes the currently visited website using multiple security checks and trusted APIs.

---

## 🚀 Features

- 🔍 **Real-time phishing detection**
- 🚨 **Instant alert for suspicious websites**
- 🔐 **SSL certificate validation**
- 🌐 **Website reputation checking**
- 🧠 **API-based phishing verification**
- ⚡ Lightweight and fast extension
- 🎯 User-friendly interface

---

## 🛠️ Technologies Used

- **HTML** – Extension UI structure
- **CSS** – Styling and responsive design
- **JavaScript** – Core logic and background scripts
- **Google Safe Browsing API** – Checks URLs against known phishing and malicious websites

---

## 🔐 How PhishShield Works

1. Monitors the URL of every website visited by the user.
2. Checks **SSL certificate presence and validity**.
3. Sends the website URL to **Google Safe Browsing API**.
4. Analyzes security signals such as:
   - HTTPS availability
   - Certificate validity
   - Reputation status
5. Displays a **warning alert** if the website is detected as phishing or unsafe.
