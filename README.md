# 🧾 Quote Generator

A simple web application that fetches and displays motivational quotes using the ZenQuotes API.

## Features

- ✨ Fetches random motivational quotes from ZenQuotes API
- 📋 Copy quotes to clipboard functionality
- 🎨 Beautiful, responsive design with gradient background
- ⚡ Smooth animations and transitions
- 📱 Mobile-friendly responsive layout
- ⌨️ Keyboard shortcuts (press Space to get new quote)
- 🔄 Fallback quotes when API is unavailable

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Async/await, DOM manipulation, API calls
- **ZenQuotes API** - Free quotes API

## API Integration

The app uses the [ZenQuotes API](https://zenquotes.io/) to fetch random quotes:

```javascript
const response = await fetch('https://zenquotes.io/api/random');
const data = await response.json();
```

## File Structure

```
quote-generator/
├── index.html          # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css  # Stylesheet
│   └── js/
│       └── app.js      # JavaScript application logic
└── README.md           # This file
```

## How to Use

1. Open `index.html` in your web browser
2. Click "Get New Quote" to fetch a random motivational quote
3. Click "Copy Quote" to copy the quote to your clipboard
4. Press Space bar as a keyboard shortcut to get new quotes

## Skills Demonstrated

- **Async JavaScript**: Using async/await for API calls
- **Error Handling**: Graceful fallbacks when API fails
- **DOM Manipulation**: Dynamic content updates
- **Event Handling**: Click events and keyboard shortcuts
- **Responsive Design**: Mobile-first CSS approach
- **Modern UI**: Smooth animations and transitions
- **API Integration**: Working with external APIs

## API Rate Limits

The ZenQuotes API has rate limits. If you encounter issues, the app includes fallback quotes to ensure functionality.

## Browser Support

- Chrome/Edge (modern versions)
- Firefox (modern versions)
- Safari (modern versions)
- Mobile browsers

## License

This project is for educational purposes to demonstrate API integration skills.
