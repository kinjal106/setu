import React, { useState } from 'react';
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
 * Credit & Payment Graphic for Hero Banner
 */
function FinanceHeroGraphic() {
  return (
    <div className="finance-hero-visual">
      <div className="finance-hero-glow" />
      <svg width="220" height="150" viewBox="0 0 220 150" fill="none" className="finance-hero-svg">
        {/* Floating Credit Card Behind */}
        <g transform="rotate(-10 110 75)">
          <rect x="50" y="20" width="120" height="74" rx="10" fill="url(#cardGrad2)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <rect x="62" y="34" width="22" height="16" rx="3" fill="#FDE047" opacity="0.9" />
          <circle cx="145" cy="40" r="10" fill="#EF4444" opacity="0.8" />
          <circle cx="155" cy="40" r="10" fill="#F59E0B" opacity="0.8" />
          <line x1="62" y1="68" x2="110" y2="68" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="62" y1="76" x2="90" y2="76" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Floating Credit Card Front */}
        <g transform="rotate(6 110 75)">
          <rect x="70" y="45" width="124" height="76" rx="10" fill="url(#cardGrad1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" filter="drop-shadow(0 12px 20px rgba(0,0,0,0.35))" />
          <rect x="84" y="60" width="24" height="18" rx="3" fill="#FACC15" />
          <circle cx="168" cy="66" r="11" fill="#3B82F6" opacity="0.85" />
          <circle cx="178" cy="66" r="11" fill="#06B6D4" opacity="0.85" />
          <line x1="84" y1="96" x2="135" y2="96" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          <line x1="84" y1="105" x2="110" y2="105" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Currency notes / Rupees floating */}
        <g transform="translate(15, 20) rotate(-18)">
          <rect x="0" y="0" width="58" height="34" rx="4" fill="#10B981" stroke="#059669" strokeWidth="1" opacity="0.9" />
          <circle cx="29" cy="17" r="7" stroke="#FFFFFF" strokeWidth="1.5" fill="none" opacity="0.7" />
          <text x="29" y="21" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" opacity="0.9">₹</text>
        </g>

        {/* Hand Illustration Element */}
        <path
          d="M 130 145 C 145 130, 160 125, 185 125 C 195 125, 205 130, 215 138 C 220 142, 220 150, 210 150 L 140 150 Z"
          fill="#FED7AA"
          opacity="0.9"
        />
        <path
          d="M 155 132 L 180 122 C 185 120, 192 122, 192 128 L 175 142 Z"
          fill="#FDBA74"
        />
        {/* Sleeve */}
        <path
          d="M 180 150 L 220 150 L 220 128 L 195 132 Z"
          fill="#1E3A8A"
        />
        <line x1="195" y1="132" x2="192" y2="148" stroke="#FFFFFF" strokeWidth="2.5" />

        <defs>
          <linearGradient id="cardGrad1" x1="70" y1="45" x2="194" y2="121" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284C7" />
            <stop offset="0.6" stopColor="#0369A1" />
            <stop offset="1" stopColor="#075985" />
          </linearGradient>
          <linearGradient id="cardGrad2" x1="50" y1="20" x2="170" y2="94" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E293B" />
            <stop offset="1" stopColor="#0F172A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function SetuFinance() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactNumber: '',
    gstNumber: '',
    legalStatus: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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
      companyName: '',
      contactNumber: '',
      gstNumber: '',
      legalStatus: ''
    });
  };

  return (
    <div className="setu-finance-page">
      <div className="finance-unified-card">

        {/* ── 1. Hero Banner: Flexible Payment Solutions ── */}
        <section className="finance-hero-banner">
          <div className="finance-hero-banner__glow-left" />
          <div className="finance-hero-banner__glow-right" />

          <div className="finance-hero-banner__content">
            <h1 className="finance-hero-title">Flexible Payment Solutions</h1>
            <p className="finance-hero-sub">Grow Your Business with Easy Credit!</p>
          </div>

          <FinanceHeroGraphic />

          {/* Carousel Slide Dots (○ ● ○) */}
          <div className="finance-hero-dots" aria-hidden="true">
            <span className="finance-hero-dot" />
            <span className="finance-hero-dot finance-hero-dot--active" />
            <span className="finance-hero-dot" />
          </div>
        </section>

        {/* ── 2. Financing Section: About & Credit Form ── */}
        <section className="finance-main-section">
          {/* Left Column: About SETU Financing */}
          <div className="finance-about-col">
            <h2 className="finance-about-title">About SETU Financing</h2>

            <div className="finance-about-text">
              <p>
                SETU Financing offers flexible payment solutions designed specifically for businesses.
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

            {/* Powered by Juspay */}
            <div className="finance-partner-badge">
              <span className="finance-partner-label">Powered by</span>
              <JuspayLogo />
            </div>
          </div>

            {/* Right Column: Credit Application Form Card */}
            <div className="finance-form-card">
              <h3 className="finance-form-title">Tell us your Credit Requirements!</h3>

              {isSubmitted ? (
                <div className="finance-form-success">
                  <div className="finance-form-success-icon">✓</div>
                  <h4 className="finance-form-success-title">Request Received!</h4>
                  <p className="finance-form-success-desc">
                    Thank you, <strong>{formData.companyName}</strong>. Your credit requirement has been recorded successfully.
                  </p>
                  <div className="finance-form-success-info">
                    <p>
                      Our financing team (powered by <strong>Juspay</strong>) will verify your GSTIN <strong>{formData.gstNumber}</strong> and contact you at <strong>{formData.contactNumber}</strong> within <strong>24 hours</strong> to finalize your business credit line.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="finance-submit-btn"
                    onClick={handleReset}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form className="finance-form" onSubmit={handleFormSubmit}>
                  {/* Company Name */}
                  <div className="finance-form-group">
                    <label className="finance-form-label">
                      Company Name <span className="finance-req">*</span>
                    </label>
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

                  {/* Contact Number */}
                  <div className="finance-form-group">
                    <label className="finance-form-label">
                      Contact Number <span className="finance-req">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      required
                      placeholder="9958799582"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="finance-input"
                    />
                  </div>

                  {/* GST Number */}
                  <div className="finance-form-group">
                    <label className="finance-form-label">
                      GST Number <span className="finance-req">*</span>
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      required
                      placeholder="07AACCU3255C1ZN"
                      value={formData.gstNumber}
                      onChange={handleInputChange}
                      className="finance-input finance-input--uppercase"
                    />
                  </div>

                  {/* Legal Status Dropdown */}
                  <div className="finance-form-group">
                    <label className="finance-form-label">
                      Legal Status <span className="finance-req">*</span>
                    </label>
                    <div className="finance-select-wrap">
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
                    Submit Request
                  </button>
                </form>
              )}
            </div>
        </section>

        {/* ── 3. How Does It Work Section ── */}
        <section className="finance-how-section">
          <div className="finance-how-header">
            <h2 className="finance-how-title">How Does It Work?</h2>
            <p className="finance-how-sub">
              Getting a credit from Juspay is simple, fast and 100% transparent.
            </p>
          </div>

          <div className="finance-steps-grid">
            <div className="finance-step-card">
              <div className="finance-step-num">01</div>
              <h3 className="finance-step-title">Submit Requirements</h3>
              <p className="finance-step-desc">
                Provide your Company Name, Contact Number, GSTIN, and Legal Status in the digital application form.
              </p>
            </div>

            <div className="finance-step-card">
              <div className="finance-step-num">02</div>
              <h3 className="finance-step-title">Instant Credit Approval</h3>
              <p className="finance-step-desc">
                Get instant credit approval powered by Juspay to manage your business cash flow efficiently.
              </p>
            </div>

            <div className="finance-step-card">
              <div className="finance-step-num">03</div>
              <h3 className="finance-step-title">Flexible Repayment Terms</h3>
              <p className="finance-step-desc">
                Access financing quickly to purchase the equipment and solutions you need with competitive rates and flexible terms.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
