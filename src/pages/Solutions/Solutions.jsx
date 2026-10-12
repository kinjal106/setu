import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import solutionsData from '../../data/solutions.json';
import { SolutionCardVisual } from './SolutionVisuals';
import { getAssetUrl } from '../../utils/assetUrl';
import './Solutions.css';

/**
 * Image component with automatic fallback to vector illustration if image fails to load
 */
function SolutionCardImage({ sol }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !sol.image) {
    return <SolutionCardVisual solutionId={sol.id} />;
  }

  return (
    <img
      src={getAssetUrl(sol.image)}
      alt={sol.name}
      className="sol-box-card__img"
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

export default function Solutions() {
  const navigate = useNavigate();

  return (
    <div className="solutions-page">
      <div className="solutions-unified-card">
        {/* ── Page Header Section ── */}
        <div className="solutions-header">
          <h1 className="solutions-title">Solutions</h1>
          <p className="solutions-subtitle">
            Enterprise-grade telematics software solutions for every fleet use case
          </p>
        </div>

        {/* ── 4×4 Box Card Grid of Solutions (4 cards per row) ── */}
        <div className="solutions-grid">
          {solutionsData.map((sol) => (
            <div
              key={sol.id}
              className="sol-box-card"
              onClick={() => navigate(`/solutions/${sol.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate(`/solutions/${sol.id}`);
                }
              }}
            >
              {/* 1. Image (Stock Image) */}
              <div className="sol-box-card__img-box">
                <SolutionCardImage sol={sol} />
              </div>

              {/* 2. Title & 3. Small Description */}
              <div className="sol-box-card__body">
                <h3 className="sol-box-card__title">{sol.name}</h3>
                <p className="sol-box-card__desc">{sol.description}</p>

                {/* 4. 3 Main Features with Green Check Icon */}
                {sol.mainFeatures && sol.mainFeatures.length > 0 && (
                  <div className="sol-box-card__features">
                    {sol.mainFeatures.map((feat, idx) => (
                      <div key={idx} className="sol-feature-item">
                        <svg
                          className="sol-feature-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                        >
                          <circle cx="10" cy="10" r="9" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5" />
                          <path
                            d="M6 10.2L8.7 13L14 7.5"
                            stroke="#16A34A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="sol-feature-text">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
