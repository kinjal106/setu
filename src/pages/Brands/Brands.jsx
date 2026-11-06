import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BRANDS_DATA, TOTAL_BRANDS_COUNT, TOTAL_DEVICES_COUNT } from '../../data/brandsData';
import { getAssetUrl } from '../../utils/assetUrl';
import SetuVerifiedBadge from '../../components/SetuVerifiedBadge/SetuVerifiedBadge';
import './Brands.css';

export default function Brands() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('devices-desc');

  // Filter and sort brands
  const filteredBrands = useMemo(() => {
    let list = [...BRANDS_DATA];

    // 1. Text Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(b => 
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.specialty.toLowerCase().includes(q) ||
        (b.popularModels && b.popularModels.some(m => m.toLowerCase().includes(q)))
      );
    }

    // 2. Category Tab Filter
    if (activeCategory === 'high-volume') {
      list = list.filter(b => b.deviceCount >= 7);
    } else if (activeCategory === 'ais140') {
      list = list.filter(b => 
        b.name === 'Watsoo' || 
        b.name === 'Itriangle' || 
        b.category.toLowerCase().includes('ais') ||
        b.tagline.toLowerCase().includes('ais')
      );
    } else if (activeCategory === 'sensors-locks') {
      list = list.filter(b => 
        b.name === 'OMNICOMM' || 
        b.name === 'Qtloads' || 
        b.name === 'Meitrack' || 
        b.name === 'Ecogas' ||
        b.name === 'Mercetech'
      );
    }

    // 3. Sorting
    if (sortBy === 'devices-desc') {
      list.sort((a, b) => b.deviceCount - a.deviceCount);
    } else if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0));
    }

    return list;
  }, [searchQuery, activeCategory, sortBy]);

  const handleBrandClick = (brand) => {
    navigate(`/hardware?brand=${encodeURIComponent(brand.name)}`);
  };

  return (
    <div className="brands-page">
      <div className="brands-page__container">
        
        {/* ── Top Breadcrumbs & Back Navigation ── */}
        <div className="brands-top-nav">
          <nav className="brands-breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/" className="brands-crumb-link">Home</Link>
            <span className="brands-crumb-sep">›</span>
            <Link to="/hardware" className="brands-crumb-link">Hardware Solutions</Link>
            <span className="brands-crumb-sep">›</span>
            <span className="brands-crumb-current">All Brands</span>
          </nav>
          
          <button 
            type="button" 
            className="brands-back-btn" 
            onClick={() => navigate(-1)}
            title="Go back"
          >
            ‹ Back
          </button>
        </div>

        {/* ── Page Hero Header ── */}
        <div className="brands-hero-card">
          <div className="brands-hero-left">
            <div className="brands-hero-eyebrow">
              <span className="brands-hero-eyebrow-dot" />
              <span>CERTIFIED OEM &amp; HARDWARE MANUFACTURERS</span>
            </div>
            <h1 className="brands-hero-title">All Hardware Brands</h1>
            <p className="brands-hero-desc">
              Explore trusted telematics hardware manufacturers, GPS tracker brands, AIS-140 certified VLTD providers, and fuel sensor makers seamlessly integrated with the Setu platform.
            </p>
          </div>

          <div className="brands-hero-stats">
            <div className="brands-stat-box">
              <span className="brands-stat-val">{TOTAL_BRANDS_COUNT}</span>
              <span className="brands-stat-lbl">Verified Brands</span>
            </div>
            <div className="brands-stat-divider" />
            <div className="brands-stat-box">
              <span className="brands-stat-val">{TOTAL_DEVICES_COUNT}+</span>
              <span className="brands-stat-lbl">Total Devices</span>
            </div>
          </div>
        </div>

        {/* ── Search, Filters & Sorting Toolbar ── */}
        <div className="brands-toolbar">
          {/* Real-time search bar */}
          <div className="brands-search-wrap">
            <svg className="brands-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="brands-search-input"
              placeholder="Search by brand name, device model, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search hardware brands"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="brands-search-clear" 
                onClick={() => setSearchQuery('')}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="brands-filter-chips">
            <button
              type="button"
              className={`brands-chip ${activeCategory === 'all' ? 'brands-chip--active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Brands ({TOTAL_BRANDS_COUNT})
            </button>
            <button
              type="button"
              className={`brands-chip ${activeCategory === 'high-volume' ? 'brands-chip--active' : ''}`}
              onClick={() => setActiveCategory('high-volume')}
            >
              Top Fleet Trackers (7+ Devices)
            </button>
            <button
              type="button"
              className={`brands-chip ${activeCategory === 'ais140' ? 'brands-chip--active' : ''}`}
              onClick={() => setActiveCategory('ais140')}
            >
              Govt. AIS-140 VLTD
            </button>
            <button
              type="button"
              className={`brands-chip ${activeCategory === 'sensors-locks' ? 'brands-chip--active' : ''}`}
              onClick={() => setActiveCategory('sensors-locks')}
            >
              Sensors, Video &amp; E-Locks
            </button>
          </div>

          {/* Sort selector */}
          <div className="brands-sort-wrap">
            <span className="brands-sort-label">Sort:</span>
            <select 
              className="brands-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort brands"
            >
              <option value="devices-desc">Most Devices</option>
              <option value="name-asc">Name (A – Z)</option>
              <option value="name-desc">Name (Z – A)</option>
              <option value="price-asc">Starting Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* ── Results Info Bar ── */}
        <div className="brands-results-meta">
          <span className="brands-results-count">
            Showing <strong>{filteredBrands.length}</strong> {filteredBrands.length === 1 ? 'brand' : 'brands'}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </span>
          <span className="brands-results-sub">Click any brand to explore its individual devices</span>
        </div>

        {/* ── All Brands Grid ── */}
        {filteredBrands.length > 0 ? (
          <div className="brands-grid">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className="brand-card"
                onClick={() => handleBrandClick(brand)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBrandClick(brand);
                  }
                }}
                title={`View ${brand.deviceCount} devices from ${brand.name}`}
              >
                {/* Card Top: Brand Image Avatar + Device Count Badge */}
                <div className="brand-card__top">
                  <div className="brand-card__avatar">
                    <img
                      src={getAssetUrl(brand.image)}
                      alt={`${brand.name} hardware`}
                      className="brand-card__img"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="brand-card__count-badge">
                    <span className="brand-card__count-num">{brand.deviceCount}</span>
                    <span className="brand-card__count-lbl">
                      {brand.deviceCount === 1 ? 'Device' : 'Devices'}
                    </span>
                  </div>
                </div>

                {/* Card Header & Verification */}
                <div className="brand-card__header">
                  <div className="brand-card__title-row">
                    <h3 className="brand-card__name">{brand.name}</h3>
                    {brand.verified && <SetuVerifiedBadge />}
                  </div>
                  <span className="brand-card__category">{brand.category}</span>
                </div>

                {/* Description Tagline */}
                <p className="brand-card__tagline">{brand.tagline}</p>

                {/* Popular Models Chips */}
                {brand.popularModels && brand.popularModels.length > 0 && (
                  <div className="brand-card__models">
                    <span className="brand-card__models-label">Popular devices:</span>
                    <div className="brand-card__model-tags">
                      {brand.popularModels.slice(0, 3).map((model, idx) => (
                        <span key={idx} className="brand-card__model-pill">{model}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Footer: Starting Price + CTA Arrow */}
                <div className="brand-card__footer">
                  <div className="brand-card__price-box">
                    <span className="brand-card__price-label">Starting from</span>
                    <span className="brand-card__price-val">
                      ₹{brand.startingPrice?.toLocaleString('en-IN') || '599'}
                      <span className="brand-card__price-tax"> + GST</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    className="brand-card__cta-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBrandClick(brand);
                    }}
                  >
                    <span>View Devices</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="brands-empty-state">
            <div className="brands-empty-state__icon">🔍</div>
            <h3 className="brands-empty-state__title">No brands found</h3>
            <p className="brands-empty-state__desc">
              No brand matched "{searchQuery}". Try searching for another name or clear your filters.
            </p>
            <button
              type="button"
              className="brands-empty-state__reset-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
