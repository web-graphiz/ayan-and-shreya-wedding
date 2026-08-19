/**
 * ============================================================================
 * Wedding Celebration Web Application - Ayan & Shreya
 * ============================================================================
 * Author: Antigravity Pairing Assistant
 * Description: Interactive client-side scripts for the luxury Bengali royal wedding
 *              invitation website. Features a 3D opening envelope splash screen,
 *              Web Audio API instrumental synth, HTML5 Canvas flower petal physics,
 *              live countdown timer, scrollspy navigation, digital guestbook,
 *              RSVP form management, and photo gallery lightbox.
 * Version: 1.0.0
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// Application Lifecycle & Event Listener
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules once the DOM is fully loaded and parsed
  initEnvelope();         // 3D Interactive Envelope Splash Screen
  initPetalsCanvas();     // Floating Marigold & Rose Petals Canvas Animation
  initCountdown();        // Live Wedding Countdown Timer
  initAudio();            // Ambient Web Audio API Synthesizer
  initNavigation();       // Glassmorphic Navbar & Mobile Drawer
  initScrollAnimations(); // Intersection Observer Scroll Reveal Animations
  initScrollspy();        // Section Scrollspy Active State & Smooth Anchor Links
  initRSVP();             // Guest RSVP Form Handler & Confirmation Modal
  initWishesWall();       // Digital Guestbook & Wishes Wall with LocalStorage
  initGalleryModal();     // Photo Gallery Lightbox Viewer
});

/* ============================================================================
   1. Realistic Interactive 3D Envelope Splash Screen Logic
   ============================================================================ */

/**
 * Initializes the interactive wax-sealed 3D envelope splash screen.
 * Handles click interactions to break the wax seal, flip open the envelope flap,
 * elevate the gold-bordered invitation letter, play celebratory music,
 * trigger a petal burst, and transition seamlessly into the main website.
 */
function initEnvelope() {
  const envelopeScreen = document.getElementById('envelope-screen');
  const envelopeContainer = document.getElementById('envelope-trigger');
  let isOpening = false;

  if (envelopeContainer && envelopeScreen) {
    /**
     * Handler triggered when the user taps or clicks anywhere on the envelope
     */
    const handleOpen = () => {
      // If already undergoing the opening sequence, fast-forward straight to the main page
      if (isOpening) {
        envelopeScreen.classList.add('opened');
        triggerHeroReveal();
        return;
      }

      isOpening = true;

      // 1. Play ambient classical music and trigger an initial celebratory petal burst
      playSynthMusic();
      createBurstPetals();

      // 2. Add class to animate the wax seal fade, top flap fold-up, and letter slide-out
      envelopeContainer.classList.add('opening');

      // 3. Trigger a secondary celebratory petal burst when the letter reaches maximum elevation
      setTimeout(() => {
        createBurstPetals();
      }, 500);

      // 4. Smoothly fade out the splash screen and reveal the hero cover section
      setTimeout(() => {
        envelopeScreen.classList.add('opened');
        setTimeout(() => {
          triggerHeroReveal();
        }, 150);
      }, 1400);
    };

    // Attach click event to the envelope container
    envelopeContainer.addEventListener('click', handleOpen);
  }
}

/**
 * Activates CSS entrance animations on hero section elements immediately after
 * the splash screen transitions out.
 */
function triggerHeroReveal() {
  document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right, #hero .reveal-scale').forEach(el => {
    el.classList.add('reveal-active');
  });
}

/* ============================================================================
   2. Ambient Instrumental Synthesizer (Web Audio API)
   ============================================================================ */

// Global AudioContext and playback state references
let audioCtx = null;       // AudioContext instance for real-time sound generation
let isPlaying = false;     // Tracks whether background ambient music is active
let synthInterval = null;  // Interval timer ID for looping Indian classical melody notes

/**
 * Initializes the floating audio toggle button in the lower-right corner.
 * Allows users to play or pause the ambient synthesizer music at any time.
 */
function initAudio() {
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (isPlaying) {
        stopSynthMusic();
        audioBtn.classList.remove('playing');
        audioBtn.innerHTML = '<i class="fas fa-music"></i>';
      } else {
        playSynthMusic();
        audioBtn.classList.add('playing');
        audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
    });
  }
}

/**
 * Starts generating peaceful Indian classical melodies based on Raag Yaman frequencies
 * using pure Web Audio API oscillators, biquad filters, and gain nodes (no external MP3 needed).
 */
