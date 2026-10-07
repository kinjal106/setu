import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import solutions from '../../data/solutions.json';
import autopartsData from '../../data/autoparts.json';
import { getAssetUrl } from '../../utils/assetUrl';
import './SetuHome.css';

/* ── Custom Typewriter Hook ── */
function useTypewriter(words, isEnabled = true) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isEnabled || !words.length) return;

    const fullText = words[currentWordIndex];
    let timer;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 45);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 22);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, isEnabled]);

  return currentText;
}

/* ── Stop Words for Natural Language Search ── */
const STOP_WORDS = new Set([
  'find', 'search', 'for', 'the', 'a', 'an', 'in', 'on', 'with', 'and', 'or',
  'device', 'devices', 'hardware', 'tell', 'me', 'about', 'is', 'it', 'to',
  'can', 'i', 'you', 'do', 'does', 'what', 'which', 'how', 'why', 'where', 'are',
  'best', 'good', 'need', 'want', 'show'
]);

/* ── Comprehensive Fleet Knowledge Base for Setu AI Overview ── */
const FLEET_KNOWLEDGE_BASE = [
  {
    id: 'ais140-mandate',
    question: 'Which GPS tracker is government approved & mandatory for commercial vehicles?',
    aliases: [
      'government approved', 'ais 140', 'ais-140', 'rto', 'morth', 'sos button',
      'panic button', 'commercial vehicle mandate', 'mandatory gps', 'arai', 'icat',
      'which gps is mandatory', 'government certified', 'state rto', 'permit', 'rto approved'
    ],
    summary: 'AIS-140 certified GPS trackers (such as Prithvi 140) are legally mandated by MoRTH for all commercial vehicles, buses, taxis, and mining fleets across India.',
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
    aliases: [
      'driver fatigue', 'drowsiness', 'adas', 'dms', 'dashcam', 'collision',
      'sleep', 'eyes closed', 'phone distraction', 'fatigue alerts', 'live video',
      'ai camera', 'prevent accident', 'lane departure', 'camera', 'video'
    ],
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
    aliases: [
      'fuel theft', 'fuel sensor', 'prevent fuel theft', 'diesel theft', 'sudden drop',
      'fuel level', 'ble fuel', 'capacitive fuel', 'ultrasonic fuel', 'mileage fraud',
      'how to stop fuel theft', 'diesel leak', 'fuel monitoring', 'fuel drainage'
    ],
    summary: 'Wireless BLE 5.0 and capacitive fuel level sensors (like SP-BLE4) measure fuel volume with 99.5% accuracy, triggering instant alarms on unauthorized tank cap opening or sudden diesel drainage.',
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
  },
  {
    id: 'plug-and-play-obd',
    question: 'Are there GPS trackers that don’t require wire cutting or technician installation?',
    aliases: [
      'no wire cut', 'plug and play', 'obd', 'easy install', 'magnetic',
      'diy installation', 'wireless gps', 'car tracker without wire', 'portable',
      'battery tracker', 'zero wiring', 'plug & play'
    ],
    summary: 'Yes! OBD-II plug-and-play trackers (such as Eco5 Lite) insert straight into the car OBD diagnostic port in under 10 seconds. For unpowered cargo, heavy-duty magnetic GPS units attach with zero wiring.',
    bullets: [
      'Zero Wire Cutting: Completely preserves OEM vehicle warranty on new cars and electric vehicles.',
      '10-Second Setup: Simply plug into the OBD-II port below the dashboard; power and diagnostics are automatic.',
      'Live Telemetry: Reads speed, engine RPM, odometer, and diagnostic trouble codes (DTC).',
      'Magnetic Alternative: GL500 4G magnetic tracker with up to 3 years battery life for trailers and containers.'
    ],
    recommended: {
      name: 'Eco5 Lite OBD GPS Tracker',
      slug: 'eco5-lite',
      price: '₹1,800 + GST',
      badge: 'Plug & Play OBD',
      image: '/images/hardware/eco5-lite.svg',
      path: '/hardware/eco5-lite'
    },
    followUps: [
      'Where is the OBD port located in my car?',
      'Does an OBD tracker void vehicle manufacturer warranty?',
      'How long does the magnetic tracker battery last?'
    ]
  },
  {
    id: 'cargo-elock',
    question: 'How to secure shipping containers and trucks during high-value transit?',
    aliases: [
      'container lock', 'e-lock', 'elock', 'cargo security', 'tamper alert',
      'customs lock', 'remote unlock', 'otp unlock', 'rope cut', 'padlock',
      'bonded truck', 'lock box', 'container tracker'
    ],
    summary: 'Heavy-duty GPS Smart E-Locks (like 7H E-Lock) provide IP68 waterproof physical padlock protection with steel wire ropes that can only be unlocked via authorized remote OTP or RFID cards.',
    bullets: [
      'Remote OTP Unlock: Command center or authorized driver enters one-time OTP via app or SMS to release lock.',
      'Anti-Tamper & Rope Cut Siren: Instant siren and satellite alarm if the steel cable is cut or chassis opened.',
      'Customs & Bonded Ready: Meets national excise and customs transit bond tracking specifications.',
      'Rechargeable 15,000mAh Battery: Operates up to 45 days on a single USB charge with live location pings.'
    ],
    recommended: {
      name: 'Magnet 7H E-Lock Container Tracker',
      slug: '7h-elock',
      price: '₹6,200 + GST',
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
    id: 'mdvr-multi-camera',
    question: 'How to record and live stream video from 4 angles in heavy commercial vehicles?',
    aliases: [
      '4 camera', 'mdvr', 'mobile dvr', '360 video', 'blind spot',
      'bus camera', 'truck camera', 'video recording', 'cctv for truck',
      'multi camera', 'dvr', 't5324'
    ],
    summary: '4-Channel Mobile Digital Video Recorders (MDVRs such as T5324) record 4 Full HD cameras simultaneously (front road, driver cabin, side blind spots, and rear reverse) with 4G live cloud streaming.',
    bullets: [
      '4-Channel 1080P HD: Covers road ahead, driver behavior, cargo compartment, and rear reversing blind spots.',
      '2TB Storage Support: Dual SD card or shockproof 2.5" SSD storage for up to 30 days continuous recording.',
      'Built-in 4G & GPS: Live streaming video and real-time location tracking from any browser or mobile app.',
      'Automotive Surge Protection: Withstands 8V–36V power fluctuations in heavy trucks and buses.'
    ],
    recommended: {
      name: 'T98 SD Card MDVR',
      slug: 't5324-mdvr',
      price: '₹16,800 + GST',
      badge: '4-Channel 4G MDVR',
      image: '/images/hardware/t5324-mdvr.svg',
      path: '/hardware/t5324-mdvr'
    },
    followUps: [
      'How many hours of video can be stored on a 512GB SD card?',
      'Can dispatchers talk back to the driver using 2-way audio?',
      'Does it automatically upload incident footage upon crash?'
    ]
  },
  {
    id: 'autoparts-compatibility',
    question: 'How do I find exact auto parts and spares that fit my car or truck?',
    aliases: [
      'parts that fit', 'vehicle number', 'number plate', 'compatibility', 'auto parts',
      'brake pads', 'wiper', 'filter', 'engine oil', 'battery', 'spare parts', 'car parts',
      'find parts', 'vin search'
    ],
    summary: 'Enter your Indian vehicle registration number (e.g. GJ 15 AT 7788) in Setu Auto Parts. The catalog automatically decodes your vehicle make, model, variant, and year to show 100% verified compatible parts.',
    bullets: [
      'Instant Plate Decoder: Fetches exact engine displacement, fuel type, and manufacturing year in 1 click.',
      'Zero Fitment Error: Only parts guaranteed to fit your vehicle chassis and brake rotor specs are displayed.',
      'OEM & Tier-1 Brands: Genuine Bosch, Brembo, Mann-Filter, Mobil 1, and OEM replacement components.',
      'Direct Warranty: All spares backed by verified manufacturer warranties and GST invoices.'
    ],
    recommended: {
      name: 'Vehicle Plate Compatibility Search',
      slug: 'auto-parts',
      price: 'Instant Fitment',
      badge: '100% Verified Match',
      image: '/images/autoparts/brake-pads.svg',
      path: '/auto-parts'
    },
    followUps: [
      'Can I search auto parts using chassis number / VIN?',
      'How fast are auto parts delivered to commercial workshops?',
      'Are GST invoices provided for commercial fleet maintenance?'
    ]
  },
  {
    id: 'finance-cibil-emi',
    question: 'Can I buy fleet hardware on EMI without a CIBIL credit check?',
    aliases: [
      'emi', 'cibil', 'finance', 'loan', 'no cibil', 'hardware emi',
      'pay later', 'monthly installment', 'credit limit', 'fleet finance',
      'equipment financing', 'financing'
    ],
    summary: 'Yes! Setu Finance provides hardware equipment financing up to ₹2.5 Lakh with 12 to 24 month EMI terms. Credit limits are determined directly from your live fleet telematics and trip history with zero CIBIL score check.',
    bullets: [
      'Zero CIBIL Check: New and small fleet operators qualify based on vehicle count and active mileage.',
      'Limits up to ₹2.5 Lakh: Covers GPS trackers, AI dashcams, fuel sensors, and annual software subscriptions.',
      'Flexible 12–24 Month Tenures: Low monthly installments (e.g. ₹22,565/mo for ₹2.5 Lakh over 12 months).',
      'Same-Day Approval: Digital KYC and instant equipment dispatch without bank branch visits.'
    ],
    recommended: {
      name: 'Setu Fleet Equipment Finance',
      slug: 'finance',
      price: 'From ₹22,565/mo',
      badge: 'Zero CIBIL EMI',
      image: '/images/hardware/br06.svg',
      path: '/finance'
    },
    followUps: [
      'What documents are required for Setu Finance?',
      'Can I pay off the EMI early without foreclosure charges?',
      'How is my credit limit calculated from telematics data?'
    ]
  },
  {
    id: 'software-integration',
    question: 'Which software platforms work out of the box with Setu hardware?',
    aliases: [
      'software', 'platform', 'trakzee', 'smartbus', 'taskeye', 'logio',
      'telematics software', 'device integration', 'protocols', 'fleet software',
      'white label', 'solutions'
    ],
    summary: 'All hardware purchased on Setu is pre-integrated with Uffizio’s suite of enterprise fleet management platforms (Trakzee, SmartBus, TaskEye, Logio) and supports 1,500+ standard GPS protocols.',
    bullets: [
      'Trakzee Suite: Live tracking, geo-fencing, speed control, maintenance schedules, and eco-driving analytics.',
      'SmartBus Module: School bus safety, RFID student boarding alerts, and parent notification apps.',
      'TaskEye Workforce: Field employee task allocation, route optimization, and digital proof-of-delivery.',
      'Open REST APIs: Connects telematics streams directly into SAP, Oracle, and proprietary fleet ERPs.'
    ],
    recommended: {
      name: 'Trakzee Fleet Management Suite',
      slug: 'solutions',
      price: 'From ₹99/vehicle/mo',
      badge: 'Pre-Integrated Software',
      image: '/images/hardware/vector-v2-ai.svg',
      path: '/solutions'
    },
    followUps: [
      'Can I white-label the software with my company logo and domain?',
      'Is there a mobile app available for iOS and Android?',
      'Can I connect third-party GPS devices I already own?'
    ]
  },
  {
    id: 'bulk-pricing-slabs',
    question: 'How do bulk pricing discount slabs work for hardware?',
    aliases: [
      'bulk price', 'discount', 'slabs', 'bulk slab', 'volume discount',
      'wholesale', 'how many units', 'bulk order', 'price tiers', 'dealer discount'
    ],
    summary: 'All hardware devices feature automated quantity tiers: 1–4 units (standard price), 5–20 units (5–10% discount), 21–50 units (12–15% discount), and 50+ units (wholesale enterprise pricing).',
    bullets: [
      'Instant Tier Calculation: Slabs apply automatically in your cart and product details page.',
      'Volume Savings: Example: AIS-140 GPS drops from ₹3,800 to ₹3,325 on volume orders.',
      'Complimentary Pre-Configured SIMs: High volume tiers include pre-activated multi-network eSIM cards.',
      'Dedicated Account Manager: Orders of 50+ units receive dedicated technician onboarding support.'
    ],
    recommended: {
      name: 'Bulk Tier Pricing Engine',
      slug: 'hardware',
      price: 'Up to 25% Off Slabs',
      badge: 'Volume Discounts',
      image: '/images/hardware/prithvi-140.svg',
      path: '/hardware'
    },
    followUps: [
      'Can I mix different hardware models to reach bulk discount slabs?',
      'Are bulk purchases eligible for GST input tax credit (ITC)?',
      'Do you offer dealer distributor pricing for resellers?'
    ]
  }
];

/* ── Smart AI Overview Generator ── */
function generateAIOverview(query) {
  if (!query || !query.trim()) return null;
  const cleanQ = query.trim().toLowerCase();
  const tokens = cleanQ.replace(/[^\w\s-]/g, ' ').split(/\s+/).filter(Boolean);

  let bestMatch = null;
  let bestScore = 0;

  for (const item of FLEET_KNOWLEDGE_BASE) {
    let score = 0;
    const qLower = item.question.toLowerCase();
    const sumLower = item.summary.toLowerCase();

    // Exact phrase match
    if (qLower.includes(cleanQ)) score += 30;
    if (item.aliases.some(alias => cleanQ.includes(alias) || alias.includes(cleanQ))) {
      score += 20;
    }

    // Token overlap
    for (const token of tokens) {
      if (token.length <= 2) continue;
      if (qLower.includes(token)) score += 6;
      if (sumLower.includes(token)) score += 3;
      if (item.aliases.some(a => a.includes(token))) score += 5;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  // If high quality match found
  if (bestScore >= 5 && bestMatch) {
    return bestMatch;
  }

  // Fallback AI synthesis based on catalog items
  const matchedProd = products.find(p => {
    const pText = `${p.name} ${p.shortDescription} ${(p.tags || []).join(' ')}`.toLowerCase();
    return tokens.some(t => t.length > 2 && pText.includes(t));
  });

  if (matchedProd) {
    return {
      id: `ai-gen-${matchedProd.id}`,
      question: `Setu AI Overview for "${query.trim()}"`,
      summary: `${matchedProd.name} is an enterprise-grade telematics solution designed for commercial fleet operations. It delivers real-time telemetry, ${matchedProd.shortDescription.toLowerCase()}`,
      bullets: [
        `Key Features: ${(matchedProd.features || ['Live GPS tracking', 'Instant alerts', 'Cloud sync']).slice(0, 3).join(', ')}.`,
        `Pricing: Starts at ₹${matchedProd.price?.toLocaleString('en-IN')} with wholesale volume discount slabs available.`,
        'Connectivity: Pre-integrated with Uffizio software platforms and open REST APIs.',
        'Warranty & Support: 1-Year manufacturer replacement warranty with 24/7 technical assistance.'
      ],
      recommended: {
        name: matchedProd.name,
        slug: matchedProd.slug,
        price: `₹${matchedProd.price?.toLocaleString('en-IN')}`,
        badge: matchedProd.tags?.[0] || 'Recommended',
        image: matchedProd.image,
        path: `/hardware/${matchedProd.slug}`
      },
      followUps: [
        `What are the technical specifications of ${matchedProd.name}?`,
        'How many units are required for wholesale bulk pricing?',
        'Can this device be financed through Setu Finance?'
      ]
    };
  }

  return null;
}

/* ── Suggestions Pool below Search Bar ── */
const RICH_SEARCH_SUGGESTIONS = [
  { label: '✨ AIS-140 Govt GPS', query: 'Which GPS tracker is government approved & mandatory for commercial vehicles?' },
  { label: '✨ ADAS AI Dashcam', query: 'How to detect driver fatigue and drowsiness with AI dashcam?' },
  { label: '✨ Prevent Fuel Theft', query: 'How to monitor fuel levels and prevent diesel theft in trucks?' },
  { label: '✨ Plug & Play OBD', query: 'Are there GPS trackers that don’t require wire cutting?' },
  { label: '✨ EMI without CIBIL', query: 'Can I buy fleet hardware on EMI without a CIBIL credit check?' },
  { label: '✨ Vehicle Plate Parts', query: 'How do I find exact auto parts that fit my vehicle number?' },
  { label: '✨ 4G Live MDVR', query: 'How to record video from 4 angles in heavy commercial vehicles?' },
  { label: '✨ Smart Cargo E-Lock', query: 'How to secure shipping containers and trucks during transit?' }
];

/* ── Search History Helpers ── */
const DEFAULT_LAST_SEARCHES = [
  { text: 'AIS-140 GPS Devices', query: 'AIS-140', category: 'Certified' },
  { text: 'Falcon F1 AI Dashcam', query: 'Falcon F1', category: 'Video Telematics' },
  { text: 'SP BLE-4 Fuel Sensor', query: 'Fuel Sensor', category: 'Sensors' },
  { text: 'T5324 SD Card MDVR', query: 'MDVR', category: 'Video System' }
];

function getLastSearches() {
  try {
    const raw = localStorage.getItem('setu_last_searches');
    if (!raw) return DEFAULT_LAST_SEARCHES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {}
  return DEFAULT_LAST_SEARCHES;
}

function saveSearchTerm(term, category = 'Search') {
  if (!term || !term.trim()) return;
  const clean = term.trim();
  try {
    const existing = getLastSearches();
    const filtered = existing.filter(item => (item.query || item.text).toLowerCase() !== clean.toLowerCase());
    const updated = [{ text: clean, query: clean, category }, ...filtered].slice(0, 5);
    localStorage.setItem('setu_last_searches', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return DEFAULT_LAST_SEARCHES;
  }
}

function getProductBadge(product) {
  if (product.subcategory === 'ais-gps-device' || (product.name && product.name.includes('140'))) {
    return { label: 'AIS-140', color: '#10B981' };
  }
  if (product.subcategory === 'ai-dashcam') {
    return { label: 'AI Dashcam', color: '#8B5CF6' };
  }
  if (product.subcategory === 'mdvr' || product.subcategory === 'adas-mdvr') {
    return { label: 'MDVR', color: '#0284C7' };
  }
  if (product.subcategory === 'fuel-level-sensor') {
    return { label: 'Fuel BLE', color: '#F59E0B' };
  }
  if (product.subcategory === 'e-lock-tracker') {
    return { label: 'E-Lock', color: '#6366F1' };
  }
  if (product.subcategory === 'obd-gps-tracker') {
    return { label: 'OBD Tracker', color: '#0EA5E9' };
  }
  if (product.category === 'vehicle-tracking') {
    return { label: 'GPS Tracker', color: '#2563EB' };
  }
  return null;
}

/* ────────────────────────────────────────────────────────────
   1. TOP MARKETING BANNER SLIDER (5 to 6 Banners at the Top)
──────────────────────────────────────────────────────────── */
const TOP_MARKETING_BANNERS = [
  {
    id: 'falcon-f1',
    partnerBadge: 'Mercetech',
    categoryBadge: 'VIDEO TELEMATICS',
    categoryBadgeColor: '#FBBF24',
    title: 'AI dashcam with ADAS\nand driver-fatigue alerts',
    desc: 'Forward collision and lane departure warning, fatigue detection and live 4G video.',
    btnText: 'View device →',
    pricePrefix: 'Falcon F1 AI Camera from ',
    priceAmount: '₹11,200',
    priceSuffix: ' + GST',
    image: '/images/hardware/falcon-f1.svg',
    path: '/hardware/falcon-f1-ai-4g',
    bgGradient: 'linear-gradient(115deg, #061338 0%, #0d2258 40%, #1e40af 80%, #1d4ed8 100%)',
    spotlightGlow: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(59, 130, 246, 0.38) 45%, transparent 70%)'
  },
  {
    id: 'prithvi-140',
    partnerBadge: 'Prithvi Series',
    categoryBadge: 'GOVERNMENT APPROVED',
    categoryBadgeColor: '#38BDF8',
    title: 'ARAI & ICAT Certified AIS-140\nGPS with Emergency SOS',
    desc: 'Mandatory for commercial vehicles, transport buses & mining fleets with dual embedded eSIMs.',
    btnText: 'Explore AIS-140 →',
    pricePrefix: 'Prithvi 140 GPS from ',
    priceAmount: '₹3,800',
    priceSuffix: ' + GST (Bulk ₹3,325)',
    image: '/images/hardware/prithvi-140.svg',
    path: '/hardware/prithvi-140',
    bgGradient: 'linear-gradient(115deg, #031c33 0%, #063455 40%, #0284c7 80%, #0369a1 100%)',
    spotlightGlow: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(56, 189, 248, 0.35) 45%, transparent 70%)'
  },
  {
    id: 'sp-ble4-fuel',
    partnerBadge: 'SensePlus',
    categoryBadge: 'FUEL TELEMATICS',
    categoryBadgeColor: '#F59E0B',
    title: 'Wireless BLE 5.0 Ultrasonic\n& Capacitive Fuel Sensor',
    desc: '99.5% accuracy real-time fuel theft detection, sudden drop alerts and temperature monitoring.',
    btnText: 'View sensor →',
    pricePrefix: 'SP-BLE4 Sensor from ',
    priceAmount: '₹4,500',
    priceSuffix: ' + GST',
    image: '/images/hardware/sp-ble4-fuel.svg',
    path: '/hardware/sp-ble4-fuel',
    bgGradient: 'linear-gradient(115deg, #1c1003 0%, #3a1e05 40%, #b45309 80%, #d97706 100%)',
    spotlightGlow: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(245, 158, 11, 0.35) 45%, transparent 70%)'
  },
  {
    id: 't5324-mdvr',
    partnerBadge: 'Sentinel',
    categoryBadge: 'COMMERCIAL VIDEO',
    categoryBadgeColor: '#C084FC',
    title: '4G Full HD 4-Channel MDVR\nwith Live Video Streaming',
    desc: 'Blind spot monitoring, 2TB SSD storage, multi-angle interior/exterior view for logistics fleets.',
    btnText: 'View MDVR →',
    pricePrefix: 'T5324 MDVR from ',
    priceAmount: '₹16,800',
    priceSuffix: ' + GST',
    image: '/images/hardware/t5324-mdvr.svg',
    path: '/hardware/t5324-mdvr',
    bgGradient: 'linear-gradient(115deg, #15092a 0%, #290f52 40%, #6d28d9 80%, #7c3aed 100%)',
    spotlightGlow: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(192, 132, 252, 0.35) 45%, transparent 70%)'
  },
  {
    id: '7h-elock',
    partnerBadge: 'SecuTrack',
    categoryBadge: 'CARGO SECURITY',
    categoryBadgeColor: '#34D399',
    title: 'Heavy-Duty GPS E-Lock\nwith Remote OTP Unlock',
    desc: 'IP68 waterproof container lock with tamper alert, geofence trigger, and real-time transit tracking.',
    btnText: 'View E-lock →',
    pricePrefix: '7H Smart E-Lock from ',
    priceAmount: '₹6,200',
    priceSuffix: ' + GST',
    image: '/images/hardware/7h-elock.svg',
    path: '/hardware/7h-elock',
    bgGradient: 'linear-gradient(115deg, #031e1c 0%, #063c37 40%, #059669 80%, #047857 100%)',
    spotlightGlow: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(52, 211, 153, 0.35) 45%, transparent 70%)'
  },
  {
    id: 'trakzee-platform',
    partnerBadge: 'Uffizio',
    categoryBadge: 'FLEET MANAGEMENT SUITE',
    categoryBadgeColor: '#FDE047',
    title: 'All-in-One Cloud Fleet &\nTelematics Platform',
    desc: 'Pre-integrated software with 1,500+ device protocols, driver behavior scoring, and automated reports.',
    btnText: 'Explore software →',
    pricePrefix: 'Free Trial · Plans from ',
    priceAmount: '₹99',
    priceSuffix: ' /vehicle/mo',
    image: '/images/hardware/vector-v2-ai.svg',
    path: '/solutions',
    bgGradient: 'linear-gradient(115deg, #0a1738 0%, #14285e 40%, #2563eb 80%, #1d4ed8 100%)',
    spotlightGlow: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(59, 130, 246, 0.38) 45%, transparent 70%)'
  }
];

