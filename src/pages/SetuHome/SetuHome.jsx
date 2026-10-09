import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import { getAssetUrl } from '../../utils/assetUrl';
import { useCart } from '../../context/CartContext';
import './SetuHome.css';

/* ────────────────────────────────────────────────────────────
   1. HERO BANNER SLIDES DATA (3 PREMIUM SLIDES)
──────────────────────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    id: 'cargo-security',
    eyebrow: 'CARGO SECURITY SOLUTIONS',
    headlineLine1: 'Smarter GPS Cargo Security',
    headlineLine2: 'For a safer, more reliable fleet.',
    titlePrefix: 'Smarter GPS Cargo Security\n',
    titleAccent: 'For a safer, more reliable fleet.',
    description: 'Remote OTP unlocking, tamper detection, and real-time transit visibility.',
    primaryCta: 'Explore Cargo Security',
    primaryLink: '/hardware/7h-elock',
    secondaryCta: 'Learn more',
    visualImg: '/images/hardware/7h-elock-banner-visual.png',
    visualAlt: 'Setu 7H Heavy Duty GPS E-Lock',
    specs: {
      'HARDWARE MODEL': 'Setu 7H Heavy-Duty GPS E-Lock',
      'CONNECTIVITY': '4G LTE Cat 1 with 2G GSM Highway Fallback',
      'POWER & BATTERY': '15,000mAh Rechargeable (Up to 45 Days Autonomous)',
      'HOUSING RATING': 'IP68 Heavy-Duty Waterproof & Anti-Tamper Steel Enclosure',
      'ACCESS CONTROL': 'Remote OTP Dynamic Unlocking & RFID Card Swiping',
      'ANTI-TAMPER': 'Steel wire-rope cut sensor with 110dB Siren & Cloud Alert'
    }
  },
  {
    id: 'vehicle-tracking',
    eyebrow: 'COMMERCIAL FLEET MANDATE',
    headlineLine1: 'Government Certified AIS-140 GPS',
    headlineLine2: 'With emergency SOS & dual eSIM.',
    titlePrefix: 'Government Certified AIS-140 GPS\n',
    titleAccent: 'With emergency SOS & dual eSIM.',
    description: 'ARAI & ICAT compliant tracking with direct State 112 emergency response.',
    primaryCta: 'Explore AIS-140 GPS',
    primaryLink: '/hardware/prithvi-140',
    secondaryCta: 'Learn more',
    visualImg: '/images/hardware/dark-hero-fleet-visual.png',
    visualAlt: 'T98 AIS 140 Government Certified GPS Device',
    specs: {
      'HARDWARE MODEL': 'Prithvi 140 / T98 AIS 140 Certified GPS Tracker',
      'CONNECTIVITY': '4G LTE Cat 1 + Embedded Dual eSIM (Multi-Carrier Roaming)',
      'SATELLITE POSITIONING': 'Dual GNSS GPS + Indian NavIC (IRNSS) Receiver',
      'EMERGENCY SOS': 'Physical Panic Button wired directly to State 112 Stream',
      'DATA TRANSMISSION': 'Simultaneous Dual-IP Streaming (Govt MoRTH + Fleet Server)',
      'BATTERY BACKUP': 'Minimum 4-Hour Internal Battery with Main Power Cut Alarm'
    }
  },
  {
    id: 'video-telematics',
    eyebrow: 'AI VIDEO TELEMATICS',
    headlineLine1: 'AI Dual-Vision Video Telematics',
    headlineLine2: 'With active ADAS & DMS safety.',
    titlePrefix: 'AI Dual-Vision Video Telematics\n',
    titleAccent: 'With active ADAS & DMS safety.',
    description: 'Real-time driver fatigue monitoring, lane departure, and cloud video uploads.',
    primaryCta: 'Explore AI Dashcams',
    primaryLink: '/hardware/falcon-f1-ai-4g',
    secondaryCta: 'Learn more',
    visualImg: '/images/hardware/banner-ai-dashcam.jpg',
    visualAlt: 'Mercetech Falcon F1 AI Dual Dashcam',
    specs: {
      'HARDWARE MODEL': 'Mercetech Falcon F1 Dual-Lens AI Camera',
      'CAMERA SENSORS': 'Dual 1080p FHD (Road Facing ADAS + In-Cabin DMS)',
      'FATIGUE MONITORING': 'Infrared Night Vision PERCLOS Eye-Closure & Yawn Detection',
      'ACTIVE COLLISION': 'Forward Collision Warning (FCW) & Lane Departure (LDW)',
      'CLOUD STREAMING': '4G LTE High-Definition Live Video & Automatic Event Clips',
      'IN-CABIN ALARMS': 'Instant Audio Voice Prompts & Millisecond Warning Buzzer'
    }
  },
  {
    id: 'fuel-sensors',
    eyebrow: 'PRECISION FUEL TELEMETRY',
    headlineLine1: 'Precision Fuel Telemetry & Security',
    headlineLine2: 'Stop diesel theft with 99.5% accuracy.',
    titlePrefix: 'Precision Fuel Telemetry & Security\n',
    titleAccent: 'Stop diesel theft with 99.5% accuracy.',
    description: 'Wireless BLE 5.0 digital probe with instant 30-second siphon drop alerts.',
    primaryCta: 'Explore Fuel Sensors',
    primaryLink: '/hardware/sp-ble4-fuel',
    secondaryCta: 'Learn more',
    visualImg: '/images/hardware/banner-fuel-sensor.jpg',
    visualAlt: 'LLS BLE-4 Wireless Fuel Level Sensor',
    specs: {
      'HARDWARE MODEL': 'LLS BLE-4 Wireless Capacitive Fuel Sensor',
      'MEASUREMENT ACCURACY': '99.5% High-Precision Continuous Capacitive Probe',
      'WIRELESS PROTOCOL': 'Bluetooth Low Energy (BLE 5.0) Wireless Telemetry',
      'SAFETY COMPLIANCE': 'Explosion-Proof Sealed Housing with Zero Tank Wiring',
      'THEFT PREVENTION': 'Rapid Fuel Drop Alarms within 30 Seconds via SMS & App',
      'BATTERY LIFE': 'Up to 5 Years Internal Lithium Battery with Temp Compensation'
    }
  },
  {
    id: 'asset-logistics',
    eyebrow: 'STANDALONE ASSET TRACKING',
    headlineLine1: 'Standalone Magnetic Asset Tracking',
    headlineLine2: 'Up to 3-year autonomous battery life.',
    titlePrefix: 'Standalone Magnetic Asset Tracking\n',
    titleAccent: 'Up to 3-year autonomous battery life.',
    description: 'Zero-wiring magnetic mount for containers and heavy industrial equipment.',
    primaryCta: 'Explore Asset Trackers',
    primaryLink: '/hardware/gl500-4g',
    secondaryCta: 'Learn more',
    visualImg: '/images/hardware/banner-asset-tracker.jpg',
    visualAlt: 'Queclink GL500 4G Standalone Magnetic Container Tracker',
    specs: {
      'HARDWARE MODEL': 'Queclink GL500 4G Magnetic Asset & Container Tracker',
      'MOUNTING SYSTEM': 'High-Strength Neodymium Magnetic Base (No Drilling)',
      'BATTERY CAPACITY': '10,000mAh Industrial Lithium (Up to 3 Years Standby)',
      'DURABILITY RATING': 'IP67 Waterproof & Shock-Resistant Rugged Polymer',
      'TAMPER PROTECTION': 'Optical Light-Sensor Removal & Movement Wake-Up Alerts',
      'CONNECTIVITY': '4G LTE Cat M1 / NB-IoT with 2G GSM Highway Fallback'
    }
  }
];

/* ────────────────────────────────────────────────────────────
   2. CATEGORIES DATA (10 CARDS FOR 5×2 BALANCED GRID)
──────────────────────────────────────────────────────────── */
const SHOP_CATEGORIES = [
  {
    id: 'vehicle-tracking',
    title: 'Vehicle Tracking Devices',
    count: '11 products',
    path: '/hardware?category=vehicle-tracking',
    image: '/images/categories/cat-vehicle-tracking.png'
  },
  {
    id: 'video-telematics',
    title: 'Video Telematics',
    count: '8 products',
    path: '/hardware?category=video-telematics',
    image: '/images/categories/cat-video-telematics.png'
  },
  {
    id: 'asset-logistics',
    title: 'Asset & Logistics Tracking',
    count: '3 products',
    path: '/hardware?category=asset-logistics',
    image: '/images/categories/cat-asset-logistics.png'
  },
  {
    id: 'fuel-sensors',
    title: 'Fuel & Vehicle Sensors',
    count: '1 product',
    path: '/hardware?category=fuel-sensors',
    image: '/images/categories/cat-fuel-sensors.png'
  },
  {
    id: 'ais-140',
    title: 'AIS 140 Govt. Certified',
    count: '3 products',
    path: '/hardware?category=vehicle-tracking&sub=ais-gps-device',
    image: '/images/hardware/prithvi-140.svg'
  },
  {
    id: 'cargo-elocks',
    title: 'GPS Smart E-Locks',
    count: '2 products',
    path: '/hardware?category=asset-logistics&sub=e-lock-tracker',
    image: '/images/hardware/7h-elock.svg'
  },
  {
    id: 'personal-safety',
    title: 'Personal & Safety Tracking',
    count: 'Available Soon',
    path: '/hardware?category=personal-safety',
    image: '/images/categories/cat-personal-safety.png'
  },
  {
    id: 'iot-sensors',
    title: 'IoT Sensors',
    count: 'Available Soon',
    path: '/hardware?category=iot-sensors',
    image: '/images/categories/cat-iot-sensors.png'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    count: 'Available Soon',
    path: '/hardware?category=accessories',
    image: '/images/categories/cat-accessories.png'
  },
  {
    id: 'all',
    title: 'All Hardware Solutions',
    count: '23 products',
    path: '/hardware',
    image: '/images/categories/cat-all-hardware.png'
  }
];

