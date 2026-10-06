import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../../data/products.json';
import { getAssetUrl } from '../../utils/assetUrl';
import './SetuHome.css';

/* Animated search suggestions for typewriter effect */
const NORMAL_SEARCH_SUGGESTIONS = [
  "Search for BR06 GPS tracker...",
  "Find AIS-140 approved devices for transport...",
  "Search T5324 AI 4-channel MDVR recorder...",
  "Find fuel level sensors for commercial trucks...",
  "Search OBD-II plug-and-play vehicle trackers...",
  "Find waterproof asset & container e-locks..."
];

/* Custom typewriter hook */
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
        }, 55);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 28);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words, isEnabled]);

  return currentText;
}

/* Suggestions while typing */
const SEARCH_SUGGESTIONS_POOL = [
  { text: 'AIS-140 GPS Devices', query: 'AIS-140', category: 'Certified' },
  { text: 'BR06 4G Vehicle Tracker', query: 'BR06', category: 'GPS Tracker' },
  { text: 'AI Dashcam with ADAS & DMS', query: 'AI Dashcam', category: 'Video Telematics' },
  { text: 'T5324 SD Card MDVR', query: 'MDVR', category: 'Video System' },
  { text: 'SP BLE-4 Wireless Fuel Sensor', query: 'Fuel Sensor', category: 'Sensors' },
  { text: 'Eco5 Lite OBD GPS Tracker', query: 'OBD', category: 'Plug & Play' },
  { text: 'GL500 Container E-Lock Tracker', query: 'E-Lock', category: 'Logistics' },
  { text: 'PRITHVI 140 RTO Approved', query: 'PRITHVI 140', category: 'AIS-140' },
  { text: 'Falcon F1 4G AI Camera', query: 'Falcon F1', category: 'Dashcam' }
];

const DEFAULT_LAST_SEARCHES = [
  { text: 'BR06 4G Vehicle Tracker', query: 'BR06', category: 'GPS Tracker' },
  { text: 'AIS-140 GPS Devices', query: 'AIS-140', category: 'Certified' },
  { text: 'GL500 GPS E-Lock Tracker', query: 'GL500', category: 'Logistics' },
  { text: 'T5324 SD Card MDVR', query: 'MDVR', category: 'Video System' }
];

function getLastSearches() {
  try {
    const raw = localStorage.getItem('setu_last_searches');
    if (!raw) return DEFAULT_LAST_SEARCHES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    // fallback
  }
  return DEFAULT_LAST_SEARCHES;
}

