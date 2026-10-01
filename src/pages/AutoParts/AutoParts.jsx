import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import autopartsData from '../../data/autoparts.json';
import './AutoParts.css';

/* ── Inline Category Icon for Product Cards ── */
function PartCategoryIcon({ category, size = 18 }) {
  switch (category) {
    case 'brake-system':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      );
    case 'filters':
    case 'service-filters':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
        </svg>
      );
    case 'electric-components':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'engine-cooling':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'suspension-steering':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'clutch-system':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      );
    case 'windscreen-body':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case 'fasteners-hardware':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="4" y1="15" x2="20" y2="15" />
          <line x1="10" y1="3" x2="8" y2="21" />
          <line x1="16" y1="3" x2="14" y2="21" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      );
  }
}

/* ── FilterTree Component (Matching Hardware Page Architecture) ── */
function FilterTree({ categories, selected, onChange, searchQuery = '' }) {
  const [expanded, setExpanded] = useState(() => {
    const all = {};
    (categories || []).forEach(cat => {
      all[cat.id] = true;
    });
    return all;
  });

  useEffect(() => {
    if (categories && categories.length > 0) {
      setExpanded(prev => {
        const next = { ...prev };
        categories.forEach(cat => {
          if (next[cat.id] === undefined) {
            next[cat.id] = true;
          }
        });
        return next;
      });
    }
  }, [categories]);

  const toggleExpand = (catId, e) => {
    e?.stopPropagation();
    setExpanded(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleCategory = (cat) => {
    const isCatSelected = selected.has(cat.id);
    const childIds = (cat.children || []).map(c => c.id);

    onChange(prev => {
      const next = new Set(prev);
      if (isCatSelected) {
        next.delete(cat.id);
        childIds.forEach(id => next.delete(id));
      } else {
        next.add(cat.id);
        childIds.forEach(id => next.add(id));
      }
      return next;
    });

    if (!isCatSelected && cat.children?.length) {
      setExpanded(exp => ({ ...exp, [cat.id]: true }));
    }
  };

  const toggleSubcategory = (cat, childId, e) => {
    e.stopPropagation();
    onChange(prev => {
      const next = new Set(prev);
      if (next.has(childId)) {
        next.delete(childId);
        next.delete(cat.id);
      } else {
        next.add(childId);
        const allChildrenSelected = cat.children?.every(c => c.id === childId || next.has(c.id));
        if (allChildrenSelected) {
          next.add(cat.id);
        }
      }
      return next;
    });
  };

  // Optional category search filtering inside tree
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.trim().toLowerCase();
    return categories.filter(cat => {
      const matchCat = cat.label.toLowerCase().includes(q);
      const matchChild = cat.children && cat.children.some(c => c.label.toLowerCase().includes(q));
      return matchCat || matchChild;
    });
  }, [categories, searchQuery]);

  return (
    <div className="filter-tree">
      <div className="filter-tree__head">
        <span className="filter-tree__title">CATEGORIES</span>
        {selected.size > 0 && (
          <button 
            type="button" 
            className="filter-tree__reset-btn"
            onClick={() => onChange(new Set())}
          >
            Clear
          </button>
        )}
      </div>

      <div className="filter-tree__list">
        {filteredTree.map(cat => {
          const isCatSelected = selected.has(cat.id);
          const hasChildSelected = cat.children && cat.children.some(c => selected.has(c.id));
          const isActive = isCatSelected || hasChildSelected;
          const isExpanded = !!expanded[cat.id];

          return (
            <div key={cat.id} className="fgroup">
              <div 
                className={`fgroup__row ${isActive ? 'fgroup__row--active' : ''}`}
                onClick={() => toggleCategory(cat)}
              >
                <label className="fcheck" onClick={e => e.stopPropagation()}>
                  <input 
                    type="checkbox" 
                    checked={isCatSelected} 
                    onChange={() => toggleCategory(cat)} 
                  />
                  <span className="fcheck__box" />
                </label>

                <span className="fgroup__label">{cat.label}</span>

                {cat.children && cat.children.length > 0 && (
                  <button 
                    type="button"
                    className={`fgroup__arrow ${isExpanded ? 'fgroup__arrow--open' : ''}`}
                    onClick={(e) => toggleExpand(cat.id, e)}
                    aria-label={`Toggle ${cat.label} subcategories`}
                  >
                    <svg width="7" height="9" viewBox="0 0 6 8" fill="currentColor">
                      <polygon points="0 0 6 4 0 8"/>
                    </svg>
                  </button>
                )}
              </div>

              {isExpanded && cat.children && (
                <div className="fgroup__children">
                  {cat.children.map(child => (
                    <div 
                      key={child.id} 
                      className={`fchild ${selected.has(child.id) ? 'fchild--active' : ''}`}
                      onClick={(e) => toggleSubcategory(cat, child.id, e)}
                    >
                      <label className="fcheck" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={selected.has(child.id)} 
                          onChange={(e) => toggleSubcategory(cat, child.id, e)} 
                        />
                        <span className="fcheck__box fcheck__box--sm" />
                      </label>
                      <span className="fchild__label">{child.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AutoParts() {
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();

  // Active Vehicle State: null until searched/selected
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  // Search Mode Tab: 'reg' | 'makeModel' | 'partNo'
  const [searchTab, setSearchTab] = useState('reg');

  // Tab 1: Registration Input
  const [regInput, setRegInput] = useState('');
  const [regLookupError, setRegLookupError] = useState('');

  // Tab 2: Make / Model / Year / Variant
  const [makeSelect, setMakeSelect] = useState('MARUTI');
  const [modelSelect, setModelSelect] = useState('SWIFT');
  const [yearSelect, setYearSelect] = useState('2016');
  const [variantSelect, setVariantSelect] = useState('1.2L VXI MT (TYPE 2 K12M)');

  // Tab 3: Part Number Search
  const [partNoInput, setPartNoInput] = useState('');

  // Filters
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  
  // Origin Filters: Set of 'Aftermarket', 'OEM'
  const [selectedOrigins, setSelectedOrigins] = useState(new Set());

  // Search & Sort within main parts list
  const [searchPartsFilter, setSearchPartsFilter] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [addedPartId, setAddedPartId] = useState(null);

  // Dynamic categories based ONLY on selected vehicle
  const vehicleCategories = useMemo(() => {
    if (!selectedVehicle) return [];

    const compatibleParts = autopartsData.parts.filter(part =>
      part.compatibleVehicles.includes(selectedVehicle.id)
    );

    const activeCatIds = new Set(compatibleParts.map(p => p.category));
    const activeSubcatIds = new Set(compatibleParts.map(p => p.subcategory));

    return autopartsData.categories
      .filter(cat => activeCatIds.has(cat.id))
      .map(cat => ({
        ...cat,
        children: (cat.children || []).filter(sub => activeSubcatIds.has(sub.id))
      }))
      .filter(cat => (cat.children && cat.children.length > 0) || activeCatIds.has(cat.id));
  }, [selectedVehicle]);

  // Dynamic available origins based on selected vehicle
  const availableOrigins = useMemo(() => {
    if (!selectedVehicle) return [];
    const compatibleParts = autopartsData.parts.filter(part =>
      part.compatibleVehicles.includes(selectedVehicle.id)
    );
    const origins = new Set(compatibleParts.map(p => p.origin));
    return ['Aftermarket', 'OEM'].filter(o => origins.has(o));
  }, [selectedVehicle]);

  // Handle Tab 1 Vehicle Lookup
  const handleRegSearch = (e) => {
    e?.preventDefault();
    setRegLookupError('');
    const cleaned = regInput.trim().toUpperCase().replace(/[\s-]+/g, '');
    if (!cleaned) {
      setRegLookupError('Please enter a vehicle registration number (e.g. GJ15CF6106, GJ01AB1234).');
      return;
    }
    const found = autopartsData.vehicles.find(v => v.regNumber.replace(/[\s-]+/g, '') === cleaned);
    if (found) {
      setSelectedVehicle(found);
      setSelectedCategories(new Set());
      setSelectedOrigins(new Set());
      setCategorySearchQuery('');
      setSearchPartsFilter('');
    } else {
      setRegLookupError('Vehicle not found. Try demo numbers: GJ15CF6106, MH02CB4421, DL1ZA8902, or GJ01AB1234.');
    }
  };

  // Handle Tab 2 Vehicle Lookup
  const handleMakeModelSearch = (e) => {
    e?.preventDefault();
    const found = autopartsData.vehicles.find(v => v.make === makeSelect && v.model === modelSelect) ||
                  autopartsData.vehicles.find(v => v.make === makeSelect) ||
                  autopartsData.vehicles[0];
    if (found) {
      setSelectedVehicle(found);
      setRegInput(found.regNumber);
      setSelectedCategories(new Set());
      setSelectedOrigins(new Set());
      setCategorySearchQuery('');
      setSearchPartsFilter('');
      setRegLookupError('');
    }
  };

  // Quick Select Vehicle from Welcome View
  const handleQuickSelectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setRegInput(vehicle.regNumber);
    setRegLookupError('');
    setSelectedCategories(new Set());
    setSelectedOrigins(new Set());
    setCategorySearchQuery('');
    setSearchPartsFilter('');
  };

  // Handle Reset Vehicle Filter
  const handleResetVehicle = () => {
    setSelectedVehicle(null);
    setRegInput('');
    setRegLookupError('');
    setPartNoInput('');
    setSelectedCategories(new Set());
    setSelectedOrigins(new Set());
    setCategorySearchQuery('');
    setSearchPartsFilter('');
  };

  // Toggle Origin checkbox
  const toggleOrigin = (originKey) => {
    setSelectedOrigins(prev => {
      const next = new Set(prev);
      if (next.has(originKey)) next.delete(originKey);
      else next.add(originKey);
      return next;
    });
  };

  // Main Parts Filtering Logic
  const filteredParts = useMemo(() => {
    // If no vehicle is selected and not searching directly by part number, show no parts
    if (!selectedVehicle && !(searchTab === 'partNo' && partNoInput.trim())) {
      return [];
    }

    return autopartsData.parts.filter(part => {
      // 1. Vehicle compatibility check (if vehicle is selected)
      if (selectedVehicle) {
        if (!part.compatibleVehicles.includes(selectedVehicle.id)) {
          return false;
        }
      }

      // 2. Category Filter (using FilterTree selection matching Hardware)
      if (selectedCategories.size > 0) {
        const matchesCat = selectedCategories.has(part.category);
        const matchesSubcat = selectedCategories.has(part.subcategory);
        if (!matchesCat && !matchesSubcat) {
          return false;
        }
      }

      // 3. Origin Filter (OEM / Aftermarket checkboxes)
      if (selectedOrigins.size > 0) {
        if (!selectedOrigins.has(part.origin)) {
          return false;
        }
      }

      // 4. Direct Part Number search tab
      if (searchTab === 'partNo' && partNoInput.trim()) {
        const pNoQuery = partNoInput.trim().toLowerCase();
        if (!part.partNumber.toLowerCase().includes(pNoQuery) && !part.name.toLowerCase().includes(pNoQuery)) {
          return false;
        }
      }

      // 5. Filter within parts input
      if (searchPartsFilter.trim()) {
        const q = searchPartsFilter.trim().toLowerCase();
        const match = part.name.toLowerCase().includes(q) ||
                      part.partNumber.toLowerCase().includes(q) ||
                      part.brand.toLowerCase().includes(q) ||
                      part.categoryName.toLowerCase().includes(q) ||
                      part.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended
    });
  }, [selectedVehicle, selectedCategories, selectedOrigins, searchTab, partNoInput, searchPartsFilter, sortBy]);

  // Add Part to Cart
  const handleAddPartToCart = (part, e) => {
    e?.stopPropagation();
    addToCart({
      id: part.id,
      name: part.name,
      price: part.price,
      image: '/images/hardware/br06.svg',
      brand: part.brand,
      partNumber: part.partNumber,
      category: part.categoryName,
      unit: 'Per Piece'
    });
    setAddedPartId(part.id);
    setTimeout(() => setAddedPartId(null), 1800);
  };

  const handleBuyNow = (part, e) => {
    e?.stopPropagation();
    addToCart({
      id: part.id,
      name: part.name,
      price: part.price,
      image: '/images/hardware/br06.svg',
      brand: part.brand,
      partNumber: part.partNumber,
      category: part.categoryName,
      unit: 'Per Piece'
    });
    setIsCartOpen(true);
  };

  return (
    <div className="autoparts-page">
      <div className="autoparts-card">
        
        {/* ── Fixed Topbar: Breadcrumbs + Navigation State ── */}
        <div className="autoparts-topbar">
          <nav className="autoparts-breadcrumbs">
            <button type="button" className="autoparts-crumb-link" onClick={() => navigate('/')}>Home</button>
            <span className="autoparts-sep">›</span>
            <span className="autoparts-crumb-current">Auto Spare Parts</span>
            <span className="autoparts-badge-beta">BETA</span>
            {selectedVehicle && (
              <>
                <span className="autoparts-sep">›</span>
                <span className="autoparts-vehicle-tag">
                  {selectedVehicle.make} {selectedVehicle.model} ({selectedVehicle.year})
                </span>
              </>
            )}
          </nav>

          <div className="autoparts-topbar-actions">
            {(selectedVehicle || selectedCategories.size > 0 || selectedOrigins.size > 0 || searchPartsFilter) && (
              <button 
                type="button" 
                className="autoparts-reset-all-btn"
                onClick={handleResetVehicle}
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* ── Unified Body: Left Filter Panel + Right Content Area ── */}
        <div className="autoparts-body">
          
          {/* ══════════════════════════════════════════════════════
             LEFT PANEL: Categories dynamically displayed ONLY based on selected vehicle
             ══════════════════════════════════════════════════════ */}
          <aside className="autoparts-sidebar">
            {!selectedVehicle ? (
              /* Before searching any vehicle: NO CATEGORIES ARE SHOWN */
              <div className="autoparts-sidebar-empty">
                <div className="autoparts-sidebar-empty-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <h4 className="autoparts-sidebar-empty-title">Vehicle Required</h4>
                <p className="autoparts-sidebar-empty-desc">
                  Categories and genuine spare parts are dynamically loaded based on the searched vehicle.
                </p>
                <div className="autoparts-sidebar-empty-hint">
                  <span>Enter vehicle registration number or select maker above to display categories.</span>
                </div>
              </div>
            ) : (
              <>
                {/* 1. Origin Filter */}
                {availableOrigins.length > 0 && (
                  <div className="autoparts-origin-box">
                    <div className="filter-tree__head">
                      <span className="filter-tree__title">ORIGIN</span>
                      {selectedOrigins.size > 0 && (
                        <button 
                          type="button" 
                          className="filter-tree__reset-btn"
                          onClick={() => setSelectedOrigins(new Set())}
                        >
                          Reset
                        </button>
                      )}
                    </div>

                    <div className="autoparts-origin-list">
                      {availableOrigins.includes('Aftermarket') && (
                        <div 
                          className={`fgroup__row ${selectedOrigins.has('Aftermarket') ? 'fgroup__row--active' : ''}`}
                          onClick={() => toggleOrigin('Aftermarket')}
                        >
                          <label className="fcheck" onClick={e => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={selectedOrigins.has('Aftermarket')} 
                              onChange={() => toggleOrigin('Aftermarket')} 
                            />
                            <span className="fcheck__box" />
                          </label>
                          <span className="fgroup__label">Aftermarket</span>
                        </div>
                      )}

                      {availableOrigins.includes('OEM') && (
                        <div 
                          className={`fgroup__row ${selectedOrigins.has('OEM') ? 'fgroup__row--active' : ''}`}
                          onClick={() => toggleOrigin('OEM')}
                        >
                          <label className="fcheck" onClick={e => e.stopPropagation()}>
                            <input 
                              type="checkbox" 
                              checked={selectedOrigins.has('OEM')} 
                              onChange={() => toggleOrigin('OEM')} 
                            />
                            <span className="fcheck__box" />
                          </label>
                          <span className="fgroup__label">OEM</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. Categories Filter Tree matching Screenshot 1 and Hardware Page */}
                <div className="autoparts-categories-box">
                  <div className="autoparts-cat-search">
                    <input
                      type="text"
                      placeholder="Search Category..."
                      value={categorySearchQuery}
                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                      className="autoparts-cat-input"
                    />
                  </div>

                  <FilterTree 
                    categories={vehicleCategories} 
                    selected={selectedCategories} 
                    onChange={setSelectedCategories}
                    searchQuery={categorySearchQuery}
                  />
                </div>
              </>
            )}
          </aside>

          {/* ══════════════════════════════════════════════════════
             RIGHT PANEL: Vehicle Finder Tabs & Parts Listing
             ══════════════════════════════════════════════════════ */}
          <main className="autoparts-main">
            
            {/* 1. Vehicle Finder Box (Clean search matching Screenshot 1 & 2 without highlighted clutter) */}
            <div className="autoparts-finder-card">
              <div className="autoparts-finder-tabs">
                <button
                  type="button"
                  className={`autoparts-finder-tab ${searchTab === 'reg' ? 'autoparts-finder-tab--active' : ''}`}
                  onClick={() => setSearchTab('reg')}
                >
                  <span>Search by Vehicle Number</span>
                </button>
                <button
                  type="button"
                  className={`autoparts-finder-tab ${searchTab === 'makeModel' ? 'autoparts-finder-tab--active' : ''}`}
                  onClick={() => setSearchTab('makeModel')}
                >
                  <span>Search by Maker/Model/Variant</span>
                </button>
                <button
                  type="button"
                  className={`autoparts-finder-tab ${searchTab === 'partNo' ? 'autoparts-finder-tab--active' : ''}`}
                  onClick={() => setSearchTab('partNo')}
                >
                  <span>Search by Part Number</span>
                </button>
                <button
                  type="button"
                  className="autoparts-finder-reset-btn"
                  onClick={handleResetVehicle}
                  title="Reset vehicle search"
                >
                  ⟲ Reset
                </button>
              </div>

              <div className="autoparts-finder-body">
                {/* Tab 1: Registration Search Form */}
                {searchTab === 'reg' && (
                  <form className="autoparts-finder-form" onSubmit={handleRegSearch}>
                    <div className="autoparts-finder-flex-row">
                      {/* Left: Input + Search button */}
                      <div className="autoparts-reg-input-group">
                        <label className="autoparts-finder-label">Enter the vehicle registration number</label>
                        <div className="autoparts-reg-row">
                          <div className="autoparts-input-with-clear">
                            <input
                              type="text"
                              placeholder="GJ01AB1234"
                              value={regInput}
                              onChange={(e) => setRegInput(e.target.value)}
                              className="autoparts-reg-input"
                            />
                            {regInput && (
                              <button 
                                type="button" 
                                className="autoparts-input-clear-icon"
                                onClick={() => setRegInput('')}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                          <button type="submit" className="autoparts-search-parts-btn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <span>Search Parts</span>
                          </button>
                        </div>
                        {regLookupError && (
                          <p className="autoparts-finder-error">{regLookupError}</p>
                        )}
                      </div>

                      {/* Right: 4 live vehicle spec fields side-by-side matching screenshot 1 & 2 */}
                      <div className="autoparts-spec-fields-row">
                        <div className="autoparts-spec-field">
                          <label>Vehicle Make</label>
                          <input 
                            type="text" 
                            readOnly 
                            placeholder="Make" 
                            value={selectedVehicle ? selectedVehicle.make : ''} 
                            className="autoparts-spec-input"
                          />
                        </div>
                        <div className="autoparts-spec-field">
                          <label>Model</label>
                          <input 
                            type="text" 
                            readOnly 
                            placeholder="Model" 
                            value={selectedVehicle ? selectedVehicle.model : ''} 
                            className="autoparts-spec-input"
                          />
                        </div>
                        <div className="autoparts-spec-field">
                          <label>Year</label>
                          <input 
                            type="text" 
                            readOnly 
                            placeholder="Year" 
                            value={selectedVehicle ? selectedVehicle.year : ''} 
                            className="autoparts-spec-input"
                          />
                        </div>
                        <div className="autoparts-spec-field autoparts-spec-field--variant">
                          <label>Variant</label>
                          <input 
                            type="text" 
                            readOnly 
                            placeholder="Variant" 
                            value={selectedVehicle ? selectedVehicle.variant : ''} 
                            className="autoparts-spec-input"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                )}

                {/* Tab 2: Make / Model / Year / Variant Dropdowns */}
                {searchTab === 'makeModel' && (
                  <form className="autoparts-finder-cascade" onSubmit={handleMakeModelSearch}>
                    <div className="autoparts-cascade-grid">
                      <div className="autoparts-cascade-field">
                        <label>Vehicle Make</label>
                        <select value={makeSelect} onChange={e => setMakeSelect(e.target.value)}>
                          <option value="MARUTI">Maruti</option>
                          <option value="HYUNDAI">Hyundai</option>
                          <option value="TATA">Tata</option>
                          <option value="MAHINDRA">Mahindra</option>
                        </select>
                      </div>
                      <div className="autoparts-cascade-field">
                        <label>Model</label>
                        <select value={modelSelect} onChange={e => setModelSelect(e.target.value)}>
                          <option value="SWIFT">Swift</option>
                          <option value="CRETA">Creta</option>
                          <option value="NEXON">Nexon</option>
                          <option value="BOLERO">Bolero</option>
                        </select>
                      </div>
                      <div className="autoparts-cascade-field">
                        <label>Year</label>
                        <select value={yearSelect} onChange={e => setYearSelect(e.target.value)}>
                          <option value="2016">2016</option>
                          <option value="2017">2017</option>
                          <option value="2018">2018</option>
                          <option value="2019">2019</option>
                          <option value="2020">2020</option>
                          <option value="2021">2021</option>
                          <option value="2022">2022</option>
                        </select>
                      </div>
                      <div className="autoparts-cascade-field">
                        <label>Variant</label>
                        <select value={variantSelect} onChange={e => setVariantSelect(e.target.value)}>
                          <option value="1.2L VXI MT (TYPE 2 K12M)">1.2L VXI MT (TYPE 2 K12M)</option>
                          <option value="1.3L DDiS Diesel">1.3L DDiS Diesel</option>
                          <option value="1.2L ZXI AMT">1.2L ZXI AMT</option>
                        </select>
                      </div>
                    </div>
                    <div className="autoparts-cascade-submit">
                      <button type="submit" className="autoparts-search-parts-btn">
                        <span>Search Parts</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Tab 3: Part Number Search */}
                {searchTab === 'partNo' && (
                  <div className="autoparts-partno-search">
                    <label className="autoparts-finder-label">Enter exact Part Number or OEM Reference</label>
                    <div className="autoparts-reg-row">
                      <input
                        type="text"
                        placeholder="e.g. 55810M74L00 (Front Brake Pads) or 16510M68K00 (Oil Filter)"
                        value={partNoInput}
                        onChange={e => setPartNoInput(e.target.value)}
                        className="autoparts-reg-input"
                      />
                      <button type="button" className="autoparts-search-parts-btn" onClick={() => {}}>
                        <span>Search Parts</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="autoparts-finder-footer">
                <span className="autoparts-finder-info-icon">ⓘ</span>
                <span>The search is currently supporting 4 Wheeler, Passenger Cars &amp; Taxi segment.</span>
              </div>
            </div>

            {/* 2. Content Area: When NO vehicle is selected and not direct part search, prompt user */}
            {!selectedVehicle && !(searchTab === 'partNo' && partNoInput.trim()) ? (
              <div className="autoparts-empty-catalog">
                <div className="autoparts-empty-catalog__card">
                  <div className="autoparts-empty-catalog__icon-wrap">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#006EFF" strokeWidth="1.8">
                      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2" />
                      <circle cx="7" cy="17" r="2" />
                      <path d="M9 17h6" />
                      <circle cx="17" cy="17" r="2" />
                    </svg>
                  </div>

                  <h3 className="autoparts-empty-catalog__title">Search or Select a Vehicle First</h3>
                  <p className="autoparts-empty-catalog__subtitle">
                    Auto spare parts and categories are model-specific. Please enter your vehicle registration number or select your Make, Model &amp; Variant above to view verified parts and categories.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* 2. Search Results Header Bar */}
                <div className="autoparts-results-bar">
                  <div className="autoparts-results-top">
                    <div className="autoparts-results-title-group">
                      <h2 className="autoparts-results-title">
                        Search Results <span className="autoparts-results-count">({filteredParts.length})</span>
                      </h2>
                    </div>

                    <div className="autoparts-results-tools">
                      {/* Search within parts */}
                      <div className="autoparts-filter-search">
                        <input
                          type="text"
                          placeholder="Filter parts..."
                          value={searchPartsFilter}
                          onChange={e => setSearchPartsFilter(e.target.value)}
                          className="autoparts-filter-search-input"
                        />
                        {searchPartsFilter && (
                          <button type="button" className="autoparts-clear-btn" onClick={() => setSearchPartsFilter('')}>✕</button>
                        )}
                      </div>

                      {/* Sort selector */}
                      <select 
                        value={sortBy} 
                        onChange={e => setSortBy(e.target.value)}
                        className="autoparts-sort-select"
                      >
                        <option value="recommended">Sort: Recommended</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Customer Rating</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Product Listing Cards */}
                {filteredParts.length > 0 ? (
                  <div className="autoparts-grid">
                    {filteredParts.map(part => {
                      const isAdded = addedPartId === part.id;
                      return (
                        <div 
                          key={part.id} 
                          className="autoparts-card-item"
                          onClick={() => navigate(`/auto-parts/${part.id}`)}
                        >
                          {/* Top Badges */}
                          <div className="autoparts-card-item__top">
                            <span className={`autoparts-origin-badge autoparts-origin-badge--${part.origin.toLowerCase()}`}>
                              {part.origin === 'OEM' ? 'OEM Genuine' : 'Aftermarket'}
                            </span>
                          </div>

                          {/* Product Thumbnail Profile Image */}
                          <div className="autoparts-card-item__thumb">
                            <img 
                              src={part.image || '/images/autoparts/brake-pads.svg'} 
                              alt={part.name} 
                              className="autoparts-card-item__img" 
                              loading="lazy"
                            />
                          </div>

                          {/* Title */}
                          <div className="autoparts-card-item__info">
                            <h3 className="autoparts-card-item__name" title={part.name}>
                              {part.name}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="autoparts-empty-state">
                    <div className="autoparts-empty-icon">🔍</div>
                    <h3>No compatible auto parts found</h3>
                    <p>We couldn't find matching parts with your current filter criteria. Try resetting categories or search keywords.</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setSelectedCategories(new Set());
                        setSelectedOrigins(new Set());
                        setSearchPartsFilter('');
                        setPartNoInput('');
                      }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </>
            )}

          </main>

        </div>

      </div>

    </div>
  );
}