/* ────────────────────────────────────────────────────────────
   3. FLEET KNOWLEDGE BASE FOR SETU AI OVERVIEWS
──────────────────────────────────────────────────────────── */
const FLEET_KNOWLEDGE_BASE = [
  {
    id: 'elock-cargo',
    question: 'How does Heavy-Duty GPS E-Lock protect container cargo in transit?',
    aliases: ['cargo lock', 'e-lock', 'container lock', 'cargo security', 'safe cargo', 'tamper alert'],
    summary: 'The Magnet 7H E-Lock provides IP68 waterproof physical padlock protection with high-tensile steel wire ropes, unlocking exclusively via authorized remote OTP or RFID cards.',
    bullets: [
      'Remote OTP Unlock: Command center or authorized driver enters one-time OTP via app or SMS to release the lock.',
      'Anti-Tamper & Rope Cut Siren: Instant loud siren and real-time cellular alarm if the steel cable is cut or chassis opened.',
      'Customs & Bonded Ready: Meets national excise and customs transit bond tracking specifications.',
      'Rechargeable 15,000mAh Battery: Operates up to 45 days on a single charge with live location pings.'
    ],
    recommended: {
      name: 'Magnet 7H E-Lock Container Tracker',
      slug: '7h-elock',
      price: '₹4,800 + GST',
      badge: 'IP68 Padlock E-Lock',
      image: '/images/hardware/7h-elock.svg',
      path: '/hardware/7h-elock'
    },
    followUps: [
      'Can the e-lock be unlocked when there is no cellular network?',
      'How does geofence automated unlocking work at destination?'
    ]
  },
  {
    id: 'ais140-mandate',
    question: 'Which GPS tracker is government approved & mandatory for commercial vehicles?',
    aliases: ['government approved', 'ais 140', 'ais-140', 'rto', 'morth', 'sos button', 'panic button', 'mandate'],
    summary: 'AIS-140 certified GPS trackers (such as T98 AIS 140 / Prithvi 140) are legally mandated by MoRTH for all commercial vehicles, buses, taxis, and mining fleets across India.',
    bullets: [
      'MoRTH Compliance: Pre-certified by ARAI & ICAT with official VLTD national backend approval.',
      'Emergency SOS: Built-in hardware panic button directly wired to state 112 emergency response systems.',
      'Dual eSIMs: Internal embedded dual-profile telecom connectivity ensuring zero network blind spots.',
      'Backup Battery: Minimum 4-hour internal battery backup during vehicle power disconnection.'
    ],
    recommended: {
      name: 'T98 AIS 140 GPS Device',
      slug: 'prithvi-140',
      price: '₹3,800 + GST',
      badge: 'Govt Certified AIS-140',
      image: '/images/hardware/prithvi-140.svg',
      path: '/hardware/prithvi-140'
    },
    followUps: [
      'What are the bulk price slabs for AIS-140?',
      'Does it include state RTO certificate approval?'
    ]
  },
  {
    id: 'ai-dashcam-adas',
    question: 'How to detect driver fatigue, drowsiness, and prevent road collisions?',
    aliases: ['driver fatigue', 'drowsiness', 'adas', 'dms', 'dashcam', 'ai dashcam', 'driver safety', 'camera'],
    summary: 'The Falcon F1 AI Dashcam combines front-facing ADAS and driver-facing DMS computer vision to identify driver drowsiness, micro-sleeps, and distraction in real time.',
    bullets: [
      'DMS Driver Monitoring: Infrared camera monitors eye closure rate (PERCLOS), yawning, and mobile phone usage.',
      'ADAS Active Safety: Real-time forward collision warning (FCW) and lane departure warning (LDW).',
      'Instant In-Cabin Alarms: Voice and buzzer alerts immediately wake the driver before a crash occurs.',
      '4G Live Streaming: Automatically uploads 10-second HD video clips of critical events to the cloud portal.'
    ],
    recommended: {
      name: 'Mercetech Falcon F1 AI Camera',
      slug: 'falcon-f1-ai-4g',
      price: '₹11,200 + GST',
      badge: 'ADAS + DMS Dual AI',
      image: '/images/hardware/falcon-f1.svg',
      path: '/hardware/falcon-f1-ai-4g'
    },
    followUps: [
      'Can I watch 4G live streaming from multiple cameras?',
      'Does it record in complete darkness using IR night vision?'
    ]
  },
  {
    id: 'fuel-theft-sensor',
    question: 'How to monitor fuel levels and prevent diesel theft in commercial trucks?',
    aliases: ['fuel theft', 'prevent fuel theft', 'fuel monitoring', 'diesel theft', 'fuel sensor', 'drainage'],
    summary: 'Wireless BLE 5.0 and capacitive fuel level sensors (like LLS BLE-4) measure fuel volume with 99.5% accuracy, triggering instant alarms on unauthorized tank cap opening or sudden diesel drainage.',
    bullets: [
      '99.5% Measurement Accuracy: Capacitive measuring rod or bottom-mounted non-invasive ultrasonic sensor.',
      'Sudden Drop Alarms: Instant SMS, push notification, and portal alert within 30 seconds of fuel siphoning.',
      'Wireless BLE Connectivity: Completely eliminates wiring from the diesel tank to cabin, preventing sparks.'
    ],
    recommended: {
      name: 'LLS BLE-4 Fuel Sensor',
      slug: 'sp-ble4-fuel',
      price: '₹4,500 + GST',
      badge: '99.5% Accuracy BLE',
      image: '/images/hardware/sp-ble4-fuel.svg',
      path: '/hardware/sp-ble4-fuel'
    },
    followUps: [
      'Can I install the fuel sensor without drilling the tank?',
      'How does the fuel theft alert get sent to my phone?'
    ]
  }
];

