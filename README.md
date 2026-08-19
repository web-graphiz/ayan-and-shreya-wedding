# Ayan & Shreya — Luxury Royal Bengali Wedding Invitation Website

A luxury, interactive wedding landing page and digital invitation crafted with authentic Bengali heritage aesthetics (*Shubho Biye*), rich royal burgundy and champagne gold palettes, smooth 3D CSS animations, Web Audio API sound synthesis, and real-time canvas petal physics.

---

## 🌟 Key Features

### 1. 💌 3D Interactive Wax-Sealed Envelope Splash Screen
- **Realistic 3D Unfolding**: Clicking the wax seal (`A&S` monogram) triggers an authentic 3D unboxing animation where the seal dissolves, the top flap folds upwards, and the gold-bordered invitation letter smoothly slides out.
- **Dynamic Petal Bursts**: Explosive particle celebrations trigger during envelope opening and RSVP confirmations.
- **Smooth Transition**: Automatically dismisses the splash screen into the main website with synchronized hero entrance reveals.

### 2. 🎶 Ambient Indian Classical Synthesizer (Web Audio API)
- **Zero MP3 Dependencies**: Uses native browser `AudioContext`, `OscillatorNode`, and `BiquadFilterNode` to generate serene Indian classical melodies based on **Raag Yaman** (frequencies from 261.63 Hz to 523.25 Hz).
- **Floating Controls**: A rotating floating music toggle button in the bottom right corner lets guests play or pause ambient music at will.

### 3. 🌸 Real-Time Floating Flower Petals Particle Canvas
- **Trigonometric Physics**: Floating Marigold (*Genda Phool*), Rose, and Gold shimmer petals sway naturally across the screen with sinusoidal wind drift and rotation.
- **Performance Optimized**: Viewport-adaptive particle counts (18 on mobile, 30 on desktop) running at a silky 60 FPS using `requestAnimationFrame`.

### 4. ⏳ Live Real-Time Wedding Countdown Timer
- **Accurate Timekeeping**: Automatically counts down days, hours, minutes, and seconds to the main wedding ceremony date (December 12, 2026).
- **Graceful Fallback**: Automatically updates and handles post-wedding states.

### 5. 📖 Illustrated Love Story Timeline ("Our Love Story")
- **Chapter I**: *The First Hello* (November 2022) — Autumn tea meet in Kolkata.
- **Chapter II**: *Sunset Strolls* (March 2023) — Evening riverbank conversations.
- **Chapter III**: *The Sunset Proposal* (October 2025) — Rooftop fairy-tale proposal.

### 6. 🪔 Sacred Rituals & Itinerary (Balanced 2x2 Layout)
- **Gaye Holud & Adhibash** (Day 1 Morning) — Traditional yellow turmeric blessing ceremony at Mango Grove Lawns.
- **Mehendi & Sangeet Night** (Day 1 Evening) — Intricate bridal henna artistry and musical performances in the Royal Ballroom.
- **Saat Paak & Shubho Drishti** (Day 2 Main Wedding) — Sacred pheras around the Agni Mandap, Mala Badal, and Sindoor Daan.
- **Bou Bhat & Grand Reception** (Day 3 Gala) — Royal banquet welcome with live symphony and feast.
- **One-Click Calendar Integration**: Every ritual card includes direct **Add to Google Calendar** and **Google Maps Direction** buttons.

### 7. 🏰 Heritage Venue Showcase & Travel Guide
- **The Rajbari Bawali**: Spotlight on the 300-year-old restored architectural palace with Romanesque arches and sprawling courtyards.
- **Transit Guide**: Dedicated cards for arrivals from Kolkata Airport (CCU), Howrah/Sealdah Railway Stations, and Valet Parking.

### 8. 📸 Wedding Moments Gallery & Lightbox
- **Square Grid Gallery**: Responsive 2-column mobile / 4-column desktop photo showcase.
- **Full-Screen Lightbox**: Click any portrait to inspect high-resolution images in a backdrop-blurred modal view.

