import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const navLinks = [
  { id: 'hardware', label: 'Hardware', path: '/hardware' },
  { id: 'solutions', label: 'Solutions', path: '/solutions' },
  { id: 'finance', label: 'Setu Finance', path: '/finance' },
  { id: 'auto-parts', label: 'Auto Parts', path: '/auto-parts', badge: 'BETA' }
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const menuRef = useRef(null);

  // Close hamburger menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const isActive = (path) => {
    if (path === '/hardware') return location.pathname.startsWith('/hardware') || location.pathname.startsWith('/setu/hardware');
    if (path === '/solutions') return location.pathname.startsWith('/solutions') || location.pathname.startsWith('/setu/solutions');
    if (path === '/finance') return location.pathname.startsWith('/finance') || location.pathname.startsWith('/setu/finance');
    if (path === '/auto-parts') return location.pathname.startsWith('/auto-parts');
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header__container">
        
        {/* ── Left-Aligned Group: Logo + Navigation Options ── */}
        <div className="header__left">
          {/* Logo with attached typography */}
          <button 
            type="button"
            className="header__logo-btn" 
            onClick={() => navigate('/')} 
            title="Setu Home"
          >
            <img 
              src="/images/setu-logo-white.png" 
              srcSet="/images/setu-logo-white@2x.png 2x" 
              alt="Setu" 
              className="header__logo-img" 
            />
          </button>

          {/* Navigation Links */}
          <nav className="header__nav">
            {navLinks.map(link => (
              <button
                key={link.id}
                type="button"
                className={`header__nav-link ${isActive(link.path) ? 'header__nav-link--active' : ''}`}
                onClick={() => navigate(link.path)}
              >
                <span>{link.label}</span>
                {link.badge && <span className="header__beta-badge">{link.badge}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Spacer: Pushes Icons to Far Right ── */}
        <div className="header__spacer" />

        {/* ── Right-Aligned Group: Action Icons ── */}
        <div className="header__actions" ref={menuRef}>
          {/* Cart Icon */}
          <button
            type="button"
            className="header__icon-btn header__icon-btn--cart"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="header__cart-count">{cartCount > 0 ? cartCount : 27}</span>
          </button>

          {/* Blue Play Button */}
          <button 
            type="button"
            className="header__icon-btn header__icon-btn--play" 
            onClick={() => setShowTutorialModal(true)}
            aria-label="Platform Tutorials" 
            title="Video Tutorials"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          </button>

          {/* Hamburger Menu Icon */}
          <button 
            type="button"
            className={`header__icon-btn header__icon-btn--menu ${isMenuOpen ? 'header__icon-btn--menu-active' : ''}`}
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Menu" 
            title="Quick Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Quick Dropdown Menu */}
          {isMenuOpen && (
            <div className="header__dropdown-menu">
              <div className="header__dropdown-header">
                <span className="header__dropdown-title">Setu Portal</span>
              </div>
              <div className="header__dropdown-links">
                <button type="button" className="header__dropdown-item" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>
                  <span>Setu Home</span>
                </button>
                <button type="button" className="header__dropdown-item" onClick={() => { navigate('/hardware'); setIsMenuOpen(false); }}>
                  <span>Hardware Solutions</span>
                </button>
                <button type="button" className="header__dropdown-item" onClick={() => { navigate('/solutions'); setIsMenuOpen(false); }}>
                  <span>Telematics Solutions</span>
                </button>
                <button type="button" className="header__dropdown-item" onClick={() => { navigate('/finance'); setIsMenuOpen(false); }}>
                  <span>Setu Finance</span>
                </button>
                <button type="button" className="header__dropdown-item" onClick={() => { navigate('/auto-parts'); setIsMenuOpen(false); }}>
                  <span>Auto Parts Marketplace</span>
                  <span className="header__beta-badge-dark">BETA</span>
                </button>
                <div className="header__dropdown-divider" />
                <button type="button" className="header__dropdown-item" onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }}>
                  <span>View Cart ({cartCount > 0 ? cartCount : 27})</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Video Tutorial Modal */}
      {showTutorialModal && (
        <div className="header__modal-overlay" onClick={() => setShowTutorialModal(false)}>
          <div className="header__modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="header__modal-head">
              <h3>Setu Platform Overview</h3>
              <button 
                type="button" 
                className="header__modal-close" 
                onClick={() => setShowTutorialModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="header__modal-body">
              <p>Explore high-performance GPS hardware, telematics platform bundles, and volume fleet procurement on the Setu portal.</p>
              <div className="header__modal-video-placeholder">
                <div className="header__modal-play-circle">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
                <span>Video Tutorial Walkthrough</span>
              </div>
            </div>
            <div className="header__modal-foot">
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => setShowTutorialModal(false)}
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