function generateAIOverview(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  for (const item of FLEET_KNOWLEDGE_BASE) {
    if (item.aliases.some((alias) => q.includes(alias))) {
      return item;
    }
  }
  return {
    id: 'general-match',
    question: `Hardware and telematics solutions for: "${query}"`,
    summary: `Setu provides verified commercial fleet hardware, certified sensors, and integrated software tailored for "${query}". Our catalog supports over 1,500 hardware communication protocols with plug-and-play cloud synchronization.`,
    bullets: [
      'Enterprise Quality: Tested for highway road vibrations, power surges, and extreme temperature conditions.',
      'Over-the-Air Setup: Devices ship pre-configured with active SIM cards and automatic platform sync.',
      'Direct Manufacturer Warranty: 1 to 2-year replacement warranties backed by official GST invoices.'
    ],
    recommended: {
      name: 'View matching hardware catalog',
      slug: 'hardware',
      price: 'Explore Catalog',
      badge: 'Certified Fleet Hardware',
      image: '/images/hardware/prithvi-140.svg',
      path: `/hardware?search=${encodeURIComponent(query)}`
    },
    followUps: [
      'Which GPS device is best for mixed fleets?',
      'How to connect external sensors to GPS?'
    ]
  };
}

/* ────────────────────────────────────────────────────────────
   4. FULL-WIDTH DARK BANNER SLIDER
──────────────────────────────────────────────────────────── */
function DarkHeroBannerSlider({ onLearnMore, isSearchActive }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const autoRotateMs = 7000;
  const progressStepMs = 50;

  useEffect(() => {
    if (isPaused || isSearchActive) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((slide) => (slide + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + (progressStepMs / autoRotateMs) * 100;
      });
    }, progressStepMs);

    return () => clearInterval(progressInterval);
  }, [isPaused, isSearchActive]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div
      className="dark-hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="dark-hero-slider__glow" />

      {/* Slide Body Layout: 45% Content / 55% Visual */}
      <div className="dark-hero-slider__body">
        {/* Left Content Area */}
        <div className="dark-hero-slider__content">
          <div className="dark-hero-slider__eyebrow-row">
            <span className="dark-hero-slider__eyebrow">{slide.eyebrow}</span>
          </div>

          <h1 className="dark-hero-slider__headline">
            <span className="dark-hero-slider__headline-line1">
              {slide.headlineLine1 || slide.titlePrefix}
            </span>
            <span className="dark-hero-slider__headline-line2">
              {slide.headlineLine2 || slide.titleAccent}
            </span>
          </h1>

          <p className="dark-hero-slider__description">
            {slide.description}
          </p>

          <div className="dark-hero-slider__cta-row">
            <button
              type="button"
              className="dark-hero-slider__primary-btn"
              onClick={() => navigate(slide.primaryLink)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              <span>{slide.primaryCta}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              className="dark-hero-slider__secondary-btn"
              onClick={() => onLearnMore(slide)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
            >
              {slide.secondaryCta}
            </button>
          </div>
        </div>

        {/* Right Visual Area */}
        <div className="dark-hero-slider__visual">
          <img
            src={getAssetUrl(slide.visualImg)}
            alt={slide.visualAlt}
            className="dark-hero-slider__image"
          />
        </div>
      </div>

      {/* Minimal Slider Controls (Left-bottom aligned) */}
      <div className="dark-hero-slider__controls">
        <div className="dark-hero-slider__nav-btns">
          <button
            type="button"
            className="dark-hero-slider__arrow-btn"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="dark-hero-slider__arrow-btn"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="dark-hero-slider__counter">
          <span className="dark-hero-slider__current-num">0{currentSlide + 1}</span>
          <span className="dark-hero-slider__divider">/</span>
          <span className="dark-hero-slider__total-num">0{HERO_SLIDES.length}</span>
        </div>

        <div className="dark-hero-slider__progress-track">
          <div
            className="dark-hero-slider__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   5. SEARCH SUGGESTIONS & OVERLAPPING PRIMARY INTELLIGENT SEARCH BAR
──────────────────────────────────────────────────────────── */
const SEARCH_SUGGESTIONS = [
  {
    label: 'What is AIS 140?',
    query: 'what is AIS 140?'
  },
  {
    label: 'Prevent diesel theft',
    query: 'prevent diesel theft'
  },
  {
    label: 'AI dashcam',
    query: 'AI dashcam with driver fatigue'
  },
  {
    label: 'GPS container e-lock',
    query: 'GPS container e-lock'
  },
  {
    label: 'Magnetic asset tracker',
    query: 'magnetic asset tracker'
  }
];

function PrimaryIntelligentSearchBar({ onSearchActiveChange, onOpenFinder, onOpenFilters, onOpenAIChat }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    onSearchActiveChange(isFocused || Boolean(query.trim()));
  }, [isFocused, query, onSearchActiveChange]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const aiOverview = useMemo(() => {
    if (!query.trim()) return null;
    return generateAIOverview(query);
  }, [query]);

  const matchingHardware = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const text = `${p.name} ${p.slug} ${p.category} ${p.subcategory} ${p.shortDescription}`.toLowerCase();
      return text.includes(q);
    }).slice(0, 4);
  }, [query]);

  // Functionality 1: Pressing Enter or submitting navigates to the Hardware page with the search query to show all matching products!
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const q = query.trim();
    if (!q) return;

    navigate(`/hardware?search=${encodeURIComponent(q)}`);
    setIsFocused(false);
  };

  // Functionality 2: Clicking Ask AI opens 1-on-1 AI chat detailing the query
  const handleAskAI = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const q = query.trim() || 'what is ASI 140?';
    if (onOpenAIChat) {
      onOpenAIChat(q);
    }
    setIsFocused(false);
  };

  const handleSuggestionClick = (item, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setQuery(item.query);
    navigate(`/hardware?search=${encodeURIComponent(item.query)}`);
    setIsFocused(false);
  };

  return (
    <div className="intelligent-search-wrapper" ref={containerRef}>
      {/* ── Main Overlapping Pill Bar ── */}
      <form
        className={`intelligent-search-bar ${isFocused ? 'intelligent-search-bar--focused' : ''}`}
        onSubmit={handleSubmit}
      >
        {/* Left Magnifier Icon */}
        <div className="intelligent-search-bar__left-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          className="intelligent-search-bar__input"
          value={query}
          placeholder="Search devices, models, features or describe what you need..."
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          aria-label="Search devices, models, features or describe what you need"
        />

        {/* Clear query button */}
        {query.length > 0 && (
          <button
            type="button"
            className="intelligent-search-bar__clear-btn"
            onClick={() => {
              setQuery('');
              if (inputRef.current) inputRef.current.focus();
            }}
            title="Clear"
          >
            ✕
          </button>
        )}

        {/* Primary Search CTA: Search Button */}
        <button
          type="submit"
          className="intelligent-search-bar__search-btn"
          title="Search devices and solutions"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="intelligent-search-bar__search-icon">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Search</span>
        </button>
      </form>

      {/* ── Search Suggestions Directly Below Search Bar (Single Line) ── */}
      <div className="search-suggestions-row">
        <span className="search-suggestions-label">Suggestions:</span>
        <div className="search-suggestions-list">
          {SEARCH_SUGGESTIONS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              className="search-suggestion-pill"
              onClick={(e) => handleSuggestionClick(item, e)}
              title={`Search products for "${item.query}"`}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="search-suggestion-pill__icon">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Search Dropdown Panel (AI Overview & Matching Hardware) ── */}
      {isFocused && query.trim() && (
        <div className="intelligent-search-dropdown">
          {/* AI Overview section */}
          {aiOverview && (
            <div className="search-dropdown-ai-block">
              <div className="search-dropdown-ai-header">
                <span className="search-dropdown-ai-tag">
                  <span className="search-dropdown-sparkle-glyph">✦</span>
                  <span>Setu AI Discovery</span>
                </span>
                <span className="search-dropdown-ai-confidence">Intelligence Match</span>
              </div>

              <h4 className="search-dropdown-ai-question">{aiOverview.question}</h4>
              <p className="search-dropdown-ai-summary">{aiOverview.summary}</p>

              {aiOverview.bullets && (
                <ul className="search-dropdown-ai-bullets">
                  {aiOverview.bullets.map((bullet, idx) => {
                    const [heading, ...rest] = bullet.split(':');
                    return (
                      <li key={idx}>
                        {rest.length > 0 ? (
                          <>
                            <strong>{heading}:</strong>
                            <span>{rest.join(':')}</span>
                          </>
                        ) : (
                          <span>{bullet}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Recommended hardware card */}
              {aiOverview.recommended && (
                <div
                  className="search-dropdown-ai-recom"
                  onClick={() => {
                    setIsFocused(false);
                    navigate(aiOverview.recommended.path);
                  }}
                >
                  <div className="search-dropdown-ai-recom__thumb">
                    <img src={getAssetUrl(aiOverview.recommended.image)} alt={aiOverview.recommended.name} />
                  </div>
                  <div className="search-dropdown-ai-recom__info">
                    <span className="search-dropdown-ai-recom__badge">{aiOverview.recommended.badge}</span>
                    <strong className="search-dropdown-ai-recom__name">{aiOverview.recommended.name}</strong>
                    <span className="search-dropdown-ai-recom__price">{aiOverview.recommended.price}</span>
                  </div>
                  <button type="button" className="search-dropdown-ai-recom__btn">
                    View Specifications →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Direct Matching Hardware List */}
          {matchingHardware.length > 0 && (
            <div className="search-dropdown-hardware-section">
              <div className="search-dropdown-hardware-header">
                <span>Matching Hardware Devices ({matchingHardware.length})</span>
              </div>
              <div className="search-dropdown-hardware-list">
                {matchingHardware.map((prod) => (
                  <div
                    key={prod.id}
                    className="search-dropdown-hardware-item"
                    onClick={() => {
                      setIsFocused(false);
                      navigate(`/hardware/${prod.slug}`);
                    }}
                  >
                    <div className="search-dropdown-hardware-thumb">
                      <img src={getAssetUrl(prod.image)} alt={prod.name} />
                    </div>
                    <div className="search-dropdown-hardware-info">
                      <span className="search-dropdown-hardware-title">{prod.name}</span>
                      <span className="search-dropdown-hardware-desc">{prod.shortDescription}</span>
                    </div>
                    <span className="search-dropdown-hardware-price">
                      ₹{prod.price?.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Submit Button */}
          <div className="search-dropdown-footer">
            <button
              type="button"
              className="search-dropdown-view-all-btn"
              onClick={handleSubmit}
            >
              Search all hardware catalog items for "{query}" →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   6. SHOP BY CATEGORY SECTION (4×2 FULL-WIDTH COMPACT GRID)
──────────────────────────────────────────────────────────── */
function ShopByCategory() {
  const navigate = useNavigate();

  return (
    <section className="category-section">
      <div className="category-section__header">
        <div className="category-section__header-left">
          <h2 className="category-section__title">Shop by category</h2>
          <p className="category-section__subtitle">
            Everything a fleet needs, from the device to the licence to the technician.
          </p>
        </div>

        <button
          type="button"
          className="category-section__view-all"
          onClick={() => navigate('/hardware')}
        >
          <span>View all categories</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 4 columns × 2 rows = 8 cards (Full available width) */}
      <div className="category-grid">
        {SHOP_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => navigate(cat.path)}
          >
            {/* Left thumbnail */}
            <div className="category-card__thumb-box">
              <img
                src={getAssetUrl(cat.image)}
                alt={cat.title}
                className="category-card__thumb-img"
              />
            </div>

            {/* Middle Title and Count */}
            <div className="category-card__content">
              <h3 className="category-card__title">{cat.title}</h3>
              <span className={`category-card__count ${cat.count.includes('Soon') ? 'category-card__count--soon' : ''}`}>
                {cat.count}
              </span>
            </div>

            {/* Right subtle arrow */}
            <div className="category-card__arrow">
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1.5 1.5 6.5 6.5 1.5 11.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   7. FEATURED & NEW ARRIVALS PRODUCTS DATA (FROM REFERENCE)
──────────────────────────────────────────────────────────── */
const FEATURED_PRODUCTS = [
  {
    id: 'eco5-pro',
    slug: 'eco5-pro',
    name: 'Eco5 Pro 4G OBD Tracker',
    brand: 'Eco5 Series',
    badge: 'Sponsored',
    image: '/images/hardware/eco5-lite.svg',
    price: 2450,
    bulkTierText: '₹2,140 each on 500+'
  },
  {
    id: 'titan-t4-ai-4g',
    slug: 'titan-t4-ai-4g',
    name: 'Mercetech Titan T4 Dash Camera',
    brand: 'Mercetech',
    badge: 'Sponsored',
    image: '/images/hardware/titan-t4.svg',
    price: 12500,
    bulkTierText: '₹10,930 each on 500+'
  },
  {
    id: 't5324-mdvr',
    slug: 't5324-mdvr',
    name: 'T98 SD Card MDVR',
    brand: 'T98 Series',
    badge: 'Sponsored',
    image: '/images/hardware/t5324-mdvr.svg',
    price: 8900,
    bulkTierText: '₹7,780 each on 500+'
  },
  {
    id: 'v5-4g',
    slug: 'v5-4g',
    name: 'V5 4G Telematics Tracker',
    brand: 'M Series',
    badge: 'Sponsored',
    image: '/images/hardware/v5-4g.svg',
    price: 2850,
    bulkTierText: '₹2,490 each on 500+'
  },
  {
    id: 'gb440',
    slug: 'gb440',
    name: 'GB440 Fleet Tracker',
    brand: 'M Series',
    badge: 'Sponsored',
    image: '/images/hardware/gb440.svg',
    price: 3100,
    bulkTierText: '₹2,710 each on 500+'
  }
];

const NEW_ARRIVALS_PRODUCTS = [
  {
    id: 'eco5-pro',
    slug: 'eco5-pro',
    name: 'Eco5 Pro 4G OBD Tracker',
    badge: 'New',
    image: '/images/hardware/eco5-lite.svg',
    price: 2450,
    bulkTierText: '₹2,140 each on 500+'
  },
  {
    id: 'ecogas-track',
    slug: 'ecogas-track',
    name: 'EC Series Ecogas Track',
    badge: 'New',
    image: '/images/hardware/ecogas-track.svg',
    price: 3400,
    bulkTierText: '₹2,975 each on 500+'
  },
  {
    id: 'sentinel-s3-ai-4g',
    slug: 'sentinel-s3-ai-4g',
    name: 'Mercetech Sentinel S3 Dash Camera',
    badge: 'New',
    image: '/images/hardware/sentinel-s3.svg',
    price: 13800,
    bulkTierText: '₹12,075 each on 500+'
  },
  {
    id: 'gl500-4g',
    slug: 'gl500-4g',
    name: 'GL500 GPS Smart Electronic Lock – 4G',
    badge: 'New',
    image: '/images/hardware/gl500-4g.svg',
    price: 10800,
    bulkTierText: '₹9,450 each on 500+'
  },
  {
    id: 'lls-ultrasonic',
    slug: 'lls-ultrasonic',
    name: 'LLS-03 Ultrasonic Level Sensor',
    badge: 'New',
    image: '/images/hardware/sp-ble4-fuel.svg',
    price: 5200,
    bulkTierText: '₹4,550 each on 500+'
  }
];

/* ────────────────────────────────────────────────────────────
   8. FEATURED & NEW ARRIVALS 2-TABS PRODUCTS SECTION
──────────────────────────────────────────────────────────── */
function FeaturedProductsSection() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('featured');
  const [wishlist, setWishlist] = useState({});
  const [addedItems, setAddedItems] = useState({});

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const currentProducts = (activeTab === 'featured' ? FEATURED_PRODUCTS : NEW_ARRIVALS_PRODUCTS).slice(0, 5);

  return (
    <section className="featured-tabs-section">
      {/* ── Tabs Top Header Bar ── */}
      <div className="featured-tabs-header">
        <div className="featured-tabs-nav">
          <button
            type="button"
            className={`featured-tab-btn ${activeTab === 'featured' ? 'featured-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('featured')}
          >
            Featured
          </button>
          <button
            type="button"
            className={`featured-tab-btn ${activeTab === 'new-arrivals' ? 'featured-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('new-arrivals')}
          >
            New arrivals
          </button>
        </div>

        <div className="featured-tabs-actions">
          {activeTab === 'featured' && (
            <span className="featured-tabs-subtext">
              Promoted by sellers · same prices and bulk slabs as every listing
            </span>
          )}
          <button
            type="button"
            className="featured-tabs-view-all"
            onClick={() => navigate('/hardware')}
          >
            <span>View all</span>
            <span className="featured-tabs-view-all__arrow">→</span>
          </button>
        </div>
      </div>

      {/* ── 5 Cards Horizontal Grid ── */}
      <div className="featured-cards-grid">
        {currentProducts.map((p) => {
          const isAdded = !!addedItems[p.id];
          const isWished = !!wishlist[p.id];

          return (
            <div
              key={p.id}
              className="featured-product-card"
              onClick={() => navigate(`/hardware/${p.slug}`)}
            >
              {/* Card Top Row: Badge + Wishlist Heart */}
              <div className="featured-product-card__top">
                <span className={`featured-product-card__badge featured-product-card__badge--${p.badge.toLowerCase()}`}>
                  {p.badge}
                </span>

                <button
                  type="button"
                  className={`featured-product-card__wish-btn ${isWished ? 'featured-product-card__wish-btn--active' : ''}`}
                  onClick={(e) => toggleWishlist(p.id, e)}
                  title="Add to wishlist"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={isWished ? '#EF4444' : 'none'} stroke={isWished ? '#EF4444' : '#94A3B8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>

              {/* Card Thumbnail Visual */}
              <div className="featured-product-card__img-box">
                <img
                  src={getAssetUrl(p.image)}
                  alt={p.name}
                  className="featured-product-card__img"
                />
              </div>

              {/* Card Body Info */}
              <div className="featured-product-card__body">
                {p.brand && (
                  <span className="featured-product-card__brand">
                    by {p.brand}
                  </span>
                )}

                <h4 className="featured-product-card__title" title={p.name}>
                  {p.name}
                </h4>

                {/* Price block */}
                <div className="featured-product-card__price-box">
                  <div className="featured-product-card__main-price">
                    ₹{p.price.toLocaleString()} <span className="featured-product-card__gst">+ GST</span>
                  </div>
                  <div className="featured-product-card__bulk-tier">
                    {p.bulkTierText}
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  type="button"
                  className={`featured-product-card__cart-btn ${isAdded ? 'featured-product-card__cart-btn--added' : ''}`}
                  onClick={(e) => handleAddToCart(p, e)}
                >
                  {isAdded ? '✓ Added' : 'Agree & Add To Cart'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   9. BUYING FOR A FLEET BULK PRICING CTA BANNER
──────────────────────────────────────────────────────────── */
function FleetBulkPricingBanner({ onOpenBulkQuote, onOpenCreditLimit }) {
  return (
    <div className="fleet-bulk-banner">
      <div className="fleet-bulk-banner__left">
        <span className="fleet-bulk-banner__eyebrow">BUYING FOR A FLEET?</span>
        <h3 className="fleet-bulk-banner__title">
          Bulk prices from 51 units, up to 12% off on 500+
        </h3>
        <p className="fleet-bulk-banner__desc">
          One GST invoice for devices, FASTags and software. Pay now, or in 3–12 monthly EMIs with Setu Finance.
        </p>
      </div>

      <div className="fleet-bulk-banner__actions">
        <button
          type="button"
          className="fleet-bulk-banner__btn-primary"
          onClick={onOpenBulkQuote}
        >
          Get a bulk quote
        </button>
        <button
          type="button"
          className="fleet-bulk-banner__btn-secondary"
          onClick={onOpenCreditLimit}
        >
          Check my credit limit
        </button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   10. BULK QUOTATION REQUEST MODAL ("Ask Quotation")
──────────────────────────────────────────────────────────── */
function BulkQuoteModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    hardwareRequirement: 'AIS 140 Certified GPS Trackers',
    quantity: '51-100 units (6% off)',
    gstin: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [quoteId, setQuoteId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomId = 'SETU-QUO-' + Math.floor(10000 + Math.random() * 90000);
    setQuoteId(randomId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="bulk-quote-modal-overlay" onClick={handleReset}>
      <div className="bulk-quote-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="bulk-quote-modal__close-btn"
          onClick={handleReset}
          aria-label="Close"
        >
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="bulk-quote-modal__header">
              <span className="bulk-quote-modal__badge">ENTERPRISE VOLUME PRICING</span>
              <h3 className="bulk-quote-modal__title">Request Fleet Bulk Quotation</h3>
              <p className="bulk-quote-modal__subtitle">
                Get direct OEM factory pricing, single GST invoicing, and dedicated enterprise SLA for your fleet.
              </p>
            </div>

            <form className="bulk-quote-form" onSubmit={handleSubmit}>
              <div className="bulk-quote-form__row">
                <div className="bulk-quote-form__field">
                  <label>Company / Fleet Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adani Logistics Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="bulk-quote-form__field">
                  <label>Contact Person *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  />
                </div>
              </div>

              <div className="bulk-quote-form__row">
                <div className="bulk-quote-form__field">
                  <label>Work Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="bulk-quote-form__field">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="bulk-quote-form__row">
                <div className="bulk-quote-form__field">
                  <label>Hardware Requirement *</label>
                  <select
                    value={formData.hardwareRequirement}
                    onChange={(e) => setFormData({ ...formData, hardwareRequirement: e.target.value })}
                  >
                    <option value="AIS 140 Certified GPS Trackers">AIS 140 Certified GPS Trackers</option>
                    <option value="AI Dashcam & DMS MDVR Solutions">AI Dashcam & DMS MDVR Solutions</option>
                    <option value="Fuel Level Sensors (Capacitive & BLE)">Fuel Level Sensors (Capacitive & BLE)</option>
                    <option value="Container GPS E-Locks (Heavy Duty)">Container GPS E-Locks (Heavy Duty)</option>
                    <option value="Magnetic Asset Trackers">Magnetic Asset Trackers</option>
                    <option value="4G OBD-II Plug & Play Trackers">4G OBD-II Plug & Play Trackers</option>
                    <option value="Multiple Products / Mixed Fleet Setup">Multiple Products / Mixed Fleet Setup</option>
                  </select>
                </div>
                <div className="bulk-quote-form__field">
                  <label>Estimated Volume Slab *</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  >
                    <option value="51-100 units (6% off)">51 – 100 units (up to 6% off)</option>
                    <option value="101-500 units (9% off)">101 – 500 units (up to 9% off)</option>
                    <option value="500+ units (12% off)">500+ units (up to 12% off)</option>
                    <option value="1000+ units (Custom Enterprise RFP)">1,000+ units (Custom Enterprise RFP)</option>
                  </select>
                </div>
              </div>

              <div className="bulk-quote-form__row">
                <div className="bulk-quote-form__field">
                  <label>GSTIN (Optional)</label>
                  <input
                    type="text"
                    placeholder="27AABCU9603R1ZM"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  />
                </div>
                <div className="bulk-quote-form__field">
                  <label>Special Instructions / Notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Include temperature probes & FASTags"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>

              <div className="bulk-quote-form__footer">
                <button type="submit" className="bulk-quote-form__submit-btn">
                  Submit Quotation Request →
                </button>
                <span className="bulk-quote-form__security-note">
                  🔒 Enterprise pricing with dedicated account manager &amp; direct OEM support.
                </span>
              </div>
            </form>
          </>
        ) : (
          <div className="bulk-quote-success">
            <div className="bulk-quote-success__icon">✓</div>
            <h3 className="bulk-quote-success__title">Quotation Request Generated!</h3>
            <div className="bulk-quote-success__ref">
              Reference ID: <strong>{quoteId}</strong>
            </div>
            <p className="bulk-quote-success__desc">
              Thank you, <strong>{formData.contactName || 'Fleet Manager'}</strong>. Your bulk request for <strong>{formData.hardwareRequirement}</strong> ({formData.quantity}) has been forwarded to our telematics procurement desk.
            </p>
            <div className="bulk-quote-success__perks">
              <div className="bulk-quote-success__perk-item">
                <span>⏱</span>
                <div>
                  <strong>Official Estimate within 2 Hours</strong>
                  <p>Sent to {formData.email || 'your registered email'}</p>
                </div>
              </div>
              <div className="bulk-quote-success__perk-item">
                <span>🧾</span>
                <div>
                  <strong>Consolidated GST Invoice</strong>
                  <p>Claim input tax credit on hardware, SIMs &amp; software</p>
                </div>
              </div>
              <div className="bulk-quote-success__perk-item">
                <span>💳</span>
                <div>
                  <strong>Setu Finance EMI Eligible</strong>
                  <p>Flexible 3, 6, or 12 month payment tenures</p>
                </div>
              </div>
            </div>

            <div className="bulk-quote-success__actions">
              <button
                type="button"
                className="bulk-quote-success__close-btn"
                onClick={handleReset}
              >
                Back to Hardware Catalog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   11. SETU FINANCE CREDIT LIMIT MODAL
──────────────────────────────────────────────────────────── */
function CreditLimitModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="bulk-quote-modal-overlay" onClick={onClose}>
      <div className="credit-limit-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="bulk-quote-modal__close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="credit-limit-modal__header">
          <span className="credit-limit-modal__badge">SETU FINANCE</span>
          <h3 className="credit-limit-modal__title">Check Fleet Credit Limit</h3>
          <p className="credit-limit-modal__subtitle">
            Pre-approved line of credit up to ₹50 Lakhs for telematics hardware, AIS 140 devices, and FASTags.
          </p>
        </div>

        <div className="credit-limit-modal__grid">
          <div className="credit-limit-modal__card">
            <span className="credit-limit-modal__card-num">01</span>
            <h4>Zero Collateral</h4>
            <p>100% digital onboarding verified via GSTIN and bank statements.</p>
          </div>
          <div className="credit-limit-modal__card">
            <span className="credit-limit-modal__card-num">02</span>
            <h4>3 to 12 Month EMIs</h4>
            <p>Pay comfortably as your vehicles generate revenue on the road.</p>
          </div>
          <div className="credit-limit-modal__card">
            <span className="credit-limit-modal__card-num">03</span>
            <h4>Combined Billing</h4>
            <p>One consolidated monthly invoice for hardware, SIM data, and software.</p>
          </div>
        </div>

        <div className="credit-limit-modal__footer">
          <button
            type="button"
            className="credit-limit-modal__btn-primary"
            onClick={onClose}
          >
            Apply for Credit Limit →
          </button>
          <button
            type="button"
            className="credit-limit-modal__btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   12. SMART FINDER GUIDED MODAL ("Help me choose")
──────────────────────────────────────────────────────────── */
function SmartFinderModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ goal: '', vehicle: '', depth: '' });

  if (!isOpen) return null;

  const goals = [
    { id: 'fuel', title: 'Prevent Fuel Theft & Monitor Drainage', icon: '⛽' },
    { id: 'tracking', title: 'Real-Time GPS Fleet Tracking', icon: '📍' },
    { id: 'safety', title: 'Driver Safety & Video Telematics (AI)', icon: '📹' },
    { id: 'cargo', title: 'Cargo Security & Container E-Locks', icon: '🔒' },
    { id: 'compliance', title: 'Government Mandate (AIS-140 Compliance)', icon: '🛡️' }
  ];

  const vehicles = [
    { id: 'trucks', title: 'Heavy Commercial Trucks & Trailers', icon: '🚛' },
    { id: 'cabs', title: 'Taxis, Cabs & Passenger Fleet', icon: '🚕' },
    { id: 'buses', title: 'School Buses & Staff Transports', icon: '🚌' },
    { id: 'containers', title: 'Shipping Containers & Bonded Cargo', icon: '📦' },
    { id: 'bikes', title: '2-Wheelers & Last-Mile Delivery', icon: '🛵' }
  ];

  const depths = [
    { id: 'basic', title: 'Basic Live Tracking', desc: 'Real-time location, ignition on/off, route history' },
    { id: 'telemetry', title: 'Advanced Telemetry & Sensors', desc: 'Fuel levels, temperature, door sensors, CAN bus' },
    { id: 'video-ai', title: 'Active Video AI (ADAS & DMS)', desc: 'Fatigue alarms, forward collision warning, live streaming' }
  ];

  const getRecommendations = () => {
    if (answers.goal === 'fuel') {
      return products.filter((p) => p.category === 'fuel-sensors' || p.tags?.includes('fuel')).slice(0, 2);
    }
    if (answers.goal === 'cargo') {
      return products.filter((p) => p.slug.includes('elock') || p.category === 'asset-logistics').slice(0, 2);
    }
    if (answers.goal === 'safety' || answers.depth === 'video-ai') {
      return products.filter((p) => p.category === 'video-telematics').slice(0, 2);
    }
    if (answers.goal === 'compliance') {
      return products.filter((p) => p.compliance?.includes('AIS 140') || p.slug.includes('prithvi')).slice(0, 2);
    }
    return products.slice(0, 2);
  };

  const handleSelectGoal = (goalId) => {
    setAnswers((prev) => ({ ...prev, goal: goalId }));
    setStep(2);
  };

  const handleSelectVehicle = (vehicleId) => {
    setAnswers((prev) => ({ ...prev, vehicle: vehicleId }));
    setStep(3);
  };

  const handleSelectDepth = (depthId) => {
    setAnswers((prev) => ({ ...prev, depth: depthId }));
    setStep(4);
  };

  const resetFinder = () => {
    setStep(1);
    setAnswers({ goal: '', vehicle: '', depth: '' });
  };

  return (
    <div className="finder-modal-overlay" onClick={onClose}>
      <div className="finder-modal" onClick={(e) => e.stopPropagation()}>
        <div className="finder-modal__header">
          <div className="finder-modal__title-wrap">
            <span className="finder-modal__badge">✦ SMART HARDWARE FINDER</span>
            <h3 className="finder-modal__title">
              {step === 1 && 'What is your primary fleet objective?'}
              {step === 2 && 'What vehicle or asset type are you equipping?'}
              {step === 3 && 'What depth of telemetry do you need?'}
              {step === 4 && 'Recommended Hardware Matches'}
            </h3>
          </div>
          <button type="button" className="finder-modal__close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="finder-modal__stepper">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`finder-modal__step-dot ${step >= s ? 'finder-modal__step-dot--active' : ''}`}
            />
          ))}
        </div>

        <div className="finder-modal__body">
          {step === 1 && (
            <div className="finder-modal__grid">
              {goals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className="finder-modal__option-card"
                  onClick={() => handleSelectGoal(g.id)}
                >
                  <span className="finder-modal__option-icon">{g.icon}</span>
                  <span className="finder-modal__option-title">{g.title}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="finder-modal__grid">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  className="finder-modal__option-card"
                  onClick={() => handleSelectVehicle(v.id)}
                >
                  <span className="finder-modal__option-icon">{v.icon}</span>
                  <span className="finder-modal__option-title">{v.title}</span>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="finder-modal__list">
              {depths.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className="finder-modal__depth-card"
                  onClick={() => handleSelectDepth(d.id)}
                >
                  <strong className="finder-modal__depth-title">{d.title}</strong>
                  <span className="finder-modal__depth-desc">{d.desc}</span>
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="finder-modal__results">
              <div className="finder-modal__results-list">
                {getRecommendations().map((prod) => (
                  <div key={prod.id} className="finder-modal__result-card">
                    <div className="finder-modal__result-thumb">
                      <img src={getAssetUrl(prod.image)} alt={prod.name} />
                    </div>
                    <div className="finder-modal__result-info">
                      <span className="finder-modal__result-badge">MATCHED SOLUTION</span>
                      <strong className="finder-modal__result-name">{prod.name}</strong>
                      <p className="finder-modal__result-desc">{prod.shortDescription}</p>
                      <span className="finder-modal__result-price">₹{prod.price?.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      type="button"
                      className="finder-modal__result-btn"
                      onClick={() => {
                        onClose();
                        navigate(`/hardware/${prod.slug}`);
                      }}
                    >
                      View Device →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="finder-modal__footer">
          {step > 1 && step < 4 && (
            <button
              type="button"
              className="finder-modal__back-btn"
              onClick={() => setStep((s) => s - 1)}
            >
              ← Back
            </button>
          )}
          {step === 4 && (
            <button
              type="button"
              className="finder-modal__back-btn"
              onClick={resetFinder}
            >
              Start Over
            </button>
          )}
          <button
            type="button"
            className="finder-modal__done-btn"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   8. ADVANCED FILTERS SLIDE-OVER DRAWER ("Filters")
──────────────────────────────────────────────────────────── */
function AdvancedFilterDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedConnectivity, setSelectedConnectivity] = useState([]);
  const [selectedCert, setSelectedCert] = useState([]);

  if (!isOpen) return null;

  const toggleItem = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearAll = () => {
    setSelectedCategory([]);
    setSelectedBrand([]);
    setSelectedConnectivity([]);
    setSelectedCert([]);
  };

  const matchingCount = products.filter((p) => {
    if (selectedCategory.length > 0 && !selectedCategory.includes(p.category)) return false;
    if (selectedBrand.length > 0 && !selectedBrand.includes(p.brand)) return false;
    return true;
  }).length;

  const handleApply = () => {
    const params = new URLSearchParams();
    if (selectedCategory.length > 0) params.set('category', selectedCategory.join(','));
    if (selectedBrand.length > 0) params.set('brand', selectedBrand.join(','));
    onClose();
    navigate(`/hardware?${params.toString()}`);
  };

  return (
    <div className="filter-drawer-overlay" onClick={onClose}>
      <div className="filter-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="filter-drawer__header">
          <div>
            <h3 className="filter-drawer__title">Hardware Filters</h3>
            <span className="filter-drawer__subtitle">Refine by telemetry specs &amp; certifications</span>
          </div>
          <button type="button" className="filter-drawer__close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="filter-drawer__body">
          <div className="filter-drawer__group">
            <h4 className="filter-drawer__group-title">Hardware Category</h4>
            <div className="filter-drawer__options">
              {[
                { id: 'vehicle-tracking', label: 'Vehicle Tracking Devices' },
                { id: 'video-telematics', label: 'Video Telematics' },
                { id: 'asset-logistics', label: 'Asset & Logistics Tracking' },
                { id: 'fuel-sensors', label: 'Fuel & Vehicle Sensors' }
              ].map((opt) => (
                <label key={opt.id} className="filter-drawer__checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategory.includes(opt.id)}
                    onChange={() => toggleItem(selectedCategory, setSelectedCategory, opt.id)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-drawer__group">
            <h4 className="filter-drawer__group-title">Manufacturer / Brand</h4>
            <div className="filter-drawer__options">
              {['Teltonika', 'Mercetech', 'Setu', 'Queclink', 'Concox'].map((b) => (
                <label key={b} className="filter-drawer__checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedBrand.includes(b)}
                    onChange={() => toggleItem(selectedBrand, setSelectedBrand, b)}
                  />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-drawer__group">
            <h4 className="filter-drawer__group-title">Connectivity</h4>
            <div className="filter-drawer__options">
              {['4G LTE Cat 1', '2G GSM Fallback', 'BLE 5.0 Wireless', 'Satellite / Iridium'].map((c) => (
                <label key={c} className="filter-drawer__checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedConnectivity.includes(c)}
                    onChange={() => toggleItem(selectedConnectivity, setSelectedConnectivity, c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-drawer__group">
            <h4 className="filter-drawer__group-title">Compliance &amp; Certifications</h4>
            <div className="filter-drawer__options">
              {['AIS-140 MoRTH', 'ARAI Certified', 'ICAT Certified', 'IP68 Waterproof'].map((cert) => (
                <label key={cert} className="filter-drawer__checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCert.includes(cert)}
                    onChange={() => toggleItem(selectedCert, setSelectedCert, cert)}
                  />
                  <span>{cert}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="filter-drawer__footer">
          <button type="button" className="filter-drawer__clear-btn" onClick={clearAll}>
            Clear all
          </button>
          <button type="button" className="filter-drawer__apply-btn" onClick={handleApply}>
            Show {matchingCount} matching results
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   9. QUICK SPECS MODAL ("Learn more")
──────────────────────────────────────────────────────────── */
function QuickSpecsModal({ isOpen, onClose, slide }) {
  const navigate = useNavigate();
  if (!isOpen || !slide) return null;

  return (
    <div className="specs-modal-overlay" onClick={onClose}>
      <div className="specs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="specs-modal__header">
          <div>
            <span className="specs-modal__badge">{slide.eyebrow}</span>
            <h3 className="specs-modal__title">Hardware Specifications</h3>
          </div>
          <button type="button" className="specs-modal__close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="specs-modal__body">
          <p className="specs-modal__lead">
            {slide.description}
          </p>

          <div className="specs-modal__specs-grid">
            {slide.specs ? (
              Object.entries(slide.specs).map(([key, val]) => (
                <div key={key} className="specs-modal__spec-row">
                  <span className="specs-modal__spec-key">{key}</span>
                  <span className="specs-modal__spec-val">{val}</span>
                </div>
              ))
            ) : (
              <>
                <div className="specs-modal__spec-row">
                  <span className="specs-modal__spec-key">CONNECTIVITY</span>
                  <span className="specs-modal__spec-val">4G LTE Cat 1 with 2G GSM Fallback</span>
                </div>
                <div className="specs-modal__spec-row">
                  <span className="specs-modal__spec-key">POWER &amp; BATTERY</span>
                  <span className="specs-modal__spec-val">Rechargeable backup battery</span>
                </div>
                <div className="specs-modal__spec-row">
                  <span className="specs-modal__spec-key">HOUSING RATING</span>
                  <span className="specs-modal__spec-val">IP67 / IP68 Heavy-duty Industrial Enclosure</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="specs-modal__footer">
          <button type="button" className="specs-modal__btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="specs-modal__btn-primary"
            onClick={() => {
              onClose();
              navigate(slide.primaryLink);
            }}
          >
            Go to Product Page →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   10. MAIN SETU HOMEPAGE COMPONENT
──────────────────────────────────────────────────────────── */
export default function SetuHome() {
  const [specsModalOpen, setSpecsModalOpen] = useState(false);
  const [activeSlideForSpecs, setActiveSlideForSpecs] = useState(null);
  const [finderModalOpen, setFinderModalOpen] = useState(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatQuery, setAiChatQuery] = useState('');
  const [bulkQuoteModalOpen, setBulkQuoteModalOpen] = useState(false);
  const [creditLimitModalOpen, setCreditLimitModalOpen] = useState(false);

  const handleLearnMore = (slide) => {
    setActiveSlideForSpecs(slide);
    setSpecsModalOpen(true);
  };

  const handleOpenAIChat = (q) => {
    setAiChatQuery(q || 'what is ASI 140?');
    setAiChatOpen(true);
  };

  const handleSearchActiveChange = useCallback((active) => {
    setIsSearchActive(active);
  }, []);

  return (
    <div className="setu-home-page">
      <div className="setu-home-container">

        {/* ── 1. Full-Width Dark Promotional Banner Slider ── */}
        <DarkHeroBannerSlider
          onLearnMore={handleLearnMore}
          isSearchActive={isSearchActive}
        />

        {/* ── 2. Overlapping Primary Intelligent Search Bar & 3 Assistance Actions ── */}
        <PrimaryIntelligentSearchBar
          onSearchActiveChange={handleSearchActiveChange}
          onOpenFinder={() => setFinderModalOpen(true)}
          onOpenFilters={() => setFilterDrawerOpen(true)}
          onOpenAIChat={handleOpenAIChat}
        />

        {/* ── 3. Shop by Category (4×2 Grid of 8 Cards) ── */}
        <ShopByCategory />

        {/* ── 4. Featured & New Arrivals 2-Tabs Section (From User Reference Images) ── */}
        <FeaturedProductsSection />

        {/* ── 5. Buying For A Fleet Bulk Pricing CTA Banner (With Ask Quotation) ── */}
        <FleetBulkPricingBanner
          onOpenBulkQuote={() => setBulkQuoteModalOpen(true)}
          onOpenCreditLimit={() => setCreditLimitModalOpen(true)}
        />

        {/* ── Modals & Drawers ── */}
        <BulkQuoteModal
          isOpen={bulkQuoteModalOpen}
          onClose={() => setBulkQuoteModalOpen(false)}
        />

        <CreditLimitModal
          isOpen={creditLimitModalOpen}
          onClose={() => setCreditLimitModalOpen(false)}
        />

        <SmartFinderModal
          isOpen={finderModalOpen}
          onClose={() => setFinderModalOpen(false)}
        />

        <AdvancedFilterDrawer
          isOpen={filterDrawerOpen}
          onClose={() => setFilterDrawerOpen(false)}
        />

        <QuickSpecsModal
          isOpen={specsModalOpen}
          onClose={() => setSpecsModalOpen(false)}
          slide={activeSlideForSpecs}
        />

      </div>
    </div>
  );
}