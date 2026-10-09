import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import fastagData from '../../data/fastagClasses.json';
import { VehicleIcon } from './VehicleIcons';
import AxleDiagram from './AxleDiagram';
import { FuelFastagHeroCards } from './FuelFastagVisual';
import './FuelFastag.css';

export default function FuelFastag() {
  const navigate = useNavigate();

  // Search & Filter state for the 20 classes table
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState('ALL');

  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'fastag-bulk' | 'fuel-card' | 'enquire'
  const [modalSuccess, setModalSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    quantity: '10',
    tagClass: 'VC4',
    fuelBrand: 'HPCL',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setModalSuccess(true);
    setTimeout(() => {
      setModalSuccess(false);
      setActiveModal(null);
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        quantity: '10',
        tagClass: 'VC4',
        fuelBrand: 'HPCL',
        notes: ''
      });
    }, 2200);
  };

  // Flattened vehicle list for searching and filtering
  const flatVehicles = useMemo(() => {
    const list = [];
    fastagData.forEach((group) => {
      group.vehicles.forEach((v) => {
        list.push({
          ...v,
          tagClass: group.tagClass,
          tagName: group.tagName,
          tagColor: group.tagColor,
          isNoTag: group.isNoTag
        });
      });
    });
    return list;
  }, []);

  const filteredVehicles = useMemo(() => {
    return flatVehicles.filter((item) => {
      const matchesFilter =
        selectedTagFilter === 'ALL' || item.tagClass === selectedTagFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.tagClass.toLowerCase().includes(q) ||
        item.tagName.toLowerCase().includes(q) ||
        String(item.mapperClass).includes(q) ||
        item.gvw.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [flatVehicles, selectedTagFilter, searchQuery]);

  return (
    <div className="fuel-fastag-page">
      <div className="ff-page-container">
        {/* ── 2. Hero Banner (Matches Home Page Hero Styling & Screenshot 1) ── */}
        <section className="ff-hero-banner">
          <div className="ff-hero-banner__bg-glow-left" />
          <div className="ff-hero-banner__bg-glow-right" />

          <div className="ff-hero-banner__content">
            {/* Overline tag */}
            <div className="ff-hero-banner__overline">
              FUEL &amp; FASTAG • NEW ON SETU
            </div>

            {/* Main Headline */}
            <h1 className="ff-hero-banner__headline">
              FASTag and fuel cards for every vehicle you manage
            </h1>

            {/* Subtitle */}
            <p className="ff-hero-banner__desc">
              Order tags and fuel cards in bulk for your own fleet or your customers' fleets,
              with one KYC, one GST invoice and recharge for all vehicles in one go.
            </p>

            {/* Feature Checkmark Pills */}
            <div className="ff-hero-pills">
              <div className="ff-hero-pill">
                <span className="ff-pill-check">✓</span>
                <span>One tag per vehicle, ordered in bulk</span>
              </div>
              <div className="ff-hero-pill">
                <span className="ff-pill-check">✓</span>
                <span>Issue in your customer's name</span>
              </div>
              <div className="ff-hero-pill">
                <span className="ff-pill-check">✓</span>
                <span>FASTag by IDFC FIRST Bank</span>
              </div>
              <div className="ff-hero-pill">
                <span className="ff-pill-check">✓</span>
                <span>HP • IndianOil • BPCL</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="ff-hero-actions">
              <button
                type="button"
                className="ff-btn ff-btn--primary"
                onClick={() => setActiveModal('fastag-bulk')}
              >
                Order FASTags in bulk
              </button>
              <button
                type="button"
                className="ff-btn ff-btn--secondary"
                onClick={() => setActiveModal('fuel-card')}
              >
                Apply for fuel cards
              </button>
              <button
                type="button"
                className="ff-btn ff-btn--tertiary"
                onClick={() => setActiveModal('enquire')}
              >
                Enquire / Connect with us
              </button>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="ff-hero-banner__visual">
            <FuelFastagHeroCards />
          </div>
        </section>

        {/* ── 3. Section: FASTag Vehicle Classes & How to Count Axles ── */}
        <section className="ff-classes-intro-section">
          <div className="ff-section-head">
            <h2 className="ff-section-title">FASTag vehicle classes</h2>
          </div>

          {/* How to count axles Card Diagram */}
          <AxleDiagram />
        </section>

        {/* ── 4. Section: All 20 NETC Vehicle Classes Table ── */}
        <section className="ff-table-section">
          <div className="ff-table-head-wrap">
            <div>
              <h3 className="ff-table-title">All 20 NETC vehicle classes</h3>
              <p className="ff-table-subtitle">
                Mapper class is what the toll system uses; the tag class is printed on the FASTag.
              </p>
            </div>

            {/* Search Filter */}
            <div className="ff-table-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search vehicle, tag, or mapper class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ff-table-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="ff-search-clear-btn"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Filter Tag Buttons */}
          <div className="ff-tag-filter-pills">
            {['ALL', 'VC4', 'VC5', 'VC7', 'VC8', 'VC12', 'VC15', 'VC16', 'No FASTag'].map((t) => (
              <button
                key={t}
                type="button"
                className={`ff-filter-pill ${selectedTagFilter === t ? 'ff-filter-pill--active' : ''}`}
                onClick={() => setSelectedTagFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Comprehensive 20 Classes Table */}
          <div className="ff-table-card">
            <div className="ff-table-responsive">
              <table className="ff-table">
                <thead>
                  <tr>
                    <th style={{ width: '180px' }}>TAG CLASS</th>
                    <th style={{ width: '380px' }}>VEHICLE</th>
                    <th style={{ width: '180px' }}>NETC MAPPER CLASS</th>
                    <th style={{ width: '220px' }}>GROSS VEHICLE WEIGHT</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>AXLES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((item, idx) => (
                    <tr key={`${item.tagClass}-${item.name}-${idx}`} className="ff-table-row">
                      {/* Tag Class Badge Column */}
                      <td className="ff-col-tag">
                        {item.isNoTag ? (
                          <span className="ff-no-tag-text">No FASTag</span>
                        ) : (
                          <div className="ff-tag-badge-group">
                            <span
                              className="ff-tag-badge"
                              style={{ backgroundColor: item.tagColor }}
                            >
                              {item.tagClass}
                            </span>
                            <span
                              className="ff-tag-name-sub"
                              style={{ color: item.tagColor }}
                            >
                              {item.tagName}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Vehicle Column with clean SVG Icon */}
                      <td className="ff-col-vehicle">
                        <div className="ff-vehicle-cell">
                          <div className="ff-vehicle-icon-box">
                            <VehicleIcon name={item.icon} />
                          </div>
                          <span className="ff-vehicle-name">{item.name}</span>
                        </div>
                      </td>

                      {/* NETC Mapper Class */}
                      <td className="ff-col-mapper">
                        <span className="ff-mapper-num">{item.mapperClass}</span>
                      </td>

                      {/* Gross Vehicle Weight */}
                      <td className="ff-col-gvw">
                        <span className="ff-gvw-text">{item.gvw}</span>
                      </td>

                      {/* Axles */}
                      <td className="ff-col-axles">
                        <span className="ff-axles-text">{item.axles}</span>
                      </td>
                    </tr>
                  ))}
                  {filteredVehicles.length === 0 && (
                    <tr>
                      <td colSpan="5" className="ff-no-results-td">
                        No vehicle classes match your search query "{searchQuery}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer Citation */}
            <div className="ff-table-footer">
              Source: NETC "FASTag Issuance – Vehicle Classification" document; weight and axles as per MoRTH Notification S.O. 728(E), 18.10.1996.
            </div>
          </div>
        </section>
      </div>

      {/* ── 5. Action Modals (Order FASTags in Bulk / Fuel Cards / Enquire) ── */}
      {activeModal && (
        <div className="ff-modal-overlay" onClick={() => !modalSuccess && setActiveModal(null)}>
          <div className="ff-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ff-modal-head">
              <h3>
                {activeModal === 'fastag-bulk' && 'Order FASTags in Bulk'}
                {activeModal === 'fuel-card' && 'Apply for Fleet Fuel Cards'}
                {activeModal === 'enquire' && 'Connect with Setu Fleet Specialist'}
              </h3>
              <button
                type="button"
                className="ff-modal-close"
                onClick={() => setActiveModal(null)}
              >
                ✕
              </button>
            </div>

            {modalSuccess ? (
              <div className="ff-modal-success">
                <div className="ff-success-icon">✓</div>
                <h4>Request Received Successfully!</h4>
                <p>
                  Our dedicated fleet account manager will contact you within 15 minutes to verify vehicle classes and process paperwork.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="ff-modal-form">
                <p className="ff-modal-note">
                  {activeModal === 'fastag-bulk' && 'Single KYC & unified GST billing powered by IDFC FIRST Bank.'}
                  {activeModal === 'fuel-card' && 'Prepaid corporate fuel cards accepted at all HPCL, IOCL, and BPCL stations nationwide.'}
                  {activeModal === 'enquire' && 'Ask questions regarding toll discounts, NHAI axle disputes, or multi-fleet billing.'}
                </p>

                <div className="ff-form-grid">
                  <div className="ff-form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="ff-form-group">
                    <label>Company / Fleet Name *</label>
                    <input
                      type="text"
                      name="company"
                      required
                      placeholder="e.g. Patel Logistics Pvt Ltd"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="ff-form-grid">
                  <div className="ff-form-group">
                    <label>Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="ff-form-group">
                    <label>Work Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="ramesh@patellogistics.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {activeModal === 'fastag-bulk' && (
                  <div className="ff-form-grid">
                    <div className="ff-form-group">
                      <label>Approx. Vehicle Count</label>
                      <select name="quantity" value={formData.quantity} onChange={handleInputChange}>
                        <option value="5-10">5 – 10 Vehicles</option>
                        <option value="11-25">11 – 25 Vehicles</option>
                        <option value="26-50">26 – 50 Vehicles</option>
                        <option value="50+">50+ Large Fleet</option>
                      </select>
                    </div>
                    <div className="ff-form-group">
                      <label>Primary Vehicle Tag Class</label>
                      <select name="tagClass" value={formData.tagClass} onChange={handleInputChange}>
                        <option value="VC4">VC4 – Car / LCV (Violet Tag)</option>
                        <option value="VC5">VC5 – 2-Axle LCV / Mini-bus (Orange Tag)</option>
                        <option value="VC7">VC7 – 2-Axle Bus / Truck (Blue Tag)</option>
                        <option value="VC8">VC8 – 3-Axle Truck / 4-Axle (Yellow Tag)</option>
                        <option value="VC12">VC12 – 5 &amp; 6-Axle Heavy (Pink Tag)</option>
                        <option value="VC15">VC15 – Multi-Axle 7+ (Light Blue Tag)</option>
                        <option value="MIXED">Mixed Multi-Class Fleet</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeModal === 'fuel-card' && (
                  <div className="ff-form-grid">
                    <div className="ff-form-group">
                      <label>Preferred Fuel Network</label>
                      <select name="fuelBrand" value={formData.fuelBrand} onChange={handleInputChange}>
                        <option value="HPCL">HPCL DriveTrack Plus</option>
                        <option value="IOCL">IndianOil XTRAPOWER</option>
                        <option value="BPCL">BPCL SmartFleet</option>
                        <option value="ALL">All-Network Universal Card</option>
                      </select>
                    </div>
                    <div className="ff-form-group">
                      <label>Estimated Monthly Fuel Spend</label>
                      <select name="quantity" value={formData.quantity} onChange={handleInputChange}>
                        <option value="1-5L">₹1 – 5 Lakhs / month</option>
                        <option value="5-15L">₹5 – 15 Lakhs / month</option>
                        <option value="15-50L">₹15 – 50 Lakhs / month</option>
                        <option value="50L+">₹50 Lakhs+ Enterprise</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="ff-form-group">
                  <label>Additional Notes or Questions</label>
                  <textarea
                    name="notes"
                    rows="2"
                    placeholder="Specific questions about toll discounts, delivery timelines, or RC verification..."
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="ff-modal-foot">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setActiveModal(null)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Request →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
