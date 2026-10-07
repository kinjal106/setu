import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import solutions from '../../data/solutions.json';
import autopartsData from '../../data/autoparts.json';
import { getAssetUrl } from '../../utils/assetUrl';
import './SetuHome.css';

/* ────────────────────────────────────────────────────────────
   1. VECTOR CATEGORY ICONS MATCHING REFERENCE SCREENSHOT
──────────────────────────────────────────────────────────── */
function VehicleTrackingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect x="6" y="8" width="24" height="16" rx="3.5" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2" />
      <circle cx="11" cy="12" r="1.2" fill="#10B981" />
      <circle cx="15.5" cy="12" r="1.2" fill="#3B82F6" />
      <circle cx="20" cy="12" r="1.2" fill="#EF4444" />
      <rect x="9.5" y="16" width="17" height="4" rx="1" fill="#334155" />
      <path d="M10 24v5.5c0 1.5-1.2 2.5-3 3" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 24v4.5c0 1.5-.8 2.2-2.2 2.8" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 24v6.5c0 1.5.8 2.2 2.2 2.5" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 24v5.5c0 1.5 1.2 2.5 3 3" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function VideoTelematicsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect x="5" y="9" width="26" height="18" rx="4" fill="#0F172A" stroke="#1E293B" strokeWidth="1.2"/>
      <path d="M14 9V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" fill="#334155"/>
      <circle cx="18" cy="18" r="6.5" fill="#1E293B" stroke="#0284C7" strokeWidth="1.6"/>
      <circle cx="18" cy="18" r="4" fill="#0369A1"/>
      <circle cx="16.5" cy="16.5" r="1.3" fill="#BAE6FD"/>
      <circle cx="27" cy="13" r="1.2" fill="#EF4444"/>
    </svg>
  );
}

function ContainerTrackingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <path d="M4 12l14-5 14 5v13l-14 5-14-5V12z" fill="#1D4ED8" stroke="#1E40AF" strokeWidth="1" />
      <path d="M4 12l14 5v13L4 25V12z" fill="#2563EB" />
      <path d="M18 17l14-5v13l-14 5V17z" fill="#1D4ED8" />
      <path d="M4 12l14-5 14 5-14 5-14-5z" fill="#3B82F6" />
      <line x1="8" y1="13.5" x2="8" y2="23.5" stroke="#1D4ED8" strokeWidth="1.2" />
      <line x1="12" y1="15" x2="12" y2="25" stroke="#1D4ED8" strokeWidth="1.2" />
      <line x1="16" y1="16.5" x2="16" y2="26.5" stroke="#1D4ED8" strokeWidth="1.2" />
      <line x1="22" y1="15.5" x2="22" y2="25.5" stroke="#1E40AF" strokeWidth="1.2" />
      <line x1="26" y1="14" x2="26" y2="24" stroke="#1E40AF" strokeWidth="1.2" />
    </svg>
  );
}

function PersonalSafetyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect x="11" y="5" width="14" height="25" rx="7" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M16 2h4v3h-4z" fill="#94A3B8" rx="1" />
      <circle cx="18" cy="22" r="4.2" fill="#EF4444" />
      <text x="18" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="bold" fontFamily="sans-serif">SOS</text>
      <circle cx="18" cy="11" r="1.5" fill="#10B981" />
    </svg>
  );
}

function FuelSensorsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect x="13" y="5" width="10" height="8" rx="2" fill="#334155" stroke="#1E293B" strokeWidth="1.2" />
      <rect x="15" y="13" width="6" height="3" fill="#64748B" />
      <line x1="18" y1="16" x2="18" y2="31" stroke="#0284C7" strokeWidth="3.2" strokeLinecap="round" />
      <line x1="15.5" y1="20" x2="20.5" y2="20" stroke="#BAE6FD" strokeWidth="1.2" />
      <line x1="15.5" y1="24" x2="20.5" y2="24" stroke="#BAE6FD" strokeWidth="1.2" />
      <line x1="15.5" y1="28" x2="20.5" y2="28" stroke="#BAE6FD" strokeWidth="1.2" />
    </svg>
  );
}

function IoTSensorsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect x="9" y="11" width="18" height="20" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="18" cy="22" r="3" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="18" cy="16" r="1.2" fill="#10B981" />
      <path d="M13 7a7 7 0 0 1 10 0" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.5 4.5a10.5 10.5 0 0 1 15 0" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function AccessoriesIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <path d="M8 8l8 8m-4-8l8 8" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
      <rect x="13" y="13" width="8" height="12" rx="2" transform="rotate(-45 13 13)" fill="#1E293B" />
      <rect x="21" y="21" width="8" height="12" rx="2" transform="rotate(-45 21 21)" fill="#475569" />
      <circle cx="27" cy="27" r="2" fill="#EF4444" />
      <circle cx="29" cy="25" r="2" fill="#F59E0B" />
    </svg>
  );
}

function AllHardwareIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
      <rect x="6" y="6" width="10" height="10" rx="3" fill="#2563EB" />
      <rect x="20" y="6" width="10" height="10" rx="3" fill="#06B6D4" />
      <rect x="6" y="20" width="10" height="10" rx="3" fill="#F59E0B" />
      <rect x="20" y="20" width="10" height="10" rx="3" fill="#10B981" />
    </svg>
  );
}

function renderCategoryIcon(type) {
  switch (type) {
    case 'vehicle-tracking': return <VehicleTrackingIcon />;
    case 'video-telematics': return <VideoTelematicsIcon />;
    case 'asset-logistics': return <ContainerTrackingIcon />;
    case 'personal-safety': return <PersonalSafetyIcon />;
    case 'fuel-sensors': return <FuelSensorsIcon />;
    case 'iot-sensors': return <IoTSensorsIcon />;
    case 'accessories': return <AccessoriesIcon />;
    case 'all': return <AllHardwareIcon />;
    default: return <VehicleTrackingIcon />;
  }
}

/* ────────────────────────────────────────────────────────────
   2. CATEGORIES DATA MATCHING REFERENCE (8 CARDS)
──────────────────────────────────────────────────────────── */
const SHOP_CATEGORIES = [
  {
    id: 'vehicle-tracking',
    title: 'Vehicle Tracking Devices',
    count: '11 products',
    path: '/hardware?category=vehicle-tracking',
    iconType: 'vehicle-tracking'
  },
  {
    id: 'video-telematics',
    title: 'Video Telematics',
    count: '8 products',
    path: '/hardware?category=video-telematics',
    iconType: 'video-telematics'
  },
  {
    id: 'asset-logistics',
    title: 'Asset & Logistics Tracking',
    count: '3 products',
    path: '/hardware?category=asset-logistics',
    iconType: 'asset-logistics'
  },
  {
    id: 'personal-safety',
    title: 'Personal & Safety Tracking',
    count: 'Available Soon',
    path: '/hardware?category=personal-safety',
    iconType: 'personal-safety'
  },
  {
    id: 'fuel-sensors',
    title: 'Fuel & Vehicle Sensors',
    count: '1 product',
    path: '/hardware?category=fuel-sensors',
    iconType: 'fuel-sensors'
  },
  {
    id: 'iot-sensors',
    title: 'IoT Sensors',
    count: 'Available Soon',
    path: '/hardware?category=iot-sensors',
    iconType: 'iot-sensors'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    count: 'Available Soon',
    path: '/hardware?category=accessories',
    iconType: 'accessories'
  },
  {
    id: 'all',
    title: 'All Hardware Solutions',
    count: '23 products',
    path: '/hardware',
    iconType: 'all'
  }
];