function playSynthMusic() {
  if (isPlaying) return;
  
  // Cross-browser AudioContext constructor
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  
  // Lazy initialize AudioContext on user gesture to comply with browser autoplay policies
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  
  // Resume AudioContext if suspended by browser autoplay policy
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  isPlaying = true;
  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.classList.add('playing');
    audioBtn.innerHTML = '<i class="fas fa-pause"></i>';
  }

  // Raag Yaman Festive Melodic Frequencies (in Hz: C4, D4, E4, F#4, G4, A4, B4, C5)
  const notes = [261.63, 293.66, 329.63, 369.99, 392.00, 440.00, 493.88, 523.25];
  let noteIndex = 0;

  // Periodically synthesize warm, soft flute-like tones
  synthInterval = setInterval(() => {
    if (!isPlaying || !audioCtx) return;
    
    try {
      // 1. Oscillator for waveform generation
      const osc = audioCtx.createOscillator();
      // 2. Gain node for smooth envelope attack and decay
      const gain = audioCtx.createGain();
      
      osc.type = 'triangle'; // Warm, flute-like soft acoustic timbre
      osc.frequency.setValueAtTime(notes[noteIndex % notes.length], audioCtx.currentTime);
      
      // 3. Low-pass filter to soften high-end harmonics
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1400;

      // Audio envelope (Attack & Decay)
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);
      
      // Audio routing graph: Oscillator -> Lowpass Filter -> Gain Node -> Master Output
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      
      // Play note and automatically stop after envelope completion
      osc.start();
      osc.stop(audioCtx.currentTime + 2.6);

      noteIndex++;
    } catch (e) {
      console.log('Audio note synthesis error:', e);
    }
  }, 1100);
}

/**
 * Stops ambient music playback and clears the note generation timer.
 */
function stopSynthMusic() {
  isPlaying = false;
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

/* ============================================================================
   3. Floating Marigold, Rose & Gold Petals Canvas Animation
   ============================================================================ */

// Array storing all active petal particle objects
let petals = [];

/**
 * Initializes the full-screen HTML5 canvas overlay for falling rose and marigold petals.
 * Implements smooth trigonometric physics with gentle swaying, wind drift, and rotation.
 */
function initPetalsCanvas() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Keep canvas resolution synced with viewport dimensions
  function handleResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 150);
  }, { passive: true });

  // Traditional Bengali wedding color palette for petals: Crimson Burgundy, Champagne Gold, Cream, Soft Rose, White
  const petalColors = ['#7a1c2e', '#c5a059', '#e8d8b5', '#9e2a40', '#ffffff'];
  const petalCount = window.innerWidth < 640 ? 18 : 30; // Optimized count for mobile & desktop performance

  // Generate initial falling petal particles
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 4,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      speedY: Math.random() * 1.4 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 2 - 1
    });
  }

  /**
   * Main 60 FPS animation render loop for petal particle physics
   */
  function render() {
    ctx.clearRect(0, 0, width, height);

    petals.forEach((p) => {
      // Update vertical gravity & horizontal swaying wave
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
      p.rotation += p.rotSpeed;

      // Recycle petals back to the top once they exit the bottom of the viewport
      if (p.y > height) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      // Draw petal as an elliptical path with soft opacity
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  // Start animation loop
  render();
}

/**
 * Creates an energetic burst explosion of celebratory flower petals from center screen.
 * Called when opening the wedding envelope, submitting wishes, and confirming RSVP.
 */
function createBurstPetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const width = window.innerWidth;
  const petalColors = ['#7a1c2e', '#c5a059', '#e8d8b5', '#ffffff'];
  const count = window.innerWidth < 640 ? 16 : 28;

  for (let i = 0; i < count; i++) {
    petals.push({
      x: width / 2 + (Math.random() * 160 - 80),
      y: window.innerHeight / 2 + (Math.random() * 160 - 80),
      size: Math.random() * 9 + 5,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      speedY: Math.random() * -3 - 1, // Upward initial velocity
      speedX: Math.random() * 4 - 2,  // Outward horizontal spread
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 4 - 2
    });
  }
}

/* ============================================================================
   4. Scroll & Entry Intersection Observer Animations
   ============================================================================ */

/**
 * Initializes IntersectionObserver to reveal cards, titles, and images
 * as they smoothly scroll into the user's viewport.
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, observerOptions);

  // Observe all elements with reveal classes across the page
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================================================
   5. Scrollspy Navigation Active State Tracking & Smooth Anchor Scroll
   ============================================================================ */

/**
 * Dynamically highlights the current active menu link as the user scrolls through sections
 * and provides smooth offset scrolling that avoids obscuring section headers beneath the fixed navbar.
 */
function initScrollspy() {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const desktopLinks = Array.from(document.querySelectorAll('.nav-header .nav-link'));
  const mobileLinks = Array.from(document.querySelectorAll('#mobile-menu .mobile-nav-link'));
  const allNavLinks = [...desktopLinks, ...mobileLinks];

  /**
   * Updates CSS active classes across desktop and mobile menu items
   * @param {string} activeId - ID of the currently visible section
   */
  function setActiveLink(activeId) {
    allNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Calculates which section is currently occupying the primary viewport area
   */
  function updateActiveSection() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const headerHeight = document.querySelector('.nav-header')?.offsetHeight || 70;

    // 1. If at bottom of page, activate RSVP section link
    if (scrollY + windowHeight >= documentHeight - 50) {
      setActiveLink('rsvp');
      return;
    }

    // 2. If near top of page, activate Hero section link
    if (scrollY < 120) {
      setActiveLink('hero');
      return;
    }

    // 3. Determine active section based on current scroll position and section boundaries
    let activeId = 'hero';
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.offsetTop - headerHeight - 30;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        activeId = section.getAttribute('id');
        break;
      }
    }

    setActiveLink(activeId);
  }

  // Listen to window scroll & resize events with passive performance flags
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  window.addEventListener('resize', updateActiveSection, { passive: true });
  updateActiveSection();

  // Smooth scroll with fixed header offset compensation on all in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();

        // Dismiss envelope splash screen if anchor was triggered from within
        const envelopeScreen = document.getElementById('envelope-screen');
        if (envelopeScreen && !envelopeScreen.classList.contains('opened')) {
          envelopeScreen.classList.add('opened');
          triggerHeroReveal();
        }

        const headerHeight = document.querySelector('.nav-header')?.offsetHeight || 70;
        const targetTop = targetId === 'hero' ? 0 : (targetElement.getBoundingClientRect().top + window.scrollY - headerHeight + 5);

        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });

        setActiveLink(targetId);
      }
    });
  });
}

