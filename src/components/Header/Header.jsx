import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/assetUrl';
import './Header.css';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  // Dropdown states for enterprise navigation
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('setu_saved_products') || '[]');
      return Array.isArray(saved) ? saved.length : 0;
    } catch (e) {
      return 0;
    }
  });

  const headerRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveDropdown(null);
        setIsLangOpen(false);
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update wishlist count on window storage event
  useEffect(() => {
    const updateWishlist = () => {
      try {
        const saved = JSON.parse(localStorage.getItem('setu_saved_products') || '[]');
        setWishlistCount(Array.isArray(saved) ? saved.length : 0);
      } catch (e) {}
    };
    window.addEventListener('storage', updateWishlist);
    return () => window.removeEventListener('storage', updateWishlist);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header className="enterprise-header" ref={headerRef}>
      <div className="enterprise-header__inner">

        {/* ── 1. Left: Uffizio Brand Logo ── */}
        <div className="enterprise-header__brand">
          <button
            type="button"
            className="enterprise-header__logo-btn"
            onClick={() => navigate('/')}
            title="Uffizio / Setu Hardware Portal"
          >
            <img
              src={getAssetUrl('/images/uffizio-logo-nav.png')}
              alt="uffizio"
              className="enterprise-header__logo-img"
            />
          </button>
        </div>

        {/* ── 2. Center: Primary Horizontal Navigation ── */}
        <nav className="enterprise-header__nav">
          {/* Direct Link: Hardware */}
          <button
            type="button"
            className={`enterprise-header__nav-item ${location.pathname.startsWith('/hardware') ? 'enterprise-header__nav-item--active' : ''}`}
            onClick={() => {
              setActiveDropdown(null);
              navigate('/hardware');
            }}
          >
            <span>Hardware</span>
          </button>

          {/* Dropdown: Products */}
          <div className="enterprise-header__nav-dropdown-wrap">
            <button
              type="button"
              className={`enterprise-header__nav-item ${activeDropdown === 'products' ? 'enterprise-header__nav-item--open' : ''}`}
              onClick={() => toggleDropdown('products')}
            >
              <span>Products</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="enterprise-header__chevron">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {activeDropdown === 'products' && (
              <div className="enterprise-header__menu-dropdown">
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware?category=vehicle-tracking'); }}>
                  <strong>Vehicle Tracking Devices</strong>
                  <span>Wired, OBD, and AIS-140 GPS trackers</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware?category=video-telematics'); }}>
                  <strong>Video Telematics</strong>
                  <span>AI Dashcams, ADAS, DMS & 4G MDVRs</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware?category=asset-logistics'); }}>
                  <strong>Asset &amp; Logistics Tracking</strong>
                  <span>Smart GPS electronic padlocks and seals</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware?category=fuel-sensors'); }}>
                  <strong>Fuel &amp; Vehicle Sensors</strong>
                  <span>99.5% accuracy wireless BLE fuel probes</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/auto-parts'); }}>
                  <strong>Verified Auto Parts</strong>
                  <span>Vehicle registration number part fitment</span>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown: Use Cases */}
          <div className="enterprise-header__nav-dropdown-wrap">
            <button
              type="button"
              className={`enterprise-header__nav-item ${activeDropdown === 'use-cases' ? 'enterprise-header__nav-item--open' : ''}`}
              onClick={() => toggleDropdown('use-cases')}
            >
              <span>Use Cases</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="enterprise-header__chevron">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {activeDropdown === 'use-cases' && (
              <div className="enterprise-header__menu-dropdown">
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware?search=cargo%20lock'); }}>
                  <strong>Cargo Security Solutions</strong>
                  <span>IP68 electronic padlocks with remote OTP</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware?search=fuel%20theft'); }}>
                  <strong>Prevent Fuel Theft</strong>
                  <span>Anti-siphoning alerts and level sensors</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware?search=driver%20safety'); }}>
                  <strong>Improve Driver Safety</strong>
                  <span>AI facial fatigue detection & collision alerts</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware?search=cold%20chain'); }}>
                  <strong>Cold Chain &amp; Reefer</strong>
                  <span>Wireless BLE temperature and humidity</span>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown: Brands */}
          <div className="enterprise-header__nav-dropdown-wrap">
            <button
              type="button"
              className={`enterprise-header__nav-item ${activeDropdown === 'brands' ? 'enterprise-header__nav-item--open' : ''}`}
              onClick={() => toggleDropdown('brands')}
            >
              <span>Brands</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="enterprise-header__chevron">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {activeDropdown === 'brands' && (
              <div className="enterprise-header__menu-dropdown">
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware'); }}>
                  <strong>M Series</strong>
                  <span>Economical 4G & 2G fleet tracking</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware'); }}>
                  <strong>T98 Series</strong>
                  <span>Govt certified AIS-140 & MDVR systems</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware'); }}>
                  <strong>Mercetech</strong>
                  <span>Enterprise AI dashcam safety cameras</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/hardware'); }}>
                  <strong>LLS Series</strong>
                  <span>High-precision capacitive fuel sensors</span>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown: Resources */}
          <div className="enterprise-header__nav-dropdown-wrap">
            <button
              type="button"
              className={`enterprise-header__nav-item ${activeDropdown === 'resources' ? 'enterprise-header__nav-item--open' : ''}`}
              onClick={() => toggleDropdown('resources')}
            >
              <span>Resources</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="enterprise-header__chevron">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {activeDropdown === 'resources' && (
              <div className="enterprise-header__menu-dropdown">
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/solutions'); }}>
                  <strong>Telematics Platforms</strong>
                  <span>Trakzee, SmartBus & TaskEye integrations</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/downloads'); }}>
                  <strong>Firmware &amp; Documentation</strong>
                  <span>Device wiring diagrams, protocols & tools</span>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown: Support */}
          <div className="enterprise-header__nav-dropdown-wrap">
            <button
              type="button"
              className={`enterprise-header__nav-item ${activeDropdown === 'support' ? 'enterprise-header__nav-item--open' : ''}`}
              onClick={() => toggleDropdown('support')}
            >
              <span>Support</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="enterprise-header__chevron">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {activeDropdown === 'support' && (
              <div className="enterprise-header__menu-dropdown">
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/order-history'); }}>
                  <strong>Order History</strong>
                  <span>Track recent equipment purchases & shipments</span>
                </div>
                <div className="enterprise-header__menu-item" onClick={() => { setActiveDropdown(null); navigate('/profile'); }}>
                  <strong>Help Center</strong>
                  <span>24/7 technical telematics support SLA</span>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* ── 3. Right: Utility Controls (Language, Wishlist, User) ── */}
        <div className="enterprise-header__actions">
          {/* Language Selector */}
          <div className="enterprise-header__lang-wrap">
            <button
              type="button"
              className="enterprise-header__lang-btn"
              onClick={() => setIsLangOpen(!isLangOpen)}
              title="Select Language"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>EN</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="enterprise-header__chevron">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isLangOpen && (
              <div className="enterprise-header__lang-dropdown">
                <button type="button" className="enterprise-header__lang-option active" onClick={() => setIsLangOpen(false)}>
                  English (EN)
                </button>
                <button type="button" className="enterprise-header__lang-option" onClick={() => setIsLangOpen(false)}>
                  Español (ES)
                </button>
                <button type="button" className="enterprise-header__lang-option" onClick={() => setIsLangOpen(false)}>
                  Hindi (HI)
                </button>
              </div>
            )}
          </div>

          {/* Wishlist / Saved Heart Icon */}
          <button
            type="button"
            className="enterprise-header__action-btn"
            onClick={() => navigate('/hardware')}
            title="Saved Hardware Wishlist"
            aria-label="Wishlist"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="enterprise-header__badge">{wishlistCount}</span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            type="button"
            className="enterprise-header__action-btn"
            onClick={() => navigate('/cart')}
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span className="enterprise-header__badge">{cartCount}</span>
            )}
          </button>

          {/* User Profile Avatar Circle (Letter 'F' in Blue Circle matching screenshot) */}
          <div className="enterprise-header__user-wrap">
            <button
              type="button"
              className="enterprise-header__avatar-btn"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              title="User Account"
              aria-label="User Profile"
            >
              <span>F</span>
            </button>

            {isUserMenuOpen && (
              <div className="enterprise-header__user-dropdown">
                <div className="enterprise-header__user-info">
                  <strong>Fleet Admin</strong>
                  <span>admin@fleetoperations.com</span>
                </div>
                <div className="enterprise-header__dropdown-divider" />
                <button type="button" className="enterprise-header__dropdown-link" onClick={() => { setIsUserMenuOpen(false); navigate('/order-history'); }}>
                  Order History &amp; Tracking
                </button>
                <button type="button" className="enterprise-header__dropdown-link" onClick={() => { setIsUserMenuOpen(false); navigate('/profile'); }}>
                  Account Settings
                </button>
                <button type="button" className="enterprise-header__dropdown-link" onClick={() => { setIsUserMenuOpen(false); navigate('/cart'); }}>
                  Cart ({cartCount})
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            className="enterprise-header__mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="enterprise-header__mobile-drawer">
          <button type="button" className="enterprise-header__mobile-link" onClick={() => { setIsMobileMenuOpen(false); navigate('/hardware'); }}>Hardware</button>
          <button type="button" className="enterprise-header__mobile-link" onClick={() => { setIsMobileMenuOpen(false); navigate('/solutions'); }}>Solutions</button>
          <button type="button" className="enterprise-header__mobile-link" onClick={() => { setIsMobileMenuOpen(false); navigate('/auto-parts'); }}>Auto Parts</button>
          <button type="button" className="enterprise-header__mobile-link" onClick={() => { setIsMobileMenuOpen(false); navigate('/order-history'); }}>Order History</button>
        </div>
      )}
    </header>
  );
}
