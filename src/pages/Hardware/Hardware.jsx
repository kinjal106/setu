import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import products from '../../data/products.json';
import categories from '../../data/categories.json';
import { getAssetUrl } from '../../utils/assetUrl';
import './Hardware.css';

/* ── AI Overview Topics Knowledge Base (Matches Reference Images 1 & 2) ── */
const AI_OVERVIEW_TOPICS = [
  {
    triggers: ['ais', 'asi', '140', 'ais-140', 'mandate', 'vts', 'rto', 'emergency button', 'panic button'],
    title: 'AIS 140 Intelligent Transportation & Passenger Safety Standard',
    summary: 'AIS 140 (Automotive Industry Standard 140) is a government regulation in India that mandates vehicle tracking systems (VTS) and emergency buttons (panic buttons) for all commercial vehicles, public transport, and school buses.',
    bullets: [
      'Dual Satellite Positioning: High-precision GNSS GPS + Indian NavIC (IRNSS) tracking under all weather conditions.',
      'Emergency SOS Panic Button: Directly transmits distress alerts to state emergency monitoring centers (112) and fleet dispatchers.',
      'Dual IP Reporting: Simultaneously streams real-time telemetry to the government MoRTH portal and private fleet management software.',
      'Embedded eSIM with Multi-Network Roaming: Auto-connects across Airtel, Jio, and Vi to ensure zero dead-zone operation on highways.',
      'Internal Battery Backup: Minimum 4 hours of autonomous operation with immediate alerts if the vehicle battery is disconnected.'
    ],
    source: {
      title: 'Automotive Industry Standard 140 - Wikipedia',
      domain: 'wikipedia.org',
      url: 'https://en.wikipedia.org/wiki/AIS_140'
    },
    faqs: [
      {
        question: 'What is the penalty for not having AIS 140 in India?',
        answer: 'Under Section 190(2) of the Motor Vehicles Act, operating a commercial vehicle without an active, certified AIS-140 device carries a fine of up to ₹10,000, suspension of the commercial vehicle permit, and refusal to renew the annual fitness certificate.'
      },
      {
        question: 'Which vehicles are required to install AIS 140 devices?',
        answer: 'All public service vehicles including city and interstate buses, taxis, ride-hailing cabs, school/college buses, hazardous chemicals & fuel tankers, and mining haulage trucks are legally mandated to have AIS 140 devices.'
      },
      {
        question: 'How does the AIS 140 panic button work?',
        answer: 'When a passenger or driver presses the panic button, the device transmits immediate high-priority emergency packets with live GPS coordinates, vehicle speed, and timestamp to the state emergency response center (112) and fleet management platform.'
      },
      {
        question: 'What is the difference between standard GPS and AIS 140 GPS?',
        answer: 'Standard GPS only sends location to a commercial tracking server. AIS 140 devices are government-certified by ARAI/ICAT, have NavIC satellite receivers, dual-IP streaming to government servers, physical panic buttons, and 4-hour battery backup.'
      }
    ]
  },
  {
    triggers: ['fuel', 'diesel', 'theft', 'sensor', 'lls', 'siphon'],
    title: 'Precision Capacitive & Ultrasonic Fuel Level Monitoring',
    summary: 'Commercial fuel monitoring systems use digital capacitive probes or bottom-mounted ultrasonic sensors to measure diesel volume with 99.5% accuracy, triggering immediate alarms upon unauthorized siphoning or tank cap opening.',
    bullets: [
      '99.5% Fuel Precision: Continuous level reporting regardless of terrain slope or vehicle motion.',
      'Anti-Theft Drop Alerts: Real-time SMS and app alarms within 30 seconds of rapid fuel loss.',
      'Wireless BLE 5.0 Connectivity: Eliminates fuel tank drilling wires, ensuring spark-free safety and rapid installation.'
    ],
    source: {
      title: 'Fuel Level Sensor & Telematics Telemetry Guide',
      domain: 'setu.uffizio.com',
      url: '#'
    },
    faqs: [
      {
        question: 'How does the fuel sensor detect diesel theft in parked trucks?',
        answer: 'The sensor monitors fuel height continuously. If fuel levels drop by more than 2-3 liters without the vehicle engine running, an instant anti-theft alert is dispatched to the fleet manager.'
      },
      {
        question: 'Can I install a fuel sensor without drilling the fuel tank?',
        answer: 'Yes! Non-invasive ultrasonic fuel sensors attach to the exterior bottom of the diesel tank with high-strength epoxy, reading levels through sound waves without requiring tank modification.'
      }
    ]
  },
  {
    triggers: ['camera', 'dashcam', 'adas', 'dms', 'video', 'fatigue', 'collision'],
    title: 'AI Video Telematics, ADAS & Driver Monitoring System',
    summary: 'AI dual-facing dashcams integrate computer vision to monitor driver alertness (PERCLOS, yawning, mobile usage) while scanning the roadway for forward collisions, pedestrian crossings, and lane departures.',
    bullets: [
      'DMS Driver Fatigue Detection: In-cabin infrared camera alerts drowsy or distracted drivers with instant voice warnings.',
      'ADAS Active Safety: Millisecond warnings for forward vehicle proximity and unexpected lane drift.',
      'Automatic Cloud Video Evidence: 10-second high-definition clips are uploaded directly to the cloud upon harsh braking or impact.'
    ],
    source: {
      title: 'Commercial AI Dashcam & Video Telematics Standards',
      domain: 'setu.uffizio.com',
      url: '#'
    },
    faqs: [
      {
        question: 'Does the AI camera record in complete darkness inside the cabin?',
        answer: 'Yes, infrared (IR) night vision illuminates the driver cabin in pitch-black conditions without causing glare or disturbing the driver.'
      },
      {
        question: 'Can fleet dispatchers watch live video from the vehicle?',
        answer: 'Yes, 4G LTE Cat 1/Cat 4 connectivity enables on-demand high-definition live streaming with two-way audio from the Setu dashboard.'
      }
    ]
  }
];

