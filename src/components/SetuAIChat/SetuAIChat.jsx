import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import { getAssetUrl } from '../../utils/assetUrl';
import { useAI } from '../../context/AIContext';
import './SetuAIChat.css';

/* ────────────────────────────────────────────────────────────
   KNOWLEDGE BASE FOR SETU 1-ON-1 FLEET AI ASSISTANT
──────────────────────────────────────────────────────────── */
const KNOWLEDGE_RESPONSES = {
  whatCanYouDo: {
    leadTitle: 'Setu Fleet AI Assistant',
    leadHighlight: 'your dedicated telematics & commercial fleet hardware advisor, trained on Indian transport regulations, sensor protocols, and certified hardware.',
    citation1: 'Setu Fleet AI',
    paragraph2: 'I can assist you in finding certified GPS trackers, explaining technical standards like AIS 140 and NavIC, recommending fuel theft prevention sensors, and configuring video telematics with ADAS and DMS driver monitoring.',
    citation2: 'ICAT / ARAI Standards',
    paragraph3: 'All devices recommended here come with direct manufacturer warranties, verified GST tax invoicing, and optional pre-configured cellular SIM connectivity for instant highway deployment.',
    citation3: 'Verified Hardware',
    requirementsTitle: '⚡ Key Capabilities & Assistance',
    requirementsSubtitle: 'Select an area of assistance or ask any specific technical question:',
    requirements: [
      {
        title: 'AIS 140 Government Compliance',
        text: 'Guidance on RTO mandates, dual-IP MoRTH streaming, and 112 emergency panic buttons.',
        badge: 'Govt. Mandate'
      },
      {
        title: 'Fuel Theft & Sensor Telemetry',
        text: 'Capacitive measuring rods and wireless BLE 5.0 sensors with 99.5% accuracy and instant siphon alarms.',
        badge: 'Fuel Telemetry'
      },
      {
        title: 'AI Video Telematics (ADAS + DMS)',
        text: 'Driver fatigue detection, lane departure warnings, and automatic 4G cloud video upload.',
        badge: 'Active Safety'
      },
      {
        title: 'Cargo E-Locks & Logistics Trackers',
        text: 'Remote OTP unlock, anti-tamper steel cables, and 3-year autonomous battery standby.',
        badge: 'Asset Security'
      }
    ],
    recommendedProductIds: ['prithvi-140', 'falcon-f1-ai-4g', 'sp-ble4-fuel'],
    followUps: [
      'Explain AIS 140 compliance requirements',
      'Best hardware to prevent diesel fuel theft',
      'Compare AI dashcams with ADAS & DMS'
    ]
  },
  ais140: {
    leadTitle: 'AIS 140 (Automotive Industry Standard 140)',
    leadHighlight: 'a mandatory government regulation in India that establishes technical and safety standards for Vehicle Location Tracking Devices (VLTDs) used in public transport and commercial fleets.',
    citation1: 'MoRTH / ARAI',
    paragraph2: 'Published by the Automotive Research Association of India (ARAI) under the Ministry of Road Transport and Highways (MoRTH), the standard mandates enhanced passenger safety, robust vehicle tracking, and real-time emergency SOS integration with State 112 command centers.',
    citation2: 'ICAT Certified',
    paragraph3: 'Unlike standard consumer GPS trackers, an AIS 140 certified tracker features dual-satellite positioning (GPS + NavIC), physical emergency panic buttons, and simultaneous dual-IP server transmission.',
    citation3: 'Govt. Approved',
    requirementsTitle: '🛠 Mandatory Hardware Requirements',
    requirementsSubtitle: 'To receive an official AIS 140 certification, a tracking device must feature:',
    requirements: [
      {
        title: 'Dual Satellite Tracking (GPS + NavIC)',
        text: "Must support both global GPS and India's indigenous NavIC satellite constellation developed by ISRO.",
        badge: 'ISRO NavIC'
      },
      {
        title: 'Physical Panic / SOS Button',
        text: 'A hard-wired emergency button accessible to passengers and drivers. Software or app-based triggers are not legally compliant.',
        badge: 'Emergency 112'
      },
      {
        title: 'Dual IP Data Transmission',
        text: 'Transmits live location simultaneously to both a private fleet management server and the state government emergency server.',
        badge: 'Dual Server'
      },
      {
        title: 'Embedded SIM (eSIM)',
        text: 'Secure multi-carrier roaming profile preventing connectivity dead zones across Indian highways.',
        badge: 'Multi-Network'
      },
      {
        title: 'Internal Battery Backup',
        text: 'Minimum 4-hour internal rechargeable battery ensuring continuous tracking even if vehicle battery is disconnected.',
        badge: '4h Backup'
      }
    ],
    recommendedProductIds: ['prithvi-140', 'prithvi-140-rto'],
    followUps: [
      'Is AIS 140 mandatory for school buses?',
      'What are the bulk price slabs?',
      'How to connect panic button to state 112?',
      'Does it include RTO certificate approval?'
    ]
  },
  fuel: {
    leadTitle: 'Fleet Fuel Theft & Consumption Telemetry',
    leadHighlight: 'utilizes high-precision capacitive measuring rods and wireless BLE 5.0 sensors to measure diesel tank volume with 99.5% accuracy.',
    citation1: 'Telematics +1',
    paragraph2: 'Setu fuel telemetry sensors eliminate the need for dangerous fuel tank wiring. The sensor broadcasts real-time liquid level and temperature data to the in-cabin GPS tracker via encrypted Bluetooth signals.',
    citation2: 'SensorTech +1',
    paragraph3: 'Whenever a sudden fuel level drop occurs (such as diesel siphoning during overnight parking or unauthorized tank cap removal), an instantaneous alarm is dispatched to fleet managers within 30 seconds.',
    citation3: 'Security +1',
    requirementsTitle: '⛽ Key Fuel Monitoring Capabilities',
    requirementsSubtitle: 'Our industrial fuel monitoring hardware provides:',
    requirements: [
      {
        title: '99.5% Liquid Level Accuracy',
        text: 'Continuous millimeter-level resolution calibrated for irregular shaped commercial diesel tanks.',
        badge: 'Sensor Lab'
      },
      {
        title: 'Instant Siphon / Theft Alert',
        text: 'Immediate SMS, mobile push, and automated portal notification when fuel level decreases without engine ignition.',
        badge: 'Alerts'
      },
      {
        title: 'Wireless BLE 5.0 Installation',
        text: 'Zero sparks and no drill wiring between the tank and driver cabin, significantly reducing installation labor.',
        badge: 'Safety'
      }
    ],
    recommendedProductIds: ['sp-ble4-fuel'],
    followUps: [
      'Can I install without drilling the tank?',
      'Does it work with standard GPS trackers?',
      'How does temperature compensation work in summer?'
    ]
  },
  dashcam: {
    leadTitle: 'AI Video Telematics & Driver Safety',
    leadHighlight: 'combines front-facing ADAS (Advanced Driver Assistance) and driver-facing DMS (Driver Monitoring System) computer vision cameras to prevent accidents before they occur.',
    citation1: 'Vision AI +1',
    paragraph2: 'The internal infrared DMS camera analyzes PERCLOS (percentage of eye closure), yawning frequency, and mobile phone usage to detect micro-sleeps and inattentiveness in real time.',
    citation2: 'Road Safety +1',
    paragraph3: 'Simultaneously, the front-facing ADAS camera monitors forward collision risk (FCW), lane departures (LDW), and tailgating, sounding immediate loud in-cabin buzzer and voice warnings.',
    citation3: 'Collision Prevention +1',
    requirementsTitle: '📹 Smart Video Telematics Features',
    requirementsSubtitle: 'Falcon AI Video Telematics provides active commercial fleet protection:',
    requirements: [
      {
        title: 'Active In-Cabin Voice Alarms',
        text: 'Instant audio buzzer wakes drowsy drivers up to 3 seconds before critical collision impact.',
        badge: 'Active Safety'
      },
      {
        title: '4G Cloud Event Video Upload',
        text: 'Automatically records and uploads 10-second HD video clips of harsh braking, impact, or fatigue to the portal.',
        badge: 'Cloud Sync'
      },
      {
        title: 'Infrared Night Vision',
        text: 'Crystal-clear driver face recording in total dark cabins without visible glare to the driver.',
        badge: 'IR Vision'
      }
    ],
    recommendedProductIds: ['falcon-f1-ai-4g'],
    followUps: [
      'How much cloud video storage is included?',
      'Can I watch 4G live streaming from dispatch?',
      'Is installation plug and play via OBD-II?'
    ]
  },
  cargo: {
    leadTitle: 'Heavy-Duty GPS E-Lock Cargo Protection',
    leadHighlight: 'provides military-grade IP68 waterproof physical padlock security with steel wire cables, unlocking exclusively through authenticated remote OTP or RFID cards.',
    citation1: 'Supply Chain +1',
    paragraph2: 'Built specifically for high-value container transit, bonded customs logistics, and pharmaceutical freight, the 7H E-Lock monitors container latch integrity and cargo temperature continuously.',
    citation2: 'Customs +1',
    paragraph3: 'If any unauthorized person attempts to cut the steel wire rope or open the chassis enclosure, a 110dB loud siren triggers and an emergency cellular alert is transmitted instantly.',
    citation3: 'Anti-Tamper +1',
    requirementsTitle: '🔒 Cargo E-Lock Specifications',
    requirementsSubtitle: 'Engineered for intermodal shipping containers and bonded trucks:',
    requirements: [
      {
        title: 'Remote OTP One-Time Unlocking',
        text: 'The dispatch command center generates an expiring OTP sent to the driver or receiver phone upon arrival at geofenced destination.',
        badge: 'Access Control'
      },
      {
        title: 'Anti-Tamper Wire Cut Alarm',
        text: 'Real-time alert transmitted to command center within 2 seconds if the high-tensile locking rope is severed.',
        badge: 'Tamper Proof'
      },
      {
        title: '45-Day 15,000mAh Battery',
        text: 'Rechargeable internal battery operates across full cross-country journeys without requiring truck power.',
        badge: 'Long Life'
      }
    ],
    recommendedProductIds: ['7h-elock'],
    followUps: [
      'Can it be unlocked if cellular network is unavailable?',
      'Does it qualify for customs transit bond seals?',
      'Is the locking cable reusable?'
    ]
  },
  logistics: {
    leadTitle: 'Standalone 4G Asset & Cold-Chain Tracking',
    leadHighlight: 'features long-life autonomous battery packs (up to 3 years) and high-strength magnetic mounting designed for unpowered trailers, containers, and intermodal freight.',
    citation1: 'Logistics +1',
    paragraph2: 'These devices sleep in micro-power standby and wake up automatically on movement, schedule intervals, or optical tamper detection to transmit high-accuracy location and battery telemetry.',
    citation2: 'Asset Security',
    paragraph3: 'Integrated Bluetooth Low Energy (BLE) enables seamless pairing with wireless temperature, humidity, and door-opening sensors for strict cold-chain compliance.',
    citation3: 'Cold Chain',
    requirementsTitle: '🛰 Key Asset Tracking Capabilities',
    requirementsSubtitle: 'Engineered for zero-wiring industrial operations:',
    requirements: [
      {
        title: 'Up to 3-Year Battery Standby',
        text: 'Heavy-duty industrial lithium battery delivers 1,000+ periodic location reports without recharging.',
        badge: 'Autonomous'
      },
      {
        title: 'High-Strength Magnetic Mount',
        text: 'Instant 10-second attachment to container walls and steel chassis with zero drilling or welding.',
        badge: 'Magnetic'
      },
      {
        title: 'Optical Tamper & Removal Alert',
        text: 'Underbody light sensor immediately triggers an emergency alert if device is detached.',
        badge: 'Anti-Theft'
      }
    ],
    recommendedProductIds: ['gl500-4g'],
    followUps: [
      'How does battery life change with frequent reporting?',
      'Can I attach BLE temperature sensors for food cargo?',
      'Is it waterproof for open sea container shipping?'
    ]
  }
};

