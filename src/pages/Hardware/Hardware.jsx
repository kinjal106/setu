import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import products from '../../data/products.json';
import categories from '../../data/categories.json';
import { getAssetUrl } from '../../utils/assetUrl';
import './Hardware.css';


const BRAND_ORDER = [
  'M Series',
  'T98 Series',
  'BR Series',
  'LLS Series',
  'Magnet Series',
  'Mercetech',
  'EC Series',
  'Eco5 Series'
];

/* ── Filter Tree matching reference image ── */
function FilterTree({ categories, selected, onChange }) {
  // By default, close all categories. Only expand categories with active selections.
  const [expanded, setExpanded] = useState(() => {
    const init = {};
    (categories || []).forEach(cat => {
      const isCatSelected = selected.has(cat.id);
      const hasChildSelected = cat.children && cat.children.some(c => selected.has(c.id));
      init[cat.id] = isCatSelected || hasChildSelected;
    });
    return init;
  });

  // When selection changes or categories update, expand any category that has active selections
  useEffect(() => {
    if (categories && categories.length > 0) {
      setExpanded(prev => {
        const next = { ...prev };
        categories.forEach(cat => {
          const isCatSelected = selected.has(cat.id);
          const hasChildSelected = cat.children && cat.children.some(c => selected.has(c.id));
          if (isCatSelected || hasChildSelected) {
            next[cat.id] = true;
          } else if (selected.size === 0) {
            // When all selections are cleared, close all categories back to default
            next[cat.id] = false;
          }
        });
        return next;
      });
    }
  }, [categories, selected]);

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
    setExpanded(exp => ({ ...exp, [cat.id]: true }));
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
        {categories.map(cat => {
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

                <span className="fgroup__arrow-slot">
                  {cat.children && cat.children.length > 0 && (
                    <button 
                      type="button"
                      className={`fgroup__arrow ${isExpanded ? 'fgroup__arrow--open' : ''}`}
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

/* ── Brand Filter Component matching media_1791179790288.png ── */
function BrandFilter({ selected, onChange }) {
  const brandList = useMemo(() => {
    const counts = {};
    products.forEach(p => {
      if (p.brand) {
        counts[p.brand] = (counts[p.brand] || 0) + 1;
      }
    });

    const items = [];
    BRAND_ORDER.forEach(b => {
      items.push({ name: b, count: counts[b] || 0 });
    });

    Object.keys(counts).forEach(b => {
      if (!BRAND_ORDER.includes(b)) {
        items.push({ name: b, count: counts[b] });
      }
    });

    return items;
  }, []);

  const toggleBrand = (brandName) => {
    onChange(prev => {
      const next = new Set(prev);
      if (next.has(brandName)) {
        next.delete(brandName);
      } else {
        next.add(brandName);
      }
      return next;
    });
  };

  return (
    <div className="filter-brand">
      <div className="filter-brand__head">
        <span className="filter-brand__title">BRAND</span>
        {selected.size > 0 && (
          <button 
            type="button" 
            className="filter-brand__reset-btn"
            onClick={() => onChange(new Set())}
          >
            Clear
          </button>
        )}
      </div>

      <div className="filter-brand__list">
        {brandList.map(b => {
          const isSelected = selected.has(b.name);
          return (
            <div 
              key={b.name} 
              className={`fgroup__row ${isSelected ? 'fgroup__row--active' : ''}`}
              onClick={() => toggleBrand(b.name)}
            >
              <label className="fcheck" onClick={e => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  checked={isSelected} 
                  onChange={() => toggleBrand(b.name)} 
                />
                <span className="fcheck__box" />
              </label>
              <span className="fgroup__label">{b.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Product Card Component matching media_1791179790288.png ── */
function ProductCard({ product, isLowest, onClick }) {
  const [imgError, setImgError] = useState(false);

  const basePrice = Number(product.price || product.pricingPlans?.[0]?.price || 599);
  const wholePrice = Math.floor(basePrice).toLocaleString('en-IN');
  const decimalPart = basePrice % 1 === 0 ? '00' : (basePrice % 1).toFixed(2).slice(2);

  const displayTags = product.tags && product.tags.length > 0
    ? product.tags
    : (product.features && product.features.length > 0 ? product.features.slice(0, 2) : ['Live tracking']);

  return (
    <div className="pcard-ref" onClick={onClick}>
      {/* Left image container */}
      <div className="pcard-ref__img-box">
        {(isLowest || product.isLowest) && <span className="pcard-ref__badge">Lowest price</span>}
        <div className="pcard-ref__img-center">
          {product.image && !imgError ? (
            <img
              src={getAssetUrl(product.image)}
              alt={product.name}
              className="pcard-ref__img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="pcard-ref__placeholder">
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
                <circle cx="12" cy="14" r="2"/>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Right details container */}
      <div className="pcard-ref__info">
        <div className="pcard-ref__content">
          <h3 className="pcard-ref__title">{product.name}</h3>

          {product.shortDescription && (
            <p className="pcard-ref__desc">{product.shortDescription}</p>
          )}

          {/* Feature Badges / Pills */}
          {displayTags && displayTags.length > 0 && (
            <div className="pcard-ref__tags">
              {displayTags.map((tag, idx) => (
                <span key={idx} className="pcard-ref__tag-pill">{tag}</span>
              ))}
            </div>
          )}

          {/* Price display row */}
          <div className="pcard-ref__price-row">
            <span className="pcard-ref__currency">₹</span>
            <span className="pcard-ref__amount">{wholePrice}</span>
            <span className="pcard-ref__super">{decimalPart}</span>
            <span className="pcard-ref__gst">+ GST</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const STOP_WORDS = new Set(['find', 'search', 'for', 'the', 'a', 'an', 'in', 'on', 'with', 'and', 'or', 'device', 'devices', 'approved', 'hardware']);

/* ── Hardware Page ── */
export default function Hardware() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlQ = searchParams.get('q') || '';
  const urlCat = searchParams.get('category') || '';
  const urlSub = searchParams.get('sub') || '';

  const getInitialSelection = () => {
    if (urlSub) return new Set([urlSub]);
    if (urlCat && urlCat !== 'all') {
      const cat = categories.find(c => c.id === urlCat);
      if (cat) {
        const ids = [cat.id];
        if (cat.children) cat.children.forEach(c => ids.push(c.id));
        return new Set(ids);
      }
      return new Set([urlCat]);
    }
    return new Set();
  };

  const [selected, setSelected] = useState(getInitialSelection);
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [search, setSearch] = useState(urlQ);

  useEffect(() => {
    setSearch(urlQ);
  }, [urlQ]);

  useEffect(() => {
    if (urlSub) {
      setSelected(new Set([urlSub]));
    } else if (urlCat && urlCat !== 'all') {
      const cat = categories.find(c => c.id === urlCat);
      if (cat) {
        const ids = [cat.id];
        if (cat.children) cat.children.forEach(c => ids.push(c.id));
        setSelected(new Set(ids));
      } else {
        setSelected(new Set([urlCat]));
      }
    } else {
      setSelected(new Set());
    }
  }, [urlCat, urlSub]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      // 1. Keyword search filter
      const q = search.trim().toLowerCase();
      let matchQ = true;
      if (q) {
        const rawTokens = q.replace(/[^\w\s-]/g, ' ').split(/\s+/).filter(Boolean);
        const keywords = rawTokens.filter(t => !STOP_WORDS.has(t));
        const tokensToUse = keywords.length > 0 ? keywords : rawTokens;
        const searchable = [
          p.name,
          p.slug,
          p.category,
          p.subcategory,
          p.brand || '',
          p.shortDescription || '',
          ...(p.features || []),
          ...(p.tags || [])
        ].join(' ').toLowerCase();

        matchQ = p.name.toLowerCase().includes(q) || tokensToUse.every(token => searchable.includes(token));
      }
      if (!matchQ) return false;

      // 2. Category selection filter
      if (selected.size > 0) {
        const matchCat = selected.has(p.category) || selected.has(p.subcategory);
        if (!matchCat) return false;
      }

      // 3. Brand selection filter
      if (selectedBrands.size > 0) {
        if (!selectedBrands.has(p.brand)) return false;
      }

      return true;
    });
  }, [selected, selectedBrands, search]);

  const lowestPriceId = useMemo(() => {
    if (!filtered || filtered.length === 0) return null;
    let minPrice = Infinity;
    let minId = null;
    filtered.forEach(p => {
      const price = Number(p.price || p.pricingPlans?.[0]?.price || Infinity);
      if (price < minPrice) {
        minPrice = price;
        minId = p.id;
      }
    });
    return minId;
  }, [filtered]);

  return (
    <div className="hw-page">
      <div className="hw-unified-card">
        {/* ── Left Filter Panel ── */}
        <aside className="hw-filters">
          <FilterTree categories={categories} selected={selected} onChange={setSelected} />
          <BrandFilter selected={selectedBrands} onChange={setSelectedBrands} />
        </aside>

        {/* ── Right Main Content ── */}
        <main className="hw-main">
          {/* Header row with Hardware Solutions title and search */}
          <div className="hw-main__header">
            <div className="hw-main__header-left">
              <h2 className="hw-main__title">
                <span className="hw-main__title--blue">Hardware Solutions</span>
                <span className="hw-main__count"> ({filtered.length})</span>
              </h2>
            </div>

            <div className="hw-main__header-right">
              <div className="hw-main__search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Filter products..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button 
                    type="button" 
                    className="hw-main__search-clear" 
                    onClick={() => setSearch('')}
                    aria-label="Clear filter text"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Product List Container */}
          <div className="hw-list-container">
            {filtered.length === 0 ? (
              <div className="product-grid__empty">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <p>No products found</p>
                <button 
                  className="btn btn-outline btn-sm" 
                  onClick={() => { setSelected(new Set()); setSelectedBrands(new Set()); setSearch(''); }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isLowest={p.id === lowestPriceId}
                  onClick={() => navigate(`/hardware/${p.slug}`)}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
