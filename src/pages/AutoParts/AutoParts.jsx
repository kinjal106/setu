import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import autopartsData from '../../data/autoparts.json';
import './AutoParts.css';

/* ── Inline Category Icon for Product Cards ── */
/* ── Inline Category Icon for Product Cards ── */
function PartCategoryIcon({ category, size = 18 }) {
  switch (category) {
    case 'accessories':
    case 'audio-system':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
        </svg>
      );
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

/* ── Highlight Matching Substring in Category Labels ── */
function HighlightMatch({ text, query }) {
  if (!query || !query.trim()) return text;
  const q = query.trim();
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((chunk, i) =>
        chunk.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="cat-search-highlight">
            {chunk}
          </mark>
        ) : (
          chunk
        )
      )}
    </>
  );
}

/* ── Helper to collect all descendant IDs of any category node ── */
function getAllDescendantIds(node) {
  const ids = [node.id];
  if (node.children) {
    node.children.forEach(child => {
      ids.push(...getAllDescendantIds(child));
    });
  }
  return ids;
}

/* ── 3-Layer FilterTree Component with Comprehensive Search ── */
function FilterTree({ categories, selected, onChange, searchQuery = '', onSearchQueryChange, counts = {} }) {
  const [expanded, setExpanded] = useState(() => {
    const all = {};
    (categories || []).forEach(cat => {
      all[cat.id] = true;
    });
    return all;
  });

  // Ensure new categories are expanded by default
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

  // Auto-expand nodes containing matches when search query changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const autoExpanded = {};
      categories.forEach(cat => {
        const catMatches = cat.label.toLowerCase().includes(q);
        let catHasChildMatch = false;

        (cat.children || []).forEach(sub => {
          const subMatches = sub.label.toLowerCase().includes(q);
          const leafMatches = sub.children && sub.children.some(leaf => leaf.label.toLowerCase().includes(q));

          if (subMatches || leafMatches) {
            catHasChildMatch = true;
          }
          if (leafMatches) {
            autoExpanded[sub.id] = true;
          }
        });

        if (catMatches || catHasChildMatch) {
          autoExpanded[cat.id] = true;
        }
      });

      setExpanded(prev => ({ ...prev, ...autoExpanded }));
    }
  }, [searchQuery, categories]);

  const toggleExpand = (nodeId, e) => {
    e?.stopPropagation();
    setExpanded(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  // Toggle Level 1 (Category)
  const toggleCategory = (cat) => {
    const isCatSelected = selected.has(cat.id);
    const descendantIds = getAllDescendantIds(cat);

    onChange(prev => {
      const next = new Set(prev);
      if (isCatSelected) {
        descendantIds.forEach(id => next.delete(id));
      } else {
        descendantIds.forEach(id => next.add(id));
      }
      return next;
    });

    if (!isCatSelected && cat.children?.length) {
      setExpanded(exp => ({ ...exp, [cat.id]: true }));
    }
  };

  // Toggle Level 2 (Subcategory)
  const toggleSubcategory = (cat, sub, e) => {
    e?.stopPropagation();
    const isSubSelected = selected.has(sub.id);
    const leafIds = (sub.children || []).map(l => l.id);

    onChange(prev => {
      const next = new Set(prev);
      if (isSubSelected) {
        next.delete(sub.id);
        leafIds.forEach(id => next.delete(id));
        next.delete(cat.id);
      } else {
        next.add(sub.id);
        leafIds.forEach(id => next.add(id));
        const allSubsSelected = cat.children?.every(s => s.id === sub.id || next.has(s.id));
        if (allSubsSelected) {
          next.add(cat.id);
        }
      }
      return next;
    });

    if (!isSubSelected && sub.children?.length) {
      setExpanded(exp => ({ ...exp, [sub.id]: true }));
    }
  };

  // Toggle Level 3 (Leaf item)
  const toggleLeaf = (cat, sub, leaf, e) => {
    e?.stopPropagation();
    onChange(prev => {
      const next = new Set(prev);
      if (next.has(leaf.id)) {
        next.delete(leaf.id);
        next.delete(sub.id);
        next.delete(cat.id);
      } else {
        next.add(leaf.id);
        const allLeavesSelected = sub.children?.every(l => l.id === leaf.id || next.has(l.id));
        if (allLeavesSelected) {
          next.add(sub.id);
          const allSubsSelected = cat.children?.every(s => s.id === sub.id || next.has(s.id));
          if (allSubsSelected) {
            next.add(cat.id);
          }
        }
      }
      return next;
    });
  };

  // 3-Level Search Filtering
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.trim().toLowerCase();

    return categories.map(cat => {
      const catMatches = cat.label.toLowerCase().includes(q);

      const filteredChildren = (cat.children || []).map(sub => {
        const subMatches = sub.label.toLowerCase().includes(q);

        if (sub.children && sub.children.length > 0) {
          const filteredLeaves = sub.children.filter(leaf => {
            const leafMatches = leaf.label.toLowerCase().includes(q);
            return catMatches || subMatches || leafMatches;
          });

          if (catMatches || subMatches || filteredLeaves.length > 0) {
            return {
              ...sub,
              children: catMatches || subMatches ? sub.children : filteredLeaves
            };
          }
          return null;
        } else {
          if (catMatches || subMatches) {
            return sub;
          }
          return null;
        }
      }).filter(Boolean);

      if (catMatches || filteredChildren.length > 0) {
        return {
          ...cat,
          children: catMatches ? (cat.children || []) : filteredChildren
        };
      }
      return null;
    }).filter(Boolean);
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

      {/* Category Search Input with Search Icon and Clear button ✕ */}
      <div className="autoparts-cat-search">
        <div className="autoparts-cat-search-wrap">
          <svg className="autoparts-cat-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search Category..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            className="autoparts-cat-input"
          />
          {searchQuery && (
            <button 
              type="button" 
              className="autoparts-cat-search-clear"
              onClick={() => onSearchQueryChange('')}
              aria-label="Clear category search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredTree.length === 0 ? (
        <div className="filter-tree__empty-search">
          <p className="filter-tree__empty-search-text">
            No categories found matching "<strong>{searchQuery}</strong>"
          </p>
          <button 
            type="button" 
            className="filter-tree__clear-search-btn"
            onClick={() => onSearchQueryChange('')}
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="filter-tree__list">
          {filteredTree.map(cat => {
            const isCatSelected = selected.has(cat.id);
            const allCatDescendants = getAllDescendantIds(cat);
            const hasChildSelected = allCatDescendants.some(id => id !== cat.id && selected.has(id));
            const isCatActive = isCatSelected || hasChildSelected;
            const isCatExpanded = !!expanded[cat.id];

            return (
              <div key={cat.id} className="fgroup">
                {/* LEVEL 1: Main Category */}
                <div 
                  className={`fgroup__row ${isCatActive ? 'fgroup__row--active' : ''}`}
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

                  <span className="fgroup__label">
                    <HighlightMatch text={cat.label} query={searchQuery} />
                  </span>

                  <span className="fgroup__arrow-slot">
                    {cat.children && cat.children.length > 0 && (
                      <button 
                        type="button"
                        className={`fgroup__arrow ${isCatExpanded ? 'fgroup__arrow--open' : ''}`}
                        onClick={(e) => toggleExpand(cat.id, e)}
                        aria-label={`Toggle ${cat.label} subcategories`}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </button>
                    )}
                  </span>
                </div>

                {/* LEVEL 2: Subcategories */}
                {isCatExpanded && cat.children && (
                  <div className="fgroup__children">
                    {cat.children.map(sub => {
                      const isSubSelected = selected.has(sub.id);
                      const allSubDescendants = getAllDescendantIds(sub);
                      const hasSubChildSelected = allSubDescendants.some(id => id !== sub.id && selected.has(id));
                      const isSubActive = isSubSelected || hasSubChildSelected;
                      const hasL3 = sub.children && sub.children.length > 0;
                      const isSubExpanded = !!expanded[sub.id];

                      return (
                        <div key={sub.id} className="fsubgroup">
                          {/* LEVEL 2 Row */}
                          <div 
                            className={`fsub__row ${isSubActive ? 'fsub__row--active' : ''}`}
                            onClick={(e) => toggleSubcategory(cat, sub, e)}
                          >
                            <label className="fcheck" onClick={e => e.stopPropagation()}>
                              <input 
                                type="checkbox" 
                                checked={isSubSelected} 
                                onChange={(e) => toggleSubcategory(cat, sub, e)} 
                              />
                              <span className="fcheck__box fcheck__box--sm" />
                            </label>

                            <span className="fsub__label">
                              <HighlightMatch text={sub.label} query={searchQuery} />
                            </span>

                            <span className="fsub__arrow-slot">
                              {hasL3 && (
                                <button 
                                  type="button"
                                  className={`fsub__arrow ${isSubExpanded ? 'fsub__arrow--open' : ''}`}
                                  onClick={(e) => toggleExpand(sub.id, e)}
                                  aria-label={`Toggle ${sub.label} items`}
                                >
                                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"/>
                                  </svg>
                                </button>
                              )}
                            </span>
                          </div>

                          {/* LEVEL 3: Leaf Items */}
                          {hasL3 && isSubExpanded && (
                            <div className="fsub__children">
                              {sub.children.map(leaf => {
                                const isLeafSelected = selected.has(leaf.id);

                                return (
                                  <div 
                                    key={leaf.id}
                                    className={`fleaf__row ${isLeafSelected ? 'fleaf__row--active' : ''}`}
                                    onClick={(e) => toggleLeaf(cat, sub, leaf, e)}
                                  >
                                    <label className="fcheck" onClick={e => e.stopPropagation()}>
                                      <input 
                                        type="checkbox" 
                                        checked={isLeafSelected} 
                                        onChange={(e) => toggleLeaf(cat, sub, leaf, e)} 
                                      />
                                      <span className="fcheck__box fcheck__box--xs" />
                                    </label>

                                    <span className="fleaf__label">
                                      <HighlightMatch text={leaf.label} query={searchQuery} />
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
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

  // Dynamic categories based on selected vehicle (empty until a vehicle is searched/selected)
  const vehicleCategories = useMemo(() => {
    if (!selectedVehicle) return [];

    const compatibleParts = autopartsData.parts.filter(part =>
      part.compatibleVehicles.includes(selectedVehicle.id)
    );

    const activeCatIds = new Set(compatibleParts.map(p => p.category));
    const activeSubcatIds = new Set(compatibleParts.map(p => p.subcategory));
    const activeLeafIds = new Set(compatibleParts.map(p => p.leafCategory).filter(Boolean));

    return autopartsData.categories
      .filter(cat => activeCatIds.has(cat.id))
      .map(cat => ({
        ...cat,
        children: (cat.children || [])
          .filter(sub => activeSubcatIds.has(sub.id) || (sub.children && sub.children.some(l => activeLeafIds.has(l.id))))
          .map(sub => ({
            ...sub,
            children: sub.children ? sub.children.filter(l => activeLeafIds.has(l.id)) : undefined
          }))
      }))
      .filter(cat => (cat.children && cat.children.length > 0) || activeCatIds.has(cat.id));
  }, [selectedVehicle]);

  // Category counts mapped across categories, subcategories, and leaves
  const categoryCounts = useMemo(() => {
    if (!selectedVehicle) return {};
    const counts = {};
    const relevantParts = autopartsData.parts.filter(part => part.compatibleVehicles.includes(selectedVehicle.id));

    relevantParts.forEach(p => {
      if (p.category) counts[p.category] = (counts[p.category] || 0) + 1;
      if (p.subcategory) counts[p.subcategory] = (counts[p.subcategory] || 0) + 1;
      if (p.leafCategory) counts[p.leafCategory] = (counts[p.leafCategory] || 0) + 1;
    });

    return counts;
  }, [selectedVehicle]);

  // Dynamic available origins based on selected vehicle (empty until vehicle is selected)
  const availableOrigins = useMemo(() => {
    if (!selectedVehicle) return [];
    const relevantParts = autopartsData.parts.filter(part => part.compatibleVehicles.includes(selectedVehicle.id));
    const origins = new Set(relevantParts.map(p => p.origin));
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

      // 2. Category Filter across L1, L2, L3
      if (selectedCategories.size > 0) {
        const matchesCat = selectedCategories.has(part.category);
        const matchesSubcat = selectedCategories.has(part.subcategory);
        const matchesLeaf = part.leafCategory && selectedCategories.has(part.leafCategory);
        if (!matchesCat && !matchesSubcat && !matchesLeaf) {
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
        {/* ── Left Filter Panel ── */}
        <aside className="autoparts-sidebar">
          {!selectedVehicle ? (
            <div className="autoparts-sidebar-empty">
              <div className="filter-tree__head">
                <span className="filter-tree__title">CATEGORIES</span>
              </div>
              <div className="autoparts-sidebar-empty__body">
                <div className="autoparts-sidebar-empty__icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
                <p className="autoparts-sidebar-empty__text">
                  Please search or select a vehicle to display compatible categories.
                </p>
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

              {/* 2. Categories Filter Tree with 3 layers and proper search */}
              <div className="autoparts-categories-box">
                <FilterTree 
                  categories={vehicleCategories} 
                  selected={selectedCategories} 
                  onChange={setSelectedCategories}
                  searchQuery={categorySearchQuery}
                  onSearchQueryChange={setCategorySearchQuery}
                  counts={categoryCounts}
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

            {/* 2. Content Area: When NO vehicle is selected and not searching by part number */}
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
                    Auto spare parts and categories are vehicle-specific. Please enter your vehicle registration number or choose your Make, Model &amp; Variant above to view compatible categories and verified parts.
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
  );
}