/* ────────────────────────────────────────────────────────────
   SUGGESTED PROMPTS MATCHING GOOGLE GEMINI REFERENCE
──────────────────────────────────────────────────────────── */
const SUGGESTED_PROMPTS = [
  {
    icon: '✦',
    text: 'What can you do?',
    query: 'What can you do and how can you help me with fleet hardware?'
  },
  {
    icon: '📄',
    text: 'Explain AIS 140 compliance requirements',
    query: 'Explain AIS 140 compliance requirements for commercial vehicles in India'
  },
  {
    icon: '⛽',
    text: 'Best hardware to prevent diesel fuel theft',
    badge: 'New',
    query: 'How to prevent diesel fuel theft using sensors?'
  },
  {
    icon: '📹',
    text: 'Compare AI dashcams with ADAS & DMS',
    query: 'Compare AI dashcams with ADAS and DMS driver safety'
  }
];

function getAIResponse(userText) {
  const q = (userText || '').toLowerCase().trim();

  if (q.includes('what can you do') || q.includes('who are you') || q.includes('capabilities') || q.includes('help me with') || q.includes('features')) {
    return KNOWLEDGE_RESPONSES.whatCanYouDo;
  }
  if (q.includes('140') || q.includes('asi') || q.includes('ais') || q.includes('rto') || q.includes('morth') || q.includes('mandat') || q.includes('panic') || q.includes('sos')) {
    return KNOWLEDGE_RESPONSES.ais140;
  }
  if (q.includes('fuel') || q.includes('theft') || q.includes('diesel') || q.includes('sensor') || q.includes('drain') || q.includes('siphon')) {
    return KNOWLEDGE_RESPONSES.fuel;
  }
  if (q.includes('camera') || q.includes('dashcam') || q.includes('dms') || q.includes('adas') || q.includes('video') || q.includes('fatigue') || q.includes('drowsy')) {
    return KNOWLEDGE_RESPONSES.dashcam;
  }
  if (q.includes('lock') || q.includes('cargo') || q.includes('container') || q.includes('e-lock') || q.includes('elock') || q.includes('tamper')) {
    return KNOWLEDGE_RESPONSES.cargo;
  }
  if (q.includes('logistic') || q.includes('asset') || q.includes('magnetic') || q.includes('cold') || q.includes('temperature') || q.includes('gl500')) {
    return KNOWLEDGE_RESPONSES.logistics;
  }

  // Default intelligent fallback
  return {
    leadTitle: `Setu Telematics & Commercial Fleet Solutions for "${userText}"`,
    leadHighlight: 'provides certified enterprise GPS hardware, vehicle sensors, and unified cloud telematics configured for your exact fleet requirements.',
    citation1: 'Setu Fleet +1',
    paragraph2: 'Our platform supports over 1,500 commercial hardware communication protocols, automated over-the-air firmware updates, and direct manufacturer warranties with full GST tax invoicing.',
    citation2: 'Hardware Catalog +1',
    paragraph3: 'All devices ship pre-configured with active cellular SIM cards and integrated tracking profiles for immediate deployment.',
    citation3: 'Verified +1',
    requirementsTitle: '🔍 Matching Fleet Hardware Capabilities',
    requirementsSubtitle: 'Recommended telematics features for this requirement:',
    requirements: [
      {
        title: 'Real-Time Highway Telemetry',
        text: 'Live GPS location, ignition state, speed tracking, and route replay history.',
        badge: 'Tracking'
      },
      {
        title: 'Automated Platform Cloud Sync',
        text: 'Zero manual configuration required — devices sync automatically upon power on.',
        badge: 'Plug & Play'
      },
      {
        title: 'Direct Manufacturer Warranty',
        text: '1-to-2 year replacement warranty backed by official tax invoice and technical support.',
        badge: 'Warranty'
      }
    ],
    recommendedProductIds: ['prithvi-140', 'falcon-f1-ai-4g'],
    followUps: [
      'What are the bulk price slabs?',
      'How fast is shipping across India?',
      'Can I request a sample device for evaluation?'
    ]
  };
}

