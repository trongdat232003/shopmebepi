// Load header component into all pages
async function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    try {
      const response = await fetch('components/header.html');
      const headerHtml = await response.text();
      headerPlaceholder.innerHTML = headerHtml;
      
      // Initialize Lucide icons after header is loaded
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
      
      // Highlight active menu item after header is loaded
      highlightActiveMenu();
    } catch (error) {
      console.error('Error loading header:', error);
    }
  }
}

// Highlight active menu item based on current page
function highlightActiveMenu() {
  // Get current page filename
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
  
  // Find all menu links
  const menuLinks = document.querySelectorAll('nav a[href]');
  
  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Remove active classes from all links first
    link.classList.remove('text-brand-teal', 'font-bold', 'border-b-2', 'border-brand-teal');
    link.classList.add('text-gray-600');
    
    // Check if this link matches current page
    if (href === currentPage || href === './' + currentPage || href === currentPage.replace('.html', '')) {
      // Add active classes
      link.classList.remove('text-gray-600');
      link.classList.add('text-brand-teal', 'font-bold', 'border-b-2', 'border-brand-teal');
    }
    
    // Special case for index.html when on root
    if (currentPage === '' && href === 'index.html') {
      link.classList.remove('text-gray-600');
      link.classList.add('text-brand-teal', 'font-bold', 'border-b-2', 'border-brand-teal');
    }
  });
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}