/* ============================================================================
   6. Live Wedding Countdown Timer
   ============================================================================ */

/**
 * Calculates remaining days, hours, minutes, and seconds until the main wedding date
 * (December 12, 2026 10:00:00 IST) and updates the hero countdown DOM elements.
 */
function initCountdown() {
  const targetDate = new Date('December 12, 2026 10:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Handle post-wedding state
    if (difference < 0) {
      document.getElementById('days').innerText = '00';
      document.getElementById('hours').innerText = '00';
      document.getElementById('minutes').innerText = '00';
      document.getElementById('seconds').innerText = '00';
      return;
    }

    // Time calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // DOM Element handles
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Format with leading zeroes
    if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  // Initial calculation and 1-second interval execution
  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ============================================================================
   7. Navigation & Mobile Drawer Menu Handler
   ============================================================================ */

/**
 * Manages fixed header blur background styling upon scrolling and controls
 * opening/closing behaviors for the mobile drawer navigation menu.
 */
function initNavigation() {
  const header = document.querySelector('.nav-header');
  
  // Add frosted glass styling when page is scrolled down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    /**
     * Helper to close mobile menu
     */
    const closeMobileMenu = () => {
      mobileMenu.classList.add('hidden');
      mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
      mobileBtn.setAttribute('aria-expanded', 'false');
    };

    /**
     * Helper to open mobile menu
     */
    const openMobileMenu = () => {
      mobileMenu.classList.remove('hidden');
      mobileBtn.innerHTML = '<i class="fas fa-times"></i>';
      mobileBtn.setAttribute('aria-expanded', 'true');
    };

    // Toggle menu state on button click
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileMenu.classList.contains('hidden')) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });

    // Close menu when clicking any link inside the drawer
    document.querySelectorAll('#mobile-menu a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close menu when clicking outside on the backdrop
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Auto-close menu if viewport is resized to desktop breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
      }
    }, { passive: true });
  }
}

/* ============================================================================
   8. Interactive RSVP Form Handler
   ============================================================================ */

/**
 * Handles RSVP submission, saves responses to localStorage, triggers celebratory
 * petal particles, and presents a personalized confirmation modal dialog.
 */
function initRSVP() {
  const form = document.getElementById('rsvp-form');
  const modal = document.getElementById('rsvp-success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const guestName = document.getElementById('guest-name')?.value || 'Valued Guest';
      const guestCount = document.getElementById('guest-count')?.value || '1';
      
      // Structure guest RSVP response payload
      const rsvpData = {
        name: guestName,
        guests: guestCount,
        food: document.getElementById('guest-food')?.value,
        stay: document.getElementById('guest-stay')?.value,
        events: Array.from(document.querySelectorAll('input[name="event"]:checked')).map(cb => cb.value),
        timestamp: new Date().toISOString()
      };
      
      // Persist RSVP data into browser localStorage
      localStorage.setItem('ayan_shreya_rsvp_' + Date.now(), JSON.stringify(rsvpData));

      // Display customized success modal
      if (modal) {
        document.getElementById('modal-guest-name').innerText = guestName;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        createBurstPetals(); // Celebratory flower burst
      }

      form.reset();
    });
  }

  // Modal dismiss handler
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
  }
}

