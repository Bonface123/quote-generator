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


// Fetch quote from API with retry logic
async function getQuote() {
    showLoader();

    const maxRetries = 3;
    const retryDelay = 1000; // 1 second
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt} to fetch quote...`);
            
            const response = await fetch("https://api.quotable.io/random", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            quoteText.textContent = `"${data.content}"`;
            authorText.textContent = `- ${data.author}`;
            console.log("Quote loaded successfully!");
            break; // Success, exit retry loop
            
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                // Final attempt failed, show error message
                quoteText.textContent = "Failed to load quote. Please check your internet connection and try again.";
                authorText.textContent = "";
                console.error("All retry attempts failed:", error);
            } else {
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
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