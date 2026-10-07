import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import { getAssetUrl } from '../../utils/assetUrl';
import './SetuAIChat.css';

/* ────────────────────────────────────────────────────────────
   KNOWLEDGE BASE FOR SETU 1-ON-1 FLEET AI CHAT
   Matches Reference Screenshot: media_1791365096409.png
──────────────────────────────────────────────────────────── */
const KNOWLEDGE_RESPONSES = {
  ais140: {
    leadTitle: 'AIS 140 (Automotive Industry Standard 140)',
    leadHighlight: 'a mandatory government regulation in India that establishes technical and safety standards for Vehicle Location Tracking Devices (VLTDs) used in public transport and commercial fleets.',
    citation1: 'Wikipedia +1',
    paragraph2: 'Published by the Automotive Research Association of India (ARAI) under the Ministry of Road Transport and Highways (MoRTH), the law ensures enhanced passenger safety, robust vehicle tracking, and real-time emergency response capabilities.',
    citation2: 'Fleetx +1',
    paragraph3: 'Unlike consumer-grade GPS devices, an AIS 140 certified tracker must meet rigorous hardware and data-sharing guidelines to integrate directly with national security infrastructures.',
    citation3: 'Intangles +1',
    requirementsTitle: '🛠 Mandatory Hardware Requirements',
    requirementsSubtitle: 'To receive an official AIS 140 certification, a tracking device must feature:',
    requirements: [
      {
        title: 'Dual Satellite Tracking',
        text: "Must support both standard Global Positioning System (GPS) and NavIC (India's indigenous satellite navigation system developed by ISRO).",
        badge: 'Navionyx +1'
      },
      {
        title: 'Physical Panic/SOS Button',
        text: 'A hard-wired emergency button accessible to passengers and drivers. Software or app-based triggers are not legally compliant.',
        badge: 'Fleetx'
      },
      {
        title: 'Dual IP Data Transmission',
        text: 'The ability to transmit live location and telemetry data simultaneously to two distinct IP addresses (such as a private fleet management server and a government regulatory system).',
        badge: 'AVLView +1'
      },
      {
        title: 'Embedded SIM (eSIM)',
        text: 'A secure, built-in network profile featuring multi-carrier data roaming to prevent signal dead zones across Indian highways.',
        badge: 'Telecom +1'
      },
      {
        title: 'Internal Battery Backup',
        text: 'Minimum 4-hour internal rechargeable battery ensuring continuous tracking and emergency SOS alert dispatch even if main vehicle battery is disconnected.',
        badge: 'ICAT +1'
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
  }
};

function getAIResponse(userText) {
  const q = (userText || '').toLowerCase().trim();

  if (q.includes('140') || q.includes('asi') || q.includes('ais') || q.includes('rto') || q.includes('morth') || q.includes('mandat') || q.includes('panic') || q.includes('sos')) {
    return KNOWLEDGE_RESPONSES.ais140;
  }
  if (q.includes('fuel') || q.includes('theft') || q.includes('diesel') || q.includes('sensor') || q.includes('drain')) {
    return KNOWLEDGE_RESPONSES.fuel;
  }
  if (q.includes('camera') || q.includes('dashcam') || q.includes('dms') || q.includes('adas') || q.includes('video') || q.includes('fatigue') || q.includes('drowsy')) {
    return KNOWLEDGE_RESPONSES.dashcam;
  }
  if (q.includes('lock') || q.includes('cargo') || q.includes('container') || q.includes('e-lock') || q.includes('elock')) {
    return KNOWLEDGE_RESPONSES.cargo;
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

export default function SetuAIChat({ isOpen, onClose, initialQuery }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize with initialQuery when modal opens
  useEffect(() => {
    if (isOpen) {
      const startQuery = initialQuery?.trim() || 'what is ASI 140?';
      const aiData = getAIResponse(startQuery);
      setMessages([
        { id: 1, sender: 'user', text: startQuery },
        { id: 2, sender: 'ai', data: aiData }
      ]);
      setInputValue('');
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 200);
    }
  }, [isOpen, initialQuery]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

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

  const handleSwitchToSearch = () => {
    onClose();
    const lastUserQuery = [...messages].reverse().find((m) => m.sender === 'user')?.text || initialQuery || 'what is ASI 140?';
    navigate(`/hardware?search=${encodeURIComponent(lastUserQuery)}`);
  };

  return (
    <div className="setu-ai-chat-overlay" onClick={onClose}>
      <div className="setu-ai-chat-window" onClick={(e) => e.stopPropagation()}>
        
        {/* ── Top Header with Tabs: AI Mode (active) & All (Search) ── */}
        <div className="setu-ai-chat-header">
          <div className="setu-ai-chat-tabs">
            <button
              type="button"
              className="setu-ai-chat-tab setu-ai-chat-tab--active"
              title="1-on-1 AI Conversation Mode"
            >
              <span className="setu-ai-chat-tab__sparkle">✦</span>
              <span>AI Mode</span>
            </button>
            <button
              type="button"
              className="setu-ai-chat-tab"
              onClick={handleSwitchToSearch}
              title="Switch to all product search results"
            >
              <span>All (Search Results)</span>
            </button>
          </div>

          <button
            type="button"
            className="setu-ai-chat-close-btn"
            onClick={onClose}
            aria-label="Close AI Chat"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* ── Chat Messages Scroll Body ── */}
        <div className="setu-ai-chat-body">
          {messages.map((msg) => {
            if (msg.sender === 'user') {
              return (
                <div key={msg.id} className="setu-ai-msg-row setu-ai-msg-row--user">
                  <div className="setu-ai-user-bubble">
                    <span>{msg.text}</span>
                  </div>
                </div>
              );
            }

            const ai = msg.data;
            const matchedProducts = (ai.recommendedProductIds || [])
              .map((id) => products.find((p) => p.id === id || p.slug === id))
              .filter(Boolean);

            return (
              <div key={msg.id} className="setu-ai-msg-row setu-ai-msg-row--ai">
                <div className="setu-ai-card">
                  {/* Lead definition with blue highlight pill */}
                  <div className="setu-ai-lead-block">
                    <p className="setu-ai-lead-text">
                      <strong>{ai.leadTitle}</strong> is{' '}
                      <span className="setu-ai-highlight-pill">{ai.leadHighlight}</span>
                      {ai.citation1 && (
                        <span className="setu-ai-cite-badge">{ai.citation1}</span>
                      )}
                    </p>
                  </div>

                  {/* Supporting paragraphs */}
                  {ai.paragraph2 && (
                    <p className="setu-ai-para">
                      {ai.paragraph2}
                      {ai.citation2 && (
                        <span className="setu-ai-cite-badge">{ai.citation2}</span>
                      )}
                    </p>
                  )}

                  {ai.paragraph3 && (
                    <p className="setu-ai-para">
                      {ai.paragraph3}
                      {ai.citation3 && (
                        <span className="setu-ai-cite-badge">{ai.citation3}</span>
                      )}
                    </p>
                  )}

                  {/* Section: Mandatory Hardware Requirements */}
                  {ai.requirements && ai.requirements.length > 0 && (
                    <div className="setu-ai-reqs-section">
                      <h4 className="setu-ai-reqs-title">{ai.requirementsTitle}</h4>
                      <p className="setu-ai-reqs-subtitle">{ai.requirementsSubtitle}</p>

                      <ul className="setu-ai-reqs-list">
                        {ai.requirements.map((req, idx) => (
                          <li key={idx} className="setu-ai-reqs-item">
                            <span className="setu-ai-reqs-dot">●</span>
                            <div className="setu-ai-reqs-content">
                              <strong>{req.title}:</strong> {req.text}{' '}
                              {req.badge && (
                                <span className="setu-ai-cite-badge">{req.badge}</span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommended hardware devices from Setu catalog */}
                  {matchedProducts.length > 0 && (
                    <div className="setu-ai-products-section">
                      <span className="setu-ai-products-heading">
                        VERIFIED SETU HARDWARE FOR THIS MANDATE:
                      </span>
                      <div className="setu-ai-products-grid">
                        {matchedProducts.map((prod) => (
                          <div
                            key={prod.id}
                            className="setu-ai-product-card"
                            onClick={() => {
                              onClose();
                              navigate(`/hardware/${prod.slug}`);
                            }}
                          >
                            <div className="setu-ai-product-thumb">
                              <img src={getAssetUrl(prod.image)} alt={prod.name} />
                            </div>
                            <div className="setu-ai-product-info">
                              <span className="setu-ai-product-badge">
                                {prod.compliance || 'Govt Certified'}
                              </span>
                              <strong className="setu-ai-product-title">{prod.name}</strong>
                              <span className="setu-ai-product-price">
                                ₹{prod.price?.toLocaleString('en-IN')} + GST
                              </span>
                            </div>
                            <button
                              type="button"
                              className="setu-ai-product-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                                navigate(`/hardware/${prod.slug}`);
                              }}
                            >
                              View Product →
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="setu-ai-view-all-results-btn"
                        onClick={handleSwitchToSearch}
                      >
                        Show all matching products in catalog →
                      </button>
                    </div>
                  )}

                  {/* Follow-up question chips */}
                  {ai.followUps && ai.followUps.length > 0 && (
                    <div className="setu-ai-followups">
                      <span className="setu-ai-followups-label">Suggested follow-ups:</span>
                      <div className="setu-ai-followups-chips">
                        {ai.followUps.map((fu, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className="setu-ai-followup-chip"
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
            <div className="setu-ai-msg-row setu-ai-msg-row--ai">
              <div className="setu-ai-typing-indicator">
                <span className="setu-ai-sparkle-spin">✦</span>
                <span>Setu AI is analyzing fleet requirements...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* ── Fixed Bottom Input Bar matching Reference Image 2 ── */}
        <div className="setu-ai-chat-footer">
          <div className="setu-ai-chat-input-pill">
            <button
              type="button"
              className="setu-ai-input-action-btn"
              title="Add attachment / filter"
              onClick={handleSwitchToSearch}
            >
              +
            </button>

            <input
              ref={inputRef}
              type="text"
              className="setu-ai-chat-input"
              value={inputValue}
              placeholder="Ask anything..."
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Ask Setu AI anything"
            />

            <button
              type="button"
              className="setu-ai-input-action-btn"
              onClick={handleVoiceInput}
              title="Speak with voice"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="22" />
              </svg>
            </button>

            <button
              type="button"
              className="setu-ai-chat-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              title="Send question"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
