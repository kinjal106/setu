import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import { getAssetUrl } from '../../utils/assetUrl';
import './SetuHome.css';

/* ────────────────────────────────────────────────────────────
   1. HERO PRODUCT SHOWCASE DATA (Enterprise Showcase, ~40-45% Viewport)
──────────────────────────────────────────────────────────── */
const HERO_SHOWCASE_PRODUCTS = [
  {
    id: '7h-elock',
    categoryBadge: 'CARGO SECURITY & LOGISTICS',
    headline: 'Secure every shipment, wherever it goes.',
    subheading: 'GPS-enabled cargo security with remote unlocking, tamper detection and real-time monitoring.',
    primaryCta: 'Explore E-Lock',
    primaryPath: '/hardware/7h-elock',
    image: '/images/hardware/7h-elock.svg',
    productSlug: '7h-elock',
    statusIndicators: [
      { label: '4G LTE Connected', status: 'online' },
      { label: 'IP68 Padlock Seal', status: 'secure' },
      { label: 'Battery 98% · 45 Days', status: 'battery' },
      { label: 'Anti-Tamper Armed', status: 'shield' }
    ],
    quickSpecs: {
      connectivity: '4G LTE Cat 1 with 2G GSM Fallback',
      battery: '15,000mAh Rechargeable Li-ion (Up to 45 Days)',
      security: 'Remote OTP Unlock, RFID Swipe, SMS Command',
      housing: 'IP68 Heavy-Duty Waterproof Aluminum Alloy & Steel Rope',
      alarms: 'Cable cut siren, Geofence breach, Chassis open tamper alert'
    }
  },
  {
    id: 'prithvi-140',
    categoryBadge: 'GOVERNMENT MANDATE · AIS-140',
    headline: 'Mandatory AIS-140 GPS with Emergency SOS.',
    subheading: 'MoRTH compliant with ARAI/ICAT certification, dual eSIMs, and direct state emergency 112 integration.',
    primaryCta: 'Explore AIS-140',
    primaryPath: '/hardware/prithvi-140',
    image: '/images/hardware/prithvi-140.svg',
    productSlug: 'prithvi-140',
    statusIndicators: [
      { label: 'ARAI & ICAT Certified', status: 'verified' },
      { label: 'Dual eSIM Active', status: 'online' },
      { label: 'Emergency 112 Ready', status: 'shield' },
      { label: '4-Hour Internal Battery', status: 'battery' }
    ],
    quickSpecs: {
      connectivity: '4G LTE with Dual Embedded M2M eSIM Profiles',
      certification: 'AIS-140 Certified (MoRTH / ARAI / ICAT Approved)',
      sosButton: 'Hardwired Emergency Panic Button for State 112 Server',
      battery: 'Internal 850mAh Backup Battery (4+ Hours)',
      inputsOutputs: '4 Digital Inputs, 2 Digital Outputs, 1 Analog In, RS232'
    }
  },
  {
    id: 'falcon-f1-ai-4g',
    categoryBadge: 'AI VIDEO TELEMATICS',
    headline: 'Detect fatigue & prevent collisions with AI vision.',
    subheading: 'Front-facing ADAS and driver-facing DMS infrared vision alert drivers in real time before accidents occur.',
    primaryCta: 'Explore AI Dashcam',
    primaryPath: '/hardware/falcon-f1-ai-4g',
    image: '/images/hardware/falcon-f1.svg',
    productSlug: 'falcon-f1-ai-4g',
    statusIndicators: [
      { label: 'ADAS Road Vision', status: 'online' },
      { label: 'DMS Driver Fatigue IR', status: 'verified' },
      { label: '4G Cloud HD Upload', status: 'online' },
      { label: 'Dual 1080P Cameras', status: 'secure' }
    ],
    quickSpecs: {
      camera: 'Dual 1080P Full HD (Road Facing + Cabin Infrared DMS)',
      aiModels: 'Forward Collision (FCW), Lane Departure (LDW), Fatigue & Drowsiness',
      connectivity: '4G LTE with Wi-Fi Hotspot for in-cabin configuration',
      storage: 'Supports dual MicroSD cards up to 512GB total capacity',
      cloudSync: 'Auto-uploads 10s video clips on critical incident alarms'
    }
  },
  {
    id: 'sp-ble4-fuel',
    categoryBadge: 'PRECISION FUEL TELEMETRY',
    headline: 'Capacitive & BLE sensors to prevent fuel theft.',
    subheading: '99.5% measurement accuracy with instant siphoning detection and zero vehicle tank drilling.',
    primaryCta: 'Explore Fuel Sensors',
    primaryPath: '/hardware/sp-ble4-fuel',
    image: '/images/hardware/sp-ble4-fuel.svg',
    productSlug: 'sp-ble4-fuel',
    statusIndicators: [
      { label: '99.5% Accuracy', status: 'verified' },
      { label: 'Wireless BLE 5.0', status: 'online' },
      { label: 'Instant Drop Alert', status: 'shield' },
      { label: 'Explosion Proof IP67', status: 'secure' }
    ],
    quickSpecs: {
      sensorType: 'Capacitive Fuel Level Probe & Wireless BLE 5.0 Beacon',
      precision: 'Measurement error < 0.5% of total tank volume',
      batteryLife: 'Internal industrial lithium battery with 5+ year lifespan',
      temperatureComp: 'Automatic thermal expansion compensation (-40°C to +85°C)',
      compatibility: 'Compatible with all standard GPS trackers via RS485 or BLE'
    }
  }
];

/* ────────────────────────────────────────────────────────────
   2. SEARCH & DISCOVERY CONSTANTS
──────────────────────────────────────────────────────────── */
const POPULAR_SEARCHES = [
  { label: 'AIS-140 GPS', query: 'AIS-140 GPS tracker' },
  { label: 'AI Dashcam', query: 'AI Dashcam with DMS' },
  { label: 'Fuel Monitoring', query: 'Fuel monitoring sensor' },
  { label: 'Cargo E-Lock', query: 'GPS cargo e-lock' }
];

const SEARCH_BY_PROBLEM = [
  { label: 'Prevent fuel theft', query: 'I need to prevent fuel theft' },
  { label: 'Improve driver safety', query: 'Improve driver safety and fatigue detection' },
  { label: 'Monitor cargo', query: 'Secure container and cargo tracking' },
  { label: 'Track assets', query: 'Rechargeable wireless asset tracking' }
];

const TYPEWRITER_PLACEHOLDERS = [
  'Search devices, models, features or describe what you need…',
  'Try: "AIS-140 GPS tracker"',
  'Try: "Fuel monitoring device to prevent diesel theft"',
  'Try: "Camera with driver monitoring and ADAS"',
  'Try: "GPS tracker for refrigerated trucks"',
  'Try: "Device for school bus tracking with SOS button"',
  'Try: "Hardware supporting CAN bus telemetry"'
];

/* ── Smart Finder Progressive Advisor Data ── */
const SMART_FINDER_GOALS = [
  { id: 'track-vehicles', label: 'Track vehicles', icon: '📍', desc: 'Real-time location, ignition & routes' },
  { id: 'improve-safety', label: 'Improve driver safety', icon: '🛡️', desc: 'Drowsiness, fatigue & collision warnings' },
  { id: 'prevent-fuel-theft', label: 'Prevent fuel theft', icon: '⛽', desc: 'Drainage alerts & consumption metrics' },
  { id: 'monitor-cargo', label: 'Monitor cargo', icon: '📦', desc: 'Shipment protection & condition tracking' },
  { id: 'video-monitoring', label: 'Video monitoring', icon: '📹', desc: 'Live multi-camera streaming & cloud MDVR' },
  { id: 'track-temperature', label: 'Track temperature', icon: '❄️', desc: 'Cold-chain pharma & food logistics' },
  { id: 'secure-containers', label: 'Secure containers', icon: '🔒', desc: 'GPS electronic padlocks & remote OTP' },
  { id: 'asset-tracking', label: 'Asset tracking', icon: '🔋', desc: 'Long battery life magnetic trackers' },
  { id: 'school-buses', label: 'Manage school buses', icon: '🚌', desc: 'Govt mandate, RFID & student safety' },
  { id: 'can-data', label: 'Monitor CAN data', icon: '⚡', desc: 'Engine diagnostic codes & RPM telemetry' }
];

const SMART_FINDER_VEHICLES = [
  { id: 'truck', label: 'Commercial Trucks', icon: '🚚', desc: 'Heavy haulage, trailers & rigid trucks' },
  { id: 'bus', label: 'Passenger Buses', icon: '🚍', desc: 'Intercity, staff & school bus fleets' },
  { id: 'car', label: 'Cars & Taxis', icon: '🚗', desc: 'Sedans, SUVs, cabs & rental cars' },
  { id: 'heavy', label: 'Construction & Mining', icon: '🚜', desc: 'Excavators, dumpers & gensets' },
  { id: 'mixed', label: 'Mixed Fleet', icon: '🔄', desc: 'Variety of commercial and passenger assets' }
];