/* ────────────────────────────────────────────────────────────
   3. SUGGESTIONS ROW CHIPS MATCHING REFERENCE SCREENSHOT
──────────────────────────────────────────────────────────── */
const SUGGESTION_CHIPS = [
  { label: 'AIS-140 GPS', query: 'AIS-140 GPS tracker' },
  { label: 'AI Dashcam', query: 'AI Dashcam with ADAS & DMS' },
  { label: 'Fuel Monitoring', query: 'Fuel monitoring sensor' },
  { label: 'Cargo Lock', query: 'Heavy-Duty GPS E-Lock container' },
  { label: 'Prevent Fuel Theft', query: 'How to prevent fuel theft' },
  { label: 'Improve Driver Safety', query: 'Improve driver safety and fatigue alerts' }
];

/* ────────────────────────────────────────────────────────────
   4. FLEET KNOWLEDGE BASE FOR SETU AI OVERVIEWS
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
      'Rechargeable 15,000mAh Battery: Operates up to 45 days on a single USB charge with live location pings.'
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
      'How does geofence automated unlocking work at destination?',
      'Is the locking cable reusable or disposable?'
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
      'Does it include state RTO certificate approval?',
      'How to connect panic button to state servers?'
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
      'Does it record in complete darkness using IR night vision?',
      'How much cloud storage is included with the device?'
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
      'Wireless BLE Connectivity: Completely eliminates wiring from the diesel tank to cabin, preventing sparks.',
      'Temperature Compensation: Automatically adjusts readings for fuel thermal expansion in summer.'
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
      'How does the fuel theft alert get sent to my phone?',
      'Does it work with standard GPS trackers via RS485 or Bluetooth?'
    ]
  }
];

function generateAIOverview(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  for (const item of FLEET_KNOWLEDGE_BASE) {
    if (item.aliases.some(alias => q.includes(alias))) {
      return item;
    }
  }
  return {
    id: 'general-match',
    question: `Hardware and telematics solutions for: "${query}"`,
    summary: `Setu provides verified commercial fleet hardware, certified sensors, and integrated software tailored for "${query}". Our catalog supports over 1,500 hardware communication protocols with plug-and-play cloud synchronization.`,
    bullets: [
      'Enterprise Quality: Tested for Indian highway road vibrations, power surges, and extreme temperature conditions.',
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
      'How to connect external sensors to GPS?',
      'Can I buy in bulk with volume pricing slabs?'
    ]
  };
}

/* ────────────────────────────────────────────────────────────
   5. HERO BANNER WITH REALISTIC 7H E-LOCK VISUAL
──────────────────────────────────────────────────────────── */
function HeroCargoLockBanner({ onLearnMore }) {
  const navigate = useNavigate();

  return (
    <div className="hero-banner-container">
      {/* Left Content Area */}
      <div className="hero-banner-left">
        <div className="hero-banner-category-row">
          <span className="hero-banner-category">CARGO SECURITY</span>
          <span className="hero-banner-category-line" />
        </div>

        <h1 className="hero-banner-heading">
          Heavy-Duty GPS E-Lock<br />
          for <span className="hero-banner-heading-accent">Safer, Smarter Cargo</span>
        </h1>

        <p className="hero-banner-description">
          IP68 waterproof container lock with tamper alert, geofence trigger, and real-time transit tracking.
        </p>

        <div className="hero-banner-btn-row">
          <button 
            type="button" 
            className="hero-banner-btn-primary"
            onClick={() => navigate('/hardware/7h-elock')}
          >
            View E-Lock →
          </button>
          <button 
            type="button" 
            className="hero-banner-btn-secondary"
            onClick={onLearnMore}
          >
            Learn more
          </button>
        </div>
      </div>

      {/* Right Visual Area: Container with 7H E-Lock on Latch + Frosted Feature Card */}
      <div className="hero-banner-right">
        <img 
          src={getAssetUrl('/images/hardware/7h-elock-banner-visual.png')} 
          alt="Heavy-Duty GPS 7H E-Lock on Container"
          className="hero-banner-visual-img"
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   6. OVERLAPPING UNIVERSAL SEARCH BAR & SUGGESTIONS ROW
──────────────────────────────────────────────────────────── */
function OverlappingSearchBar({ onSelectQuery }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isAiMode, setIsAiMode] = useState(true);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on click outside
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

  // Matching catalog items
  const matchingHardware = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return products.filter(p => {
      const text = `${p.name} ${p.slug} ${p.category} ${p.subcategory} ${p.shortDescription}`.toLowerCase();
      return text.includes(q);
    }).slice(0, 4);
  }, [query]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsFocused(false);
    if (aiOverview?.recommended?.path) {
      navigate(aiOverview.recommended.path);
    } else {
      navigate(`/hardware?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChipClick = (chipQuery) => {
    setQuery(chipQuery);
    setIsFocused(true);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Try Chrome or Edge.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsFocused(true);
    };
    recognition.start();
  };

  return (
    <div className="overlapping-search-wrapper" ref={containerRef}>
      {/* ── Main Overlapping Pill Bar ── */}
      <form 
        className={`overlapping-search-bar ${isFocused ? 'overlapping-search-bar--focused' : ''}`}
        onSubmit={handleSubmit}
      >
        {/* Left Search Magnifier Icon */}
        <div className="overlapping-search-icon">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          className="overlapping-search-input"
          value={query}
          placeholder="Search for hardware, use cases, or ask anything..."
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          aria-label="Search for hardware, use cases, or ask anything"
        />

        {/* Clear query button */}
        {query.length > 0 && (
          <button
            type="button"
            className="overlapping-search-clear"
            onClick={() => {
              setQuery('');
              if (inputRef.current) inputRef.current.focus();
            }}
            title="Clear"
          >
            ✕
          </button>
        )}

        {/* Right Voice Search Icon */}
        <button
          type="button"
          className="overlapping-search-action-btn"
          onClick={handleVoiceSearch}
          title="Search by voice"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </button>

        {/* Right Lens / Scan Aperture Icon */}
        <button
          type="button"
          className="overlapping-search-action-btn"
          onClick={() => navigate('/auto-parts')}
          title="Vehicle plate & compatibility scanner"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>

        {/* AI Mode Toggle Pill */}
        <button
          type="button"
          className={`overlapping-ai-mode-pill ${isAiMode ? 'overlapping-ai-mode-pill--active' : ''}`}
          onClick={() => {
            setIsAiMode(!isAiMode);
            setIsFocused(true);
            if (inputRef.current) inputRef.current.focus();
          }}
          title="Google-style Setu AI Mode"
        >
          <span className="overlapping-ai-mode-sparkle">✨</span>
          <span>AI Mode</span>
        </button>
      </form>

      {/* ── Suggestion Chips Row (Directly below search) ── */}
      <div className="overlapping-suggestions-row">
        {SUGGESTION_CHIPS.map(chip => (
          <button
            key={chip.label}
            type="button"
            className="overlapping-suggestion-chip"
            onClick={() => handleChipClick(chip.query)}
          >
            <span className="overlapping-suggestion-sparkle">✨</span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* ── Dropdown Panel (AI Overview & Matching Products) ── */}
      {isFocused && query.trim() && (
        <div className="overlapping-search-dropdown">
          {/* AI Overview */}
          {isAiMode && aiOverview && (
            <div className="search-dropdown-ai-overview">
              <div className="search-dropdown-ai-header">
                <span className="search-dropdown-ai-badge">
                  <span>✨</span>
                  <span>Setu AI Overview</span>
                </span>
                <span className="search-dropdown-ai-mode-tag">Generative AI</span>
              </div>

              <h3 className="search-dropdown-ai-question">{aiOverview.question}</h3>
              <p className="search-dropdown-ai-text">{aiOverview.summary}</p>

              {aiOverview.bullets && (
                <ul className="search-dropdown-ai-bullets">
                  {aiOverview.bullets.map((b, idx) => {
                    const parts = b.split(':');
                    return (
                      <li key={idx}>
                        {parts.length > 1 ? (
                          <>
                            <strong>{parts[0]}:</strong>
                            <span>{parts.slice(1).join(':')}</span>
                          </>
                        ) : (
                          <span>{b}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}

              {aiOverview.recommended && (
                <div 
                  className="search-dropdown-ai-recom-card"
                  onClick={() => {
                    setIsFocused(false);
                    navigate(aiOverview.recommended.path);
                  }}
                >
                  <div className="search-dropdown-ai-recom-thumb">
                    <img src={getAssetUrl(aiOverview.recommended.image)} alt={aiOverview.recommended.name} />
                  </div>
                  <div className="search-dropdown-ai-recom-info">
                    <span className="search-dropdown-ai-recom-tag">{aiOverview.recommended.badge}</span>
                    <span className="search-dropdown-ai-recom-name">{aiOverview.recommended.name}</span>
                    <span className="search-dropdown-ai-recom-price">{aiOverview.recommended.price}</span>
                  </div>
                  <button type="button" className="search-dropdown-ai-recom-btn">
                    View Details →
                  </button>
                </div>
              )}

              {aiOverview.followUps && (
                <div className="search-dropdown-ai-followups">
                  <span className="search-dropdown-ai-followup-label">Ask a follow up:</span>
                  {aiOverview.followUps.map((fu, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="search-dropdown-ai-followup-chip"
                      onClick={() => handleChipClick(fu)}
                    >
                      {fu}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Matching Products */}
          {matchingHardware.length > 0 && (
            <div className="search-dropdown-section">
              <div className="search-dropdown-section-header">
                <span>Matching Devices ({matchingHardware.length})</span>
              </div>
              <div className="search-dropdown-items-list">
                {matchingHardware.map((prod) => (
                  <div
                    key={prod.id}
                    className="search-dropdown-item"
                    onClick={() => {
                      setIsFocused(false);
                      navigate(`/hardware/${prod.slug}`);
                    }}
                  >
                    <div className="search-dropdown-thumb">
                      <img src={getAssetUrl(prod.image)} alt={prod.name} />
                    </div>
                    <div className="search-dropdown-info">
                      <span className="search-dropdown-title">{prod.name}</span>
                      <span className="search-dropdown-desc">{prod.shortDescription}</span>
                    </div>
                    <span className="search-dropdown-price">₹{prod.price?.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer View All */}
          <div className="search-dropdown-footer">
            <button
              type="button"
              className="search-dropdown-see-all"
              onClick={handleSubmit}
            >
              Search all catalog items matching "{query}" →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   7. SHOP BY CATEGORY SECTION (8 CARDS MATCHING REFERENCE)
──────────────────────────────────────────────────────────── */
function ShopByCategorySection() {
  const navigate = useNavigate();

  return (
    <div className="shop-category-section">
      {/* Section Header */}
      <div className="shop-category-header">
        <div className="shop-category-header__left">
          <h2 className="shop-category-title">Shop by category</h2>
          <p className="shop-category-subtitle">
            Everything a fleet needs, from the device to the licence to the technician.
          </p>
        </div>
        <button
          type="button"
          className="shop-category-view-all"
          onClick={() => navigate('/hardware')}
        >
          <span>View all categories</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 8 Category Cards (4 columns x 2 rows) */}
      <div className="shop-category-grid">
        {SHOP_CATEGORIES.map(cat => (
          <div
            key={cat.id}
            className="shop-category-card"
            onClick={() => navigate(cat.path)}
          >
            <div className="shop-category-icon-box">
              {renderCategoryIcon(cat.iconType)}
            </div>

            <div className="shop-category-info">
              <h3 className="shop-category-name">{cat.title}</h3>
              <p className="shop-category-count">{cat.count}</p>
            </div>

            <div className="shop-category-arrow">
              <svg width="8" height="13" viewBox="0 0 8 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1.5 1.5 6.5 6.5 1.5 11.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   8. SECONDARY PROGRAMS & SOLUTIONS SLIDER
──────────────────────────────────────────────────────────── */
const HOME_BANNERS = [
  {
    id: 'finance',
    tag: 'SETU FINANCE',
    tagColor: '#FBBF24',
    title: 'Buy hardware now, pay in EMIs. No CIBIL check.',
    desc: 'Your limit is set from live fleet data through system integration, so new and small fleet owners qualify too.',
    type: 'pricing',
    amount: '₹22,565',
    subText: '/month for ₹2.5 lakh over 12 months',
    btnText: 'Check my limit →',
    path: '/finance',
    cardClass: 'home-banner-card--finance'
  },
  {
    id: 'autoparts',
    tag: 'AUTO PARTS · BETA',
    tagColor: '#34D399',
    title: 'Enter a vehicle number. See every part that fits.',
    desc: 'From a single screw to the front bumper, matched to the exact make, model and year.',
    type: 'plate-search',
    btnText: 'Find parts',
    path: '/auto-parts',
    cardClass: 'home-banner-card--autoparts'
  },
  {
    id: 'ais140',
    tag: 'GOVERNMENT APPROVED · AIS-140',
    tagColor: '#38BDF8',
    title: 'ARAI & ICAT Certified AIS-140 GPS with Emergency SOS.',
    desc: 'Mandatory for commercial vehicles, transport buses & mining fleets with dual embedded eSIMs and panic buttons.',
    type: 'pricing',
    amount: '₹3,800',
    subText: '/device · Bulk slabs start at ₹3,325',
    btnText: 'Explore AIS-140 →',
    path: '/hardware?category=vehicle-tracking',
    cardClass: 'home-banner-card--ais140'
  },
  {
    id: 'video',
    tag: 'AI VIDEO TELEMATICS · SMART CAMERAS',
    tagColor: '#C084FC',
    title: 'Detect fatigue & prevent collisions with ADAS & DMS.',
    desc: 'Dual-facing 4G AI cameras detecting driver drowsiness, phone use, and forward collision in real time.',
    type: 'pricing',
    amount: '₹8,900',
    subText: '/unit · Includes 4G cloud live streaming',
    btnText: 'View AI Dashcams →',
    path: '/hardware?category=video-telematics',
    cardClass: 'home-banner-card--video'
  }
];

function HomeBannerSlider() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vehiclePlate, setVehiclePlate] = useState('');
  const totalBanners = HOME_BANNERS.length;

  const handlePlateSearch = (e) => {
    if (e) e.preventDefault();
    const cleanPlate = vehiclePlate.trim() || 'GJ 15 AT 7788';
    navigate(`/auto-parts?reg=${encodeURIComponent(cleanPlate.replace(/\s+/g, ''))}`);
  };

  return (
    <section className="programs-slider-section">
      <div className="programs-slider-header">
        <div>
          <h2 className="programs-slider-title">Programs &amp; Solutions</h2>
          <p className="programs-slider-sub">Financing, vehicle compatibility search, certified hardware, and fleet software</p>
        </div>
      </div>

      <div className="programs-slider-grid">
        {HOME_BANNERS.map(banner => (
          <div 
            key={banner.id}
            className={`programs-card ${banner.cardClass}`}
            onClick={() => {
              if (banner.type !== 'plate-search') navigate(banner.path);
            }}
          >
            <div className="programs-card__top">
              <span className="programs-card__tag" style={{ color: banner.tagColor }}>{banner.tag}</span>
              <h3 className="programs-card__title">{banner.title}</h3>
              <p className="programs-card__desc">{banner.desc}</p>
            </div>

            <div className="programs-card__bottom">
              {banner.type === 'plate-search' ? (
                <form className="programs-plate-box" onSubmit={handlePlateSearch} onClick={e => e.stopPropagation()}>
                  <input
                    type="text"
                    className="programs-plate-input"
                    placeholder="GJ 15 AT 7788"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                  />
                  <button type="submit" className="programs-plate-btn">{banner.btnText}</button>
                </form>
              ) : (
                <div className="programs-price-row">
                  <div>
                    <span className="programs-amount">{banner.amount}</span>
                    <span className="programs-subtext">{banner.subText}</span>
                  </div>
                  <button type="button" className="programs-cta-btn">{banner.btnText}</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   9. QUICK SPECS MODAL FOR 7H E-LOCK
──────────────────────────────────────────────────────────── */
function QuickSpecsModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="specs-modal-overlay" onClick={onClose}>
      <div className="specs-modal" onClick={e => e.stopPropagation()}>
        <div className="specs-modal__header">
          <div>
            <span className="specs-modal__badge">CARGO SECURITY &amp; LOGISTICS</span>
            <h3 className="specs-modal__title">Magnet 7H E-Lock Container Tracker</h3>
          </div>
          <button type="button" className="specs-modal__close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="specs-modal__body">
          <p className="specs-modal__lead">
            Heavy-duty IP68 waterproof electronic padlock with steel cable locking rope, GPS real-time transit tracking, and remote OTP / RFID authorization.
          </p>

          <div className="specs-modal__specs-grid">
            <div className="specs-modal__spec-row">
              <span className="specs-modal__spec-key">CONNECTIVITY</span>
              <span className="specs-modal__spec-val">4G LTE Cat 1 with 2G GSM Fallback</span>
            </div>
            <div className="specs-modal__spec-row">
              <span className="specs-modal__spec-key">BATTERY</span>
              <span className="specs-modal__spec-val">15,000mAh Rechargeable Li-ion (Up to 45 Days)</span>
            </div>
            <div className="specs-modal__spec-row">
              <span className="specs-modal__spec-key">HOUSING &amp; SEAL</span>
              <span className="specs-modal__spec-val">IP68 Heavy-Duty Waterproof Aluminum Alloy &amp; Steel Rope</span>
            </div>
            <div className="specs-modal__spec-row">
              <span className="specs-modal__spec-key">SECURITY ALARMS</span>
              <span className="specs-modal__spec-val">Cable cut siren, Geofence breach, Chassis open tamper alert</span>
            </div>
            <div className="specs-modal__spec-row">
              <span className="specs-modal__spec-key">UNLOCKING</span>
              <span className="specs-modal__spec-val">Remote OTP Unlock, RFID Swipe, SMS Command</span>
            </div>
            <div className="specs-modal__spec-row">
              <span className="specs-modal__spec-key">COMPLIANCE</span>
              <span className="specs-modal__spec-val">National customs bond transit &amp; container logistics verified</span>
            </div>
          </div>
        </div>

        <div className="specs-modal__footer">
          <button type="button" className="specs-modal__btn-secondary" onClick={onClose}>Close</button>
          <button 
            type="button" 
            className="specs-modal__btn-primary" 
            onClick={() => {
              onClose();
              navigate('/hardware/7h-elock');
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
   10. MAIN HOMEPAGE COMPONENT
──────────────────────────────────────────────────────────── */
export default function SetuHome() {
  const [specsModalOpen, setSpecsModalOpen] = useState(false);

  return (
    <div className="setu-home-page">
      <div className="setu-home-container">

        {/* ── 1. Hero Banner with 7H E-Lock on Shipping Container ── */}
        <HeroCargoLockBanner onLearnMore={() => setSpecsModalOpen(true)} />

        {/* ── 2. Overlapping Universal Search Bar & Suggestions Row ── */}
        <OverlappingSearchBar />

        {/* ── 3. Shop by Category (8 Modern Cards) ── */}
        <ShopByCategorySection />

        {/* ── 4. Programs & Solutions ── */}
        <HomeBannerSlider />

        {/* ── 5. Quick Specs Modal ── */}
        <QuickSpecsModal 
          isOpen={specsModalOpen} 
          onClose={() => setSpecsModalOpen(false)} 
        />

      </div>
    </div>
  );
}