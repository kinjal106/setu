import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BRANDS_DATA } from '../../data/brandsData';
import { getAssetUrl } from '../../utils/assetUrl';
import './Brands.css';

export default function Brands() {
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    navigate(`/hardware?brand=${encodeURIComponent(brand.name)}`);
  };

  return (
    <div className="brands-page">
      <div className="brands-page__container">
        
        {/* ── Results Info Bar ── */}
        <div className="brands-results-meta">
          <span className="brands-results-count">
            Showing <strong>{BRANDS_DATA.length}</strong> brands
          </span>
          <span className="brands-results-sub">Click any brand to explore its individual devices</span>
        </div>

        {/* ── All Brands Grid ── */}
        <div className="brands-grid">
          {BRANDS_DATA.map((brand) => (
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

              {/* Card Header (Brand Name & Category) */}
              <div className="brand-card__header">
                <div className="brand-card__title-row">
                  <h3 className="brand-card__name">{brand.name}</h3>
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
      </div>
    </div>
  );
}
