import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Sidebar.css';

const navItems = [
  {
    id: 'dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    id: 'tracking',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="12" cy="12" r="9"/>
        <circle cx="12" cy="12" r="3"/>
        <line x1="12" y1="2" x2="12" y2="6"/>
        <line x1="12" y1="18" x2="12" y2="22"/>
        <line x1="2" y1="12" x2="6" y2="12"/>
        <line x1="18" y1="12" x2="22" y2="12"/>
      </svg>
    ),
    label: 'Tracking',
    path: '/tracking'
  },
  {
    id: 'reports',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    label: 'Reports',
    path: '/reports'
  },
  {
    id: 'charts',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    label: 'Charts',
    path: '/charts'
  },
  {
    id: 'settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83-2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
    label: 'Settings',
    path: '/settings'
  }
];

const topItems = [
  {
    id: 'profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    label: 'Profile',
    path: '/profile'
  },
  {
    id: 'notifications',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    label: 'Notifications',
    path: '/notifications'
  }
];

const bottomItems = [
  {
    id: 'setu',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
    ),
    label: 'Setu',
    path: '/',
    title: 'Setu Platform'
  },
  {
    id: 'download',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 17 12 21 16 17"/>
        <line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"/>
      </svg>
    ),
    label: 'Downloads',
    path: '/downloads',
    title: 'Downloads'
  }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();

  // Setu Platform is active on root '/' or any setu/hardware/solutions/finance/auto-parts paths
  const otherPaths = ['/dashboard', '/tracking', '/reports', '/charts', '/settings', '/profile', '/notifications', '/downloads'];
  const isSetuActive = !otherPaths.some(p => location.pathname === p || location.pathname.startsWith(p + '/'));

  const handleNav = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className="sidebar">
      {/* Uffizio Logo */}
      <div className="sidebar__logo" onClick={() => navigate('/')} title="Uffizio">
        <span className="sidebar__logo-text">uffizio+</span>
      </div>

      {/* Top icon-only items (Profile, Notification) */}
      <div className="sidebar__top-icons">
        {topItems.map(item => (
          <button
            key={item.id}
            className={`sidebar__icon-btn ${location.pathname === item.path ? 'sidebar__icon-btn--active' : ''}`}
            onClick={() => handleNav(item)}
            aria-label={item.label}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Main Navigation - icons with labels */}
      <nav className="sidebar__nav">
        {navItems.map(item => (
          <button
            key={item.id}
            className={`sidebar__nav-item ${location.pathname === item.path ? 'sidebar__nav-item--active' : ''}`}
            onClick={() => handleNav(item)}
            aria-label={item.label}
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            <span className="sidebar__nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Items - Setu Platform & Downloads */}
      <div className="sidebar__bottom">
        {bottomItems.map(item => {
          const isItemActive = item.id === 'setu' ? isSetuActive : location.pathname === item.path;
          return (
            <button
              key={item.id}
              className={`sidebar__icon-btn sidebar__icon-btn--bottom ${isItemActive ? 'sidebar__icon-btn--active' : ''}`}
              onClick={() => handleNav(item)}
              aria-label={item.label}
              title={item.title || item.label}
            >
              {item.icon}
              {item.id === 'setu' && (
                <span className="sidebar__badge">{cartCount > 0 ? (cartCount > 9 ? '9+' : cartCount) : 27}</span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
