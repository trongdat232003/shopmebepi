// Load footer component into all pages
async function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    try {
      const response = await fetch('components/footer.html');
      const footerHtml = await response.text();
      footerPlaceholder.innerHTML = footerHtml;
      
      // Initialize Lucide icons after footer is loaded
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }
}

// Load footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFooter);
} else {
  loadFooter();
}
