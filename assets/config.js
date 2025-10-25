/* =========================================
   OSS - Centralized Configuration
   All shared data and settings in one place
   ========================================= */

/*
 * SITE CONFIGURATION
 * Modify these values to update information across all pages
 */

const OSSConfig = {
  // Company Information
  siteName: 'OSS',
  fullName: 'Open Submission Series',
  tagline: 'Fight for your spot.',

  // Contact Information
  contact: {
    email: 'info@example.com',
    phone: '+1 (555) 123-4567', // Optional
    hours: 'Mon–Sun · 9–5'
  },

  // Social Media Links (add or remove as needed)
  social: {
    facebook: 'https://facebook.com/oss',
    twitter: 'https://twitter.com/oss',
    instagram: 'https://instagram.com/oss',
    youtube: 'https://youtube.com/@oss'
  },

  // Branding
  logo: 'https://i.imgur.com/XpO73I9.png',

  // About/Mission Statement
  about: {
    short: 'OSS is a premier tournament organization dedicated to competitive excellence.',
    mission: 'Our mission is to host fair, transparent competition across accessible divisions.'
  },

  // Navigation Links
  // IMPORTANT: To add/remove navigation items, modify this array
  navigation: [
    { text: 'Home', href: 'index.html#hero', type: 'link' },
    { text: 'Grand Opening', href: 'index.html#grand-opening', type: 'link', showOnHomeOnly: true },
    { text: 'Events', href: 'index.html#events-head', type: 'link' },
    {
      text: 'Schedule',
      type: 'dropdown',
      items: [
        { text: 'Policies', href: 'policies.html' },
        { text: 'Informations', href: 'informations.html' },
        { text: 'Rules', href: 'rules.html' },
        { text: 'Divisions', href: 'divisions.html' }
      ]
    },
    { text: 'Contact', href: '#footer', type: 'link' }
  ],

  // Footer Links
  // IMPORTANT: To add/remove footer links, modify this array
  footerLinks: {
    column1: [
      { text: 'Home', href: 'index.html#hero' },
      { text: 'Events', href: 'index.html#events-head' },
      { text: 'Schedule', href: 'index.html#events-tables' }
    ],
    column2: [
      { text: 'Policies', href: 'policies.html' },
      { text: 'Rules', href: 'rules.html' },
      { text: 'Divisions', href: 'divisions.html' }
    ]
  },

  // Grand Opening Event Details
  // IMPORTANT: Modify this to change the grand opening countdown and details
  grandOpening: {
    enabled: true, // Set to false to hide grand opening section
    title: 'Launch Tournament',
    date: '2025-11-20T01:00:00-04:00', // ISO 8601 format
    displayDate: 'November 20, 2025 · 2:00 AM',
    location: 'Meet me outside the blue store',
    buttons: [
      { text: 'RSVP Now', href: '#events-tables', style: 'primary' },
      { text: 'See Full Schedule', href: '#events-head', style: 'outline' }
    ]
  },

  // Copyright
  copyrightText: 'OSS. All rights reserved.'
};

// Make config globally available
window.OSSConfig = OSSConfig;