/* ============================================================================
   9. Live Digital Wishes Wall & Guestbook
   ============================================================================ */

// Default starter blessings from family and friends
const defaultWishes = [
  { name: 'Debashish & Lopamudra Mukherjee', text: 'Shubho Biye! May your union be filled with boundless joy, love, and sweet moments forever.', likes: 18, time: '1 hour ago' },
  { name: 'Sujata & Sourav Banerjee', text: 'Sending our warmest blessings to Ayan & Shreya! Looking forward to celebrating with both families.', likes: 14, time: '3 hours ago' },
  { name: 'Tritiya & Arnab Roy', text: 'Can’t wait to cheer during the Gaye Holud and dance at the grand reception!', likes: 21, time: '1 day ago' }
];

/**
 * Manages the Digital Guestbook / Wishes Wall.
 * Loads stored wishes from localStorage (with fallbacks), renders responsive wish cards,
 * supports guest message submissions, and provides interactive like counters.
 */
function initWishesWall() {
  const container = document.getElementById('wishes-container');
  const form = document.getElementById('wish-form');

  if (!container) return;

  // Retrieve user wishes from localStorage or populate with starter defaults
  let stored = JSON.parse(localStorage.getItem('ayan_shreya_wishes') || '[]');
  let allWishes = stored.length > 0 ? stored : defaultWishes;

  /**
   * Renders the dynamic wish cards grid
   */
  function renderWishes() {
    container.innerHTML = '';
    allWishes.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'wish-card reveal';
      card.innerHTML = `
        <p class="text-stone-700 text-sm mb-4 relative z-10 italic">"${escapeHtml(item.text)}"</p>
        <div class="flex items-center justify-between border-t border-[#c5a059]/20 pt-3 mt-2">
          <div>
            <h4 class="font-serif font-bold text-[#7a1c2e] text-sm">${escapeHtml(item.name)}</h4>
            <span class="text-xs text-stone-400">${item.time || 'Just now'}</span>
          </div>
          <button onclick="likeWish(${idx})" class="flex items-center gap-1.5 text-xs text-[#7a1c2e] hover:text-[#54111d] transition-colors font-semibold" title="Like this wish" aria-label="Like wish by ${escapeHtml(item.name)}">
            <i class="fas fa-heart text-[#7a1c2e]"></i> <span>${item.likes || 0}</span>
          </button>
        </div>
      `;
      container.appendChild(card);
    });
    
    // Trigger entry animations for newly rendered cards
    setTimeout(() => {
      container.querySelectorAll('.wish-card').forEach(el => el.classList.add('reveal-active'));
    }, 50);
  }

  // Render initial wishes
  renderWishes();

  // Wish submission form handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('wish-name');
      const textInput = document.getElementById('wish-text');

      if (!nameInput.value || !textInput.value) return;

      const newWish = {
        name: nameInput.value.trim(),
        text: textInput.value.trim(),
        likes: 1,
        time: 'Just now'
      };

      // Add to beginning of array and persist to localStorage
      allWishes.unshift(newWish);
      localStorage.setItem('ayan_shreya_wishes', JSON.stringify(allWishes));
      renderWishes();
      createBurstPetals();

      // Reset input fields
      nameInput.value = '';
      textInput.value = '';
    });
  }

  /**
   * Globally exposed helper to increment like counts on wish cards
   * @param {number} index - Index of wish in the array
   */
  window.likeWish = function(index) {
    allWishes[index].likes = (allWishes[index].likes || 0) + 1;
    localStorage.setItem('ayan_shreya_wishes', JSON.stringify(allWishes));
    renderWishes();
  };
}

/* ============================================================================
   10. Lightbox Photo Gallery Viewer
   ============================================================================ */

/**
 * Initializes full-screen image lightbox preview modal when gallery portraits are clicked.
 */
function initGalleryModal() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('close-lightbox');

  // Open modal on gallery photo click
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
      }
    });
  });

  // Close modal on close button click
  if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    });
    
    // Close modal when clicking anywhere on the dark backdrop
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
      }
    });
  }
}

/* ============================================================================
   11. Utility Helpers
   ============================================================================ */

/**
 * Sanitizes user text to prevent XSS injection attacks in guestbook entries
 * @param {string} str - Raw user input string
 * @returns {string} Sanitized HTML safe string
 */
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
