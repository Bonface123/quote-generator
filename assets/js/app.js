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
            
            // Fetch quote from API using CORS proxy
            const response = await fetch('https://api.allorigins.win/raw?url=https://zenquotes.io/api/random');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data && data.length > 0) {
                const quote = data[0];
                this.displayQuote(quote.q, quote.a);
            } else {
                throw new Error('No quote data received');
            }
            
        } catch (error) {
            console.error('Error fetching quote:', error);
            this.showError('Failed to fetch quote. Please check your internet connection and try again.');
            
        } finally {
            this.showLoading(false);
        }
    }
    
    displayQuote(text, author) {
        this.quoteText.textContent = `"${text}"`;
        this.quoteAuthor.textContent = author;
        
        // Add fade-in effect
        this.quoteText.style.opacity = '0';
        this.quoteAuthor.style.opacity = '0';
        
        setTimeout(() => {
            this.quoteText.style.transition = 'opacity 0.5s ease';
            this.quoteAuthor.style.transition = 'opacity 0.5s ease';
            this.quoteText.style.opacity = '1';
            this.quoteAuthor.style.opacity = '1';
        }, 100);
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