function TopMarketingBannerSlider() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = TOP_MARKETING_BANNERS.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const activeBanner = TOP_MARKETING_BANNERS[currentSlide];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div 
      className="top-marketing-banner-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="top-marketing-banner-card"
        style={{ background: activeBanner.bgGradient }}
        onClick={() => navigate(activeBanner.path)}
      >
        {/* Top-Right Sponsored Badge */}
        <div className="top-marketing-sponsored-badge">
          <span>Sponsored</span>
        </div>

        {/* Left Column: Marketing Copy */}
        <div className="top-marketing-left-col">
          <div className="top-marketing-badges-row">
            <span className="top-marketing-partner-pill">
              {activeBanner.partnerBadge}
            </span>
            <span 
              className="top-marketing-cat-tag"
              style={{ color: activeBanner.categoryBadgeColor }}
            >
              {activeBanner.categoryBadge}
            </span>
          </div>

          <h1 className="top-marketing-heading">
            {activeBanner.title.split('\n').map((line, i) => (
              <span key={i} className="top-marketing-heading-line">{line}</span>
            ))}
          </h1>

          <p className="top-marketing-desc">
            {activeBanner.desc}
          </p>

          <div className="top-marketing-cta-row">
            <button
              type="button"
              className="top-marketing-cta-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(activeBanner.path);
              }}
            >
              {activeBanner.btnText}
            </button>
            <div className="top-marketing-price-text">
              <span>{activeBanner.pricePrefix}</span>
              <strong className="top-marketing-price-strong">{activeBanner.priceAmount}</strong>
              <span>{activeBanner.priceSuffix}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Product Spotlight */}
        <div className="top-marketing-right-col">
          <div 
            className="top-marketing-spotlight"
            style={{ background: activeBanner.spotlightGlow }}
          >
            <img 
              src={getAssetUrl(activeBanner.image)} 
              alt={activeBanner.partnerBadge} 
              className="top-marketing-product-img"
            />
          </div>
        </div>

        {/* Bottom-Right Controls */}
        <div className="top-marketing-controls" onClick={(e) => e.stopPropagation()}>
          <button 
            type="button" 
            className="top-marketing-arrow-btn" 
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            ‹
          </button>

          <div className="top-marketing-dashes">
            {TOP_MARKETING_BANNERS.map((banner, idx) => (
              <button
                key={banner.id}
                type="button"
                className={`top-marketing-dash ${currentSlide === idx ? 'top-marketing-dash--active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                title={banner.partnerBadge}
              />
            ))}
          </div>

          <button 
            type="button" 
            className="top-marketing-arrow-btn" 
            onClick={handleNext}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   2. FLOATING ADVANCED SEARCH CARD WITH GOOGLE-LIKE AI MODE
   (Category tabs removed as requested; AI Mode + Suggestions added)
──────────────────────────────────────────────────────────── */
const AI_TYPEWRITER_PROMPTS = [
  'Ask Setu AI: "Which GPS tracker is government approved & mandatory?"',
  'Ask Setu AI: "How to detect driver fatigue and road collisions?"',
  'Ask Setu AI: "How to monitor fuel levels and stop diesel theft in trucks?"',
  'Ask Setu AI: "Can I buy fleet hardware on EMI without a CIBIL check?"',
  'Ask Setu AI: "How to find verified auto parts by vehicle registration number?"',
  'Ask Setu AI: "Which software connects with these GPS devices?"'
];

function FloatingSearchCard() {
  const navigate = useNavigate();
  const [isAiMode, setIsAiMode] = useState(true); // AI Mode ON by default like Google AI Overview
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastSearches, setLastSearches] = useState(getLastSearches);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const animatedPlaceholder = useTypewriter(AI_TYPEWRITER_PROMPTS, !query);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRecordSearch = (term, cat = 'Search') => {
    const updated = saveSearchTerm(term, cat);
    if (updated) setLastSearches(updated);
  };

  // Google-Style AI Overview match
  const aiOverview = useMemo(() => {
    if (!query.trim()) return null;
    return generateAIOverview(query);
  }, [query]);

  // Matching Hardware Products
  const matchingHardware = useMemo(() => {
    if (!query.trim()) return [];
    const cleanQ = query.trim().toLowerCase();
    const rawTokens = cleanQ.replace(/[^\w\s-]/g, ' ').split(/\s+/).filter(Boolean);
    const keywords = rawTokens.filter(t => !STOP_WORDS.has(t));
    const tokens = keywords.length > 0 ? keywords : rawTokens;

    return products.filter(p => {
      const pName = p.name.toLowerCase();
      const pSlug = p.slug.toLowerCase();
      const pCat = (p.category || '').toLowerCase();
      const pSub = (p.subcategory || '').toLowerCase();
      const pDesc = (p.shortDescription || '').toLowerCase();

      if (pName.includes(cleanQ) || pSlug.includes(cleanQ)) return true;
      const fullText = `${pName} ${pSlug} ${pCat} ${pSub} ${pDesc}`;
      return tokens.every(token => fullText.includes(token));
    }).slice(0, 4);
  }, [query]);

  // Matching Software Solutions
  const matchingSolutions = useMemo(() => {
    if (!query.trim()) return [];
    const cleanQ = query.trim().toLowerCase();
    return solutions.filter(s => {
      return s.name.toLowerCase().includes(cleanQ) || (s.description || '').toLowerCase().includes(cleanQ);
    }).slice(0, 2);
  }, [query]);

  // Matching Auto Parts
  const matchingParts = useMemo(() => {
    if (!query.trim()) return [];
    const cleanQ = query.trim().toLowerCase();
    const partsList = autopartsData.parts || [];
    return partsList.filter(p => {
      return p.name.toLowerCase().includes(cleanQ) || (p.category || '').toLowerCase().includes(cleanQ) || (p.brand || '').toLowerCase().includes(cleanQ);
    }).slice(0, 3);
  }, [query]);

  const handleSelectSuggestion = (suggestionQuery) => {
    setQuery(suggestionQuery);
    setIsDropdownOpen(true);
    handleRecordSearch(suggestionQuery, 'AI Suggestion');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    handleRecordSearch(query.trim(), 'AI Search');
    setIsDropdownOpen(false);

    if (aiOverview && aiOverview.recommended && aiOverview.recommended.path) {
      navigate(aiOverview.recommended.path);
    } else if (matchingHardware.length > 0) {
      navigate(`/hardware/${matchingHardware[0].slug}`);
    } else {
      navigate(`/hardware?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="floating-search-card" ref={containerRef}>
      {/* Title */}
      <h2 className="floating-search-title">
        Everything your fleet runs on, in one place.
      </h2>

      {/* Main Search Input Box with Google-style AI Mode */}
      <form 
        className={`floating-search-input-box ${isAiMode ? 'floating-search-input-box--ai' : ''} ${isFocused ? 'floating-search-input-box--focused' : ''}`}
        onSubmit={handleSubmit}
      >
        {/* Left Icon: Sparkle in AI Mode or Standard Search Icon */}
        <div className="floating-search-left-icon">
          {isAiMode ? (
            <span className="floating-search-sparkle-icon" title="Setu AI Mode Active">✨</span>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          )}
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          className="floating-search-input"
          value={query}
          placeholder={query ? '' : animatedPlaceholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsDropdownOpen(true);
          }}
          aria-label="Ask Setu AI anything about fleet hardware, software, or parts"
        />

        {/* Clear Button */}
        {query.trim().length > 0 && (
          <button
            type="button"
            className="floating-search-clear-btn"
            onClick={() => {
              setQuery('');
              if (inputRef.current) inputRef.current.focus();
            }}
            title="Clear search"
          >
            ✕
          </button>
        )}

        {/* Google-Style AI Mode Toggle Button */}
        <button
          type="button"
          className={`floating-search-ai-toggle ${isAiMode ? 'floating-search-ai-toggle--active' : 'floating-search-ai-toggle--inactive'}`}
          onClick={() => {
            setIsAiMode(!isAiMode);
            if (inputRef.current) inputRef.current.focus();
          }}
          title={isAiMode ? 'AI Mode is ON (Click to switch to standard search)' : 'Turn ON AI Mode'}
        >
          <span className="floating-search-ai-toggle-sparkle">✨</span>
          <span>AI Mode</span>
        </button>

        {/* Submit Search Button */}
        <button 
          type="submit" 
          className="floating-search-submit-btn"
          title="Search"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>

      {/* ── Suggestions Row Directly Below Search ── */}
      <div className="floating-search-suggestions-row">
        <span className="floating-search-suggestions-label">
          <span>Suggestions:</span>
        </span>
        <div className="floating-search-suggestions-list">
          {RICH_SEARCH_SUGGESTIONS.map((item) => (
            <button
              key={item.label}
              type="button"
              className="floating-search-suggestion-chip"
              onClick={() => handleSelectSuggestion(item.query)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Dropdown Panel (Google-Style AI Overview + Results) ── */}
      {isDropdownOpen && (
        <div className="floating-search-dropdown">

          {/* 1. Google-Style ✨ Setu AI Overview */}
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

              {/* Key Takeaways */}
              {aiOverview.bullets && aiOverview.bullets.length > 0 && (
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

              {/* Recommended Solution Card */}
              {aiOverview.recommended && (
                <div 
                  className="search-dropdown-ai-recom-card"
                  onClick={() => {
                    handleRecordSearch(aiOverview.question, 'AI Overview');
                    setIsDropdownOpen(false);
                    navigate(aiOverview.recommended.path);
                  }}
                >
                  <div className="search-dropdown-ai-recom-thumb">
                    <img 
                      src={getAssetUrl(aiOverview.recommended.image)} 
                      alt={aiOverview.recommended.name} 
                    />
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

              {/* Follow-up Questions (Like Google AI Mode) */}
              {aiOverview.followUps && (
                <div className="search-dropdown-ai-followups">
                  <span className="search-dropdown-ai-followup-label">Ask a follow up:</span>
                  {aiOverview.followUps.map((fu, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="search-dropdown-ai-followup-chip"
                      onClick={() => handleSelectSuggestion(fu)}
                    >
                      {fu}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. Direct Matching Hardware Products */}
          {query.trim().length > 0 && matchingHardware.length > 0 && (
            <div className="search-dropdown-section">
              <div className="search-dropdown-section-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-4 0v2" />
                </svg>
                <span>Matching Hardware ({matchingHardware.length})</span>
              </div>
              <div className="search-dropdown-items-list">
                {matchingHardware.map((prod) => {
                  const badge = getProductBadge(prod);
                  return (
                    <div
                      key={prod.id}
                      className="search-dropdown-item"
                      onClick={() => {
                        handleRecordSearch(prod.name, prod.category || 'Hardware');
                        setIsDropdownOpen(false);
                        navigate(`/hardware/${prod.slug}`);
                      }}
                    >
                      <div className="search-dropdown-thumb">
                        <img src={getAssetUrl(prod.image)} alt={prod.name} />
                      </div>
                      <div className="search-dropdown-info">
                        <div className="search-dropdown-title-row">
                          <span className="search-dropdown-title">{prod.name}</span>
                          {badge && (
                            <span className="search-dropdown-badge" style={{ background: badge.color }}>
                              {badge.label}
                            </span>
                          )}
                        </div>
                        <span className="search-dropdown-desc">{prod.shortDescription}</span>
                      </div>
                      <span className="search-dropdown-price">₹{prod.price?.toLocaleString('en-IN')}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Direct Matching Software Solutions */}
          {query.trim().length > 0 && matchingSolutions.length > 0 && (
            <div className="search-dropdown-section">
              <div className="search-dropdown-section-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9h6v6H9z" />
                </svg>
                <span>Telematics Platforms</span>
              </div>
              <div className="search-dropdown-items-list">
                {matchingSolutions.map((sol) => (
                  <div
                    key={sol.id}
                    className="search-dropdown-item"
                    onClick={() => {
                      handleRecordSearch(sol.name, 'Software');
                      setIsDropdownOpen(false);
                      navigate(`/solutions`);
                    }}
                  >
                    <div className="search-dropdown-thumb" style={{ background: sol.color + '15' }}>
                      <span style={{ fontSize: '18px' }}>{sol.icon}</span>
                    </div>
                    <div className="search-dropdown-info">
                      <span className="search-dropdown-title">{sol.name}</span>
                      <span className="search-dropdown-desc">{sol.description}</span>
                    </div>
                    <span className="search-dropdown-link-text">Explore →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Matching Auto Parts */}
          {query.trim().length > 0 && matchingParts.length > 0 && (
            <div className="search-dropdown-section">
              <div className="search-dropdown-section-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3v3m0 12v3M3 12h3m12 0h3" />
                </svg>
                <span>Verified Auto Parts</span>
              </div>
              <div className="search-dropdown-items-list">
                {matchingParts.map((part) => (
                  <div
                    key={part.id}
                    className="search-dropdown-item"
                    onClick={() => {
                      handleRecordSearch(part.name, 'Auto Parts');
                      setIsDropdownOpen(false);
                      navigate(`/auto-parts/${part.slug}`);
                    }}
                  >
                    <div className="search-dropdown-thumb">
                      <img src={getAssetUrl(part.image)} alt={part.name} />
                    </div>
                    <div className="search-dropdown-info">
                      <span className="search-dropdown-title">{part.name}</span>
                      <span className="search-dropdown-desc">{part.brand} · Part #{part.partNumber}</span>
                    </div>
                    <span className="search-dropdown-price">₹{part.price?.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Recommended AI Queries & Recent Searches when Empty */}
          {query.trim().length === 0 && (
            <div className="search-dropdown-section">
              <div className="search-dropdown-section-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Trending AI Questions You Can Ask</span>
              </div>
              <div className="search-dropdown-faq-list">
                {FLEET_KNOWLEDGE_BASE.slice(0, 4).map((faq) => (
                  <button
                    key={faq.id}
                    type="button"
                    className="search-dropdown-faq-btn"
                    onClick={() => handleSelectSuggestion(faq.question)}
                  >
                    <span className="search-dropdown-faq-icon">✨</span>
                    <span className="search-dropdown-faq-text">{faq.question}</span>
                  </button>
                ))}
              </div>

              {lastSearches.length > 0 && (
                <div className="search-dropdown-last-searches">
                  <div className="search-dropdown-subhead">
                    <span>Recent Searches</span>
                    <button 
                      type="button" 
                      className="search-dropdown-clear-btn"
                      onClick={() => {
                        try { localStorage.removeItem('setu_last_searches'); } catch (e) {}
                        setLastSearches([]);
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="search-dropdown-recent-chips">
                    {lastSearches.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="search-dropdown-recent-chip"
                        onClick={() => handleSelectSuggestion(item.query || item.text)}
                      >
                        {item.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Footer View All */}
          {query.trim().length > 0 && (
            <div className="search-dropdown-footer">
              <button
                type="button"
                className="search-dropdown-see-all"
                onClick={handleSubmit}
              >
                Search all catalog items matching "{query}" →
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   3. CATEGORY ICONS & SHOP BY CATEGORY SECTION
──────────────────────────────────────────────────────────── */
function VehicleTrackingIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <rect x="7" y="6" width="18" height="15" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2"/>
      <circle cx="11" cy="10" r="1.2" fill="#10B981"/>
      <circle cx="15" cy="10" r="1.2" fill="#3B82F6"/>
      <circle cx="19" cy="10" r="1.2" fill="#EF4444"/>
      <rect x="10" y="14" width="12" height="3.5" rx="1" fill="#334155"/>
      <path d="M10 21v4.5c0 1.2-1 2-2.5 2.5" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M13 21v3.5c0 1.2-.6 2-1.8 2.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M16 21v5.5c0 1.2.6 1.8 1.8 2" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M19 21v4.5c0 1.2 1 2 2.5 2.5" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function VideoTelematicsIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="8" width="24" height="16" rx="4" fill="#0F172A" stroke="#1E293B" strokeWidth="1.2"/>
      <path d="M12 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" fill="#334155"/>
      <circle cx="16" cy="16" r="6" fill="#1E293B" stroke="#0284C7" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="3.5" fill="#0369A1"/>
      <circle cx="14.8" cy="14.8" r="1.2" fill="#BAE6FD"/>
      <circle cx="24" cy="11.5" r="1" fill="#EF4444"/>
    </svg>
  );
}

function AssetTrackingIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <path d="M10 13V9a6 6 0 1 1 12 0v4" stroke="#94A3B8" strokeWidth="2.8" strokeLinecap="round"/>
      <rect x="7" y="13" width="18" height="14" rx="3.5" fill="#2563EB" stroke="#1D4ED8" strokeWidth="1.2"/>
      <rect x="13.5" y="17" width="5" height="5" rx="1.5" fill="#93C5FD"/>
      <path d="M16 22v2.5" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function PersonalSafetyIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <path d="M14 4h4v3h-4z" fill="#2563EB" rx="1"/>
      <rect x="9" y="7" width="14" height="20" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5"/>
      <line x1="13" y1="11" x2="19" y2="11" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="13.5" x2="18" y2="13.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="16" cy="19.5" r="3.5" fill="#EF4444"/>
      <circle cx="16" cy="19.5" r="1.5" fill="#FFFFFF"/>
    </svg>
  );
}

function FuelSensorsIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <rect x="11" y="5" width="10" height="7" rx="2" fill="#F97316" stroke="#EA580C" strokeWidth="1.2"/>
      <rect x="13" y="12" width="6" height="2" fill="#C2410C"/>
      <line x1="16" y1="14" x2="16" y2="28" stroke="#0284C7" strokeWidth="3" strokeLinecap="round"/>
      <line x1="14" y1="18" x2="18" y2="18" stroke="#BAE6FD" strokeWidth="1.2"/>
      <line x1="14" y1="22" x2="18" y2="22" stroke="#BAE6FD" strokeWidth="1.2"/>
      <line x1="14" y1="26" x2="18" y2="26" stroke="#BAE6FD" strokeWidth="1.2"/>
    </svg>
  );
}

function IoTSensorsIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <rect x="7" y="10" width="18" height="15" rx="3" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1.2"/>
      <circle cx="16" cy="17" r="4" fill="#FFFFFF"/>
      <circle cx="16" cy="17" r="2" fill="#0284C7"/>
      <path d="M12 7a6 6 0 0 1 8 0" stroke="#0284C7" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M9 4.5a10 10 0 0 1 14 0" stroke="#38BDF8" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="21" cy="13" r="1" fill="#10B981"/>
    </svg>
  );
}

function AccessoriesIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="9" width="13" height="14" rx="2.5" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2"/>
      <line x1="9" y1="23" x2="9" y2="27" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="13" y1="23" x2="13" y2="27" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="16" y1="23" x2="16" y2="27" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M22 6v17" stroke="#006EFF" strokeWidth="2.2" strokeLinecap="round"/>
      <circle cx="22" cy="5" r="2" fill="#006EFF"/>
      <path d="M22 23c0 2 2 4 4 4" stroke="#EF4444" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function AllSolutionsIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="6" width="8.5" height="8.5" rx="2.5" fill="#2563EB"/>
      <rect x="17.5" y="6" width="8.5" height="8.5" rx="2.5" fill="#0EA5E9"/>
      <rect x="6" y="17.5" width="8.5" height="8.5" rx="2.5" fill="#F59E0B"/>
      <rect x="17.5" y="17.5" width="8.5" height="8.5" rx="2.5" fill="#10B981"/>
    </svg>
  );
}

function renderCategoryIcon(iconType) {
  switch (iconType) {
    case 'vehicle-tracking': return <VehicleTrackingIcon />;
    case 'video-telematics': return <VideoTelematicsIcon />;
    case 'asset-tracking': return <AssetTrackingIcon />;
    case 'personal-safety': return <PersonalSafetyIcon />;
    case 'fuel-sensors': return <FuelSensorsIcon />;
    case 'iot-sensors': return <IoTSensorsIcon />;
    case 'accessories': return <AccessoriesIcon />;
    case 'all': return <AllSolutionsIcon />;
    default: return <VehicleTrackingIcon />;
  }
}

const CATEGORIES_DATA = [
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
    iconType: 'asset-tracking'
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

function ShopByCategorySection() {
  const navigate = useNavigate();

  return (
    <div className="shop-category-section">
      <div className="shop-category-section__header">
        <div>
          <h2 className="shop-category-section__title">Shop by category</h2>
          <p className="shop-category-section__sub">
            Everything a fleet needs, from the device to the licence to the technician.
          </p>
        </div>
      </div>

      <div className="shop-category-grid">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.id}
            className="shop-category-card"
            onClick={() => navigate(cat.path)}
            title={`Browse ${cat.title}`}
          >
            <div className="shop-category-icon-box">
              {renderCategoryIcon(cat.iconType)}
            </div>
            <div className="shop-category-info">
              <h3 className="shop-category-name">{cat.title}</h3>
              <p className="shop-category-count">{cat.count}</p>
            </div>
            <div className="shop-category-arrow">
              <svg width="7" height="11" viewBox="0 0 7 11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1.5 1.5 5.5 5.5 1.5 9.5" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   4. SECONDARY PROGRAMS & SOLUTIONS SLIDER (Below Categories)
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
  },
  {
    id: 'solutions',
    tag: 'TELEMATICS PLATFORMS · 10+ SOLUTIONS',
    tagColor: '#FDE047',
    title: 'Pre-integrated with Trakzee, SmartBus & TaskEye.',
    desc: 'Zero configuration needed. Devices connect automatically out of the box with ready-to-use cloud telematics and APIs.',
    type: 'pricing',
    amount: 'Instant Sync',
    subText: 'Over-the-air firmware updates & lifetime API access',
    btnText: 'Explore Solutions →',
    path: '/solutions',
    cardClass: 'home-banner-card--solutions'
  }
];

function HomeBannerSlider() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const totalBanners = HOME_BANNERS.length;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalBanners);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, totalBanners]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalBanners) % totalBanners);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalBanners);
  };

  const handlePlateSearch = (e) => {
    if (e) e.preventDefault();
    const cleanPlate = vehiclePlate.trim() || 'GJ 15 AT 7788';
    navigate(`/auto-parts?reg=${encodeURIComponent(cleanPlate.replace(/\s+/g, ''))}`);
  };

  const sliderCards = [...HOME_BANNERS, ...HOME_BANNERS.slice(0, 2)];

  return (
    <section 
      className="home-banner-slider-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Programs & Solutions Banners"
    >
      <div className="home-banner-slider-header">
        <div>
          <h2 className="home-banner-slider-title">Programs &amp; Solutions</h2>
          <p className="home-banner-slider-sub">
            Financing, vehicle compatibility search, certified hardware, and fleet software
          </p>
        </div>

        <div className="home-banner-slider-controls">
          <button 
            type="button" 
            className="home-banner-slider-btn" 
            onClick={handlePrev}
            aria-label="Previous banners"
            title="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button 
            type="button" 
            className="home-banner-slider-btn" 
            onClick={handleNext}
            aria-label="Next banners"
            title="Next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <div className="home-banner-slider-viewport">
        <div 
          className="home-banner-slider-track"
          style={{ '--slide-index': currentIndex }}
        >
          {sliderCards.map((banner, idx) => (
            <div 
              key={`${banner.id}-${idx}`}
              className={`home-banner-card ${banner.cardClass}`}
              onClick={() => {
                if (banner.type !== 'plate-search') {
                  navigate(banner.path);
                }
              }}
            >
              <div className="home-banner-card__top">
                <span className="home-banner-card__tag" style={{ color: banner.tagColor }}>
                  {banner.tag}
                </span>
                <h3 className="home-banner-card__title">{banner.title}</h3>
                <p className="home-banner-card__desc">{banner.desc}</p>
              </div>

              <div className="home-banner-card__bottom">
                {banner.type === 'plate-search' ? (
                  <form 
                    className="home-banner-plate-box" 
                    onSubmit={handlePlateSearch} 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="home-banner-plate-input-wrap">
                      <div className="home-banner-plate-ind">
                        <span className="home-banner-plate-chakra">☸</span>
                        <span className="home-banner-plate-ind-text">IND</span>
                      </div>
                      <input
                        type="text"
                        className="home-banner-plate-input"
                        placeholder="GJ 15 AT 7788"
                        value={vehiclePlate}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                        aria-label="Enter vehicle number"
                      />
                    </div>
                    <button type="submit" className="home-banner-plate-btn">
                      {banner.btnText}
                    </button>
                  </form>
                ) : (
                  <div className="home-banner-price-row">
                    <div className="home-banner-price-info">
                      <span className="home-banner-amount">{banner.amount}</span>
                      <span className="home-banner-subtext">{banner.subText}</span>
                    </div>
                    <button
                      type="button"
                      className="home-banner-cta-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(banner.path);
                      }}
                    >
                      {banner.btnText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="home-banner-slider-dots">
        {HOME_BANNERS.map((banner, idx) => (
          <button
            key={banner.id}
            type="button"
            className={`home-banner-slider-dot ${currentIndex === idx ? 'home-banner-slider-dot--active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${banner.tag}`}
            title={banner.tag}
          />
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   5. MAIN SETU HOME PAGE
──────────────────────────────────────────────────────────── */
export default function SetuHome() {
  return (
    <div className="dashboard">
      <div className="dashboard__page-container">

        {/* ── 1. Top Marketing Banner Slider (6 Banners with Sliders) ── */}
        <TopMarketingBannerSlider />

        {/* ── 2. Floating Search Card with Google-like AI Mode & Suggestions (Categories removed) ── */}
        <FloatingSearchCard />

        {/* ── 3. Shop by Category Section ── */}
        <ShopByCategorySection />

        {/* ── 4. Secondary Programs & Solutions Slider ── */}
        <HomeBannerSlider />

      </div>
    </div>
  );
}