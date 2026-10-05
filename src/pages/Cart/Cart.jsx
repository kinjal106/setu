import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

// Default mock items matching media_1791183246253.png
const DEFAULT_CART_ITEMS = [
  {
    id: 'br05-4g',
    name: 'BR05 4G',
    description: 'BR05 4G is a compact vehicle GPS tracker designed for real-time vehicle monitoring and fleet management. Supporting 4G LTE connectivity,...',
    image: '/images/hardware/br05-4g.svg',
    skuId: 'X0KO-F036-D10F',
    sellerName: 'TREXSIFY TECHGLOBE PRIVATE LIMITED',
    price: 750,
    qty: 1
  },
  {
    id: 'vector-v2-pro-4g',
    name: 'Vector V2 Pro 4G Dash Camera',
    description: 'The Vector V2 Pro is an advanced 2-channel 4G dash camera designed for commercial vehicles and fleet management. Equipped with Full HD,...',
    image: '/images/hardware/vector-v2-pro.svg',
    skuId: 'X0KR-F00G-D10B',
    sellerName: 'TREXSIFY TECHGLOBE PRIVATE LIMITED',
    price: 6600,
    qty: 1
  }
];

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems: liveCartItems, removeFromCart, updateQty } = useCart();

  // Initialize cart list: if live context has items, use them; otherwise use default screenshot items
  const [items, setItems] = useState(() => {
    if (liveCartItems && liveCartItems.length > 0) {
      return liveCartItems.map(it => ({
        id: it.id,
        name: it.name,
        description: it.shortDescription || it.description || 'Enterprise telematics device for commercial fleet operations.',
        image: it.image || '/images/hardware/br05-4g.svg',
        skuId: it.skuId || (it.slug ? `X0K-${it.slug.toUpperCase()}` : 'X0KO-F036-D10F'),
        sellerName: it.sellerName || it.brand || 'TREXSIFY TECHGLOBE PRIVATE LIMITED',
        price: Number(it.price) || 750,
        qty: it.qty || 1
      }));
    }
    return DEFAULT_CART_ITEMS;
  });

  // Selection state for checkboxes
  const [selectedIds, setSelectedIds] = useState(() => new Set(items.map(it => it.id)));

  // Toggle select all
  const isAllSelected = items.length > 0 && selectedIds.size === items.length;
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(it => it.id)));
    }
  };

  // Toggle single item selection
  const toggleSelectItem = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Quantity changes
  const handleQtyChange = (id, delta) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.qty || 1) + delta);
        if (updateQty) updateQty(id, newQty);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  // Delete item
  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (removeFromCart) removeFromCart(id);
  };

  // Proceed to Checkout with all selected items
  const handleProceedToCheckout = () => {
    const selectedItems = items.filter(it => selectedIds.has(it.id));
    if (selectedItems.length === 0) return;

    navigate('/order', {
      state: {
        fromCart: true,
        product: selectedItems[0],
        cartProducts: selectedItems
      }
    });
  };

  // Calculations for selected items
  const selectedItems = items.filter(it => selectedIds.has(it.id));
  const selectedCount = selectedItems.reduce((sum, it) => sum + (it.qty || 1), 0);
  const subtotal = selectedItems.reduce((sum, it) => sum + (it.price * (it.qty || 1)), 0);

  const formatPrice = (val) => {
    return Number(val).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="cart-page">
      <div className="cart-unified-card">
        
        {/* ── Fixed Topbar: Breadcrumbs + Navigation ── */}
        <div className="cart-topbar">
          <nav className="cart-breadcrumbs">
            <Link to="/setu">Home</Link>
            <span className="cart-sep">›</span>
            <span className="cart-current-crumb">Cart</span>
          </nav>

          <button 
            type="button" 
            className="cart-back-btn" 
            onClick={() => navigate(-1)}
          >
            ‹ Back
          </button>
        </div>

        {/* ── Scrollable Body within the Curved Card ── */}
        <div className="cart-scroll-body">
          <div className="cart-inner-container">

            {/* ── 2-Column Cart Layout ── */}
            <div className="cart-layout">
              
              {/* Left Column: Product List */}
              <div className="cart-left-col">
                <h2 className="cart-col-header">Product List</h2>

                <div className="cart-items-card">
                  {/* Select All Checkbox Header */}
                  {items.length > 0 && (
                    <div className="cart-select-all-row" onClick={toggleSelectAll}>
                      <label className="fcheck" onClick={e => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={isAllSelected} 
                          onChange={toggleSelectAll} 
                        />
                        <span className="fcheck__box" />
                      </label>
                      <span className="cart-select-all-label">Select all items</span>
                    </div>
                  )}

                  {/* Empty state */}
                  {items.length === 0 ? (
                    <div className="cart-empty-state">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <p>Your shopping cart is currently empty.</p>
                      <button className="cart-btn-explore" onClick={() => navigate('/hardware')}>
                        Explore Hardware Solutions
                      </button>
                    </div>
                  ) : (
                    items.map(item => {
                      const isSelected = selectedIds.has(item.id);
                      const itemTotal = item.price * (item.qty || 1);

                      return (
                        <div key={item.id} className="cart-item-row">
                          {/* Left Item Checkbox */}
                          <div className="cart-item-checkbox">
                            <label className="fcheck" onClick={e => e.stopPropagation()}>
                              <input 
                                type="checkbox" 
                                checked={isSelected} 
                                onChange={() => toggleSelectItem(item.id)} 
                              />
                              <span className="fcheck__box" />
                            </label>
                          </div>

                          {/* Product Image Thumbnail */}
                          <div className="cart-item-img-box">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="cart-item-img"
                              onError={(e) => {
                                e.target.src = '/images/hardware/br05-4g.svg';
                              }}
                            />
                          </div>

                          {/* Product Content Details */}
                          <div className="cart-item-details">
                            <div className="cart-item-head-row">
                              <h3 className="cart-item-name">{item.name}</h3>
                              <button 
                                type="button" 
                                className="cart-item-delete-btn" 
                                onClick={() => handleDeleteItem(item.id)}
                                title="Remove item"
                                aria-label="Delete item"
                              >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>

                            <p className="cart-item-desc">{item.description}</p>

                            {/* Meta Grid: SKU, Sold By, Quantity, Price, Buy Now */}
                            <div className="cart-item-meta-grid">
                              <div className="cart-meta-col">
                                <span className="cart-meta-label">SKU Id</span>
                                <span className="cart-meta-val cart-meta-val--sku">{item.skuId}</span>
                              </div>

                              <div className="cart-meta-col">
                                <span className="cart-meta-label">Sold by</span>
                                <span className="cart-meta-val cart-meta-val--seller">{item.sellerName}</span>
                              </div>

                              <div className="cart-meta-col">
                                <span className="cart-meta-label">Quantity</span>
                                <div className="cart-qty-counter">
                                  <button 
                                    type="button" 
                                    className="cart-qty-btn"
                                    onClick={() => handleQtyChange(item.id, -1)}
                                    disabled={item.qty <= 1}
                                  >
                                    –
                                  </button>
                                  <span className="cart-qty-num">{item.qty || 1}</span>
                                  <button 
                                    type="button" 
                                    className="cart-qty-btn cart-qty-btn--plus"
                                    onClick={() => handleQtyChange(item.id, 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="cart-meta-col">
                                <span className="cart-meta-label">Total Price</span>
                                <span className="cart-meta-val cart-meta-val--price">
                                  ₹ {formatPrice(itemTotal)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Price Details */}
              <div className="cart-right-col">
                <h2 className="cart-col-header">Price Details</h2>

                <div className="cart-price-card">
                  <div className="cart-price-row">
                    <span className="cart-price-label">Sub Total ({selectedCount} items)</span>
                    <span className="cart-price-val">₹ {formatPrice(subtotal)}</span>
                  </div>

                  <div className="cart-price-divider" />

                  <div className="cart-price-row cart-price-row--total">
                    <span className="cart-total-label">Overall Total</span>
                    <span className="cart-total-val">₹ {formatPrice(subtotal)}</span>
                  </div>
                </div>

                {/* Checkout Action */}
                <div className="cart-actions-box">
                  <button 
                    type="button"
                    className="cart-btn-checkout"
                    disabled={selectedItems.length === 0}
                    onClick={handleProceedToCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
