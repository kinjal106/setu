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
   SUGGESTED QUESTIONS FOR GOOGLE GEMINI ZERO-STATE VIEW
──────────────────────────────────────────────────────────── */
const SUGGESTED_QUESTIONS = [
  {
    icon: '🇮🇳',
    title: 'What is AIS 140 and why is it mandatory?',
    desc: 'Government regulation, ICAT/ARAI certifications & compliant GPS trackers',
    query: 'What is AIS 140 and why is it mandatory for commercial vehicles in India?'
  },
  {
    icon: '⛽',
    title: 'How to prevent diesel fuel theft in trucks?',
    desc: 'Wireless BLE 5.0 sensors, 99.5% accuracy & instant 30-sec siphon alerts',
    query: 'How to prevent diesel fuel theft using sensors?'
  },
  {
    icon: '📹',
    title: 'Best AI dashcam for driver drowsiness & safety?',
    desc: 'Dual-lens ADAS + DMS night vision cameras with in-cabin collision alerts',
    query: 'What is the best AI dashcam for driver fatigue and road safety?'
  },
  {
    icon: '🔒',
    title: 'How does container GPS e-lock tamper protection work?',
    desc: 'IP68 steel wire seal, remote OTP unlock & customs bond cargo security',
    query: 'How does container GPS e-lock tamper protection work?'
  },
  {
    icon: '🛰',
    title: 'Which 4G tracker works best for fleet logistics?',
    desc: 'Multi-carrier roaming eSIM, 4-hour battery backup & cold chain BLE probes',
    query: 'Which 4G GPS tracker works best for commercial fleet logistics?'
  }
];

