import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BRANDS_DATA } from '../../data/brandsData';
import { getAssetUrl } from '../../utils/assetUrl';
import './Brands.css';

export default function Brands() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');

  const handleBrandClick = (brand) => {
    navigate(`/hardware?brand=${encodeURIComponent(brand.name)}`);
  };

  return (
    <div className="brands-page">
      <div className="brands-page__container">
        
        {/* ── Results Info Bar & View Mode Toggle (Same as Hardware Listing) ── */}
        <div className="brands-results-meta">
          <div className="brands-results-meta__left">
            <span className="brands-results-count">
              Showing <strong>{BRANDS_DATA.length}</strong> brands
            </span>
          </div>

          <div className="brands-results-meta__right">
            <span className="brands-results-sub">Click any brand to explore its individual devices</span>
            
            {/* View Mode Toggle (List View & Grid View) */}
            <div className="hw-view-toggle" role="group" aria-label="View Mode">
              <button
                type="button"
                className={`hw-view-toggle__btn ${viewMode === 'list' ? 'hw-view-toggle__btn--active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List view"
                aria-label="List view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
              <button
                type="button"
                className={`hw-view-toggle__btn ${viewMode === 'grid' ? 'hw-view-toggle__btn--active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Grid view"
                aria-label="Grid view"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Brand Listings: List View ── */}
        {viewMode === 'list' ? (
          <div className="brands-list-container">
            {BRANDS_DATA.map((brand) => (
              <div
                key={brand.id}
                className="pcard-ref brand-pcard-ref"
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
                {/* Left Profile Image Box - Exact same pattern and dimensions as Hardware list */}
                <div className="pcard-ref__img-box">
                  <span className="pcard-ref__badge">
                    {brand.deviceCount} {brand.deviceCount === 1 ? 'Device' : 'Devices'}
                  </span>
                  <div className="pcard-ref__img-center">
                    <img
                      src={getAssetUrl(brand.image)}
                      alt={`${brand.name} hardware`}
                      className="pcard-ref__img"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Right Details Container */}
                <div className="pcard-ref__info">
                  <div className="pcard-ref__content">
                    <div className="brand-card-top-row">
                      <h3 className="pcard-ref__title">{brand.name}</h3>
                      <span className="brand-card__category">{brand.category}</span>
                    </div>

                    <p className="pcard-ref__desc">{brand.tagline}</p>

                    {/* Popular Devices Tags */}
                    {brand.popularModels && brand.popularModels.length > 0 && (
                      <div className="pcard-ref__tags">
                        <span className="brand-tags-label">Popular devices:</span>
                        {brand.popularModels.map((model, idx) => (
                          <span key={idx} className="pcard-ref__tag-pill">{model}</span>
                        ))}
                      </div>
                    )}

                    {/* Bottom Price & CTA */}
                    <div className="brand-card-bottom-row">
                      <div className="pcard-ref__price-wrap">
                        <span className="brand-starting-from">Starting from</span>
                        <div className="pcard-ref__price-row">
                          <span className="pcard-ref__currency">₹</span>
                          <span className="pcard-ref__amount">{brand.startingPrice?.toLocaleString('en-IN') || '599'}</span>
                          <span className="pcard-ref__gst">+ GST</span>
                        </div>
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
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── Brand Listings: Grid View ── */
          <div className="brands-grid-container">
            {BRANDS_DATA.map((brand) => (
              <div
                key={brand.id}
                className="pcard-grid brand-pcard-grid"
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
                {/* Top Profile Image Box - Exact same pattern and dimensions as Hardware grid */}
                <div className="pcard-grid__img-box">
                  <span className="pcard-grid__badge">
                    {brand.deviceCount} {brand.deviceCount === 1 ? 'Device' : 'Devices'}
                  </span>
                  <div className="pcard-grid__img-center">
                    <img
                      src={getAssetUrl(brand.image)}
                      alt={`${brand.name} hardware`}
                      className="pcard-grid__img"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Card Body */}
                <div className="pcard-grid__body">
                  <h3 className="pcard-grid__title">{brand.name}</h3>
                  <span className="brand-card__category">{brand.category}</span>
                  <p className="pcard-grid__desc">{brand.tagline}</p>

                  {brand.popularModels && brand.popularModels.length > 0 && (
                    <div className="pcard-grid__tags">
                      {brand.popularModels.slice(0, 3).map((model, idx) => (
                        <span key={idx} className="pcard-grid__tag-pill">{model}</span>
                      ))}
                    </div>
                  )}

                  <div className="brand-grid-footer">
                    <div className="pcard-ref__price-wrap">
                      <span className="brand-starting-from">Starting from</span>
                      <div className="pcard-ref__price-row">
                        <span className="pcard-ref__currency">₹</span>
                        <span className="pcard-ref__amount">{brand.startingPrice?.toLocaleString('en-IN') || '599'}</span>
                        <span className="pcard-ref__gst">+ GST</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="brand-card__cta-btn brand-card__cta-btn--sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBrandClick(brand);
                      }}
                    >
                      <span>View Devices</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
