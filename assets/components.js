/* =========================================
   OSS - Shared Components
   Centralized header and footer components
   ========================================= */

/**
 * HEADER COMPONENT
 * Generates the navigation header for all pages
 * @param {string} currentPage - The current page identifier for highlighting
 */
function renderHeader(currentPage = '') {
  const config = window.OSSConfig;
  const isHomePage = currentPage === 'home';

  // Filter navigation based on page
  const navItems = config.navigation.filter(item => {
    if (item.showOnHomeOnly) {
      return isHomePage;
    }
    return true;
  });

  // Build navigation items
  let navHTML = '';
  navItems.forEach(item => {
    if (item.type === 'link') {
      const isCurrent = item.href.includes(currentPage) && currentPage !== '';
      navHTML += `
        <a class="nav-link" role="menuitem" href="${item.href}"${isCurrent ? ' aria-current="page"' : ''}>
          ${item.text}
        </a>
      `;
    } else if (item.type === 'dropdown') {
      navHTML += `
        <div class="dropdown" data-dropdown aria-expanded="false">
          <button class="dropdown-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="menu-schedule">
            ${item.text} <span class="caret" aria-hidden="true"></span>
          </button>
          <div id="menu-schedule" class="dropdown-menu" role="menu" aria-label="${item.text} submenu">
            ${item.items.map(subItem => {
              const isSubCurrent = subItem.href.includes(currentPage) && currentPage !== '';
              return `<a role="menuitem" href="${subItem.href}"${isSubCurrent ? ' aria-current="page"' : ''}>${subItem.text}</a>`;
            }).join('')}
          </div>
        </div>
      `;
    }
  });

  const homeLink = isHomePage ? '#top' : 'index.html#top';

  return `
    <header class="topbar" role="banner">
      <div class="container nav" aria-label="Primary">
        <a class="brand" href="${homeLink}" aria-label="Home">
          <img alt="Logo" src="${config.logo}" />
          <span>${config.siteName}</span>
        </a>

        <nav>
          <button class="burger" id="navToggle" aria-expanded="false" aria-controls="navMenu" aria-label="Toggle navigation">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
            </svg>
          </button>

          <div id="navMenu" class="nav-links" role="menubar">
            ${navHTML}
          </div>
        </nav>
      </div>
    </header>
  `;
}

/**
 * FOOTER COMPONENT
 * Generates the footer for all pages
 * @param {string} aboutText - Optional custom about text for specific pages
 */
function renderFooter(aboutText = '') {
  const config = window.OSSConfig;
  const about = aboutText || config.about.short;

  // Build social media links
  let socialHTML = '';
  if (config.social && Object.keys(config.social).length > 0) {
    socialHTML = '<div class="social-links">';
    Object.entries(config.social).forEach(([platform, url]) => {
      if (url) {
        const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
        socialHTML += `<a href="${url}" target="_blank" rel="noopener" aria-label="${platformName}">${platformName}</a>`;
      }
    });
    socialHTML += '</div>';
  }

  return `
    <footer id="footer">
      <div class="container footer-grid reveal" data-animate="fade-up">
        <div class="footer-col">
          <h4>About</h4>
          <p class="lead">${about}</p>
          ${socialHTML}
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          ${config.footerLinks.column1.map(link =>
            `<a href="${link.href}">${link.text}</a>`
          ).join('')}
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          ${config.footerLinks.column2.map(link =>
            `<a href="${link.href}">${link.text}</a>`
          ).join('')}
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <a href="mailto:${config.contact.email}" class="link">${config.contact.email}</a>
          ${config.contact.phone ? `<span class="space-s"></span><a href="tel:${config.contact.phone.replace(/\s/g, '')}" class="link">${config.contact.phone}</a>` : ''}
          <span class="space-s"></span>
          <span class="pill">${config.contact.hours}</span>
        </div>
      </div>
      <div class="container copyright">
        © <span id="year"></span> ${config.copyrightText}
      </div>
    </footer>
  `;
}

/**
 * Initialize header on page load
 * Call this function in your HTML with the appropriate page identifier
 */
function initHeader(currentPage = '') {
  const existingHeader = document.querySelector('.topbar');
  if (existingHeader) {
    existingHeader.outerHTML = renderHeader(currentPage);
  }
}

/**
 * Initialize footer on page load
 * Call this function in your HTML with optional custom about text
 */
function initFooter(aboutText = '') {
  const existingFooter = document.querySelector('#footer');
  if (existingFooter) {
    existingFooter.outerHTML = renderFooter(aboutText);
  }
}

// Make functions globally available
window.OSSComponents = {
  renderHeader,
  renderFooter,
  initHeader,
  initFooter
};