function getAIResponse(userText) {
  const q = (userText || '').toLowerCase().trim();

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
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize or handle incoming initialQuery
  useEffect(() => {
    if (isOpen) {
      if (activeInitialQuery && activeInitialQuery.trim()) {
        const startQuery = activeInitialQuery.trim();
        const aiData = getAIResponse(startQuery);
        setMessages([
          { id: 1, sender: 'user', text: startQuery },
          { id: 2, sender: 'ai', data: aiData }
        ]);
      } else {
        // Keep existing messages or let user start fresh from suggestions
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
    }, 600);
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
    if (inputRef.current) inputRef.current.focus();
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
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
      {/* ── Backdrop Overlay ── */}
      <div
        className={`setu-gemini-overlay ${isOpen ? 'setu-gemini-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* ── Google Gemini Right-Hand Side Panel ── */}
      <aside
        className={`setu-gemini-panel ${isOpen ? 'setu-gemini-panel--open' : ''}`}
        aria-label="Setu AI Assistant"
        aria-hidden={!isOpen}
      >
        {/* ── Top Header ── */}
        <div className="setu-gemini-header">
          <div className="setu-gemini-header__brand">
            <div className="setu-gemini-header__sparkle-wrap">
              <span className="setu-gemini-header__sparkle">✦</span>
            </div>
            <div className="setu-gemini-header__titles">
              <div className="setu-gemini-header__title-row">
                <span className="setu-gemini-header__title">Ask Setu AI</span>
                <span className="setu-gemini-header__badge">Fleet Intelligence</span>
              </div>
              <span className="setu-gemini-header__subtitle">Google Gemini-Powered Hardware Guidance</span>
            </div>
          </div>

          <div className="setu-gemini-header__actions">
            {messages.length > 0 && (
              <button
                type="button"
                className="setu-gemini-header__btn"
                onClick={handleNewChat}
                title="Start a new chat"
                aria-label="New chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="setu-gemini-header__btn-label">New chat</span>
              </button>
            )}

            <button
              type="button"
              className="setu-gemini-header__close-btn"
              onClick={onClose}
              title="Close panel (Esc)"
              aria-label="Close Setu AI panel"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Panel Body ── */}
        <div className="setu-gemini-body">
          {/* ZERO STATE: Welcoming Gemini Greeting & Suggested Questions */}
          {messages.length === 0 ? (
            <div className="setu-gemini-welcome">
              <div className="setu-gemini-welcome__hero">
                <div className="setu-gemini-welcome__icon-circle">
                  <span className="setu-gemini-welcome__sparkle">✦</span>
                </div>
                <h2 className="setu-gemini-welcome__title">
                  Hello, how can I help you find hardware?
                </h2>
                <p className="setu-gemini-welcome__desc">
                  Ask me about device specifications, Indian government AIS-140 compliance, fuel sensors, video telematics, or bulk pricing.
                </p>
              </div>

              <div className="setu-gemini-suggestions-section">
                <div className="setu-gemini-suggestions-heading">
                  <span className="setu-gemini-suggestions-sparkle">✦</span>
                  <span>Suggested questions to get started</span>
                </div>

                <div className="setu-gemini-suggestions-grid">
                  {SUGGESTED_QUESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="setu-gemini-suggestion-card"
                      onClick={() => handleSendMessage(item.query)}
                      title={item.title}
                    >
                      <div className="setu-gemini-suggestion-card__icon">{item.icon}</div>
                      <div className="setu-gemini-suggestion-card__content">
                        <div className="setu-gemini-suggestion-card__title">{item.title}</div>
                        <div className="setu-gemini-suggestion-card__desc">{item.desc}</div>
                      </div>
                      <span className="setu-gemini-suggestion-card__arrow">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* CONVERSATION STREAM */
            <div className="setu-gemini-conversation">
              {messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="setu-gemini-msg setu-gemini-msg--user">
                      <div className="setu-gemini-user-bubble">{msg.text}</div>
                    </div>
                  );
                }

                const ai = msg.data;
                const matchedProducts = (ai.recommendedProductIds || [])
                  .map((id) => products.find((p) => p.id === id))
                  .filter(Boolean);

                return (
                  <div key={msg.id} className="setu-gemini-msg setu-gemini-msg--ai">
                    <div className="setu-gemini-ai-card">
                      {/* AI Lead Title & Summary */}
                      <div className="setu-gemini-ai-lead">
                        <div className="setu-gemini-ai-avatar">✦</div>
                        <div className="setu-gemini-ai-lead-text">
                          <p>
                            <strong>{ai.leadTitle}</strong> is{' '}
                            <span className="setu-gemini-highlight">{ai.leadHighlight}</span>
                            {ai.citation1 && (
                              <span className="setu-gemini-cite">{ai.citation1}</span>
                            )}
                          </p>
                        </div>
                      </div>

                      {ai.paragraph2 && (
                        <p className="setu-gemini-para">
                          {ai.paragraph2}
                          {ai.citation2 && (
                            <span className="setu-gemini-cite">{ai.citation2}</span>
                          )}
                        </p>
                      )}

                      {ai.paragraph3 && (
                        <p className="setu-gemini-para">
                          {ai.paragraph3}
                          {ai.citation3 && (
                            <span className="setu-gemini-cite">{ai.citation3}</span>
                          )}
                        </p>
                      )}

                      {/* Mandatory Requirements / Specs */}
                      {ai.requirements && ai.requirements.length > 0 && (
                        <div className="setu-gemini-reqs">
                          <h4 className="setu-gemini-reqs__title">{ai.requirementsTitle}</h4>
                          <p className="setu-gemini-reqs__sub">{ai.requirementsSubtitle}</p>
                          <div className="setu-gemini-reqs__list">
                            {ai.requirements.map((req, rIdx) => (
                              <div key={rIdx} className="setu-gemini-req-item">
                                <span className="setu-gemini-req-dot">●</span>
                                <div className="setu-gemini-req-body">
                                  <div className="setu-gemini-req-header">
                                    <strong>{req.title}</strong>
                                    {req.badge && (
                                      <span className="setu-gemini-req-badge">{req.badge}</span>
                                    )}
                                  </div>
                                  <p>{req.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Matched Products Card Grid */}
                      {matchedProducts.length > 0 && (
                        <div className="setu-gemini-products">
                          <div className="setu-gemini-products__heading">
                            <span>Recommended Certified Hardware</span>
                          </div>
                          <div className="setu-gemini-products__grid">
                            {matchedProducts.map((prod) => (
                              <div key={prod.id} className="setu-gemini-product-card">
                                <div className="setu-gemini-product-thumb">
                                  <img
                                    src={getAssetUrl(prod.image)}
                                    alt={prod.name}
                                    onError={(e) => {
                                      e.target.src = getAssetUrl('/images/hardware/advance-4wire.svg');
                                    }}
                                  />
                                </div>
                                <div className="setu-gemini-product-info">
                                  <span className="setu-gemini-product-brand">
                                    {prod.brand || 'Uffizio Certified'}
                                  </span>
                                  <strong className="setu-gemini-product-title">{prod.name}</strong>
                                  <div className="setu-gemini-product-bottom">
                                    <span className="setu-gemini-product-price">
                                      ₹{prod.price?.toLocaleString('en-IN') || '690'}
                                    </span>
                                    <button
                                      type="button"
                                      className="setu-gemini-product-cta"
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

                      {/* Follow-up Questions */}
                      {ai.followUps && ai.followUps.length > 0 && (
                        <div className="setu-gemini-followups">
                          <span className="setu-gemini-followups__label">Suggested follow-ups:</span>
                          <div className="setu-gemini-followups__chips">
                            {ai.followUps.map((fu, fIdx) => (
                              <button
                                key={fIdx}
                                type="button"
                                className="setu-gemini-followup-chip"
                                onClick={() => handleSendMessage(fu)}
                              >
                                {fu}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="setu-gemini-msg setu-gemini-msg--ai">
                  <div className="setu-gemini-typing">
                    <span className="setu-gemini-typing__sparkle">✦</span>
                    <span>Setu AI is analyzing fleet requirements...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* ── Bottom Input Bar (Google Gemini Style) ── */}
        <div className="setu-gemini-footer">
          <div className="setu-gemini-input-pill">
            <button
              type="button"
              className="setu-gemini-input-action-btn"
              onClick={handleVoiceInput}
              title="Voice input"
              aria-label="Speak query"
            >
              🎤
            </button>

            <input
              ref={inputRef}
              type="text"
              className="setu-gemini-input"
              value={inputValue}
              placeholder="Ask Setu AI anything about telematics & hardware..."
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Ask Setu AI"
            />

            {inputValue && (
              <button
                type="button"
                className="setu-gemini-input-clear-btn"
                onClick={() => setInputValue('')}
                title="Clear"
              >
                ✕
              </button>
            )}

            <button
              type="button"
              className={`setu-gemini-send-btn ${inputValue.trim() ? 'setu-gemini-send-btn--active' : ''}`}
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              title="Send message (Enter)"
              aria-label="Send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>

          <p className="setu-gemini-disclaimer">
            Setu AI can provide telematics guidance. Verify official ARAI/ICAT certificates before deployment.
          </p>
        </div>
      </aside>
    </>
  );
}
