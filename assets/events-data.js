/* =========================================
   OSS - Events Data
   Centralized event management
   ========================================= */

/*
 * EVENTS CONFIGURATION
 * IMPORTANT: To add, remove, or modify events, simply edit this array
 *
 * Event Format:
 * {
 *   date: 'YYYY-MM-DD',           // Required: Event date in ISO format
 *   title: 'Event Name',          // Required: Event title
 *   location: 'Location Name',    // Required: Event location
 *   url: 'https://...',           // Optional: Link to event details/registration
 *   description: 'Details...'     // Optional: Additional details
 * }
 */

const OSSEvents = [
  {
    date: '2025-09-12',
    title: 'District Championship',
    location: 'Downtown Ft Myers',
    url: '#',
    description: 'Annual district tournament featuring all skill levels'
  },
  {
    date: '2025-10-05',
    title: 'Roll around the wings',
    location: 'Blue store',
    url: '#',
    description: 'Special event with unique format'
  },
  {
    date: '2025-11-22',
    title: 'Sign ups and Meet & Greet',
    location: 'Edison Mall',
    url: '#',
    description: 'Open registration and community meetup'
  },
  {
    date: '2025-07-18',
    title: 'District Championship',
    location: 'Cape High School',
    url: '#',
    description: 'Mid-year championship event'
  },
  {
    date: '2025-06-02',
    title: 'Community Blood Drive Tournament',
    location: 'Scoops & Treats',
    url: '#',
    description: 'Tournament supporting local blood drive initiative'
  }

  /*
   * INSTRUCTIONS FOR ADDING NEW EVENTS:
   *
   * 1. Copy the template below:
   *
   * {
   *   date: '2025-12-15',
   *   title: 'New Event Title',
   *   location: 'Event Location',
   *   url: '#',
   *   description: 'Event description'
   * }
   *
   * 2. Paste it above this comment block
   * 3. Add a comma after the previous event
   * 4. Update the date, title, location, url, and description
   * 5. Save the file
   *
   * Events will automatically be sorted by date and appear in the
   * "Upcoming" or "Previous" tables based on the current date.
   *
   * EXAMPLE - Adding a holiday tournament:
   *
   * {
   *   date: '2025-12-20',
   *   title: 'Holiday Championship',
   *   location: 'City Arena',
   *   url: 'https://example.com/holiday-tourney',
   *   description: 'End of year championship event'
   * },
   */
];

// Make events globally available
window.OSSEvents = OSSEvents;
