import React from 'react';
import { useNavigate } from 'react-router-dom';
import solutions from '../../data/solutions.json';
import './Solutions.css';

export default function Solutions() {
  const navigate = useNavigate();

  return (
    <div className="solutions-page site-container">
      <div className="solutions-page__header">
        <h1 className="solutions-page__title">Software Solutions</h1>
        <p className="solutions-page__desc">
          Enterprise-grade telematics software solutions for every fleet use case
        </p>
      </div>

      <div className="solutions-page__grid">
        {solutions.map(sol => (
          <div key={sol.id} className="sol-card" onClick={() => navigate(`/solutions/${sol.id}`)}>
            <div className="sol-card__icon" style={{ background: sol.color + '18' }}>
              <span style={{ fontSize: '28px', color: sol.color }}>{sol.icon}</span>
            </div>
            <div className="sol-card__body">
              <h3 className="sol-card__name">{sol.name}</h3>
              <p className="sol-card__desc">{sol.description}</p>
            </div>
            <div className="sol-card__arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
