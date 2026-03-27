// Quote Generator App
class QuoteGenerator {
    constructor() {
        this.quoteText = document.getElementById('quoteText');
        this.quoteAuthor = document.getElementById('quoteAuthor');
        this.getQuoteBtn = document.getElementById('getQuoteBtn');
        this.copyQuoteBtn = document.getElementById('copyQuoteBtn');
        this.loading = document.getElementById('loading');
        this.notification = document.getElementById('notification');
        
        this.init();
    }
    
    init() {
        // Event listeners
        this.getQuoteBtn.addEventListener('click', () => this.getQuote());
        this.copyQuoteBtn.addEventListener('click', () => this.copyQuote());
        
        // Load initial quote
        this.getQuote();
    }
    
    async getQuote() {
        try {
            this.showLoading(true);
            
            // Use JSONP to bypass CORS issues
            const quote = await this.fetchQuoteWithJSONP();
            
            if (quote && quote.quoteText && quote.quoteAuthor) {
                this.displayQuote(quote.quoteText, quote.quoteAuthor);
            } else {
                throw new Error('Invalid quote data received');
            }
            
        } catch (error) {
            console.error('Error fetching quote:', error);
            this.showError('Failed to fetch quote. Please check your internet connection and try again.');
            
        } finally {
            this.showLoading(false);
        }
    }
    
    fetchQuoteWithJSONP() {
        return new Promise((resolve, reject) => {
            const callbackName = 'quoteCallback_' + Date.now();
            const script = document.createElement('script');
            
            // Set up global callback function
            window[callbackName] = function(data) {
                document.head.removeChild(script);
                delete window[callbackName];
                resolve(data);
            };
            
            script.src = `https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=${callbackName}`;
            
            script.onerror = function() {
                document.head.removeChild(script);
                delete window[callbackName];
                reject(new Error('JSONP request failed'));
            };
            
            // Add timeout
            setTimeout(() => {
                if (document.head.contains(script)) {
                    document.head.removeChild(script);
                    delete window[callbackName];
                    reject(new Error('Request timed out'));
                }
            }, 5000);
            
            document.head.appendChild(script);
        });
    }
    
    displayQuote(text, author) {
        this.quoteText.textContent = `"${text}"`;
        this.quoteAuthor.textContent = author;
        
        // Reset opacity and trigger reflow for smooth animation
        this.quoteText.style.opacity = '0';
        this.quoteAuthor.style.opacity = '0';
        this.quoteText.offsetHeight; // Force reflow
        
        // Add fade-in effect
        this.quoteText.style.transition = 'opacity 0.3s ease';
        this.quoteAuthor.style.transition = 'opacity 0.3s ease';
        
        requestAnimationFrame(() => {
            this.quoteText.style.opacity = '1';
            this.quoteAuthor.style.opacity = '1';
        });
    }
    
    async copyQuote() {
        const quoteText = this.quoteText.textContent;
        const authorText = this.quoteAuthor.textContent;
        const fullQuote = `${quoteText} ${authorText}`;
        
        try {
            await navigator.clipboard.writeText(fullQuote);
            this.showNotification('Quote copied to clipboard!');
        } catch (error) {
            console.error('Error copying quote:', error);
            
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = fullQuote;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            this.showNotification('Quote copied to clipboard!');
        }
    }
    
    showLoading(show) {
        if (show) {
            this.loading.classList.add('active');
            this.getQuoteBtn.disabled = true;
            this.getQuoteBtn.textContent = 'Loading...';
        } else {
            this.loading.classList.remove('active');
            this.getQuoteBtn.disabled = false;
            this.getQuoteBtn.textContent = 'Get New Quote';
        }
    }
    
    showNotification(message) {
        this.notification.textContent = message;
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
    
    showError(message) {
        this.quoteText.textContent = message;
        this.quoteAuthor.textContent = '';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuoteGenerator();
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        document.getElementById('getQuoteBtn').click();
    }
});
