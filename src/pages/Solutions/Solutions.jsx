import React from 'react';
import { useNavigate } from 'react-router-dom';
import solutionsData from '../../data/solutions.json';
import { SolutionCardVisual } from './SolutionVisuals';
import './Solutions.css';

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
              {/* 1. Image */}
              <div className="sol-box-card__img-box">
                <SolutionCardVisual solutionId={sol.id} />
              </div>

              {/* 2. Title & 3. Small Description */}
              <div className="sol-box-card__body">
                <h3 className="sol-box-card__title">{sol.name}</h3>
                <p className="sol-box-card__desc">{sol.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
