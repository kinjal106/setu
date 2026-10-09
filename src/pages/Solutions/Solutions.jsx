import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import solutionsData from '../../data/solutions.json';
import { SolutionCardVisual } from './SolutionVisuals';
import './Solutions.css';

export default function Solutions() {
  const navigate = useNavigate();
  const location = useLocation();
  const carouselRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [demoRequested, setDemoRequested] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // If URL has /solutions/:id, open that solution modal on mount
  useEffect(() => {
    const parts = location.pathname.split('/');
    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart !== 'solutions' && lastPart !== 'setu') {
      const found = solutionsData.find(s => s.id === lastPart);
      if (found) {
        setSelectedSolution(found);
      }
    }
  }, [location.pathname]);

  // Update carousel scroll buttons state
  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollButtons);
      window.addEventListener('resize', updateScrollButtons);
    }
    return () => {
      if (el) el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = 404; // Card width (380px) + gap (24px)
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const categories = [
    { id: 'all', label: 'All Solutions', count: solutionsData.length },
    { id: 'fleet-ev', label: 'Fleet & EV', filter: ['fleet-management', 'ev-management'] },
    { id: 'workforce', label: 'Workforce & Tasks', filter: ['workforce'] },
    { id: 'transit-school', label: 'Transit & School', filter: ['transit', 'school-transport'] },
    { id: 'smart-iot', label: 'Smart City & IoT', filter: ['waste-management', 'indoor-tracking', 'pet-tracking'] }
  ];

  const filteredSolutions = solutionsData.filter(sol => {
    if (activeCategory === 'all') return true;
    const catObj = categories.find(c => c.id === activeCategory);
    return catObj && catObj.filter ? catObj.filter.includes(sol.category) : true;
  });

  const handleCardClick = (sol) => {
    setSelectedSolution(sol);
    setDemoRequested(false);
  };

  const handleCloseModal = () => {
    setSelectedSolution(null);
    setDemoRequested(false);
  };

  return (
    <div className="solutions-page">
      <div className="solutions-inner">
        {/* ── Apple-Inspired Header Bar (Reference Image 2) ── */}
        <header className="sol-header">
          <div className="sol-header__left">
            <h1 className="sol-header__headline">
              <span className="sol-header__bold">Software Solutions.</span>{' '}
              <span className="sol-header__sub">Enterprise telematics software for every fleet use case.</span>
            </h1>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="sol-header__arrows">
            <button
              type="button"
              className={`sol-nav-arrow ${!canScrollLeft ? 'sol-nav-arrow--disabled' : ''}`}
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous solutions"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className={`sol-nav-arrow ${!canScrollRight ? 'sol-nav-arrow--disabled' : ''}`}
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next solutions"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </header>

        {/* ── Category Filter Pills ── */}
        <div className="sol-categories-bar">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`sol-category-chip ${activeCategory === cat.id ? 'sol-category-chip--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.label}</span>
              {cat.count && <span className="sol-chip-count">{cat.count}</span>}
            </button>
          ))}
        </div>

        {/* ── Apple Store Style Horizontal Card Carousel (Reference Image 2) ── */}
        <div className="sol-carousel-wrapper">
          <div className="sol-carousel-track" ref={carouselRef}>
            {filteredSolutions.map((sol) => {
              const isDark = sol.theme === 'dark';
              return (
                <div
                  key={sol.id}
                  className={`sol-apple-card ${isDark ? 'sol-apple-card--dark' : 'sol-apple-card--light'}`}
                  onClick={() => handleCardClick(sol)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleCardClick(sol);
                  }}
                >
                  {/* Top Text Information */}
                  <div className="sol-apple-card__top">
                    {sol.tag && (
                      <span
                        className="sol-apple-card__tag"
                        style={{ color: sol.tagColor || (isDark ? '#F97316' : '#EA580C') }}
                      >
                        {sol.tag}
                      </span>
                    )}
                    <h2 className="sol-apple-card__title">{sol.name}</h2>
                    <p className="sol-apple-card__desc">{sol.description}</p>
                    {sol.pricing && (
                      <div className="sol-apple-card__price">{sol.pricing}</div>
                    )}
                  </div>

                  {/* Bottom Visual / Graphic Showcase */}
                  <div className="sol-apple-card__visual-wrap">
                    <SolutionCardVisual solutionId={sol.id} theme={sol.theme} />
                  </div>

                  {/* Subtle Action Pill */}
                  <div className="sol-apple-card__hover-action">
                    <span>Explore Platform</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Enterprise Value Propositions (Highlights Grid) ── */}
        <section className="sol-features-section">
          <div className="sol-features-grid">
            <div className="sol-feature-card">
              <div className="sol-feature-icon">🛡️</div>
              <h3 className="sol-feature-title">Multi-Protocol Telematics</h3>
              <p className="sol-feature-desc">
                Seamlessly connects with over 1,500+ GPS hardware devices, AIS-140 trackers, OBD-II scanners, and CAN-bus sensors.
              </p>
            </div>

            <div className="sol-feature-card">
              <div className="sol-feature-icon">⚡</div>
              <h3 className="sol-feature-title">Sub-Second Live Streaming</h3>
              <p className="sol-feature-desc">
                High-throughput distributed ingestion engine delivers real-time location telemetry and automated emergency alerts with 99.9% uptime.
              </p>
            </div>

            <div className="sol-feature-card">
              <div className="sol-feature-icon">🏢</div>
              <h3 className="sol-feature-title">100% White-Label Portal</h3>
              <p className="sol-feature-desc">
                Deploy customized brand portals with your own domain, logo, mobile app branding, and tiered tenant permissions for fleet distributors.
              </p>
            </div>

            <div className="sol-feature-card">
              <div className="sol-feature-icon">🔒</div>
              <h3 className="sol-feature-title">Enterprise Cloud Security</h3>
              <p className="sol-feature-desc">
                SOC-2 compliant encrypted databases, role-based access controls, and REST APIs for effortless ERP integration.
              </p>
            </div>
          </div>
        </section>

        {/* ── Interactive Solution Detail Modal ── */}
        {selectedSolution && (
          <div className="sol-modal-backdrop" onClick={handleCloseModal}>
            <div
              className={`sol-modal ${selectedSolution.theme === 'dark' ? 'sol-modal--dark' : 'sol-modal--light'}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="sol-modal-close"
                onClick={handleCloseModal}
                title="Close modal"
              >
                ✕
              </button>

              <div className="sol-modal-body">
                {/* Header */}
                <div className="sol-modal-header">
                  <div className="sol-modal-tag" style={{ color: selectedSolution.tagColor }}>
                    {selectedSolution.tag}
                  </div>
                  <h2 className="sol-modal-title">{selectedSolution.name}</h2>
                  <p className="sol-modal-desc">{selectedSolution.description}</p>
                  <div className="sol-modal-price">{selectedSolution.pricing}</div>
                </div>

                {/* Key Features */}
                {selectedSolution.highlights && (
                  <div className="sol-modal-section">
                    <h3 className="sol-modal-section-title">Core Platform Capabilities</h3>
                    <ul className="sol-modal-features">
                      {selectedSolution.highlights.map((feat, idx) => (
                        <li key={idx} className="sol-modal-feature-item">
                          <span className="sol-feature-check">✔</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hardware Integration */}
                {selectedSolution.compatibleHardware && (
                  <div className="sol-modal-section">
                    <h3 className="sol-modal-section-title">Verified Hardware Ecosystem</h3>
                    <div className="sol-modal-hw-chips">
                      {selectedSolution.compatibleHardware.map((hw, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="sol-hw-chip"
                          onClick={() => {
                            navigate(`/hardware?search=${encodeURIComponent(hw)}`);
                          }}
                          title={`Search ${hw} in Hardware catalog`}
                        >
                          <span>🔍 {hw}</span>
                          <span className="sol-hw-chip-arrow">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Actions */}
                <div className="sol-modal-actions">
                  {demoRequested ? (
                    <div className="sol-demo-success">
                      <span>✓ Demo Request Received! A telematics solution architect will contact you shortly.</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="sol-btn-primary"
                      onClick={() => setDemoRequested(true)}
                    >
                      <span>Request Live Platform Demo</span>
                      <span>→</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="sol-btn-secondary"
                    onClick={() => {
                      handleCloseModal();
                      navigate('/hardware');
                    }}
                  >
                    <span>Browse Compatible Hardware</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
