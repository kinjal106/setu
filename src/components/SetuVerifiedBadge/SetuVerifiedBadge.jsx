import React from 'react';
import './SetuVerifiedBadge.css';

/**
 * Official Setu Verified Badge Component
 * Renders the green shield check icon and "setu VERIFIED" text
 * enclosed inside a light green background card pill.
 *
 * @param {boolean} noIcon - Whether to omit the check icon (e.g. for sidebar filter)
 * @param {'sm'|'md'|'lg'} size - Badge size variant
 * @param {string} className - Additional CSS classes
 */
export default function SetuVerifiedBadge({ noIcon = false, size = 'md', className = '' }) {
  const sizeClass = size === 'lg' ? 'setu-verified-badge--lg' : size === 'sm' ? 'setu-verified-badge--sm' : '';
  const noIconClass = noIcon ? 'setu-verified-badge--no-icon' : '';

  return (
    <span className={`setu-verified-badge ${sizeClass} ${noIconClass} ${className}`.trim()}>
      {!noIcon && (
        <span className="setu-verified-badge__shield" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L4 5.5V11.5C4 16.6 7.5 21.2 12 22.5C16.5 21.2 20 16.6 20 11.5V5.5L12 2Z"
              fill="#10B981"
            />
            <path
              d="M8.5 11.8L11 14.3L15.8 9.5"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
      <span className="setu-verified-badge__text">
        <span className="setu-verified-badge__brand">setu</span>
        <span className="setu-verified-badge__label">VERIFIED</span>
      </span>
    </span>
  );
}
