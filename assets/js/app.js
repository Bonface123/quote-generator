const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const button = document.getElementById("newQuoteBtn");
const copyBtn = document.getElementById("copyBtn");
const loader = document.getElementById("loader");

// Show loader
function showLoader() {
    loader.classList.remove("hidden");
    quoteText.classList.add("opacity-0");
    authorText.classList.add("opacity-0");
}

// Hide loader
function hideLoader() {
    loader.classList.add("hidden");
    quoteText.classList.remove("opacity-0");
    authorText.classList.remove("opacity-0");
}

// Fetch quote from API
async function getQuote() {
    showLoader();

    try {
        // Use Quotable.io API (best for GitHub Pages)
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        
        quoteText.textContent = `"${data.content}"`;
        authorText.textContent = `- ${data.author}`;
        
    } catch (error) {
        quoteText.textContent = "Failed to load quote. Please check your internet connection.";
        authorText.textContent = "";
        console.error("API Error:", error);
    }

    // Smooth UX delay
    setTimeout(hideLoader, 300);
}

// Copy quote
function copyQuote() {
    const text = `${quoteText.textContent} ${authorText.textContent}`;

    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);
    }).catch(err => {
        console.error("Copy failed:", err);
    });
}

// Event listeners
button.addEventListener("click", getQuote);
copyBtn.addEventListener("click", copyQuote);

// Load first quote on page load
getQuote();