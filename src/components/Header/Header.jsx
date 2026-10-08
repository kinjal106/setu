import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAI } from '../../context/AIContext';
import { getAssetUrl } from '../../utils/assetUrl';
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
  const { openAIPanel } = useAI();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
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
    if (path === '/hardware') return location.pathname === '/' || location.pathname === '/setu' || location.pathname.startsWith('/hardware') || location.pathname.startsWith('/setu/hardware');
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
              src={getAssetUrl('/images/setu-logo-white.png')} 
              srcSet={`${getAssetUrl('/images/setu-logo-white@2x.png')} 2x`} 
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
          {/* Ask Setu AI Button (Google Gemini Style) */}
          <button
            type="button"
            className="header__ai-btn"
            onClick={() => openAIPanel()}
            title="Ask Setu AI Assistant"
            aria-label="Ask Setu AI Assistant"
          >
            <span className="header__ai-btn-sparkle">✦</span>
            <span className="header__ai-btn-text">Ask Setu AI</span>
          </button>

          {/* Cart Icon */}
          <button
            type="button"
            className="header__icon-btn header__icon-btn--cart"
            onClick={() => navigate('/cart')}
            aria-label="Shopping Cart"
            title="Shopping Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="header__cart-count">{cartCount > 0 ? cartCount : 2}</span>
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

          {/* Quick Dropdown Menu (Matching media_1791183233401.png) */}
          {isMenuOpen && (
            <div className="header__dropdown-menu">
              <div className="header__dropdown-links">
                <button 
                  type="button" 
                  className="header__dropdown-item" 
                  onClick={() => { 
                    navigate('/order-history'); 
                    setIsMenuOpen(false); 
                  }}
                >
                  <div className="header__dropdown-item-left">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header__dropdown-svg">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Order History</span>
                  </div>
                </button>

                <button 
                  type="button" 
                  className="header__dropdown-item" 
                  onClick={() => { 
                    setShowTermsModal(true); 
                    setIsMenuOpen(false); 
                  }}
                >
                  <div className="header__dropdown-item-left">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="header__dropdown-svg">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <span>Terms and Condition</span>
                  </div>
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

      {/* Terms and Condition Modal */}
      {showTermsModal && (
        <div className="header__modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="header__modal-dialog header__modal-dialog--terms" onClick={e => e.stopPropagation()}>
            <div className="header__modal-head">
              <h3>Terms and Conditions</h3>
              <button 
                type="button" 
                className="header__modal-close" 
                onClick={() => setShowTermsModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="header__modal-body header__modal-body--terms">
              <h4>1. General Platform Terms</h4>
              <p>Setu is an enterprise telematics and vehicle IoT procurement portal operated by Uffizio. All orders placed are subject to commercial fleet supply availability, statutory GST taxation, and seller order confirmation.</p>
              
              <h4>2. Warranty &amp; Hardware Replacement</h4>
              <p>Standard hardware devices carry a 1-year manufacturer replacement warranty covering internal circuitry, GNSS/GSM receivers, and internal firmware. Any physical alteration, burn damage, or unauthorized tampering voids warranty.</p>
              
              <h4>3. Dispatch &amp; Logistics</h4>
              <p>Orders are dispatched from regional hubs within 24 to 48 hours of payment receipt or credit approval. Bulk fleet consignments are handled with expedited surface cargo with live tracking.</p>

              <h4>4. Taxation &amp; Invoicing</h4>
              <p>Statutory Goods and Services Tax (GST 18%) applies to all hardware and telematics subscription purchases. Tax invoices contain valid HSN classifications enabling full Input Tax Credit (ITC) for registered businesses.</p>
            </div>
            <div className="header__modal-foot">
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => setShowTermsModal(false)}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