### 9. ✍️ Digital Wishes Wall & Guestbook
- **Interactive Blessings**: Guests can submit heartfelt messages directly from the website.
- **Like Counter**: Real-time heart reaction counter for every blessing.
- **Local Persistence**: Stored instantly using `localStorage` so messages persist between page reloads.

### 10. 📋 Interactive RSVP System
- **Comprehensive Guest Form**:
  - Full Name & Number of Guests (1, 2, 3, 4+ Family Members).
  - Dietary / Feast Preferences (*Traditional Bengali Feast with Fish & Meat*, *Pure Vegetarian*, *Jain Special*).
  - Stay Arrangements at *The Rajbari Bawali*.
  - Multi-select checkboxes for event attendance (*Gaye Holud*, *Saat Paak*, *Bou Bhat*).
- **Personalized Success Dialog**: Displays a celebratory popup modal with a customized greeting and flower burst.

### 11. 🧭 Navigation & Mobile Experience
- **Scrollspy Active Tracking**: Navbar automatically highlights the active section as you scroll.
- **Offset Scrolling**: Anchor links compensate for fixed header height.
- **Glassmorphic Mobile Drawer**: Smooth slide-out mobile menu with auto-dismiss on outside click or link selection.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Markup & Structure** | Semantic HTML5, ARIA accessibility attributes |
| **CSS Framework** | Tailwind CSS (via CDN) for grid utilities & spacing |
| **Custom Styling** | Vanilla CSS3 (`styles.css`) with Design Tokens, 3D Transforms, Keyframe Animations |
| **Scripting & Logic** | Modern Vanilla JavaScript (ES6+), Web Audio API, HTML5 Canvas API, LocalStorage |
| **Typography** | Google Fonts (*Cinzel*, *Cormorant Garamond*, *Great Vibes*, *Montserrat*, *Playfair Display*) |
| **Icons** | FontAwesome 6.4.0 (Icons for rituals, maps, calendars, social actions) |

---

## 📂 Project Directory Structure

```text
Ayan and Shreya/
│
├── index.html                  # Main semantic HTML5 single-page application
├── README.md                   # Comprehensive project documentation and setup guide
│
└── assets/
    ├── css/
    │   └── styles.css          # Custom CSS design system, 3D envelope, animations & theme
    ├── js/
    │   └── app.js              # Interactive logic (envelope, audio synth, canvas petals, RSVP, etc.)
    └── images/
        ├── bengali_hero.jpg    # Hero banner & wedding couple portrait
        ├── gallery_1.jpg       # Gallery photo (Rajbari Courtyard)
        ├── gallery_2.jpg       # Gallery photo (Floral Whispers)
        ├── hero_couple.jpg     # Alternate couple portrait
        ├── ritual_haldi.jpg    # Gaye Holud ceremony photo
        ├── ritual_mehendi.jpg  # Mehendi & Sangeet ceremony photo
        ├── ritual_phere.jpg    # Saat Paak & Shubho Drishti photo
        ├── ritual_reception.jpg# Bou Bhat reception photo
        ├── story_first_meet.jpg# Story Chapter 1 image
        ├── story_first_date.jpg# Story Chapter 2 image
        ├── story_proposal.jpg  # Story Chapter 3 image
        └── venue_rajbari.jpg   # The Rajbari Bawali heritage palace photo
```

---

## 🚀 Getting Started & Local Development

No package manager installation or build step is required! The project runs natively in all modern web browsers.

