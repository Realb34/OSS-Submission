# OSS - Open Submission Series Website

## WOW Factor Features

This website has been completely transformed with centralized CSS and JavaScript, featuring spectacular interactive effects that will make users say "woah, that's cool!"

### Visual Effects

#### 1. **Animated Particle Background**
- Subtle floating particles throughout the entire site
- Smooth drift animations create a dynamic, living background
- Performance-optimized with reduced particles on lower-end devices

#### 2. **Cursor Trail Effect**
- Beautiful gradient trail follows your mouse cursor
- Multi-colored particles with smooth easing
- Screen blend mode creates a glowing effect
- Automatically disabled on low-performance devices

#### 3. **Glass Morphism Navigation**
- Frosted glass effect on the navigation bar
- Backdrop blur creates depth and modern aesthetics
- Smooth scroll-triggered enhancements

#### 4. **3D Card Tilt Effect**
- Cards respond to mouse movement with realistic 3D tilt
- Perspective transform creates depth
- Smooth transitions for premium feel

#### 5. **Magnetic Buttons**
- Buttons subtly follow your cursor when nearby
- Smooth attraction effect enhances interactivity
- Applied to all buttons, filters, and action elements

#### 6. **Ripple Click Effects**
- Every click creates an expanding ripple animation
- Radial gradient provides visual feedback
- Material Design inspired interaction

#### 7. **Hero Parallax**
- Background images scale and move on hover
- Smooth 8-second transition creates epic effect
- Multiple gradient overlays for depth

#### 8. **Animated Countdown**
- Flip animation on number changes
- 3D rotation effect with perspective
- Glowing segments with sweep animations

#### 9. **Confetti System**
- Auto-triggers when Grand Opening section enters view
- Click anywhere in the section for more confetti
- 160+ particles with physics-based falling animation
- Color-matched to brand palette

#### 10. **Gradient Text Animations**
- Shimming gradient text effects on titles
- Background position animation creates flow
- Glow pulse effects on eyebrow text

#### 11. **Staggered Scroll Reveals**
- Elements fade and slide in as you scroll
- Intersection Observer for performance
- 100ms stagger between elements for cascade effect

#### 12. **Custom Scrollbar**
- Gradient-themed scrollbar matching brand colors
- Smooth hover states
- Modern, minimal design

#### 13. **Hover State Enhancements**
- All cards lift on hover with box-shadow changes
- Border glow effects
- Smooth transform transitions
- Shine effect sweeps across cards

#### 14. **Selection Styling**
- Custom text selection colors
- Brand-matched gradient backgrounds

### Technical Features

#### Centralized Architecture
- **assets/style.css** - Single CSS file with all styles (~500 lines)
- **assets/main.js** - Core interactive features (~600 lines)
- **assets/index-page.js** - Home page specific code
- **assets/divisions-page.js** - Divisions page logic

#### Performance Optimizations
1. **Hardware Detection**
   - Checks device capabilities
   - Disables heavy effects on low-end devices
   - Respects `prefers-reduced-motion` setting

2. **Throttling & Debouncing**
   - Scroll events throttled to 10-100ms
   - Search input debounced to 120-150ms
   - Prevents performance issues

3. **CSS Will-Change**
   - Optimized transform properties
   - GPU acceleration for animations
   - Smooth 60fps performance

4. **Intersection Observer**
   - Efficient scroll reveal detection
   - Unobserve after animation triggers
   - Fallback for older browsers

#### Accessibility Features
- Full keyboard navigation support
- ARIA labels and roles throughout
- Focus management for modals/dropdowns
- Skip links and semantic HTML
- Print-friendly styles

### File Structure

```
OSS-Submission/
├── assets/
│   ├── style.css           # Centralized styles with animations
│   ├── main.js              # Core interactive features
│   ├── index-page.js        # Home page specific code
│   └── divisions-page.js    # Divisions page logic
├── index.html               # Home page
├── divisions.html           # Divisions listing
├── rules.html               # Rules and regulations
├── policies.html            # Site policies
└── README.md                # This file
```

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Graceful degradation for older browsers - effects disable but functionality remains.

### Interactive Elements

1. **Smart Dropdowns**
   - Hover to open on desktop
   - Click to toggle on mobile
   - Keyboard navigation (Arrow keys, Escape, etc.)
   - Auto-close on outside click

2. **Filterable Grids**
   - Real-time search filtering
   - Multi-select category filters
   - Active state indicators
   - Result count updates

3. **Comparison Tool** (Divisions page)
   - Select multiple divisions
   - Side-by-side comparison table
   - Persistent selection state

4. **Division Finder** (Divisions page)
   - Input age, skill rating, team format
   - Real-time matching algorithm
   - Suggested divisions display

### Color Palette

- **Primary**: `#e05024` (Vibrant Orange)
- **Secondary**: `#fff68d` (Soft Yellow)
- **Background**: `#0c0d10` (Deep Dark Blue)
- **Surface**: `#111218` / `#171923`
- **Text**: `#e7e9ee`
- **Muted**: `#a1a6b3`

Special "Grand Opening" palette with additional gradients and glow effects.

### Getting Started

1. Open `index.html` in a modern web browser
2. Experience the cursor trail as you move your mouse
3. Scroll to see staggered reveal animations
4. Hover over cards and buttons for interactive effects
5. Click anywhere in the Grand Opening section for confetti!

### Customization

To modify colors, edit the CSS variables in `assets/style.css`:

```css
:root {
  --bg: #0c0d10;
  --accent: #e05024;
  --accent-2: #fff68d;
  /* ... etc */
}
```

To adjust animation speeds, search for `transition` and `animation` properties in the CSS file.

### Credits

Built with modern web technologies:
- Vanilla JavaScript (no frameworks!)
- CSS3 with custom properties
- HTML5 semantic markup
- Intersection Observer API
- RequestAnimationFrame for smooth animations

---

**Note**: All effects are performance-monitored and automatically adjust based on device capabilities. The site remains fully functional even if JavaScript is disabled.

Enjoy the experience! 🎉