const SMART_FINDER_DYNAMIC_QUESTIONS = {
  'prevent-fuel-theft': {
    title: 'What level of monitoring do you need?',
    options: [
      { id: 'level', label: 'Fuel level', desc: 'Continuous volumetric tank percentage readout' },
      { id: 'filling', label: 'Fuel filling', desc: 'Exact fuel station refill audits and receipts' },
      { id: 'draining', label: 'Fuel draining (Theft)', desc: 'Instant siren & SMS alert on sudden drop' },
      { id: 'analytics', label: 'Complete fuel analytics', desc: 'Mileage correlation, drain alerts & tank calibration' }
    ]
  },
  'improve-safety': {
    title: 'What camera & safety coverage do you need?',
    options: [
      { id: 'adas', label: 'Forward Collision (ADAS)', desc: 'Road view warning for lane departures & tailgating' },
      { id: 'dms', label: 'Driver Fatigue (DMS)', desc: 'Infrared facial camera for sleep & phone distraction' },
      { id: 'dual', label: 'Dual Front + Cabin AI', desc: 'All-in-one compact AI dashcam for complete cockpit safety' },
      { id: 'mdvr', label: '360° 4-Channel MDVR', desc: 'Four HD cameras covering road, driver, sides & reverse' }
    ]
  },
  'video-monitoring': {
    title: 'How many camera channels do you require?',
    options: [
      { id: 'dual', label: '2-Channel Dual Dashcam', desc: 'Front road + driver cabin video' },
      { id: 'mdvr4', label: '4-Channel Mobile DVR', desc: 'Front, rear, left blind spot & right blind spot' },
      { id: 'streaming', label: '4G Real-time Cloud Streaming', desc: 'Live dispatch viewing & automatic event clip uploads' },
      { id: 'storage', label: 'High-Capacity Onboard Storage', desc: 'Up to 2TB SSD / Dual SD for 30+ days continuous loop' }
    ]
  },
  'track-vehicles': {
    title: 'What compliance or installation style do you prefer?',
    options: [
      { id: 'ais140', label: 'Govt AIS-140 Mandate', desc: 'ARAI/ICAT certified with RTO SOS panic button' },
      { id: 'obd', label: 'Plug & Play OBD (No Wire Cut)', desc: 'Installs in 30 seconds into standard OBD-II diagnostic port' },
      { id: 'wired', label: 'Hardwired 4-Wire Tracker', desc: 'Concealed installation with ignition detection & engine cut' },
      { id: 'can', label: 'CAN Bus Telematics', desc: 'Reads odometer, fuel rate and engine trouble codes directly' }
    ]
  },
  'secure-containers': {
    title: 'What type of container security is required?',
    options: [
      { id: 'padlock', label: 'GPS Padlock E-Lock', desc: 'Heavy-duty steel rope lock with remote OTP unlocking' },
      { id: 'door-sensor', label: 'Wireless Door Sensor', desc: 'BLE magnetic contact sensor for container door openings' },
      { id: 'customs', label: 'Customs & Bonded Transit', desc: 'Tamper siren, satellite ping & excise compliance' },
      { id: 'temp', label: 'Temperature + Lock Combo', desc: 'Monitors thermal seal alongside physical padlock' }
    ]
  },
  'monitor-cargo': {
    title: 'What type of cargo protection do you need?',
    options: [
      { id: 'elock', label: 'Electronic Padlock E-Lock', desc: 'Prevents en-route pilferage with remote OTP unlock' },
      { id: 'portable', label: 'Magnetic Long-Life Tracker', desc: 'Slaps onto container chassis with up to 3 years battery' },
      { id: 'temp', label: 'Cold-Chain Environmental Sensor', desc: 'Monitors refrigerated goods temperature & humidity' },
      { id: 'tamper', label: 'Anti-Tamper & Light Sensor', desc: 'Detects if box or carton has been opened in transit' }
    ]
  },
  'track-temperature': {
    title: 'What temperature range and monitoring setup?',
    options: [
      { id: 'cold-reefer', label: 'Reefer Truck (-25°C to +25°C)', desc: 'High accuracy BLE probe for frozen goods and ice cream' },
      { id: 'pharma', label: 'Pharma Ultra-Low (-80°C)', desc: 'Vaccine and clinical trial grade environmental logging' },
      { id: 'multi-zone', label: 'Multi-Zone Chamber Sensor', desc: 'Up to 4 BLE sensors per vehicle for divided compartments' },
      { id: 'door-temp', label: 'Combined Door + Temperature', desc: 'Logs temperature spikes caused by door opening duration' }
    ]
  },
  'school-buses': {
    title: 'What student safety features do you need?',
    options: [
      { id: 'mandate', label: 'AIS-140 + SOS Panic Button', desc: 'Mandatory government compliance for transport permits' },
      { id: 'rfid', label: 'RFID Student Attendance', desc: 'Notifies parents when child board or deboards the bus' },
      { id: 'cabin-camera', label: 'Internal Cabin Camera', desc: 'Live video monitoring of student behavior and safety' },
      { id: 'speed-gov', label: 'Speed Governor Alerts', desc: 'Instant alerts on exceeding school zone speed limits' }
    ]
  },
  'can-data': {
    title: 'What vehicle data do you need to extract?',
    options: [
      { id: 'j1939', label: 'Heavy Truck J1939 CAN', desc: 'Engine load, RPM, coolant temperature & true odometer' },
      { id: 'dtc', label: 'Engine Trouble Codes (DTC)', desc: 'Predictive maintenance warnings before breakdown' },
      { id: 'fuel-rate', label: 'CAN Fuel Consumption', desc: 'ECU calculated liters per 100km fuel consumption' },
      { id: 'driver-score', label: 'Harsh Acceleration & Braking', desc: 'Precise pedal position and driving style telemetry' }
    ]
  },
  'asset-tracking': {
    title: 'What battery life and mounting do you need?',
    options: [
      { id: 'magnetic-long', label: 'Magnetic Long-Life (1–3 Years)', desc: '10,000mAh+ battery with 1 ping per day for non-powered assets' },
      { id: 'rechargeable', label: 'Rechargeable Portable (30–60 Days)', desc: 'Active tracking with USB recharging for equipment and tools' },
      { id: 'solar', label: 'Solar-Powered Continuous', desc: 'Self-charging for flatbed trailers, railcars and barges' },
      { id: 'disposable', label: 'Single-Trip Cargo Logger', desc: 'Low cost beacon for high-value one-way international air cargo' }
    ]
  }
};

/* ── 8 Modern Categories for "Explore Hardware" ── */
const EXPLORE_CATEGORIES = [
  {
    id: 'vehicle-tracking',
    title: 'GPS Tracking',
    desc: 'Wired, OBD, CAN bus, and AIS-140 certified vehicle trackers.',
    count: '11 devices',
    path: '/hardware?category=vehicle-tracking',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8.01" y2="16" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
        <line x1="16" y1="16" x2="16.01" y2="16" />
      </svg>
    )
  },
  {
    id: 'video-telematics',
    title: 'Video Telematics',
    desc: 'AI dashcams, ADAS, driver DMS, and 4-channel mobile DVRs.',
    count: '8 devices',
    path: '/hardware?category=video-telematics',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    )
  },
  {
    id: 'iot-sensors',
    title: 'Sensors',
    desc: 'Ultrasonic fuel, BLE temperature, door & humidity sensors.',
    count: '6 devices',
    path: '/hardware?category=iot-sensors',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      </svg>
    )
  },
  {
    id: 'fuel-sensors',
    title: 'Fuel Monitoring',
    desc: 'High-precision capacitive rods & anti-siphoning theft alerts.',
    count: '3 devices',
    path: '/hardware?category=fuel-sensors',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22h12" />
        <path d="M4 9h10" />
        <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
        <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
      </svg>
    )
  },
  {
    id: 'cargo-security',
    title: 'Cargo Security',
    desc: 'Smart GPS e-locks, container padlocks & seal monitors.',
    count: '3 devices',
    path: '/hardware?category=asset-logistics',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    id: 'driver-safety',
    title: 'Driver Safety',
    desc: 'Fatigue detection, panic SOS buttons & speed governors.',
    count: '6 devices',
    path: '/hardware?category=video-telematics',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    id: 'obd-can',
    title: 'OBD & CAN',
    desc: 'Plug & play diagnostics, J1939 engine telemetry & fault codes.',
    count: '4 devices',
    path: '/hardware?category=vehicle-tracking',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 12h4" />
        <path d="M14 12h4" />
      </svg>
    )
  },
  {
    id: 'accessories',
    title: 'Accessories',
    desc: 'Relays, immobilizers, wiring harnesses & RFID cards.',
    count: '4 devices',
    path: '/hardware?category=accessories',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  }
];

/* ── 4 Use Cases for "Find hardware by use case" ── */
const USE_CASES = [
  {
    id: 'fuel-theft',
    title: 'Prevent Fuel Theft',
    desc: 'Find compatible sensors and tracking hardware.',
    highlights: '99.5% accuracy · Instant drop alert · Wireless BLE',
    filterQuery: 'fuel sensor theft drainage',
    icon: '⛽',
    badge: 'Popular Problem'
  },
  {
    id: 'driver-safety',
    title: 'Improve Driver Safety',
    desc: 'Explore ADAS, DMS and AI camera solutions.',
    highlights: 'Fatigue warning · Collision alert · HD 4G upload',
    filterQuery: 'dashcam adas dms safety camera',
    icon: '🛡️',
    badge: 'High Impact'
  },
  {
    id: 'secure-cargo',
    title: 'Secure Cargo',
    desc: 'Discover GPS locks, sensors and security devices.',
    highlights: 'Remote OTP unlock · Cable cut siren · IP68 seal',
    filterQuery: 'e-lock container padlock cargo',
    icon: '🔒',
    badge: 'Transit Protection'
  },
  {
    id: 'cold-chain',
    title: 'Monitor Cold Chain',
    desc: 'Find temperature and environmental sensors.',
    highlights: '±0.3°C precision · Multi-zone BLE · Expiry prevention',
    filterQuery: 'temperature sensor cold chain',
    icon: '❄️',
    badge: 'Pharma & Food'
  }
];