export default function SetuAIChat({ isOpen: propIsOpen, onClose: propOnClose, initialQuery: propInitialQuery }) {
  const navigate = useNavigate();
  const { isAIPanelOpen, closeAIPanel, initialAIQuery } = useAI();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isAIPanelOpen;
  const onClose = propOnClose || closeAIPanel;
  const activeInitialQuery = propInitialQuery !== undefined ? propInitialQuery : initialAIQuery;

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContextChip, setShowContextChip] = useState(true);
  const [selectedModel, setSelectedModel] = useState('Flash');
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const modelMenuRef = useRef(null);
  const moreMenuRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (modelMenuRef.current && !modelMenuRef.current.contains(e.target)) {
        setIsModelMenuOpen(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target)) {
        setIsMoreMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    function handleKeyDownGlobal(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDownGlobal);
    return () => window.removeEventListener('keydown', handleKeyDownGlobal);
  }, [isOpen, onClose]);

  // Handle incoming initialQuery
  useEffect(() => {
    if (isOpen) {
      if (activeInitialQuery && activeInitialQuery.trim()) {
        const startQuery = activeInitialQuery.trim();
        const aiData = getAIResponse(startQuery);
        setMessages([
          { id: 1, sender: 'user', text: startQuery },
          { id: 2, sender: 'ai', data: aiData }
        ]);
      }
      setInputValue('');
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 250);
    }
  }, [isOpen, activeInitialQuery]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current && messages.length > 0) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsgId = Date.now();
    setMessages((prev) => [...prev, { id: userMsgId, sender: 'user', text }]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiData = getAIResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'ai', data: aiData }
      ]);
      setIsTyping(false);
    }, 550);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue('');
    setIsTyping(false);
    setIsMoreMenuOpen(false);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const handleCopyChat = () => {
    const transcript = messages
      .map((m) => {
        if (m.sender === 'user') return `User: ${m.text}`;
        return `Setu AI: ${m.data?.leadTitle} - ${m.data?.leadHighlight}`;
      })
      .join('\n\n');
    navigator.clipboard?.writeText(transcript);
    alert('Conversation copied to clipboard.');
    setIsMoreMenuOpen(false);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      handleSendMessage(transcript);
    };
    recognition.start();
  };

  const handleProductClick = (slug) => {
    onClose();
    navigate(`/hardware/${slug}`);
  };

  return (
    <>
      {/* ── Dark Backdrop Overlay ── */}
      <div
        className={`gemini-side-overlay ${isOpen ? 'gemini-side-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* ── Google Gemini-Style Right-Hand Side Panel ── */}
      <aside
        className={`gemini-side-panel ${isOpen ? 'gemini-side-panel--open' : ''}`}
        aria-label="Setu AI Assistant"
        aria-hidden={!isOpen}
      >
        {/* ── Top Bar (Clean, Minimalist: Only ⋮ and ✕) ── */}
        <div className="gemini-panel-header">
          <div className="gemini-header-left">
            {messages.length > 0 && (
              <button
                type="button"
                className="gemini-header-new-btn"
                onClick={handleNewChat}
                title="New chat"
                aria-label="New chat"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>New chat</span>
              </button>
            )}
          </div>

          <div className="gemini-header-actions">
            {/* Options Menu ⋮ */}
            <div className="gemini-menu-container" ref={moreMenuRef}>
              <button
                type="button"
                className="gemini-icon-btn"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                title="More options"
                aria-label="Options"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.8" />
                  <circle cx="12" cy="12" r="1.8" />
                  <circle cx="12" cy="19" r="1.8" />
                </svg>
              </button>

              {isMoreMenuOpen && (
                <div className="gemini-popup-menu">
                  <button type="button" onClick={handleNewChat}>
                    <span className="gemini-popup-icon">✦</span>
                    <span>New chat</span>
                  </button>
                  {messages.length > 0 && (
                    <button type="button" onClick={handleCopyChat}>
                      <span className="gemini-popup-icon">📋</span>
                      <span>Copy chat</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setShowContextChip(true);
                      setIsMoreMenuOpen(false);
                    }}
                  >
                    <span className="gemini-popup-icon">🌐</span>
                    <span>Reset page sharing</span>
                  </button>
                  <button type="button" onClick={() => { setIsMoreMenuOpen(false); onClose(); }}>
                    <span className="gemini-popup-icon">✕</span>
                    <span>Close</span>
                  </button>
                </div>
              )}
            </div>

            {/* Close Button ✕ */}
            <button
              type="button"
              className="gemini-icon-btn gemini-icon-btn--close"
              onClick={onClose}
              title="Close panel"
              aria-label="Close Setu AI panel"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Main Panel Content ── */}
        <div className="gemini-panel-content">
          {messages.length === 0 ? (
            /* ZERO STATE (Exact match to Google Gemini reference image) */
            <div className="gemini-zero-state">
              {/* Flexible spacer pushing the star to the upper-center */}
              <div className="gemini-zero-hero">
                <div className="gemini-star-container">
                  <svg
                    className="gemini-star-svg"
                    width="40"
                    height="40"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 0C14 7.732 7.732 14 0 14C7.732 14 14 20.268 14 28C14 20.268 20.268 14 28 14C20.268 14 14 7.732 14 0Z"
                      fill="url(#geminiGradZero)"
                    />
                    <defs>
                      <linearGradient id="geminiGradZero" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#1B6EF3" />
                        <stop offset="35%" stopColor="#7B57FF" />
                        <stop offset="70%" stopColor="#D96570" />
                        <stop offset="100%" stopColor="#F9AB00" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h2 className="gemini-ready-text">Ready when you are</h2>
              </div>

              {/* Bottom-anchored Prompt Pills Stack */}
              <div className="gemini-pills-stack">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="gemini-pill-btn"
                    onClick={() => handleSendMessage(prompt.query)}
                  >
                    <span className="gemini-pill-btn__icon">{prompt.icon}</span>
                    <span className="gemini-pill-btn__text">{prompt.text}</span>
                    {prompt.badge && (
                      <span className="gemini-pill-btn__badge">{prompt.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* CONVERSATION STREAM */
            <div className="gemini-chat-stream">
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="gemini-msg gemini-msg--user">
                      <div className="gemini-user-bubble">{msg.text}</div>
                    </div>
                  );
                }

                const ai = msg.data;
                const matchedProducts = (ai.recommendedProductIds || [])
                  .map((id) => products.find((p) => p.id === id))
                  .filter(Boolean);

                return (
                  <div key={msg.id} className="gemini-msg gemini-msg--ai">
                    <div className="gemini-ai-row">
                      <div className="gemini-ai-star-badge">
                        <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                          <path
                            d="M14 0C14 7.732 7.732 14 0 14C7.732 14 14 20.268 14 28C14 20.268 20.268 14 28 14C20.268 14 14 7.732 14 0Z"
                            fill="url(#geminiGradMsg)"
                          />
                          <defs>
                            <linearGradient id="geminiGradMsg" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                              <stop offset="0%" stopColor="#1B6EF3" />
                              <stop offset="35%" stopColor="#7B57FF" />
                              <stop offset="70%" stopColor="#D96570" />
                              <stop offset="100%" stopColor="#F9AB00" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      <div className="gemini-ai-body">
                        {/* Title & Lead statement */}
                        <div className="gemini-ai-lead">
                          <p>
                            <strong className="gemini-ai-lead-title">{ai.leadTitle}</strong> is{' '}
                            <span className="gemini-ai-highlight">{ai.leadHighlight}</span>
                            {ai.citation1 && (
                              <span className="gemini-ai-cite">{ai.citation1}</span>
                            )}
                          </p>
                        </div>

                        {ai.paragraph2 && (
                          <p className="gemini-ai-para">
                            {ai.paragraph2}
                            {ai.citation2 && (
                              <span className="gemini-ai-cite">{ai.citation2}</span>
                            )}
                          </p>
                        )}

                        {ai.paragraph3 && (
                          <p className="gemini-ai-para">
                            {ai.paragraph3}
                            {ai.citation3 && (
                              <span className="gemini-ai-cite">{ai.citation3}</span>
                            )}
                          </p>
                        )}

                        {/* Hardware Specifications */}
                        {ai.requirements && ai.requirements.length > 0 && (
                          <div className="gemini-ai-specs">
                            <div className="gemini-ai-specs__title">{ai.requirementsTitle}</div>
                            <div className="gemini-ai-specs__list">
                              {ai.requirements.map((req, rIdx) => (
                                <div key={rIdx} className="gemini-ai-spec-row">
                                  <span className="gemini-ai-spec-bullet">●</span>
                                  <div className="gemini-ai-spec-info">
                                    <span className="gemini-ai-spec-name">
                                      {req.title}
                                      {req.badge && (
                                        <span className="gemini-ai-spec-badge">{req.badge}</span>
                                      )}
                                    </span>
                                    <span className="gemini-ai-spec-desc">{req.text}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Verified Hardware Cards */}
                        {matchedProducts.length > 0 && (
                          <div className="gemini-ai-products">
                            <div className="gemini-ai-products__label">Recommended Hardware</div>
                            <div className="gemini-ai-products__list">
                              {matchedProducts.map((prod) => (
                                <div key={prod.id} className="gemini-ai-product-card">
                                  <div className="gemini-ai-product-img-wrap">
                                    <img
                                      src={getAssetUrl(prod.image)}
                                      alt={prod.name}
                                      onError={(e) => {
                                        e.target.src = getAssetUrl('/images/hardware/advance-4wire.svg');
                                      }}
                                    />
                                  </div>
                                  <div className="gemini-ai-product-details">
                                    <div className="gemini-ai-product-brand">
                                      {prod.brand || 'Uffizio Certified'}
                                    </div>
                                    <div className="gemini-ai-product-name">{prod.name}</div>
                                    <div className="gemini-ai-product-foot">
                                      <span className="gemini-ai-product-price">
                                        ₹{prod.price?.toLocaleString('en-IN') || '690'}
                                      </span>
                                      <button
                                        type="button"
                                        className="gemini-ai-product-link"
                                        onClick={() => handleProductClick(prod.slug || prod.id)}
                                      >
                                        View Details →
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Follow-up suggestions */}
                        {ai.followUps && ai.followUps.length > 0 && (
                          <div className="gemini-ai-followups">
                            {ai.followUps.map((fu, fIdx) => (
                              <button
                                key={fIdx}
                                type="button"
                                className="gemini-followup-pill"
                                onClick={() => handleSendMessage(fu)}
                              >
                                {fu}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="gemini-msg gemini-msg--ai">
                  <div className="gemini-ai-row">
                    <div className="gemini-ai-star-badge gemini-ai-star-badge--pulse">
                      <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                        <path
                          d="M14 0C14 7.732 7.732 14 0 14C7.732 14 14 20.268 14 28C14 20.268 20.268 14 28 14C20.268 14 14 7.732 14 0Z"
                          fill="url(#geminiGradTyping)"
                        />
                        <defs>
                          <linearGradient id="geminiGradTyping" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#1B6EF3" />
                            <stop offset="35%" stopColor="#7B57FF" />
                            <stop offset="70%" stopColor="#D96570" />
                            <stop offset="100%" stopColor="#F9AB00" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="gemini-typing-text">
                      <span>Analyzing fleet requirements...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* ── Bottom Input Container (Google Gemini Two-Tier Style) ── */}
        <div className="gemini-panel-footer">
          <div className="gemini-input-box">
            {/* Top Row: Context Sharing Chip */}
            {showContextChip && (
              <div className="gemini-context-row">
                <div className="gemini-context-chip">
                  <span className="gemini-context-globe">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </span>
                  <span className="gemini-context-label">
                    Sharing "Setu – Telematics Marketplace by Uffizio"
                  </span>
                  <button
                    type="button"
                    className="gemini-context-dismiss"
                    onClick={() => setShowContextChip(false)}
                    title="Stop sharing page context"
                    aria-label="Dismiss context"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Row: Actions + Input + Model Switcher + Mic/Send */}
            <div className="gemini-input-row">
              <button
                type="button"
                className="gemini-input-add-btn"
                title="Add context or options"
                aria-label="Add"
                onClick={() => handleSendMessage('Explain AIS 140 compliance requirements')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              <input
                ref={inputRef}
                type="text"
                className="gemini-text-field"
                value={inputValue}
                placeholder="Type @ to add tabs or ask Setu AI..."
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Ask Setu AI"
              />

              <div className="gemini-input-end-controls">
                {/* Model Selector Dropdown (Flash / Pro) */}
                <div className="gemini-model-wrap" ref={modelMenuRef}>
                  <button
                    type="button"
                    className="gemini-model-btn"
                    onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                    title="Gemini Model"
                  >
                    <span>{selectedModel}</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isModelMenuOpen && (
                    <div className="gemini-model-popover">
                      <button
                        type="button"
                        className={`gemini-model-opt ${selectedModel === 'Flash' ? 'gemini-model-opt--selected' : ''}`}
                        onClick={() => { setSelectedModel('Flash'); setIsModelMenuOpen(false); }}
                      >
                        <div className="gemini-model-opt-name">✦ Flash</div>
                        <div className="gemini-model-opt-desc">Fast recommendations & real-time answers</div>
                      </button>
                      <button
                        type="button"
                        className={`gemini-model-opt ${selectedModel === 'Pro' ? 'gemini-model-opt--selected' : ''}`}
                        onClick={() => { setSelectedModel('Pro'); setIsModelMenuOpen(false); }}
                      >
                        <div className="gemini-model-opt-name">✦ Pro</div>
                        <div className="gemini-model-opt-desc">Deep telematics & regulatory reasoning</div>
                      </button>
                    </div>
                  )}
                </div>

                {/* Voice / Mic / Send Button */}
                {inputValue.trim() ? (
                  <button
                    type="button"
                    className="gemini-send-round-btn"
                    onClick={() => handleSendMessage()}
                    title="Send (Enter)"
                    aria-label="Send message"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="gemini-mic-round-btn"
                    onClick={handleVoiceInput}
                    title="Voice input"
                    aria-label="Voice input"
                  >
                    {/* Authentic audio waveform bars matching Gemini screenshot 川 */}
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <line x1="7" y1="10" x2="7" y2="14" />
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="17" y1="9" x2="17" y2="15" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
