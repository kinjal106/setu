import React, { useState, useEffect } from 'react';
import './SetuFinance.css';

/**
 * Juspay Logo Icon + Wordmark SVG
 */
function JuspayLogo() {
  return (
    <div className="juspay-logo-wrap" title="Powered by Juspay">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="juspay-logo-icon">
        <path
          d="M7 4C11.4183 4 15 7.58172 15 12C15 16.4183 11.4183 20 7 20"
          stroke="#00C2FF"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M13 7C15.7614 7 18 9.23858 18 12C18 14.7614 15.7614 17 13 17"
          stroke="#38BDF8"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="juspay-logo-text">JUSPAY</span>
    </div>
  );
}

/**
 * Premium 3D-styled Fintech Visual Graphic for Hero Banner
 */
function FinanceHeroGraphic() {
  return (
    <div className="finance-hero-visual">
      <div className="finance-hero-glow" />
      
      {/* Floating Status Pill */}
      <div className="finance-card-preapproved-pill">
        <span className="finance-pill-dot" />
        <span>Pre-Approved Line: <strong>₹ 25,00,000</strong></span>
      </div>

      <svg width="260" height="175" viewBox="0 0 260 175" fill="none" className="finance-hero-svg">
        <defs>
          <linearGradient id="cardGradFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="cardGradBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0B132B" />
          </linearGradient>
          <linearGradient id="chipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <filter id="cardShadow" x="-10%" y="-10%" width="130%" height="135%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Floating Background Card (Offset angle) */}
        <g transform="rotate(-9 125 90)">
          <rect x="35" y="24" width="160" height="98" rx="12" fill="url(#cardGradBack)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          {/* Card stripes */}
          <line x1="35" y1="52" x2="195" y2="52" stroke="#0F172A" strokeWidth="16" />
          <line x1="48" y1="84" x2="90" y2="84" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="168" cy="84" r="10" fill="#EF4444" opacity="0.75" />
          <circle cx="178" cy="84" r="10" fill="#F59E0B" opacity="0.75" />
        </g>

        {/* Foreground Primary Card */}
        <g transform="rotate(5 140 95)" filter="url(#cardShadow)">
          <rect x="55" y="44" width="168" height="104" rx="12" fill="url(#cardGradFront)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" />
          
          {/* Subtle Card Gloss Curve */}
          <path d="M 55 44 Q 130 90 223 58 L 223 44 Z" fill="rgba(255,255,255,0.12)" />

          {/* EMV Gold Chip */}
          <rect x="72" y="62" width="28" height="22" rx="4" fill="url(#chipGrad)" stroke="#B45309" strokeWidth="0.8" />
          <line x1="72" y1="73" x2="100" y2="73" stroke="#B45309" strokeWidth="0.8" />
          <line x1="86" y1="62" x2="86" y2="84" stroke="#B45309" strokeWidth="0.8" />

          {/* Contactless Icon */}
          <path d="M 110 68 A 6 6 0 0 1 110 78" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 114 65 A 10 10 0 0 1 114 81" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6" fill="none" strokeLinecap="round" />

          {/* Card Type Brand */}
          <text x="178" y="66" fill="#FFFFFF" fontSize="10" fontWeight="bold" letterSpacing="0.8" textAnchor="end" opacity="0.95">SETU CREDIT</text>

          {/* Card Number */}
          <text x="72" y="104" fill="#FFFFFF" fontSize="11" fontWeight="600" letterSpacing="2.5" fontFamily="monospace">•••• •••• •••• 9284</text>

          {/* Cardholder Name & Expiry */}
          <text x="72" y="125" fill="#94A3B8" fontSize="7" fontWeight="bold" letterSpacing="0.5">BUSINESS FLEET</text>
          <text x="72" y="135" fill="#FFFFFF" fontSize="9" fontWeight="bold" letterSpacing="0.6">FINDPATH LOGISTICS</text>

          <text x="165" y="125" fill="#94A3B8" fontSize="7" fontWeight="bold">VALID THRU</text>
          <text x="165" y="135" fill="#FFFFFF" fontSize="9" fontWeight="bold">12/29</text>
        </g>

        {/* Floating Rupee Seal Badge */}
        <g transform="translate(18, 92)">
          <circle cx="20" cy="20" r="18" fill="#10B981" filter="drop-shadow(0 4px 10px rgba(16,185,129,0.4))" />
          <circle cx="20" cy="20" r="15" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
          <text x="20" y="26" fill="#FFFFFF" fontSize="17" fontWeight="bold" textAnchor="middle">₹</text>
        </g>
      </svg>
    </div>
  );
}