function saveSearchTerm(term, category = 'Recent') {
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

const STOP_WORDS = new Set(['find', 'search', 'for', 'the', 'a', 'an', 'in', 'on', 'with', 'and', 'or', 'device', 'devices', 'approved', 'hardware']);

function getProductBadge(product) {
  if (product.subcategory === 'ais-gps-device' || product.name.includes('140')) {
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

/* ── Unified Search Component ── */
function SearchContainer() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastSearches, setLastSearches] = useState(getLastSearches);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleRecordSearch = (term, cat = 'Recent') => {
    const updated = saveSearchTerm(term, cat);
    if (updated) setLastSearches(updated);
  };

  // Typewriter animation active when query is empty and user not actively typing
  const animatedPlaceholder = useTypewriter(NORMAL_SEARCH_SUGGESTIONS, !query);

  // Smart multi-token search for hardware products
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
      const pFeatures = (p.features || []).join(' ').toLowerCase();

      // Direct match
      if (pName.includes(cleanQ) || pSlug.includes(cleanQ)) return true;

      const fullText = `${pName} ${pSlug} ${pCat} ${pSub} ${pDesc} ${pFeatures}`;
      return tokens.every(token => fullText.includes(token));
    }).slice(0, 5);
  }, [query]);

  // Suggestions based on user typing
  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return lastSearches.slice(0, 4);
    }
    const cleanTokens = q.replace(/[^\w\s-]/g, ' ').split(/\s+/).filter(Boolean).filter(t => !STOP_WORDS.has(t));
    const matches = SEARCH_SUGGESTIONS_POOL.filter(item => {
      const text = item.text.toLowerCase();
      const cat = item.category.toLowerCase();
      const queryKey = item.query.toLowerCase();
      if (text.includes(q) || queryKey.includes(q) || cat.includes(q)) return true;
      return cleanTokens.some(token => text.includes(token) || queryKey.includes(token));
    });
    return matches.slice(0, 4);
  }, [query, lastSearches]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    handleRecordSearch(query.trim(), 'Search');
    setIsDropdownOpen(false);
    navigate(`/hardware?q=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const handleSelectSuggestion = (suggestQuery, itemText, cat) => {
    handleRecordSearch(itemText || suggestQuery, cat || 'Recent');
    setQuery(suggestQuery);
    setIsDropdownOpen(true);
    inputRef.current?.focus();
  };

  return (
    <div className="search-section-wrap">
      {/* ── Search Container Card ── */}
      <div className={`search-container-card ${isFocused ? 'search-container-card--focused' : ''}`}>
        <div className="search-input-row">
          <div className="search-normal-wrap">
            <svg className="search-normal-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>

            <div className="search-field-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="search-field search-field--single"
                placeholder={animatedPlaceholder}
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => {
                  setIsFocused(true);
                  setIsDropdownOpen(true);
                }}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
              />
            </div>
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  setQuery('');
                  setIsDropdownOpen(false);
                  inputRef.current?.focus();
                }}
                title="Clear"
              >
                ×
              </button>
            )}
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="search-submit-btn"
            onClick={handleSubmit}
            disabled={!query.trim()}
            title="Search hardware"
            aria-label="Search hardware"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>

        {/* ── Live Dropdown for Search Suggestions & Matching Hardware ── */}
        {isDropdownOpen && (
          <div ref={dropdownRef} className="search-dropdown-menu">
            {/* Last Searches or Suggestions while typing */}
            {suggestions.length > 0 && (
              <div className="search-dropdown-section">
                <div className="search-dropdown-section-header">
                  {query.trim() ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  )}
                  <span>{query.trim() ? 'Search Suggestions' : 'Last Searches'}</span>
                  {!query.trim() && lastSearches.length > 0 && (
                    <button
                      type="button"
                      className="search-dropdown-clear-history-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        try {
                          localStorage.removeItem('setu_last_searches');
                        } catch(err) {}
                        setLastSearches([]);
                      }}
                      title="Clear search history"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="search-dropdown-suggestions-list">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="search-dropdown-suggest-btn"
                      onClick={() => handleSelectSuggestion(sug.query, sug.text, sug.category)}
                    >
                      <span className="search-dropdown-suggest-text">{sug.text}</span>
                      <span className="search-dropdown-suggest-tag">{sug.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Hardware Results Section */}
            {query.trim().length > 0 && (
              <div className="search-dropdown-section search-dropdown-section--hardware">
                <div className="search-dropdown-section-header">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
                  </svg>
                  <span>
                    {matchingHardware.length > 0
                      ? `Available Hardware (${matchingHardware.length})`
                      : 'Available Hardware'}
                  </span>
                </div>

                {matchingHardware.length > 0 ? (
                  <div className="search-dropdown-items-list">
                    {matchingHardware.map(prod => {
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
                            {prod.image ? (
                              <img src={getAssetUrl(prod.image)} alt={prod.name} className="search-dropdown-img" />
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.5">
                                <rect x="2" y="7" width="20" height="14" rx="2"/>
                                <circle cx="12" cy="14" r="2"/>
                              </svg>
                            )}
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
                          <svg className="search-dropdown-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="search-dropdown-empty">
                    <p className="search-dropdown-empty-title">No hardware found matching "{query}"</p>
                    <p className="search-dropdown-empty-sub">Try searching for:</p>
                    <div className="search-dropdown-empty-chips">
                      {['AIS-140', 'BR06', 'Dashcam', 'MDVR', 'Fuel Sensor'].map(chip => (
                        <button
                          key={chip}
                          type="button"
                          className="search-dropdown-chip"
                          onClick={() => handleSelectSuggestion(chip)}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Footer button */}
            {query.trim().length > 0 && matchingHardware.length > 0 && (
              <div className="search-dropdown-footer">
                <button
                  type="button"
                  className="search-dropdown-see-all"
                  onClick={handleSubmit}
                >
                  View all hardware matching "{query}" →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Category Icon Components (Matching Reference Design) ── */
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

/* 8 Hardware Categories configuration (balanced 4x2 grid utilizing full screen area) */
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

/* ── Shop by Category Section ── */
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

/* ── 5 Banner Slider Configuration matching Reference Screenshot ── */
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

/* ── 5 Banner Slider Section ── */
function HomeBannerSlider() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const totalBanners = HOME_BANNERS.length;

  // Auto-advance slider every 5 seconds unless hovered/paused
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

  // Build extended array for infinite wrap-around feel
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

      {/* Carousel Viewport and Smooth Track */}
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

      {/* 5 Dots Indicator */}
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

/* ── Main Setu Home Page ── */
export default function SetuHome() {
  return (
    <div className="dashboard">
      <div className="dashboard__page-container">

        {/* ── Card 1: Magical Hero Banner Card (Dark theme with animated pink & blue aurora) ── */}
        <div className="hero-magic-card">
          {/* Animated Pink & Blue Aurora Orbs clipped to card */}
          <div className="hero-aurora-bg">
            <div className="aurora-orb aurora-orb--blue" />
            <div className="aurora-orb aurora-orb--pink" />
            <div className="aurora-orb aurora-orb--cyan" />
          </div>

          <div className="hero-magic-card__inner">
            {/* Single-line Heading */}
            <h1 className="hero-magic-card__heading">
              Everything your fleet runs on, in one place.
            </h1>

            {/* Unified Search Box */}
            <SearchContainer />
          </div>
        </div>

        {/* ── Shop by Category Section (Matches Reference Design) ── */}
        <ShopByCategorySection />

        {/* ── 5 Banner Slider Section (Below Categories) ── */}
        <HomeBannerSlider />

      </div>
    </div>
  );
}