import React from 'react';

/**
 * Clean floating cards visual for the Fuel & FASTag hero banner:
 * - White & Blue FASTag card sticker with barcode
 * - Orange Fleet Card angled behind
 * - Green verified checkmark badge
 */
export function FuelFastagHeroCards() {
  return (
    <div className="ff-hero-visual-wrap" aria-hidden="true">
      {/* Orange Fleet Card (Angled behind) */}
      <div className="ff-card-fleet">
        <div className="ff-card-fleet__chip" />
        <div className="ff-card-fleet__logo">FLEET CARD</div>
        <div className="ff-card-fleet__pattern">
          <div className="ff-card-fleet__line" />
          <div className="ff-card-fleet__line" />
        </div>
      </div>

      {/* Blue & White FASTag Card Sticker */}
      <div className="ff-card-fastag">
        <div className="ff-card-fastag__left">
          <div className="ff-card-fastag__bar" />
          <div className="ff-card-fastag__bar" />
          <div className="ff-card-fastag__bar" />
        </div>
        <div className="ff-card-fastag__right">
          <div className="ff-card-fastag__title">FASTag</div>
          <div className="ff-card-fastag__barcode">
            <span className="bc-bar bc-w2" />
            <span className="bc-bar bc-w1" />
            <span className="bc-bar bc-w3" />
            <span className="bc-bar bc-w2" />
            <span className="bc-bar bc-w1" />
            <span className="bc-bar bc-w4" />
            <span className="bc-bar bc-w2" />
            <span className="bc-bar bc-w1" />
            <span className="bc-bar bc-w3" />
            <span className="bc-bar bc-w1" />
            <span className="bc-bar bc-w2" />
            <span className="bc-bar bc-w4" />
            <span className="bc-bar bc-w1" />
            <span className="bc-bar bc-w2" />
            <span className="bc-bar bc-w3" />
            <span className="bc-bar bc-w1" />
            <span className="bc-bar bc-w2" />
            <span className="bc-bar bc-w1" />
          </div>
        </div>
      </div>

      {/* Verified Green Check Circle */}
      <div className="ff-card-verified-badge" title="Bank Verified">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
  );
}