const HERO_SLIDES = [
  {
    title: 'Flexible Payment Solutions',
    subtitle: 'Grow Your Business with Easy Credit!',
    badges: ['⚡ Instant In-Principle Approval', '🛡️ Powered by JUSPAY', '💼 Zero Collateral Required']
  },
  {
    title: 'Instant Working Capital for Fleets',
    subtitle: 'Procure GPS Trackers, Fuel Sensors & Hardware Without Upfront Cash Constraints!',
    badges: ['📦 Same-Day Dispatch', '💳 Credit Lines up to ₹50 Lakhs', '🔄 Flexible Repayment Terms']
  },
  {
    title: 'Simple, Fast & 100% Transparent',
    subtitle: 'Digital Financing Built Exclusively for Transport Operators and Telematics Providers!',
    badges: ['📄 100% Digital & Paperless', '📊 Single GST Billing', '🤝 Dedicated Account Manager']
  }
];

export default function SetuFinance() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [desiredCredit, setDesiredCredit] = useState(500000);

  const [formData, setFormData] = useState({
    companyName: 'Findpath',
    contactNumber: '9958799582',
    gstNumber: '07AACCU3255C1ZN',
    legalStatus: 'Private Limited'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-cycle hero banner slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName.trim() || !formData.contactNumber.trim() || !formData.gstNumber.trim() || !formData.legalStatus) {
      alert('Please fill out all required fields marked with *');
      return;
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      companyName: 'Findpath',
      contactNumber: '9958799582',
      gstNumber: '07AACCU3255C1ZN',
      legalStatus: 'Private Limited'
    });
    setDesiredCredit(500000);
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <div className="setu-finance-page">
      <div className="finance-unified-card">

        {/* ── 1. Hero Banner: Flexible Payment Solutions ── */}
        <section className="finance-hero-banner">
          <div className="finance-hero-banner__glow-left" />
          <div className="finance-hero-banner__glow-right" />

          <div className="finance-hero-banner__content">
            <div className="finance-hero-eyebrow">
              <span className="finance-eyebrow-pulse" />
              <span>SETU FINANCING • BUSINESS CREDIT PLATFORM</span>
            </div>

            <h1 className="finance-hero-title">{currentSlide.title}</h1>
            <p className="finance-hero-sub">{currentSlide.subtitle}</p>

            {/* Benefit Highlights */}
            <div className="finance-hero-tags">
              {currentSlide.badges.map((badge, idx) => (
                <span key={idx} className="finance-hero-tag">{badge}</span>
              ))}
            </div>
          </div>

          <FinanceHeroGraphic />

          {/* Interactive Carousel Slide Dots (○ ● ○) */}
          <div className="finance-hero-dots" role="tablist" aria-label="Hero slides">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`finance-hero-dot ${activeSlide === idx ? 'finance-hero-dot--active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ── 2. Financing Section: About SETU Financing + Credit Form ── */}
        <section className="finance-main-section">
          
          {/* Left Column: About SETU Financing */}
          <div className="finance-about-col">
            <div className="finance-section-badge">ABOUT PROGRAM</div>
            <h2 className="finance-about-title">About SETU Financing</h2>

            <div className="finance-about-text">
              <p>
                <strong>SETU Financing</strong> offers flexible payment solutions designed specifically for businesses.
                Get instant credit approval and manage your cash flow efficiently.
              </p>
              <p>
                Our streamlined process ensures you can access financing quickly, allowing you to
                purchase the equipment and solutions you need without delay. With competitive rates
                and flexible repayment terms, growing your business has never been easier.
              </p>
              <p>
                Apply now and experience the simplicity and convenience of our digital financing
                platform. Our team is here to support you every step of the way.
              </p>
            </div>

            {/* 3 Executive Value Micro-Cards */}
            <div className="finance-value-grid">
              <div className="finance-value-card">
                <div className="finance-value-icon">⚡</div>
                <div className="finance-value-info">
                  <h4 className="finance-value-title">Instant Credit Approval</h4>
                  <p className="finance-value-desc">Seamless risk assessment powered by Juspay's automated credit engine.</p>
                </div>
              </div>

              <div className="finance-value-card">
                <div className="finance-value-icon">📦</div>
                <div className="finance-value-info">
                  <h4 className="finance-value-title">Zero Equipment Delay</h4>
                  <p className="finance-value-desc">Procure trackers, fuel sensors and auto parts immediately with flexible terms.</p>
                </div>
              </div>

              <div className="finance-value-card">
                <div className="finance-value-icon">🛡️</div>
                <div className="finance-value-info">
                  <h4 className="finance-value-title">100% Transparent Rates</h4>
                  <p className="finance-value-desc">Clear repayment schedules, competitive interest rates, and no surprise charges.</p>
                </div>
              </div>
            </div>

            {/* Official Powered by Juspay Trust Badge */}
            <div className="finance-partner-badge">
              <div className="finance-partner-left">
                <span className="finance-partner-label">Powered by</span>
                <JuspayLogo />
              </div>
              <div className="finance-partner-security">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
                <span>RBI Regulated Lending Infrastructure • 256-Bit SSL Encryption</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Credit Application Form */}
          <div className="finance-form-card">
            <div className="finance-form-header">
              <span className="finance-form-badge">FAST-TRACK DIGITAL KYC</span>
              <h3 className="finance-form-title">Tell us your Credit Requirements!</h3>
              <p className="finance-form-sub">
                Fill in your company credentials to check your pre-approved business credit line in under 60 seconds.
              </p>
            </div>

            {isSubmitted ? (
              <div className="finance-form-success">
                <div className="finance-form-success-icon">✓</div>
                <h4 className="finance-form-success-title">Credit Request Received!</h4>
                <p className="finance-form-success-desc">
                  Thank you, <strong>{formData.companyName}</strong>. Your credit application has been logged under Reference ID:
                </p>
                
                <div className="finance-ref-box">
                  <span className="finance-ref-label">APPLICATION ID</span>
                  <span className="finance-ref-id">SETU-CR-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>

                <div className="finance-form-success-info">
                  <div className="finance-success-row">
                    <span>Desired Credit Line:</span>
                    <strong>₹ {desiredCredit.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="finance-success-row">
                    <span>GSTIN Verified:</span>
                    <strong>{formData.gstNumber}</strong>
                  </div>
                  <div className="finance-success-row">
                    <span>Registered Phone:</span>
                    <strong>+91 {formData.contactNumber}</strong>
                  </div>
                  <div className="finance-success-note">
                    Our dedicated financing manager (powered by <strong>Juspay</strong>) will verify your documents and contact you within <strong>2 business hours</strong> to activate your credit.
                  </div>
                </div>

                <button
                  type="button"
                  className="finance-submit-btn"
                  onClick={handleReset}
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form className="finance-form" onSubmit={handleFormSubmit}>
                
                {/* Desired Credit Range Slider */}
                <div className="finance-form-group finance-credit-slider-group">
                  <div className="finance-slider-header">
                    <label className="finance-form-label">
                      Credit Requirement
                    </label>
                    <span className="finance-slider-val">
                      ₹ {desiredCredit.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="50000"
                    value={desiredCredit}
                    onChange={(e) => setDesiredCredit(Number(e.target.value))}
                    className="finance-range-slider"
                  />
                  <div className="finance-slider-ticks">
                    <span>₹ 1 Lakh</span>
                    <span>₹ 25 Lakh</span>
                    <span>₹ 50 Lakh</span>
                  </div>
                </div>

                {/* Company Name */}
                <div className="finance-form-group">
                  <label className="finance-form-label">
                    Company Name <span className="finance-req">*</span>
                  </label>
                  <div className="finance-input-wrap">
                    <svg className="finance-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                      <line x1="9" y1="22" x2="9" y2="22"/>
                      <line x1="8" y1="6" x2="10" y2="6"/>
                      <line x1="14" y1="6" x2="16" y2="6"/>
                      <line x1="8" y1="10" x2="10" y2="10"/>
                      <line x1="14" y1="10" x2="16" y2="10"/>
                      <line x1="8" y1="14" x2="10" y2="14"/>
                      <line x1="14" y1="14" x2="16" y2="14"/>
                    </svg>
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="Findpath"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="finance-input"
                    />
                  </div>
                </div>

                {/* Contact Number */}
                <div className="finance-form-group">
                  <label className="finance-form-label">
                    Contact Number <span className="finance-req">*</span>
                  </label>
                  <div className="finance-input-wrap">
                    <span className="finance-input-prefix">+91</span>
                    <input
                      type="tel"
                      name="contactNumber"
                      required
                      placeholder="9958799582"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="finance-input finance-input--with-prefix"
                      maxLength={10}
                    />
                  </div>
                </div>

                {/* GST Number */}
                <div className="finance-form-group">
                  <div className="finance-label-row">
                    <label className="finance-form-label">
                      GST Number <span className="finance-req">*</span>
                    </label>
                    <span className="finance-gst-valid-tag">✓ 15-Digit Format</span>
                  </div>
                  <div className="finance-input-wrap">
                    <svg className="finance-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                      <polyline points="10 9 9 9 8 9"/>
                    </svg>
                    <input
                      type="text"
                      name="gstNumber"
                      required
                      placeholder="07AACCU3255C1ZN"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      className="finance-input finance-input--uppercase"
                      maxLength={15}
                    />
                  </div>
                </div>

                {/* Legal Status Dropdown */}
                <div className="finance-form-group">
                  <label className="finance-form-label">
                    Legal Status <span className="finance-req">*</span>
                  </label>
                  <div className="finance-select-wrap">
                    <svg className="finance-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    <select
                      name="legalStatus"
                      required
                      value={formData.legalStatus}
                      onChange={handleInputChange}
                      className="finance-select"
                    >
                      <option value="">Select legal status</option>
                      <option value="Private Limited">Private Limited</option>
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Public Limited">Public Limited</option>
                      <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                    </select>
                    <svg className="finance-select-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="finance-submit-btn">
                  <span>Submit Credit Request</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>

                <div className="finance-form-footer-lock">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>100% confidential. No impact on business credit score for evaluation.</span>
                </div>
              </form>
            )}
          </div>

        </section>

        {/* ── 3. How Does It Work Section (Interactive Step Journey) ── */}
        <section className="finance-how-section">
          <div className="finance-how-header">
            <div className="finance-section-badge">TRANSPARENT WORKFLOW</div>
            <h2 className="finance-how-title">How Does It Work?</h2>
            <p className="finance-how-sub">
              Getting a credit from Juspay is simple, fast and 100% transparent.
            </p>
          </div>

          <div className="finance-steps-wrapper">
            <div className="finance-step-track-line" />

            <div className="finance-steps-grid">
              
              {/* Step 1 */}
              <div className="finance-step-card">
                <div className="finance-step-top">
                  <div className="finance-step-num">01</div>
                  <span className="finance-step-badge">⏱️ 2 Mins</span>
                </div>
                <div className="finance-step-icon-wrap">
                  <span className="finance-step-emoji">📋</span>
                </div>
                <h3 className="finance-step-title">Submit Requirements</h3>
                <p className="finance-step-desc">
                  Provide your Company Name, Contact Number, GSTIN, and Legal Status in the digital application form.
                </p>
                <div className="finance-step-bullet">Zero physical paperwork required</div>
              </div>

              {/* Step 2 */}
              <div className="finance-step-card">
                <div className="finance-step-top">
                  <div className="finance-step-num">02</div>
                  <span className="finance-step-badge">🤖 Instant AI</span>
                </div>
                <div className="finance-step-icon-wrap">
                  <span className="finance-step-emoji">⚡</span>
                </div>
                <h3 className="finance-step-title">Instant Credit Approval</h3>
                <p className="finance-step-desc">
                  Get instant credit approval powered by Juspay to manage your business cash flow efficiently.
                </p>
                <div className="finance-step-bullet">Automated real-time underwriting</div>
              </div>

              {/* Step 3 */}
              <div className="finance-step-card">
                <div className="finance-step-top">
                  <div className="finance-step-num">03</div>
                  <span className="finance-step-badge">📈 Flexible</span>
                </div>
                <div className="finance-step-icon-wrap">
                  <span className="finance-step-emoji">🚚</span>
                </div>
                <h3 className="finance-step-title">Flexible Repayment Terms</h3>
                <p className="finance-step-desc">
                  Access financing quickly to purchase the equipment and solutions you need with competitive rates and flexible terms.
                </p>
                <div className="finance-step-bullet">Immediate hardware dispatch</div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
