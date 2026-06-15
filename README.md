🌤️ SKYE — Weather App

A clean, modern weather app built with vanilla HTML, CSS, and JavaScript. Features a premium glassmorphism UI with live weather data powered by the OpenWeatherMap API.

Live link - https://Tanishk1906.github.io/Weather-App/

✨ Features


🔍 Search weather by city name
🌡️ Current temperature, feels like, humidity, wind speed, visibility, and pressure
🌅 Sunrise & sunset times
📅 5-day forecast (one reading per day at noon)
🎨 Dynamic background themes based on weather conditions (sunny, rainy, stormy, snow)
🌀 Animated gradient background blobs
💎 Glassmorphism UI design
📱 Fully responsive — works great on mobile
⌨️ Enter key support on search
⚠️ Graceful error handling (city not found, invalid API key, etc.)



📁 File Structure

weather-app/
├── index.html    # App structure & layout
├── style.css     # Glassmorphism styling & animations
└── script.js     # API logic & DOM interactions


🚀 Getting Started

1. Get a Free API Key


Go to openweathermap.org and sign up
Navigate to My Profile → API Keys
Copy your key (it activates within 10–15 minutes of account creation)


2. Add Your API Key

Open script.js and replace line 8:

jsconst API_KEY = "YOUR_API_KEY_HERE";

with your actual key:

jsconst API_KEY = "a3f5c7e9b2d1..."; // your real key

3. Run Locally in VS Code


Install the Live Server extension in VS Code (Ctrl+Shift+X → search "Live Server")
Right-click index.html → Open with Live Server
The app will open in your browser with live reload



🌐 Deployment

PlatformHowNetlifyDrag and drop your project folder at netlify.com — fastest optionVercelConnect your GitHub repo → auto deploys on every pushGitHub PagesPush to GitHub → Settings → Pages → enable


Recommended: Netlify drag & drop — no commands or setup required.




🛠️ Built With


HTML5, CSS3, Vanilla JavaScript
OpenWeatherMap API — current weather + 5-day forecast
Google Fonts — Syne (display) + Inter (body)
OpenWeatherMap weather icons CDN



📸 UI Highlights


Glassmorphism cards — frosted glass effect with backdrop blur
Animated blobs — soft gradient orbs floating in the background
Dynamic themes — background color shifts with weather type:

☀️ Sunny → warm navy
🌧️ Rainy → dark blue-grey
⛈️ Stormy → near-black
❄️ Snow → cool light blue






⚠️ Common Issues

401 Unauthorized error
→ Your API key may not be activated yet. New keys take up to 2 hours to activate. Wait and try again.

City not found
→ Double-check the city name spelling. The app shows a graceful error message for invalid inputs.

Key pasted incorrectly
→ Make sure there are no extra spaces inside the quotes, and the full 32-character key is present.


📄 License

Free to use and modify for personal or educational projects.