### Option 1: Direct File Opening
Double-click [`index.html`](file:///c:/Users/tridi/Works/Geekboots/templates/Ayan%20and%20Shreya/index.html) or open it directly in Google Chrome, Mozilla Firefox, Microsoft Edge, or Apple Safari.

### Option 2: VS Code Live Server
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click on `index.html` and select **Open with Live Server** (runs at `http://127.0.0.1:5500`).

### Option 3: Python Local HTTP Server
Run from terminal in the project directory:
```bash
# Python 3.x
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 4: Node.js `serve` / `http-server`
```bash
npx serve .
```

---

## 🎨 Customization Guide

### 1. Changing Couple Names, Dates & Hashtags
- **In [`index.html`](file:///c:/Users/tridi/Works/Geekboots/templates/Ayan%20and%20Shreya/index.html)**:
  - Search and replace `Ayan` & `Shreya` with the new couple's names.
  - Update `#AyanWedsShreya` with your custom wedding hashtag.
  - Update the date string in the envelope letter (`December 12, 2026`) and hero section.
- **In [`assets/js/app.js`](file:///c:/Users/tridi/Works/Geekboots/templates/Ayan%20and%20Shreya/assets/js/app.js)**:
  - Update the countdown target date in `initCountdown()`:
    ```javascript
    const targetDate = new Date('December 12, 2026 10:00:00').getTime();
    ```

### 2. Customizing the Color Palette & Theme
All color tokens are centralized in [`assets/css/styles.css`](file:///c:/Users/tridi/Works/Geekboots/templates/Ayan%20and%20Shreya/assets/css/styles.css) under `:root`:
```css
:root {
  --burgundy: #7a1c2e;         /* Primary brand color */
  --burgundy-dark: #54111d;    /* Dark backgrounds & button hover */
  --burgundy-light: #9e2a40;   /* Crimson accents */
  
  --gold-champagne: #c5a059;   /* Metallic gold accents & borders */
  --gold-accent: #d4af37;      /* Bright gold highlights */
  --gold-light: #e8d8b5;       /* Subtitle & text gold */
  
  --bg-porcelain: #faf9f6;     /* Body background */
  --bg-cream-soft: #f5f2eb;    /* Secondary section background */
}
```

### 3. Replacing Photos & Images
Drop your optimized JPEG or PNG images into `assets/images/` and ensure the file paths in `index.html` correspond to your images. Recommended dimensions:
- **Hero & Ritual Photos**: `1200 x 800 px` (Aspect ratio ~ `3:2` or `16:9`)
- **Gallery Portraits**: `800 x 800 px` (Square `1:1`)
- **Story Photos**: `900 x 600 px`

### 4. Updating Rituals & Calendar Links
Generate custom **Google Calendar** links for each event:
```text
https://calendar.google.com/calendar/render?action=TEMPLATE&text=[EVENT_TITLE]&dates=[YYYYMMDDTHHMMSSZ]/[YYYYMMDDTHHMMSSZ]&details=[DESCRIPTION]&location=[VENUE_LOCATION]
```

### 5. Connecting RSVP & Wishes to a Cloud Database
By default, RSVPs and Wishes are stored locally in the browser (`localStorage`). To send RSVPs to Google Sheets, Firebase, Supabase, or an email endpoint:
- In [`assets/js/app.js`](file:///c:/Users/tridi/Works/Geekboots/templates/Ayan%20and%20Shreya/assets/js/app.js) inside `initRSVP()`:
  ```javascript
  // Replace localStorage with fetch POST to your API:
  fetch('https://your-api-endpoint.com/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rsvpData)
  });
  ```
- Or use free form handling services like **Formspree**, **EmailJS**, or **Google Apps Script**.

---

## 📱 Browser Compatibility

- **Google Chrome** (Desktop & Mobile) — Full support
- **Apple Safari** (iOS & macOS) — Full support (includes iOS zoom prevention fixes)
- **Mozilla Firefox** — Full support
- **Microsoft Edge** — Full support
- **Opera / Brave / Samsung Internet** — Full support

---

## 📄 License & Credits

- **Fonts**: Google Fonts ([Cinzel](https://fonts.google.com/specimen/Cinzel), [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Great Vibes](https://fonts.google.com/specimen/Great+Vibes), [Montserrat](https://fonts.google.com/specimen/Montserrat))
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Design & Code**: Antigravity Assistant

*Shubho Biye! May love and blessings flourish.* 💖