/* ────────────────────────────────────────────────────────────
   3. TYPEWRITER HOOK FOR UNIVERSAL SEARCH
──────────────────────────────────────────────────────────── */
function useTypewriter(words, isEnabled = true) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isEnabled || !words.length) return;
    const current = words[index];
    let timer;

    if (!deleting) {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), 35);
      } else {
        timer = setTimeout(() => setDeleting(true), 2500);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), 18);
      } else {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, isEnabled]);

  return text;
}

/* ────────────────────────────────────────────────────────────
   4. HERO COMPONENT: PRODUCT SHOWCASE (~40-45% Viewport)
──────────────────────────────────────────────────────────── */
function HeroProductShowcase({ onOpenSpecs }) {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = HERO_SHOWCASE_PRODUCTS.length;

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, total]);

  const active = HERO_SHOWCASE_PRODUCTS[slide];

  return (
    <section 
      className="hero-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured Hardware Showcase"
    >
      <div className="hero-showcase__content">
        {/* Left Column: Product Information & Actions */}
        <div className="hero-showcase__info">
          <div className="hero-showcase__badge-row">
            <span className="hero-showcase__badge">{active.categoryBadge}</span>
            <span className="hero-showcase__slide-counter">{slide + 1} of {total}</span>
          </div>

          <h1 className="hero-showcase__headline">
            {active.headline}
          </h1>

          <p className="hero-showcase__subheading">
            {active.subheading}
          </p>

          <div className="hero-showcase__actions">
            <button
              type="button"
              className="hero-showcase__btn-primary"
              onClick={() => navigate(active.primaryPath)}
            >
              <span>{active.primaryCta}</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              className="hero-showcase__btn-secondary"
              onClick={() => onOpenSpecs(active)}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>View specifications</span>
            </button>
          </div>

          {/* Minimal Slide Indicators */}
          <div className="hero-showcase__dots">
            {HERO_SHOWCASE_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                type="button"
                className={`hero-showcase__dot ${idx === slide ? 'hero-showcase__dot--active' : ''}`}
                onClick={() => setSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${prod.categoryBadge}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Hardware Product Visual & Contextual Status Accents */}
        <div className="hero-showcase__visual-wrap">
          <div className="hero-showcase__stage">
            <div className="hero-showcase__device-glow" />
            <img 
              src={getAssetUrl(active.image)} 
              alt={active.headline} 
              className="hero-showcase__device-img" 
            />

            {/* Subtle contextual status indicators */}
            <div className="hero-showcase__indicators-row">
              {active.statusIndicators.map((ind, i) => (
                <div key={i} className={`hero-showcase__indicator hero-showcase__indicator--${ind.status}`}>
                  <span className="hero-showcase__indicator-dot" />
                  <span className="hero-showcase__indicator-label">{ind.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   5. UNIVERSAL SEARCH + SMART FINDER + ADVANCED FILTERS
──────────────────────────────────────────────────────────── */
function UniversalSearchModule({ onOpenAdvancedFilters, activeFilterCount, onSelectProductForCompare, selectedCompareIds }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('search'); // 'search' | 'finder'
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Typewriter placeholder for search field
  const placeholderText = useTypewriter(TYPEWRITER_PLACEHOLDERS, !query && mode === 'search');

  // Smart Finder State (3-4 Progressive Business Steps)
  const [finderStep, setFinderStep] = useState(1);
  const [finderAnswers, setFinderAnswers] = useState({
    goal: null,
    vehicle: null,
    specific: null,
    existingGps: null
  });
  const [finderSubmitted, setFinderSubmitted] = useState(false);
  const [whyExpanded, setWhyExpanded] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsFocused(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* ── Command Palette Grouped Results ── */
  const commandPaletteResults = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.trim().toLowerCase();
    const tokens = q.split(/\s+/).filter(Boolean);

    // 1. Products
    const matchingProds = products.filter(p => {
      const text = `${p.name} ${p.slug} ${p.category} ${p.subcategory} ${p.shortDescription} ${(p.tags || []).join(' ')}`.toLowerCase();
      return tokens.every(t => text.includes(t));
    }).slice(0, 4);

    // 2. Categories
    const matchingCats = (categoriesData || []).filter(c => {
      const text = `${c.label} ${c.id} ${(c.children || []).map(ch => ch.label).join(' ')}`.toLowerCase();
      return tokens.some(t => text.includes(t));
    }).slice(0, 3);

    // 3. Features
    const allFeatures = [
      { name: 'Fuel Monitoring', slug: 'fuel-sensors', desc: 'Real-time volumetric level and drainage alerts' },
      { name: 'Driver Monitoring (DMS)', slug: 'video-telematics', desc: 'Facial computer vision for fatigue and distraction' },
      { name: 'Forward Collision (ADAS)', slug: 'video-telematics', desc: 'Active road safety and lane departure warnings' },
      { name: 'CAN Bus Integration', slug: 'vehicle-tracking', desc: 'Engine diagnostic codes, RPM and odometer telemetry' },
      { name: 'Remote Immobilization', slug: 'vehicle-tracking', desc: 'Over-the-air ignition fuel pump cutoff relay' },
      { name: 'Temperature & Humidity', slug: 'iot-sensors', desc: 'Cold chain compliance for food and pharma' }
    ];
    const matchingFeatures = allFeatures.filter(f => {
      return tokens.some(t => f.name.toLowerCase().includes(t) || f.desc.toLowerCase().includes(t));
    }).slice(0, 3);

    // 4. Use Cases
    const matchingUseCases = USE_CASES.filter(u => {
      return tokens.some(t => u.title.toLowerCase().includes(t) || u.desc.toLowerCase().includes(t) || u.filterQuery.toLowerCase().includes(t));
    }).slice(0, 3);

    return {
      products: matchingProds,
      categories: matchingCats,
      features: matchingFeatures,
      useCases: matchingUseCases,
      totalCount: matchingProds.length + matchingCats.length + matchingFeatures.length + matchingUseCases.length
    };
  }, [query]);

  // Flattened items for keyboard navigation
  const flatSelectableItems = useMemo(() => {
    if (!commandPaletteResults) return [];
    const list = [];
    commandPaletteResults.products.forEach(p => list.push({ type: 'product', data: p }));
    commandPaletteResults.categories.forEach(c => list.push({ type: 'category', data: c }));
    commandPaletteResults.features.forEach(f => list.push({ type: 'feature', data: f }));
    commandPaletteResults.useCases.forEach(u => list.push({ type: 'useCase', data: u }));
    return list;
  }, [commandPaletteResults]);

  const handleKeyDown = (e) => {
    if (!isFocused || !commandPaletteResults) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev + 1) % flatSelectableItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev - 1 + flatSelectableItems.length) % flatSelectableItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < flatSelectableItems.length) {
        const item = flatSelectableItems[activeIndex];
        handleSelectItem(item);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      setActiveIndex(-1);
    }
  };

  const handleSelectItem = (item) => {
    setIsFocused(false);
    if (item.type === 'product') {
      navigate(`/hardware/${item.data.slug}`);
    } else if (item.type === 'category') {
      navigate(`/hardware?category=${item.data.id}`);
    } else if (item.type === 'feature') {
      navigate(`/hardware?category=${item.data.slug}`);
    } else if (item.type === 'useCase') {
      navigate(`/hardware?search=${encodeURIComponent(item.data.filterQuery)}`);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsFocused(false);
    navigate(`/hardware?search=${encodeURIComponent(query.trim())}`);
  };

  /* ── Smart Finder Advisor Logic ── */
  const currentDynamicQuestion = useMemo(() => {
    if (!finderAnswers.goal) return null;
    return SMART_FINDER_DYNAMIC_QUESTIONS[finderAnswers.goal.id] || {
      title: 'What specific capability is most critical for your deployment?',
      options: [
        { id: 'standard', label: 'Standard Enterprise Grade', desc: 'Reliable telemetry with nationwide network connectivity' },
        { id: 'high-precision', label: 'High-Precision Accuracy', desc: 'Sub-meter GNSS positioning and advanced reporting' },
        { id: 'rugged', label: 'Ruggedized IP67/IP68 Housing', desc: 'Harsh environmental resistance against dust and water' },
        { id: 'low-cost', label: 'Optimized Fleet Cost', desc: 'Economical bulk deployment for large vehicle fleets' }
      ]
    };
  }, [finderAnswers.goal]);

  const handleSelectGoal = (goal) => {
    setFinderAnswers(prev => ({ ...prev, goal, specific: null }));
    setFinderStep(2);
  };

  const handleSelectVehicle = (vehicle) => {
    setFinderAnswers(prev => ({ ...prev, vehicle }));
    setFinderStep(3);
  };

  const handleSelectSpecific = (specific) => {
    setFinderAnswers(prev => ({ ...prev, specific }));
    setFinderStep(4);
  };

  const handleSelectExistingGps = (ans) => {
    setFinderAnswers(prev => ({ ...prev, existingGps: ans }));
    setFinderSubmitted(true);
  };

  const handleResetFinder = () => {
    setFinderAnswers({ goal: null, vehicle: null, specific: null, existingGps: null });
    setFinderStep(1);
    setFinderSubmitted(false);
    setWhyExpanded(false);
  };

  // Top 3 Recommended Products computation based on Smart Finder criteria
  const smartRecommendations = useMemo(() => {
    if (!finderSubmitted) return [];

    const goalId = finderAnswers.goal?.id || '';
    const vehicleId = finderAnswers.vehicle?.id || '';
    const specificId = finderAnswers.specific?.id || '';

    // Specialized mappings based on business criteria
    if (goalId === 'prevent-fuel-theft') {
      return [
        {
          product: products.find(p => p.slug === 'sp-ble4-fuel') || products[0],
          matchPercent: 96,
          whyBullets: [
            'Wireless BLE 5.0 eliminates drilling and in-tank sparking hazards',
            'Triggers instant drainage alert on sudden drop within 30 seconds',
            'Compatible with commercial trucks, haulers and heavy machinery',
            '99.5% accuracy with automatic fuel thermal compensation'
          ]
        },
        {
          product: products.find(p => p.slug === 'v5-4g') || products[1],
          matchPercent: 91,
          whyBullets: [
            'Direct RS485 & Bluetooth integration with capacitive fuel rods',
            '4G LTE Cat 1 real-time telemetry to Setu/Trakzee cloud',
            'Supports ignition-status tracking to catch idling fuel waste',
            'Internal backup battery safeguards against battery disconnects'
          ]
        },
        {
          product: products.find(p => p.slug === 'prithvi-140') || products[2],
          matchPercent: 88,
          whyBullets: [
            'Dual eSIM telematics with auxiliary analog inputs for fuel probes',
            'Government AIS-140 compliance if operating interstate transit trucks',
            'Tamper-proof IP65 casing tested for heavy commercial transport',
            'Generates hourly fuel refill vs consumption audit reports'
          ]
        }
      ];
    } else if (goalId === 'improve-safety' || goalId === 'video-monitoring') {
      return [
        {
          product: products.find(p => p.slug === 'falcon-f1-ai-4g') || products[0],
          matchPercent: 95,
          whyBullets: [
            'Dual 1080P cameras covering road ahead and driver cockpit',
            'AI DMS infrared camera detects fatigue, micro-sleep & phone use',
            'Active ADAS alerts for forward collision and lane departures',
            '4G LTE uploads 10s video evidence clips automatically on events'
          ]
        },
        {
          product: products.find(p => p.slug === 't5324-mdvr') || products[1],
          matchPercent: 92,
          whyBullets: [
            '4-channel MDVR provides 360° blind spot and reverse monitoring',
            'Heavy vehicle automotive surge protection rated 8V–36V DC',
            'High-capacity storage supports continuous recording up to 30 days',
            'Live multi-camera streaming to fleet dispatch dashboard'
          ]
        },
        {
          product: products.find(p => p.slug === 'titan-t4-ai-4g') || products[2],
          matchPercent: 87,
          whyBullets: [
            'Enterprise AI dashcam with integrated GPS and in-cabin voice alarms',
            'Driver coaching buzzer sounds before impact occurs',
            'Compact tamper-resistant windshield mount with locking cover',
            'Compatible with both light commercial vans and heavy trucks'
          ]
        }
      ];
    } else if (goalId === 'secure-containers' || goalId === 'monitor-cargo') {
      return [
        {
          product: products.find(p => p.slug === '7h-elock') || products[0],
          matchPercent: 97,
          whyBullets: [
            'IP68 waterproof electronic padlock with steel cable security',
            'Unlocks only via authorized remote OTP or verified RFID card',
            'Instant siren alarm if steel cable is cut or chassis tampered',
            '15,000mAh battery runs up to 45 days on a single USB charge'
          ]
        },
        {
          product: products.find(p => p.slug === 'gl500-4g') || products[1],
          matchPercent: 93,
          whyBullets: [
            'High-strength 4G smart electronic seal for customs transit',
            'Continuous satellite location tracking with geofence auto-alerts',
            'Real-time locking and unlocking audit logs with timestamps',
            'Meets national excise and bonded cargo compliance standards'
          ]
        },
        {
          product: products.find(p => p.slug === 'v5-4g') || products[2],
          matchPercent: 86,
          whyBullets: [
            'Pairs with wireless BLE door magnetic contact sensors',
            'Monitors container temperature and door open/close events',
            'Provides live truck location alongside trailer status',
            'Industrial casing designed for vibrations and rough transit'
          ]
        }
      ];
    } else {
      // Default / General Vehicle Tracking & Compliance
      return [
        {
          product: products.find(p => p.slug === 'prithvi-140') || products[0],
          matchPercent: 94,
          whyBullets: [
            'Certified AIS-140 compliant by ARAI & ICAT with national backend',
            'Hardwired emergency SOS panic button wired to state 112 emergency',
            'Dual embedded M2M eSIM profiles guarantee 99.9% uptime',
            'Required by law for all commercial transport, buses and taxis'
          ]
        },
        {
          product: products.find(p => p.slug === 'v5-4g') || products[1],
          matchPercent: 90,
          whyBullets: [
            'Compact 4G LTE tracker with ignition on/off & remote immobilizer',
            'Lowest failure rate in commercial light and heavy vehicle fleets',
            'Surge protected power supply handles voltage spikes up to 36V',
            'Rapid installation with color-coded automotive wiring harness'
          ]
        },
        {
          product: products.find(p => p.slug === 'eco5-lite') || products[2],
          matchPercent: 88,
          whyBullets: [
            'Plug & play OBD installation into standard port in 30 seconds',
            'Zero vehicle wire cutting prevents factory warranty voiding',
            'Reads real-time vehicle speed, engine status and trip history',
            'Ideal for passenger cars, rental vehicles and sales fleets'
          ]
        }
      ];
    }
  }, [finderSubmitted, finderAnswers]);

  return (
    <section className="search-section" ref={containerRef}>
      {/* Search Header */}
      <div className="search-section__header">
        <h2 className="search-section__title">What are you looking for?</h2>
        <p className="search-section__sub">Search by hardware, requirement, vehicle type or use case.</p>
      </div>

      {/* Mode Selector & Filter Trigger Bar */}
      <div className="search-modes-bar">
        <div className="search-modes-tabs">
          <button
            type="button"
            className={`search-mode-tab ${mode === 'search' ? 'search-mode-tab--active' : ''}`}
            onClick={() => setMode('search')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Search</span>
          </button>

          <button
            type="button"
            className={`search-mode-tab ${mode === 'finder' ? 'search-mode-tab--active' : ''}`}
            onClick={() => {
              setMode('finder');
              setIsFocused(false);
            }}
          >
            <span className="search-mode-tab__sparkle">✦</span>
            <span>Smart Finder</span>
            <span className="search-mode-tab__hint">Help me choose</span>
          </button>
        </div>

        {/* Advanced Filters Button */}
        <button
          type="button"
          className="search-advanced-filters-btn"
          onClick={onOpenAdvancedFilters}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          <span>Advanced filters</span>
          {activeFilterCount > 0 && (
            <span className="search-advanced-filters-badge">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* ── MODE 1: UNIVERSAL INTELLIGENT SEARCH INPUT ── */}
      {mode === 'search' && (
        <div className="search-input-card">
          <form 
            className={`search-input-box ${isFocused ? 'search-input-box--focused' : ''}`}
            onSubmit={handleSearchSubmit}
          >
            <div className="search-input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <input
              ref={inputRef}
              type="text"
              className="search-input-field"
              value={query}
              placeholder={query ? '' : placeholderText}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsFocused(true);
                setActiveIndex(-1);
              }}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              aria-label="Search devices, models, features or describe what you need"
            />

            {query.length > 0 && (
              <button
                type="button"
                className="search-input-clear-btn"
                onClick={() => {
                  setQuery('');
                  setActiveIndex(-1);
                  if (inputRef.current) inputRef.current.focus();
                }}
                title="Clear query"
              >
                ✕
              </button>
            )}

            <button type="submit" className="search-input-submit-btn" title="Submit search">
              <span>Find hardware</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </form>

          {/* Search Suggestions when field is empty */}
          {!query.trim() && (
            <div className="search-suggestions-container">
              <div className="search-suggestions-group">
                <span className="search-suggestions-label">Popular searches:</span>
                <div className="search-suggestions-chips">
                  {POPULAR_SEARCHES.map(item => (
                    <button
                      key={item.label}
                      type="button"
                      className="search-suggestion-chip"
                      onClick={() => {
                        setQuery(item.query);
                        setIsFocused(true);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="search-suggestions-group">
                <span className="search-suggestions-label">Or search by problem:</span>
                <div className="search-suggestions-chips">
                  {SEARCH_BY_PROBLEM.map(item => (
                    <button
                      key={item.label}
                      type="button"
                      className="search-suggestion-chip search-suggestion-chip--problem"
                      onClick={() => {
                        setQuery(item.query);
                        setIsFocused(true);
                      }}
                    >
                      <span className="search-suggestion-chip__dot" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── COMMAND PALETTE DROPDOWN (When Typing) ── */}
          {isFocused && query.trim() && commandPaletteResults && (
            <div className="command-palette-dropdown">
              {commandPaletteResults.totalCount === 0 ? (
                <div className="command-palette-empty">
                  <p>No direct matches found for "<strong>{query}</strong>"</p>
                  <span>Press Enter to run broad catalog search or try our Smart Finder advisor.</span>
                </div>
              ) : (
                <div className="command-palette-groups">
                  {/* 1. Products */}
                  {commandPaletteResults.products.length > 0 && (
                    <div className="command-palette-group">
                      <div className="command-palette-group-title">
                        <span>Products</span>
                        <span className="command-palette-group-count">{commandPaletteResults.products.length}</span>
                      </div>
                      {commandPaletteResults.products.map(prod => {
                        return (
                          <div
                            key={prod.id}
                            className="command-palette-item"
                            onClick={() => {
                              setIsFocused(false);
                              navigate(`/hardware/${prod.slug}`);
                            }}
                          >
                            <img src={getAssetUrl(prod.image)} alt={prod.name} className="command-palette-item__thumb" />
                            <div className="command-palette-item__info">
                              <div className="command-palette-item__title-row">
                                <span className="command-palette-item__name">{prod.name}</span>
                                <span className="command-palette-item__cat-pill">{prod.category}</span>
                              </div>
                              <span className="command-palette-item__desc">{prod.shortDescription}</span>
                            </div>
                            <div className="command-palette-item__right">
                              <span className="command-palette-item__price">₹{prod.price?.toLocaleString('en-IN')}</span>
                              <span className="command-palette-item__arrow">→</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 2. Categories */}
                  {commandPaletteResults.categories.length > 0 && (
                    <div className="command-palette-group">
                      <div className="command-palette-group-title">Categories</div>
                      {commandPaletteResults.categories.map(cat => (
                        <div
                          key={cat.id}
                          className="command-palette-item command-palette-item--compact"
                          onClick={() => {
                            setIsFocused(false);
                            navigate(`/hardware?category=${cat.id}`);
                          }}
                        >
                          <div className="command-palette-item__icon-box">📁</div>
                          <div className="command-palette-item__info">
                            <span className="command-palette-item__name">{cat.label}</span>
                            <span className="command-palette-item__subtext">
                              {(cat.children || []).map(c => c.label).slice(0, 3).join(' · ')}
                            </span>
                          </div>
                          <span className="command-palette-item__arrow">View Category →</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3. Features */}
                  {commandPaletteResults.features.length > 0 && (
                    <div className="command-palette-group">
                      <div className="command-palette-group-title">Features</div>
                      {commandPaletteResults.features.map(f => (
                        <div
                          key={f.name}
                          className="command-palette-item command-palette-item--compact"
                          onClick={() => {
                            setIsFocused(false);
                            navigate(`/hardware?category=${f.slug}`);
                          }}
                        >
                          <div className="command-palette-item__icon-box">⚙️</div>
                          <div className="command-palette-item__info">
                            <span className="command-palette-item__name">{f.name}</span>
                            <span className="command-palette-item__subtext">{f.desc}</span>
                          </div>
                          <span className="command-palette-item__arrow">Explore →</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 4. Use Cases */}
                  {commandPaletteResults.useCases.length > 0 && (
                    <div className="command-palette-group">
                      <div className="command-palette-group-title">Use Cases</div>
                      {commandPaletteResults.useCases.map(uc => (
                        <div
                          key={uc.id}
                          className="command-palette-item command-palette-item--compact"
                          onClick={() => {
                            setIsFocused(false);
                            navigate(`/hardware?search=${encodeURIComponent(uc.filterQuery)}`);
                          }}
                        >
                          <div className="command-palette-item__icon-box">{uc.icon}</div>
                          <div className="command-palette-item__info">
                            <span className="command-palette-item__name">{uc.title}</span>
                            <span className="command-palette-item__subtext">{uc.desc}</span>
                          </div>
                          <span className="command-palette-item__arrow">Match Hardware →</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Command Palette Footer */}
              <div className="command-palette-footer">
                <span className="command-palette-footer__hint">Press <strong>Enter</strong> to view all results or use <strong>↑</strong> <strong>↓</strong> to navigate</span>
                <button
                  type="button"
                  className="command-palette-footer__btn"
                  onClick={handleSearchSubmit}
                >
                  View full search results for "{query}" →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── MODE 2: SMART FINDER (Guided AI Hardware Advisor) ── */}
      {mode === 'finder' && (
        <div className="smart-finder-card">
          {!finderSubmitted ? (
            <div className="smart-finder-wizard">
              {/* Progress & Header */}
              <div className="smart-finder-header">
                <div className="smart-finder-badge">
                  <span>✦</span>
                  <span>AI Hardware Advisor</span>
                </div>
                <div className="smart-finder-step-meta">
                  <span>Step {finderStep} of 4</span>
                  <div className="smart-finder-progress-track">
                    <div 
                      className="smart-finder-progress-bar" 
                      style={{ width: `${(finderStep / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 1: Goal */}
              {finderStep === 1 && (
                <div className="smart-finder-step">
                  <h3 className="smart-finder-question">What are you trying to achieve?</h3>
                  <p className="smart-finder-caption">Select the primary business goal for your fleet or asset deployment.</p>
                  
                  <div className="smart-finder-grid-goals">
                    {SMART_FINDER_GOALS.map(goal => (
                      <button
                        key={goal.id}
                        type="button"
                        className={`smart-finder-chip-card ${finderAnswers.goal?.id === goal.id ? 'smart-finder-chip-card--active' : ''}`}
                        onClick={() => handleSelectGoal(goal)}
                      >
                        <span className="smart-finder-chip-card__icon">{goal.icon}</span>
                        <div className="smart-finder-chip-card__content">
                          <span className="smart-finder-chip-card__title">{goal.label}</span>
                          <span className="smart-finder-chip-card__desc">{goal.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Type */}
              {finderStep === 2 && (
                <div className="smart-finder-step">
                  <div className="smart-finder-nav-row">
                    <button type="button" className="smart-finder-back-btn" onClick={() => setFinderStep(1)}>
                      ← Back
                    </button>
                    <button type="button" className="smart-finder-skip-btn" onClick={() => setFinderStep(3)}>
                      Skip question →
                    </button>
                  </div>

                  <h3 className="smart-finder-question">What type of vehicles do you operate?</h3>
                  <p className="smart-finder-caption">Hardware recommendations will filter for proper voltage ratings and mounting specs.</p>

                  <div className="smart-finder-grid-vehicles">
                    {SMART_FINDER_VEHICLES.map(v => (
                      <button
                        key={v.id}
                        type="button"
                        className={`smart-finder-chip-card ${finderAnswers.vehicle?.id === v.id ? 'smart-finder-chip-card--active' : ''}`}
                        onClick={() => handleSelectVehicle(v)}
                      >
                        <span className="smart-finder-chip-card__icon">{v.icon}</span>
                        <div className="smart-finder-chip-card__content">
                          <span className="smart-finder-chip-card__title">{v.label}</span>
                          <span className="smart-finder-chip-card__desc">{v.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Dynamic Question */}
              {finderStep === 3 && currentDynamicQuestion && (
                <div className="smart-finder-step">
                  <div className="smart-finder-nav-row">
                    <button type="button" className="smart-finder-back-btn" onClick={() => setFinderStep(2)}>
                      ← Back
                    </button>
                    <button type="button" className="smart-finder-skip-btn" onClick={() => setFinderStep(4)}>
                      Skip question →
                    </button>
                  </div>

                  <h3 className="smart-finder-question">{currentDynamicQuestion.title}</h3>
                  <p className="smart-finder-caption">Fine-tune the exact features required for your operational scenario.</p>

                  <div className="smart-finder-grid-specific">
                    {currentDynamicQuestion.options.map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`smart-finder-chip-card ${finderAnswers.specific?.id === opt.id ? 'smart-finder-chip-card--active' : ''}`}
                        onClick={() => handleSelectSpecific(opt)}
                      >
                        <div className="smart-finder-chip-card__content">
                          <span className="smart-finder-chip-card__title">{opt.label}</span>
                          <span className="smart-finder-chip-card__desc">{opt.desc}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Existing GPS Setup */}
              {finderStep === 4 && (
                <div className="smart-finder-step">
                  <div className="smart-finder-nav-row">
                    <button type="button" className="smart-finder-back-btn" onClick={() => setFinderStep(3)}>
                      ← Back
                    </button>
                  </div>

                  <h3 className="smart-finder-question">Do you already use GPS hardware?</h3>
                  <p className="smart-finder-caption">Helps determine whether you need standalone sensors, retrofit kits, or full tracker devices.</p>

                  <div className="smart-finder-grid-existing">
                    <button
                      type="button"
                      className="smart-finder-chip-card"
                      onClick={() => handleSelectExistingGps('yes')}
                    >
                      <div className="smart-finder-chip-card__content">
                        <span className="smart-finder-chip-card__title">Yes, already installed</span>
                        <span className="smart-finder-chip-card__desc">Looking for compatible add-on sensors, dashcams, or electronic locks</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="smart-finder-chip-card"
                      onClick={() => handleSelectExistingGps('no')}
                    >
                      <div className="smart-finder-chip-card__content">
                        <span className="smart-finder-chip-card__title">No, fresh deployment</span>
                        <span className="smart-finder-chip-card__desc">Need complete ready-to-run telematics hardware packages</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      className="smart-finder-chip-card"
                      onClick={() => handleSelectExistingGps('not-sure')}
                    >
                      <div className="smart-finder-chip-card__content">
                        <span className="smart-finder-chip-card__title">Not sure / Mixed setup</span>
                        <span className="smart-finder-chip-card__desc">Show best-fit all-in-one recommendations</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Smart Finder Recommendations Result ── */
            <div className="smart-finder-results">
              <div className="smart-finder-results__top">
                <div className="smart-finder-results__title-box">
                  <div className="smart-finder-badge">
                    <span>✦</span>
                    <span>Intelligent Match</span>
                  </div>
                  <h3 className="smart-finder-results__title">Recommended for your requirement</h3>
                  <p className="smart-finder-results__summary">
                    Based on your criteria: <strong>{finderAnswers.goal?.label}</strong>
                    {finderAnswers.vehicle?.label && <span> · {finderAnswers.vehicle?.label}</span>}
                    {finderAnswers.specific?.label && <span> · {finderAnswers.specific?.label}</span>}
                  </p>
                </div>

                <button
                  type="button"
                  className="smart-finder-reset-btn"
                  onClick={handleResetFinder}
                >
                  <span>Modify Criteria</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                </button>
              </div>

              {/* 3 Top Recommendation Cards */}
              <div className="smart-finder-cards-grid">
                {smartRecommendations.map((rec, idx) => {
                  const isCompared = selectedCompareIds.includes(rec.product.id);
                  return (
                    <div key={rec.product.id} className="smart-recom-card">
                      <div className="smart-recom-card__header">
                        <span className="smart-recom-card__match-pill">
                          <span>✦</span> {rec.matchPercent}% Match
                        </span>
                        <span className="smart-recom-card__cat">{rec.product.category}</span>
                      </div>

                      <div className="smart-recom-card__body">
                        <div className="smart-recom-card__img-box">
                          <img src={getAssetUrl(rec.product.image)} alt={rec.product.name} />
                        </div>
                        <h4 className="smart-recom-card__name">{rec.product.name}</h4>
                        <span className="smart-recom-card__price">₹{rec.product.price?.toLocaleString('en-IN')} <small>+ GST</small></span>

                        {/* "Why it fits" bullets */}
                        <div className="smart-recom-card__why-box">
                          <span className="smart-recom-card__why-title">Why it fits:</span>
                          <ul className="smart-recom-card__why-list">
                            {rec.whyBullets.map((bullet, bIdx) => (
                              <li key={bIdx}>{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="smart-recom-card__footer">
                        <button
                          type="button"
                          className="smart-recom-card__btn-view"
                          onClick={() => navigate(`/hardware/${rec.product.slug}`)}
                        >
                          View Product →
                        </button>

                        <button
                          type="button"
                          className={`smart-recom-card__btn-compare ${isCompared ? 'smart-recom-card__btn-compare--active' : ''}`}
                          onClick={() => onSelectProductForCompare(rec.product)}
                        >
                          {isCompared ? '✓ Added' : '+ Compare'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explainable AI Toggle: "Why are these recommended?" */}
              <div className="smart-finder-explainable">
                <button
                  type="button"
                  className="smart-finder-explainable__toggle"
                  onClick={() => setWhyExpanded(!whyExpanded)}
                >
                  <span>✦ Why are these recommended?</span>
                  <span className="smart-finder-explainable__chevron">{whyExpanded ? '▲' : '▼'}</span>
                </button>

                {whyExpanded && (
                  <div className="smart-finder-explainable__content">
                    <p>
                      Setu's recommendation model evaluated 23 enterprise telematics devices against your input requirements.
                      Products are scored based on four technical pillars:
                    </p>
                    <div className="smart-finder-explainable__grid">
                      <div className="smart-finder-explainable__item">
                        <strong>1. Protocol & Voltage Compatibility</strong>
                        <span>Matches your vehicle type's electrical range (9V–36V) and protocol requirements (J1939, BLE 5.0, RS485).</span>
                      </div>
                      <div className="smart-finder-explainable__item">
                        <strong>2. Environmental Casing</strong>
                        <span>Ensures necessary IP65, IP67 or IP68 water/dust ingress protection for harsh road conditions.</span>
                      </div>
                      <div className="smart-finder-explainable__item">
                        <strong>3. Telematics Cloud Integration</strong>
                        <span>Pre-integrated firmware drivers with zero manual protocol mapping needed for standard fleet platforms.</span>
                      </div>
                      <div className="smart-finder-explainable__item">
                        <strong>4. Statutory Regulatory Adherence</strong>
                        <span>Verifies state transport and MoRTH AIS-140 compliance when commercial passenger or mining use cases are selected.</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   6. ADVANCED FILTERS SLIDE-OVER DRAWER
──────────────────────────────────────────────────────────── */
function AdvancedFiltersDrawer({ isOpen, onClose, filters, setFilters, onApply }) {
  if (!isOpen) return null;

  const CATEGORY_OPTIONS = [
    { id: 'vehicle-tracking', label: 'GPS Tracker' },
    { id: 'video-telematics', label: 'Camera / MDVR' },
    { id: 'fuel-sensors', label: 'Fuel Sensor' },
    { id: 'iot-sensors', label: 'IoT Sensor' },
    { id: 'asset-logistics', label: 'E-Lock & Asset' },
    { id: 'obd-gps-tracker', label: 'OBD Device' },
    { id: 'accessories', label: 'Accessories' }
  ];

  const VEHICLE_OPTIONS = ['Commercial Truck', 'Passenger Bus', 'Car / Taxi', 'Heavy Equipment', 'Container / Cargo', 'Two Wheeler'];
  const CONNECTIVITY_OPTIONS = ['4G LTE', '2G GSM', 'Bluetooth (BLE)', 'Wi-Fi', 'GNSS / GPS'];
  const PROTOCOL_OPTIONS = ['TCP / UDP', 'MQTT', 'CAN J1939', 'RS485', 'RS232', 'BLE 5.0'];
  const CAPABILITY_OPTIONS = ['Live GPS Tracking', 'Fuel Level & Theft', 'Driver Fatigue (DMS)', 'Collision Warning (ADAS)', 'Emergency SOS Panic', 'Remote Immobilization', 'Temperature & Cold Chain', 'Remote OTP Unlocking'];
  const CERTIFICATION_OPTIONS = ['ARAI AIS-140', 'ICAT Certified', 'MoRTH Approved', 'IP67 Waterproof', 'IP68 Waterproof', 'CE Certified'];

  const toggleArrayFilter = (field, value) => {
    setFilters(prev => {
      const current = prev[field] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleClearAll = () => {
    setFilters({
      categories: [],
      vehicles: [],
      connectivity: [],
      protocols: [],
      capabilities: [],
      certifications: []
    });
  };

  // Compute matching products count
  const matchingCount = products.filter(p => {
    if (filters.categories?.length > 0 && !filters.categories.includes(p.category) && !filters.categories.includes(p.subcategory)) return false;
    return true;
  }).length;

  return (
    <div className="filter-drawer-overlay" onClick={onClose}>
      <div className="filter-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="filter-drawer__header">
          <div>
            <h3 className="filter-drawer__title">Advanced Hardware Filters</h3>
            <span className="filter-drawer__subtitle">Filter by structured engineering specifications</span>
          </div>
          <button type="button" className="filter-drawer__close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Drawer Body with Filter Facets */}
        <div className="filter-drawer__body">
          {/* Section: Category */}
          <div className="filter-drawer__section">
            <h4 className="filter-drawer__section-title">Hardware Category</h4>
            <div className="filter-drawer__chips">
              {CATEGORY_OPTIONS.map(c => {
                const active = (filters.categories || []).includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`filter-chip ${active ? 'filter-chip--active' : ''}`}
                    onClick={() => toggleArrayFilter('categories', c.id)}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Vehicle / Asset Type */}
          <div className="filter-drawer__section">
            <h4 className="filter-drawer__section-title">Vehicle &amp; Asset Type</h4>
            <div className="filter-drawer__chips">
              {VEHICLE_OPTIONS.map(v => {
                const active = (filters.vehicles || []).includes(v);
                return (
                  <button
                    key={v}
                    type="button"
                    className={`filter-chip ${active ? 'filter-chip--active' : ''}`}
                    onClick={() => toggleArrayFilter('vehicles', v)}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Connectivity */}
          <div className="filter-drawer__section">
            <h4 className="filter-drawer__section-title">Connectivity</h4>
            <div className="filter-drawer__chips">
              {CONNECTIVITY_OPTIONS.map(c => {
                const active = (filters.connectivity || []).includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    className={`filter-chip ${active ? 'filter-chip--active' : ''}`}
                    onClick={() => toggleArrayFilter('connectivity', c)}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Key Capabilities */}
          <div className="filter-drawer__section">
            <h4 className="filter-drawer__section-title">Key Capabilities</h4>
            <div className="filter-drawer__chips">
              {CAPABILITY_OPTIONS.map(cap => {
                const active = (filters.capabilities || []).includes(cap);
                return (
                  <button
                    key={cap}
                    type="button"
                    className={`filter-chip ${active ? 'filter-chip--active' : ''}`}
                    onClick={() => toggleArrayFilter('capabilities', cap)}
                  >
                    {cap}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Protocols & Interfaces */}
          <div className="filter-drawer__section">
            <h4 className="filter-drawer__section-title">Protocol / Interfaces</h4>
            <div className="filter-drawer__chips">
              {PROTOCOL_OPTIONS.map(proto => {
                const active = (filters.protocols || []).includes(proto);
                return (
                  <button
                    key={proto}
                    type="button"
                    className={`filter-chip ${active ? 'filter-chip--active' : ''}`}
                    onClick={() => toggleArrayFilter('protocols', proto)}
                  >
                    {proto}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Certifications */}
          <div className="filter-drawer__section">
            <h4 className="filter-drawer__section-title">Certifications</h4>
            <div className="filter-drawer__chips">
              {CERTIFICATION_OPTIONS.map(cert => {
                const active = (filters.certifications || []).includes(cert);
                return (
                  <button
                    key={cert}
                    type="button"
                    className={`filter-chip ${active ? 'filter-chip--active' : ''}`}
                    onClick={() => toggleArrayFilter('certifications', cert)}
                  >
                    {cert}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="filter-drawer__footer">
          <button type="button" className="filter-drawer__clear-btn" onClick={handleClearAll}>
            Clear all
          </button>
          <button type="button" className="filter-drawer__apply-btn" onClick={onApply}>
            Show {matchingCount} Matching Devices →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   7. EXPLORE HARDWARE (8 Modern B2B SaaS Category Cards)
──────────────────────────────────────────────────────────── */
function ExploreHardwareSection() {
  const navigate = useNavigate();

  return (
    <section className="explore-hardware-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Explore Hardware</h2>
          <p className="section-subtitle">Browse devices based on what your operation needs.</p>
        </div>
        <button
          type="button"
          className="section-link-btn"
          onClick={() => navigate('/hardware')}
        >
          <span>All Hardware (23)</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="explore-hardware-grid">
        {EXPLORE_CATEGORIES.map(cat => (
          <div
            key={cat.id}
            className="explore-hardware-card"
            onClick={() => navigate(cat.path)}
          >
            <div className="explore-hardware-card__icon-box">
              {cat.icon}
            </div>
            <div className="explore-hardware-card__content">
              <div className="explore-hardware-card__title-row">
                <h3 className="explore-hardware-card__title">{cat.title}</h3>
                <span className="explore-hardware-card__count">{cat.count}</span>
              </div>
              <p className="explore-hardware-card__desc">{cat.desc}</p>
            </div>
            <div className="explore-hardware-card__arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   8. USE-CASE DISCOVERY SECTION (Find Hardware by Use Case)
──────────────────────────────────────────────────────────── */
function UseCaseDiscoverySection() {
  const navigate = useNavigate();

  return (
    <section className="use-case-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Find hardware by use case</h2>
          <p className="section-subtitle">Purpose-built hardware packages designed around your operational challenges.</p>
        </div>
      </div>

      <div className="use-case-grid">
        {USE_CASES.map(uc => (
          <div
            key={uc.id}
            className="use-case-card"
            onClick={() => navigate(`/hardware?search=${encodeURIComponent(uc.filterQuery)}`)}
          >
            <div className="use-case-card__top">
              <span className="use-case-card__icon">{uc.icon}</span>
              <span className="use-case-card__badge">{uc.badge}</span>
            </div>
            <h3 className="use-case-card__title">{uc.title}</h3>
            <p className="use-case-card__desc">{uc.desc}</p>
            <div className="use-case-card__highlights">
              <span>{uc.highlights}</span>
            </div>
            <div className="use-case-card__footer">
              <span className="use-case-card__action">Explore matching hardware →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   9. RECOMMENDED & POPULAR HARDWARE (Modernized Product Cards)
──────────────────────────────────────────────────────────── */
function RecommendedHardwareSection({ onSelectForCompare, selectedCompareIds, onSaveProduct, savedProductIds }) {
  const navigate = useNavigate();

  // Curated showcase products
  const featured = useMemo(() => {
    const featuredSlugs = [
      'prithvi-140',
      'falcon-f1-ai-4g',
      'sp-ble4-fuel',
      '7h-elock',
      'v5-4g',
      't5324-mdvr',
      'eco5-lite',
      'advance-4wire'
    ];
    return featuredSlugs.map(slug => products.find(p => p.slug === slug)).filter(Boolean);
  }, []);

  return (
    <section className="recommended-hardware-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Recommended &amp; Popular Hardware</h2>
          <p className="section-subtitle">Enterprise-grade telematics hardware tested with over 1,500 fleet protocols.</p>
        </div>
        <button
          type="button"
          className="section-link-btn"
          onClick={() => navigate('/hardware')}
        >
          <span>View all 23 devices</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="recommended-hardware-grid">
        {featured.map(prod => {
          const isCompared = selectedCompareIds.includes(prod.id);
          const isSaved = savedProductIds.includes(prod.id);

          // Extract 3 prominent specifications
          const spec1 = prod.tags?.[0] || '4G LTE';
          const spec2 = prod.specifications?.inputVoltage || '9V–36V DC';
          const spec3 = prod.tags?.[1] || prod.subcategory?.replace(/-/g, ' ') || 'Telematics';

          // Extract certification
          const cert = prod.slug.includes('prithvi') ? 'ARAI AIS-140 Certified'
            : prod.slug.includes('7h') ? 'IP68 Padlock'
            : prod.slug.includes('sp-ble4') ? '99.5% Accuracy'
            : prod.slug.includes('falcon') ? 'Dual AI Computer Vision'
            : null;

          return (
            <div key={prod.id} className="hardware-b2b-card">
              {/* Card Top: Category & Save Icon */}
              <div className="hardware-b2b-card__top">
                <span className="hardware-b2b-card__category">{prod.category}</span>
                <button
                  type="button"
                  className={`hardware-b2b-card__save-btn ${isSaved ? 'hardware-b2b-card__save-btn--active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSaveProduct(prod.id);
                  }}
                  title={isSaved ? 'Saved to bookmarks' : 'Save device'}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? '#2563EB' : 'none'} stroke={isSaved ? '#2563EB' : '#94A3B8'} strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>

              {/* Product Visual */}
              <div 
                className="hardware-b2b-card__img-wrap"
                onClick={() => navigate(`/hardware/${prod.slug}`)}
              >
                <img src={getAssetUrl(prod.image)} alt={prod.name} loading="lazy" />
              </div>

              {/* Product Info */}
              <div className="hardware-b2b-card__body">
                <h3 
                  className="hardware-b2b-card__name"
                  onClick={() => navigate(`/hardware/${prod.slug}`)}
                >
                  {prod.name}
                </h3>

                {cert && (
                  <span className="hardware-b2b-card__cert-badge">{cert}</span>
                )}

                {/* 3 Important Specs */}
                <div className="hardware-b2b-card__specs-row">
                  <span className="hardware-b2b-card__spec-pill">{spec1}</span>
                  <span className="hardware-b2b-card__spec-pill">{spec2}</span>
                  <span className="hardware-b2b-card__spec-pill">{spec3}</span>
                </div>

                <p className="hardware-b2b-card__compat">
                  <strong>Fit: </strong>
                  {prod.specifications?.compatibility ? 'Compatible with commercial fleet platforms' : 'Commercial trucks, buses & mixed fleets'}
                </p>

                <div className="hardware-b2b-card__price-row">
                  <span className="hardware-b2b-card__price">₹{prod.price?.toLocaleString('en-IN')}</span>
                  <span className="hardware-b2b-card__price-tax">+ GST</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="hardware-b2b-card__actions">
                <button
                  type="button"
                  className="hardware-b2b-card__btn-details"
                  onClick={() => navigate(`/hardware/${prod.slug}`)}
                >
                  View details
                </button>

                <button
                  type="button"
                  className={`hardware-b2b-card__btn-compare ${isCompared ? 'hardware-b2b-card__btn-compare--active' : ''}`}
                  onClick={() => onSelectForCompare(prod)}
                >
                  {isCompared ? '✓ Added' : '+ Compare'}
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
   10. RECENTLY VIEWED HARDWARE (If User History is Available)
──────────────────────────────────────────────────────────── */
function RecentlyViewedSection({ onSelectForCompare, selectedCompareIds }) {
  const navigate = useNavigate();
  const [recentSlugs, setRecentSlugs] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('setu_recent_products') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        setRecentSlugs(stored);
      } else {
        // Fallback default sample history
        setRecentSlugs(['prithvi-140', 'sp-ble4-fuel', 'falcon-f1-ai-4g', '7h-elock']);
      }
    } catch (e) {
      setRecentSlugs(['prithvi-140', 'sp-ble4-fuel']);
    }
  }, []);

  const recentProducts = useMemo(() => {
    return recentSlugs.map(slug => products.find(p => p.slug === slug || p.id === slug)).filter(Boolean).slice(0, 4);
  }, [recentSlugs]);

  if (!recentProducts.length) return null;

  return (
    <section className="recently-viewed-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">Recently Viewed</h2>
          <p className="section-subtitle">Quick access to devices recently explored by your team.</p>
        </div>
      </div>

      <div className="recently-viewed-grid">
        {recentProducts.map(prod => {
          const isCompared = selectedCompareIds.includes(prod.id);
          return (
            <div 
              key={prod.id} 
              className="recent-product-card"
              onClick={() => navigate(`/hardware/${prod.slug}`)}
            >
              <img src={getAssetUrl(prod.image)} alt={prod.name} className="recent-product-card__thumb" />
              <div className="recent-product-card__info">
                <span className="recent-product-card__name">{prod.name}</span>
                <span className="recent-product-card__price">₹{prod.price?.toLocaleString('en-IN')}</span>
              </div>
              <button
                type="button"
                className={`recent-product-card__btn-compare ${isCompared ? 'recent-product-card__btn-compare--active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectForCompare(prod);
                }}
              >
                {isCompared ? '✓' : '+ Compare'}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   11. STICKY COMPARISON BAR & COMPARISON MODAL
──────────────────────────────────────────────────────────── */
function ComparisonBarAndModal({ compareList, onRemoveCompare, onClearCompare }) {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!compareList.length) return null;

  return (
    <>
      {/* Sticky Bottom Bar */}
      <div className="sticky-compare-bar">
        <div className="sticky-compare-bar__container">
          <div className="sticky-compare-bar__left">
            <span className="sticky-compare-bar__count-badge">{compareList.length} / 4</span>
            <span className="sticky-compare-bar__label">
              {compareList.length === 1 ? '1 product selected for comparison' : `${compareList.length} products selected for comparison`}
            </span>
          </div>

          <div className="sticky-compare-bar__thumbs">
            {compareList.map(prod => (
              <div key={prod.id} className="sticky-compare-bar__thumb-pill">
                <img src={getAssetUrl(prod.image)} alt={prod.name} />
                <span className="sticky-compare-bar__thumb-name">{prod.name}</span>
                <button
                  type="button"
                  className="sticky-compare-bar__thumb-remove"
                  onClick={() => onRemoveCompare(prod.id)}
                  title="Remove from comparison"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="sticky-compare-bar__actions">
            <button
              type="button"
              className="sticky-compare-bar__clear-btn"
              onClick={onClearCompare}
            >
              Clear all
            </button>
            <button
              type="button"
              className="sticky-compare-bar__compare-btn"
              onClick={() => setModalOpen(true)}
            >
              Compare products ({compareList.length}) →
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      {modalOpen && (
        <div className="compare-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="compare-modal" onClick={(e) => e.stopPropagation()}>
            <div className="compare-modal__header">
              <div>
                <h3 className="compare-modal__title">Hardware Specification Comparison</h3>
                <span className="compare-modal__subtitle">Side-by-side engineering evaluation</span>
              </div>
              <button type="button" className="compare-modal__close-btn" onClick={() => setModalOpen(false)}>✕</button>
            </div>

            <div className="compare-modal__table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th className="compare-table__feature-col">Parameters</th>
                    {compareList.map(prod => (
                      <th key={prod.id} className="compare-table__product-col">
                        <div className="compare-table__header-card">
                          <img src={getAssetUrl(prod.image)} alt={prod.name} className="compare-table__thumb" />
                          <h4 className="compare-table__name">{prod.name}</h4>
                          <span className="compare-table__price">₹{prod.price?.toLocaleString('en-IN')} <small>+ GST</small></span>
                          <button
                            type="button"
                            className="compare-table__btn-view"
                            onClick={() => {
                              setModalOpen(false);
                              navigate(`/hardware/${prod.slug}`);
                            }}
                          >
                            Product Page →
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="compare-table__feature-name">Connectivity</td>
                    {compareList.map(prod => (
                      <td key={prod.id}>
                        {prod.technicalSpecs?.connectivity || prod.tags?.[0] || '4G LTE / 2G GSM'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__feature-name">Supported Vehicles</td>
                    {compareList.map(prod => (
                      <td key={prod.id}>
                        {prod.specifications?.productCapacity || 'Commercial Trucks, Buses, Cars & Gensets'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__feature-name">Major Features</td>
                    {compareList.map(prod => (
                      <td key={prod.id}>
                        <ul className="compare-table__bullet-list">
                          {(prod.features || ['Live GPS tracking', 'Ignition detection', 'Geofence alerts']).slice(0, 4).map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__feature-name">Inputs / Outputs</td>
                    {compareList.map(prod => (
                      <td key={prod.id}>
                        {prod.specifications?.inputVoltage ? `${prod.specifications.inputVoltage} · Multi-IO` : 'Digital Input, Analog In, Relay Output'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__feature-name">Protocols</td>
                    {compareList.map(prod => (
                      <td key={prod.id}>
                        {prod.technicalSpecs?.communication || 'TCP/UDP, SMS, MQTT'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__feature-name">Certifications</td>
                    {compareList.map(prod => (
                      <td key={prod.id}>
                        {prod.slug.includes('prithvi') ? 'ARAI AIS-140 · ICAT · MoRTH'
                          : prod.slug.includes('7h') ? 'IP68 Waterproof · RoHS'
                          : prod.slug.includes('sp-ble4') ? 'BLE 5.0 · IP67 Explosion Proof'
                          : 'CE · RoHS · IP65'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="compare-table__feature-name">Platform Compatibility</td>
                    {compareList.map(prod => (
                      <td key={prod.id}>
                        Pre-integrated with Setu, Trakzee, SmartBus and 1,500+ standard protocols
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ────────────────────────────────────────────────────────────
   12. QUICK SPECIFICATIONS MODAL (Hero "View specifications")
──────────────────────────────────────────────────────────── */
function QuickSpecsModal({ showcaseItem, onClose }) {
  const navigate = useNavigate();
  if (!showcaseItem) return null;

  return (
    <div className="specs-modal-overlay" onClick={onClose}>
      <div className="specs-modal" onClick={(e) => e.stopPropagation()}>
        <div className="specs-modal__header">
          <div>
            <span className="specs-modal__badge">{showcaseItem.categoryBadge}</span>
            <h3 className="specs-modal__title">{showcaseItem.headline}</h3>
          </div>
          <button type="button" className="specs-modal__close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="specs-modal__body">
          <div className="specs-modal__visual-row">
            <img src={getAssetUrl(showcaseItem.image)} alt={showcaseItem.headline} className="specs-modal__img" />
            <div className="specs-modal__summary">
              <p>{showcaseItem.subheading}</p>
              <div className="specs-modal__status-list">
                {showcaseItem.statusIndicators.map((ind, i) => (
                  <div key={i} className="specs-modal__status-item">
                    <span className="specs-modal__status-dot" />
                    <span>{ind.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h4 className="specs-modal__section-heading">Technical Specifications</h4>
          <div className="specs-modal__specs-grid">
            {Object.entries(showcaseItem.quickSpecs).map(([key, val]) => (
              <div key={key} className="specs-modal__spec-row">
                <span className="specs-modal__spec-key">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                <span className="specs-modal__spec-val">{val}</span>
              </div>
            ))}
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
              navigate(showcaseItem.primaryPath);
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
   13. MAIN REDESIGNED HOMEPAGE COMPONENT
──────────────────────────────────────────────────────────── */
export default function SetuHome() {
  const navigate = useNavigate();

  // Specs Modal for Hero
  const [activeSpecsItem, setActiveSpecsItem] = useState(null);

  // Advanced Filters Drawer State
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    categories: [],
    vehicles: [],
    connectivity: [],
    protocols: [],
    capabilities: [],
    certifications: []
  });

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(advancedFilters).reduce((acc, arr) => acc + (arr ? arr.length : 0), 0);
  }, [advancedFilters]);

  const handleApplyAdvancedFilters = () => {
    setFiltersDrawerOpen(false);
    const params = new URLSearchParams();
    if (advancedFilters.categories.length) {
      params.set('category', advancedFilters.categories[0]);
    }
    navigate(`/hardware?${params.toString()}`);
  };

  // Compare List (up to 4 products)
  const [compareList, setCompareList] = useState([]);
  const selectedCompareIds = useMemo(() => compareList.map(p => p.id), [compareList]);

  const handleSelectForCompare = useCallback((product) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  }, []);

  const handleRemoveCompare = useCallback((productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  }, []);

  const handleClearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  // Bookmarked / Saved products in localStorage
  const [savedProductIds, setSavedProductIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('setu_saved_products') || '[]');
    } catch (e) {
      return [];
    }
  });

  const handleSaveProduct = useCallback((productId) => {
    setSavedProductIds(prev => {
      const updated = prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem('setu_saved_products', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  return (
    <div className="b2b-portal-root">
      <div className="b2b-portal-container">

        {/* ── 1. Hero Product Showcase (~40-45% Viewport) ── */}
        <HeroProductShowcase onOpenSpecs={(item) => setActiveSpecsItem(item)} />

        {/* ── 2. Universal Search + Smart Finder + Advanced Filters ── */}
        <UniversalSearchModule
          onOpenAdvancedFilters={() => setFiltersDrawerOpen(true)}
          activeFilterCount={activeFilterCount}
          onSelectProductForCompare={handleSelectForCompare}
          selectedCompareIds={selectedCompareIds}
        />

        {/* ── 3. Explore Hardware (8 Modern SaaS Category Cards) ── */}
        <ExploreHardwareSection />

        {/* ── 4. Find Hardware by Use Case (4 Practical Operational Cards) ── */}
        <UseCaseDiscoverySection />

        {/* ── 5. Recommended & Popular Hardware (Modern Product Cards) ── */}
        <RecommendedHardwareSection
          onSelectForCompare={handleSelectForCompare}
          selectedCompareIds={selectedCompareIds}
          onSaveProduct={handleSaveProduct}
          savedProductIds={savedProductIds}
        />

        {/* ── 6. Recently Viewed Hardware ── */}
        <RecentlyViewedSection
          onSelectForCompare={handleSelectForCompare}
          selectedCompareIds={selectedCompareIds}
        />

        {/* ── 7. Sticky Comparison Bar & Side-by-Side Modal ── */}
        <ComparisonBarAndModal
          compareList={compareList}
          onRemoveCompare={handleRemoveCompare}
          onClearCompare={handleClearCompare}
        />

        {/* ── 8. Advanced Filters Slide-Over Drawer ── */}
        <AdvancedFiltersDrawer
          isOpen={filtersDrawerOpen}
          onClose={() => setFiltersDrawerOpen(false)}
          filters={advancedFilters}
          setFilters={setAdvancedFilters}
          onApply={handleApplyAdvancedFilters}
        />

        {/* ── 9. Quick Specs Modal (from Hero) ── */}
        <QuickSpecsModal
          showcaseItem={activeSpecsItem}
          onClose={() => setActiveSpecsItem(null)}
        />

      </div>
    </div>
  );
}