const STOP_WORDS = new Set([
  'what', 'is', 'are', 'the', 'a', 'an', 'in', 'on', 'with', 'and', 'or', 'for', 'how', 'does',
  'do', 'can', 'to', 'of', 'about', 'tell', 'me', 'device', 'devices', 'hardware', 'solution',
  'solutions', 'find', 'search', 'which', 'where', 'get', 'buy', 'need', 'please'
]);


const BRAND_ORDER = [
  'M Series',
  'T98 Series',
  'BR Series',
  'LLS Series',
  'Magnet Series',
  'Mercetech',
  'EC Series',
  'Eco5 Series'
];

/* ── Filter Tree matching reference image ── */
function FilterTree({ categories, selected, onChange }) {
  // By default, close all categories. Only expand categories with active selections.
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    (categories || []).forEach(cat => {
      const isCatSelected = selected.has(cat.id);
      const hasChildSelected = cat.children && cat.children.some(c => selected.has(c.id));
      init[cat.id] = isCatSelected || hasChildSelected;
    });
    return init;
  });

  // When selection changes or categories update, expand any category that has active selections
  useEffect(() => {
    if (categories && categories.length > 0) {
      setExpanded(prev => {
        const next = { ...prev };
        categories.forEach(cat => {
          const isCatSelected = selected.has(cat.id);
          const hasChildSelected = cat.children && cat.children.some(c => selected.has(c.id));
          if (isCatSelected || hasChildSelected) {
            next[cat.id] = true;
          } else if (selected.size === 0) {
            // When all selections are cleared, close all categories back to default
            next[cat.id] = false;
          }
        });
        return next;
      });
    }
  }, [categories, selected]);

  const toggleExpand = (catId, e) => {
    e?.stopPropagation();
    setExpanded(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleCategory = (cat) => {
    const isCatSelected = selected.has(cat.id);
    const childIds = (cat.children || []).map(c => c.id);

    onChange(prev => {
      const next = new Set(prev);
      if (isCatSelected) {
        next.delete(cat.id);
        childIds.forEach(id => next.delete(id));
      } else {
        next.add(cat.id);
        childIds.forEach(id => next.add(id));
      }
      return next;
    });

    if (!isCatSelected && cat.children?.length) {
      setExpanded(exp => ({ ...exp, [cat.id]: true }));
    }
  };

  const toggleSubcategory = (cat, childId, e) => {
    e.stopPropagation();
    setExpanded(exp => ({ ...exp, [cat.id]: true }));
    onChange(prev => {
      const next = new Set(prev);
      if (next.has(childId)) {
        next.delete(childId);
        next.delete(cat.id);
      } else {
        next.add(childId);
        const allChildrenSelected = cat.children?.every(c => c.id === childId || next.has(c.id));
        if (allChildrenSelected) {
          next.add(cat.id);
        }
      }
      return next;
    });
  };

  return (
    <div className="filter-tree">
      <div className="filter-tree__head">
        <span className="filter-tree__title">CATEGORIES</span>
        {selected.size > 0 && (
          <button 
            type="button" 
            className="filter-tree__reset-btn"
            onClick={() => onChange(new Set())}
          >
            Clear
          </button>
        )}
      </div>

      <div className="filter-tree__list">
        {categories.map(cat => {
          const isCatSelected = selected.has(cat.id);
          const hasChildSelected = cat.children && cat.children.some(c => selected.has(c.id));
          const isActive = isCatSelected || hasChildSelected;
          const isExpanded = !!expanded[cat.id];
          return (
            <div key={cat.id} className="fgroup">
              <div 
                className={`fgroup__row ${isActive ? 'fgroup__row--active' : ''}`}
                onClick={() => toggleCategory(cat)}
              >
                <label className="fcheck" onClick={e => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={isCatSelected} 
                    onChange={() => toggleCategory(cat)} 
                  />
                  <span className="fcheck__box" />
                </label>

                <span className="fgroup__label">{cat.label}</span>

                <span className="fgroup__arrow-slot">
                  {cat.children && cat.children.length > 0 && (
                    <button 
                      type="button"
                      className={`fgroup__arrow ${isExpanded ? 'fgroup__arrow--open' : ''}`}
                      onClick={(e) => toggleExpand(cat.id, e)}
                      aria-label={`Toggle ${cat.label} subcategories`}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                  )}
                </span>
              </div>

              {isExpanded && cat.children && (
                <div className="fgroup__children">
                  {cat.children.map(child => (
                    <div 
                      key={child.id} 
                      className={`fchild ${selected.has(child.id) ? 'fchild--active' : ''}`}
                      onClick={(e) => toggleSubcategory(cat, child.id, e)}
                    >
                      <label className="fcheck" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={selected.has(child.id)} 
                          onChange={(e) => toggleSubcategory(cat, child.id, e)} 
                        />
                        <span className="fcheck__box fcheck__box--sm" />
                      </label>
                      <span className="fchild__label">{child.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Brand Filter Component matching media_1791179790288.png ── */
function BrandFilter({ selected, onChange }) {
  const brandList = useMemo(() => {
    const counts = {};
    products.forEach(p => {
      if (p.brand) {
        counts[p.brand] = (counts[p.brand] || 0) + 1;
      }
    });

    const items = [];
    BRAND_ORDER.forEach(b => {
      items.push({ name: b, count: counts[b] || 0 });
    });

    Object.keys(counts).forEach(b => {
      if (!BRAND_ORDER.includes(b)) {
        items.push({ name: b, count: counts[b] });
      }
    });

    return items;
  }, []);

  const toggleBrand = (brandName) => {
    onChange(prev => {
      const next = new Set(prev);
      if (next.has(brandName)) {
        next.delete(brandName);
      } else {
        next.add(brandName);
      }
      return next;
    });
  };

  return (
    <div className="filter-brand">
      <div className="filter-brand__head">
        <span className="filter-brand__title">BRAND</span>
        {selected.size > 0 && (
          <button 
            type="button" 
            className="filter-brand__reset-btn"
            onClick={() => onChange(new Set())}
          >
            Clear
          </button>
        )}
      </div>

      <div className="filter-brand__list">
        {brandList.map(b => {
          const isSelected = selected.has(b.name);
          return (
            <div 
              key={b.name} 
              className={`fgroup__row ${isSelected ? 'fgroup__row--active' : ''}`}
              onClick={() => toggleBrand(b.name)}
            >
              <label className="fcheck" onClick={e => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  checked={isSelected} 
                  onChange={() => toggleBrand(b.name)} 
                />
                <span className="fcheck__box" />
              </label>
              <span className="fgroup__label">{b.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Product Card Component matching media_1791179790288.png ── */
function ProductCard({ product, isLowest, onClick }) {
  const [imgError, setImgError] = useState(false);

  const basePrice = Number(product.price || product.pricingPlans?.[0]?.price || 599);
  const wholePrice = Math.floor(basePrice).toLocaleString('en-IN');
  const decimalPart = basePrice % 1 === 0 ? '00' : (basePrice % 1).toFixed(2).slice(2);

  const displayTags = product.tags && product.tags.length > 0
    ? product.tags
    : (product.features && product.features.length > 0 ? product.features.slice(0, 2) : ['Live tracking']);

  return (
    <div className="pcard-ref" onClick={onClick}>
      {/* Left image container */}
      <div className="pcard-ref__img-box">
        {(isLowest || product.isLowest) && <span className="pcard-ref__badge">Lowest price</span>}
        <div className="pcard-ref__img-center">
          {product.image && !imgError ? (
            <img
              src={getAssetUrl(product.image)}
              alt={product.name}
              className="pcard-ref__img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="pcard-ref__placeholder">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
                <circle cx="12" cy="14" r="2"/>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Right details container */}
      <div className="pcard-ref__info">
        <div className="pcard-ref__content">
          <h3 className="pcard-ref__title">{product.name}</h3>

          {product.shortDescription && (
            <p className="pcard-ref__desc">{product.shortDescription}</p>
          )}

          {/* Feature Badges / Pills */}
          {displayTags && displayTags.length > 0 && (
            <div className="pcard-ref__tags">
              {displayTags.map((tag, idx) => (
                <span key={idx} className="pcard-ref__tag-pill">{tag}</span>
              ))}
            </div>
          )}

          {/* Price display row */}
          <div className="pcard-ref__price-row">
            <span className="pcard-ref__currency">₹</span>
            <span className="pcard-ref__amount">{wholePrice}</span>
            <span className="pcard-ref__super">{decimalPart}</span>
            <span className="pcard-ref__gst">+ GST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hardware Page ── */
export default function Hardware() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearch = searchParams.get('search') || searchParams.get('q') || '';
  const urlCat = searchParams.get('category') || '';
  const urlSub = searchParams.get('sub') || '';

  const getInitialSelection = () => {
    if (urlSub) return new Set([urlSub]);
    if (urlCat && urlCat !== 'all') {
      const cat = categories.find(c => c.id === urlCat);
      if (cat) {
        const ids = [cat.id];
        if (cat.children) cat.children.forEach(c => ids.push(c.id));
        return new Set(ids);
      }
      return new Set([urlCat]);
    }
    return new Set();
  };

  const [selected, setSelected] = useState(getInitialSelection);
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [search, setSearch] = useState(urlSearch);
  const [ignoreTypo, setIgnoreTypo] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setSearch(urlSearch);
    setIgnoreTypo(false);
  }, [urlSearch]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (urlSub) {
      setSelected(new Set([urlSub]));
    } else if (urlCat && urlCat !== 'all') {
      const cat = categories.find(c => c.id === urlCat);
      if (cat) {
        const ids = [cat.id];
        if (cat.children) cat.children.forEach(c => ids.push(c.id));
        setSelected(new Set(ids));
      } else {
        setSelected(new Set([urlCat]));
      }
    } else {
      setSelected(new Set());
    }
  }, [urlCat, urlSub]);

  // Check for typo in query (e.g. 'ASI' -> 'AIS')
  const hasTypo = useMemo(() => {
    if (ignoreTypo || !search.trim()) return false;
    return /\basi\b/i.test(search);
  }, [search, ignoreTypo]);

  const correctedQuery = useMemo(() => {
    return search.replace(/\basi\b/gi, 'AIS');
  }, [search]);

  // Find matching AI Overview topic
  const overviewTopic = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    for (const topic of AI_OVERVIEW_TOPICS) {
      if (topic.triggers.some(t => q.includes(t))) {
        return topic;
      }
    }
    return null;
  }, [search]);



  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      navigate(`/hardware?search=${encodeURIComponent(transcript)}`);
    };
    recognition.start();
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (!search.trim()) {
      navigate('/hardware');
      return;
    }
    navigate(`/hardware?search=${encodeURIComponent(search.trim())}`);
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(prev => prev === idx ? null : idx);
  };

  // Product filtering with typo correction & stop words
  const filtered = useMemo(() => {
    return products.filter(p => {
      // 1. Keyword search filter
      const q = search.trim().toLowerCase();
      let matchQ = true;
      if (q) {
        let normalizedQ = q;
        if (!ignoreTypo && /\basi\b/i.test(normalizedQ)) {
          normalizedQ = normalizedQ.replace(/\basi\b/gi, 'ais');
        }

        const rawTokens = normalizedQ.replace(/[^\w\s-]/g, ' ').split(/\s+/).filter(Boolean);
        const keywords = rawTokens.filter(t => !STOP_WORDS.has(t));
        const tokensToUse = keywords.length > 0 ? keywords : rawTokens;

        const searchable = [
          p.name,
          p.slug,
          p.category,
          p.subcategory,
          p.brand || '',
          p.shortDescription || '',
          ...(p.features || []),
          ...(p.tags || [])
        ].join(' ').toLowerCase();

        matchQ = p.name.toLowerCase().includes(q) || tokensToUse.every(token => {
          const mappedToken = (!ignoreTypo && token === 'asi') ? 'ais' : token;
          return searchable.includes(mappedToken);
        });
      }
      if (!matchQ) return false;

      // 2. Category selection filter
      if (selected.size > 0) {
        const matchCat = selected.has(p.category) || selected.has(p.subcategory);
        if (!matchCat) return false;
      }

      // 3. Brand selection filter
      if (selectedBrands.size > 0) {
        if (!selectedBrands.has(p.brand)) return false;
      }

      return true;
    });
  }, [selected, selectedBrands, search, ignoreTypo]);

  const lowestPriceId = useMemo(() => {
    if (!filtered || filtered.length === 0) return null;
    let minPrice = Infinity;
    let minId = null;
    filtered.forEach(p => {
      const price = Number(p.price || p.pricingPlans?.[0]?.price || Infinity);
      if (price < minPrice) {
        minPrice = price;
        minId = p.id;
      }
    });
    return minId;
  }, [filtered]);

  return (
    <div className="hw-page">
      <div className="hw-unified-card">
        {/* ── Left Filter Panel ── */}
        <aside className="hw-filters">
          <FilterTree categories={categories} selected={selected} onChange={setSelected} />
          <BrandFilter selected={selectedBrands} onChange={setSelectedBrands} />
        </aside>

        {/* ── Right Main Content (Google-style Search & AI Overview) ── */}
        <main className="hw-main">
          {/* ── Google Search Bar & Tabs (Reference Image 1) ── */}
          <div className="hw-google-search-section">
            <form className="hw-google-search-bar" onSubmit={handleSearchSubmit}>
              <div className="hw-google-search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>

              <input
                type="text"
                className="hw-google-search-input"
                placeholder="Search hardware, devices or ask anything..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search hardware or ask anything"
              />

              {search && (
                <button
                  type="button"
                  className="hw-google-search-clear"
                  onClick={() => {
                    setSearch('');
                    navigate('/hardware');
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}

              <button
                type="button"
                className="hw-google-search-mic"
                onClick={handleVoiceSearch}
                title="Search by voice"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </button>

              <button
                type="submit"
                className="hw-google-search-submit"
                title="Search hardware catalog"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </form>

            {/* Google Search Tabs */}
            <div className="hw-google-tabs-bar">
              <button
                type="button"
                className={`hw-google-tab ${activeTab === 'all' ? 'hw-google-tab--active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <span>All</span>
              </button>

              <button
                type="button"
                className="hw-google-tab"
                onClick={() => {
                  setSearch('AIS 140');
                  navigate('/hardware?search=AIS%20140');
                }}
              >
                <span>AIS-140 Certified</span>
              </button>

              <button
                type="button"
                className="hw-google-tab"
                onClick={() => {
                  navigate('/hardware?category=video-telematics');
                }}
              >
                <span>Video Telematics</span>
              </button>

              <button
                type="button"
                className="hw-google-tab"
                onClick={() => {
                  navigate('/hardware?category=fuel-sensors');
                }}
              >
                <span>Fuel Sensors</span>
              </button>
            </div>
          </div>

          {/* ── Scrollable Results Container ── */}
          <div className="hw-scrollable-content">

            {/* Typo Correction Banner (Reference Image 1: "Showing results for what is AIS 140?") */}
            {hasTypo && (
              <div className="hw-typo-banner">
                <span className="hw-typo-text">Showing results for </span>
                <button
                  type="button"
                  className="hw-typo-corrected"
                  onClick={() => {
                    setSearch(correctedQuery);
                    setIgnoreTypo(false);
                    navigate(`/hardware?search=${encodeURIComponent(correctedQuery)}`);
                  }}
                >
                  <strong>{correctedQuery}</strong>
                </button>
                <span className="hw-typo-sep">•</span>
                <span className="hw-typo-text">Search instead for </span>
                <button
                  type="button"
                  className="hw-typo-original"
                  onClick={() => setIgnoreTypo(true)}
                >
                  <em>{search}</em>
                </button>
              </div>
            )}

            {/* ── Google AI Overview Card (Reference Image 1) ── */}


            {/* ── Section Title: Matching Hardware Products ── */}
            <div className="hw-results-header">
              <h2 className="hw-results-title">
                <span>Matching Hardware Products</span>
                <span className="hw-results-count"> ({filtered.length})</span>
              </h2>
            </div>

            {/* ── Product List (Reference Image 1) ── */}
            <div className="hw-list-container">
              {filtered.length === 0 ? (
                <div className="product-grid__empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                  <p>No products found for "{search}"</p>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setSelected(new Set());
                      setSelectedBrands(new Set());
                      setSearch('');
                      navigate('/hardware');
                    }}
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                filtered.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isLowest={p.id === lowestPriceId}
                    onClick={() => navigate(`/hardware/${p.slug}`)}
                  />
                ))
              )}
            </div>

            {/* ── People Also Ask Accordion (Reference Image 1) ── */}
            {overviewTopic?.faqs && overviewTopic.faqs.length > 0 && (
              <div className="hw-paa-section">
                <h3 className="hw-paa-title">People also ask</h3>
                <div className="hw-paa-accordion">
                  {overviewTopic.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className={`hw-paa-item ${isOpen ? 'hw-paa-item--open' : ''}`}>
                        <button
                          type="button"
                          className="hw-paa-question"
                          onClick={() => toggleFaq(idx)}
                          aria-expanded={isOpen}
                        >
                          <span>{faq.question}</span>
                          <span className="hw-paa-arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </span>
                        </button>
                        {isOpen && (
                          <div className="hw-paa-answer">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
