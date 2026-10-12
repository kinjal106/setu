import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/assetUrl';
import './Order.css';

// Default mock product matching user's exact reference screenshot (media_1791183769912.png)
const DEFAULT_ORDER_ITEM = {
  id: 'vector-v2-pro',
  name: 'Vector V2 Pro 4G Dash Camera - STANDARD',
  skuId: 'X0KR-F00G-D10B',
  sellerName: 'TREXSIFY TECHGLOBE PRIVATE LIMITED',
  image: '/images/hardware/vector-v2-pro.svg',
  price: 6600,
  consumptionUnit: 'Per Units',
  qty: 1
};

// Indian States & Union Territories for shipping address selection
const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const DEFAULT_ADDR_FORM = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'India',
  gstin: ''
};

export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, clearCart } = useCart();

  // If passed directly via Buy Now navigation state, use that; else if cart has items, use cart; else use screenshot default
  const orderItems = useMemo(() => {
    if (location.state?.product) {
      const p = location.state.product;
      return [{
        id: p.id || 'order-item-1',
        name: p.name || DEFAULT_ORDER_ITEM.name,
        skuId: p.partNumber || p.skuId || (p.slug ? `SETU-${p.slug.toUpperCase()}` : DEFAULT_ORDER_ITEM.skuId),
        sellerName: p.brand || p.manufacturerName || (p.specifications?.manufacturerName) || DEFAULT_ORDER_ITEM.sellerName,
        image: p.image || DEFAULT_ORDER_ITEM.image,
        price: p.price || DEFAULT_ORDER_ITEM.price,
        consumptionUnit: p.consumptionUnit || 'Per Units',
        qty: p.qty || 1
      }];
    }
    if (cartItems && cartItems.length > 0) {
      return cartItems.map(item => ({
        id: item.id,
        name: item.name,
        skuId: item.partNumber || item.skuId || (item.slug ? `SETU-${item.slug.toUpperCase()}` : 'SETU-SKU-DEFAULT'),
        sellerName: item.brand || item.manufacturerName || item.specifications?.manufacturerName || 'TREXSIFY TECHGLOBE PRIVATE LIMITED',
        image: item.image || '/images/hardware/vector-v2-pro.svg',
        price: item.price || 6600,
        consumptionUnit: item.consumptionUnit || 'Per Units',
        qty: item.qty || 1
      }));
    }
    return [DEFAULT_ORDER_ITEM];
  }, [location.state, cartItems]);

  // Billing address state (exact match to screenshot)
  const [billingAddress, setBillingAddress] = useState({
    id: 'bill-1',
    firstName: 'Aditi',
    lastName: 'Sharma',
    name: 'Aditi Sharma',
    phone: '+91 98200 12345',
    email: 'aditi.sharma@trexsify.com',
    addressLine1: 'Office no 2, Anupam Annapolis',
    addressLine2: '3rd floor, Goregoan East',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '400063',
    country: 'India',
    address: 'Office no 2, Anupam Annapolis, 3rd floor, Goregoan East, Mumbai, Maharashtra 400063, India',
    gstin: '27AAJCA4191J1ZE'
  });

  // Saved Shipping addresses list (matching media_1791193485645.png & media_1791815185261_068866c1.png)
  const [savedShippingAddresses, setSavedShippingAddresses] = useState([
    {
      id: 'ship-1',
      firstName: 'Ankush',
      lastName: 'Bidari',
      name: 'Ankush Bidari',
      phone: '+91 98450 67890',
      email: 'ankush.bidari@fleetops.in',
      addressLine1: '197, 1st Floor, New No. 15',
      addressLine2: '4th Cross Road, 7th Block West',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560070',
      country: 'India',
      address: '197, 1st Floor, New No. 15, 4th Cross Road, 7th Block West, Bengaluru, Karnataka 560070, India',
      gstin: 'Unregistered'
    }
  ]);
  const [selectedShippingId, setSelectedShippingId] = useState('ship-1');
  const [isSameAddress, setIsSameAddress] = useState(false);

  // Modal state for Add / Edit Address
  const [addressModalConfig, setAddressModalConfig] = useState({
    isOpen: false,
    mode: 'add', // 'add' | 'edit'
    target: 'shipping', // 'shipping' | 'billing'
    id: null
  });
  const [addrFormData, setAddrFormData] = useState({ ...DEFAULT_ADDR_FORM });

  // Computed effective shipping address
  const effectiveShippingAddress = useMemo(() => {
    if (isSameAddress) {
      return billingAddress;
    }
    return savedShippingAddresses.find(a => a.id === selectedShippingId) || savedShippingAddresses[0] || billingAddress;
  }, [isSameAddress, billingAddress, savedShippingAddresses, selectedShippingId]);

  // Payment mode state ('razorpay' or 'credit')
  const [paymentMode, setPaymentMode] = useState('razorpay');

  // Coupon state
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Terms and conditions agreement checkbox
  const [isAgreed, setIsAgreed] = useState(false);

  // Order submission confirmation modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Calculations
  const itemCount = orderItems.reduce((acc, it) => acc + (it.qty || 1), 0);
  const subtotal = orderItems.reduce((acc, it) => acc + (it.price * (it.qty || 1)), 0);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return (subtotal * appliedCoupon.value) / 100;
    }
    return appliedCoupon.value;
  }, [appliedCoupon, subtotal]);

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const gstRate = 0.18;
  const taxes = discountedSubtotal * gstRate;
  const shippingCharges = 0.0;
  const rawTotal = discountedSubtotal + taxes + shippingCharges;
  const roundingOff = Math.round(rawTotal) - rawTotal;
  const orderTotal = rawTotal + roundingOff;

  // Format currency in Indian Rupees format (₹ XX,XXX.XX)
  const formatINR = (val) => {
    return '₹ ' + Number(val).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (code === 'SETU10' || code === 'WELCOME10') {
      setAppliedCoupon({ code, type: 'percent', value: 10, label: '10% Fleet Discount' });
      setCouponError('');
      setShowCouponInput(false);
    } else if (code === 'SAVE500') {
      setAppliedCoupon({ code, type: 'flat', value: 500, label: '₹500 Flat Off' });
      setCouponError('');
      setShowCouponInput(false);
    } else {
      setCouponError('Invalid coupon code. Try SETU10 or SAVE500');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  // Open modal to add new shipping address
  const handleOpenAddShipping = () => {
    setAddrFormData({ ...DEFAULT_ADDR_FORM });
    setAddressModalConfig({
      isOpen: true,
      mode: 'add',
      target: 'shipping',
      id: null
    });
  };

  // Open modal to edit a shipping address
  const handleOpenEditShipping = (addr) => {
    const parts = (addr.name || '').split(' ');
    const fName = addr.firstName || parts[0] || '';
    const lName = addr.lastName !== undefined ? addr.lastName : parts.slice(1).join(' ');
    
    setAddrFormData({
      firstName: fName,
      lastName: lName,
      phone: addr.phone || '',
      email: addr.email || '',
      addressLine1: addr.addressLine1 || addr.address || '',
      addressLine2: addr.addressLine2 || '',
      city: addr.city || '',
      state: addr.state || '',
      zipCode: addr.zipCode || '',
      country: addr.country || 'India',
      gstin: addr.gstin && addr.gstin !== 'Unregistered' ? addr.gstin : ''
    });
    setAddressModalConfig({
      isOpen: true,
      mode: 'edit',
      target: 'shipping',
      id: addr.id
    });
  };

  // Open modal to edit billing address
  const handleOpenEditBilling = () => {
    const parts = (billingAddress.name || '').split(' ');
    const fName = billingAddress.firstName || parts[0] || '';
    const lName = billingAddress.lastName !== undefined ? billingAddress.lastName : parts.slice(1).join(' ');

    setAddrFormData({
      firstName: fName,
      lastName: lName,
      phone: billingAddress.phone || '',
      email: billingAddress.email || '',
      addressLine1: billingAddress.addressLine1 || billingAddress.address || '',
      addressLine2: billingAddress.addressLine2 || '',
      city: billingAddress.city || '',
      state: billingAddress.state || '',
      zipCode: billingAddress.zipCode || '',
      country: billingAddress.country || 'India',
      gstin: billingAddress.gstin && billingAddress.gstin !== 'Unregistered' ? billingAddress.gstin : ''
    });
    setAddressModalConfig({
      isOpen: true,
      mode: 'edit',
      target: 'billing',
      id: billingAddress.id || 'bill-1'
    });
  };

  // Form validity check for the address modal
  const isAddrFormValid = Boolean(
    addrFormData.firstName.trim() &&
    addrFormData.phone.trim() &&
    addrFormData.addressLine1.trim() &&
    addrFormData.city.trim() &&
    addrFormData.state &&
    addrFormData.zipCode.trim()
  );

  // Save address from modal
  const handleSaveAddressModal = (e) => {
    e.preventDefault();
    const firstName = addrFormData.firstName.trim();
    const lastName = addrFormData.lastName.trim();
    const phone = addrFormData.phone.trim();
    const email = addrFormData.email.trim();
    const addressLine1 = addrFormData.addressLine1.trim();
    const addressLine2 = addrFormData.addressLine2.trim();
    const city = addrFormData.city.trim();
    const state = addrFormData.state.trim();
    const zipCode = addrFormData.zipCode.trim();
    const country = addrFormData.country.trim() || 'India';
    const gstin = addrFormData.gstin.trim() || 'Unregistered';

    if (!firstName || !phone || !addressLine1 || !city || !state || !zipCode) return;

    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    const addressParts = [
      addressLine1,
      addressLine2,
      city,
      state ? `${state}${zipCode ? ' ' + zipCode : ''}` : zipCode,
      country
    ].filter(Boolean);
    const fullAddress = addressParts.join(', ');

    const newAddrObj = {
      firstName,
      lastName,
      name: fullName,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      address: fullAddress,
      gstin
    };

    if (addressModalConfig.target === 'billing') {
      setBillingAddress(prev => ({
        ...prev,
        ...newAddrObj,
        id: prev.id || 'bill-1'
      }));
    } else if (addressModalConfig.mode === 'edit') {
      setSavedShippingAddresses(prev => prev.map(a => 
        a.id === addressModalConfig.id ? {
          ...a,
          ...newAddrObj,
          id: a.id
        } : a
      ));
    } else {
      // Add new shipping address
      const newId = 'ship-' + Date.now();
      const newAddr = {
        id: newId,
        ...newAddrObj
      };
      setSavedShippingAddresses(prev => [...prev, newAddr]);
      setSelectedShippingId(newId);
      setIsSameAddress(false);
    }

    setAddressModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  // Delete shipping address
  const handleDeleteShipping = (idToDelete) => {
    if (savedShippingAddresses.length <= 1) {
      if (window.confirm("This is your only saved shipping address. Would you like to use your billing address for shipping?")) {
        setIsSameAddress(true);
      }
      return;
    }
    const filtered = savedShippingAddresses.filter(a => a.id !== idToDelete);
    setSavedShippingAddresses(filtered);
    if (selectedShippingId === idToDelete && filtered.length > 0) {
      setSelectedShippingId(filtered[0].id);
    }
  };

  const handleSubmitRequest = () => {
    if (!isAgreed) return;
    const generatedId = 'REQ-SETU-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setShowSuccessModal(true);
    if (clearCart) clearCart();
  };

  return (
    <div className="order-page">
      {/* ── Single Unified Curved Card (Matching Hardware & ProductDetail architecture) ── */}
      <div className="order-unified-card">
        
        {/* ── Fixed Topbar: Breadcrumbs + Navigation ── */}
        <div className="order-topbar">
          <nav className="order-breadcrumbs">
            <Link to="/setu">Home</Link>
            <span className="order-sep">›</span>
            <Link to="/hardware">Hardware Solutions</Link>
            <span className="order-sep">›</span>
            <span className="order-current-crumb">Order Summary</span>
          </nav>

          <button 
            type="button" 
            className="order-back-btn" 
            onClick={() => navigate(-1)}
          >
            ‹ Back
          </button>
        </div>

        {/* ── Scrollable Body within the Curved Card ── */}
        <div className="order-scroll-body">
          <div className="order-inner-container">
            
            {/* ── Main 2-Column Content Layout ── */}
            <div className="order-page__layout">
              
              {/* ════ Left Column: Products & Addresses ════ */}
              <div className="order-page__main-col">
                
                {/* 1. Product List Section */}
                <section className="order-section">
                  <h2 className="order-section__title">Product List</h2>
                  
                  <div className="order-card order-card--product">
                    {orderItems.map((item, idx) => {
                      const itemTotal = (item.price || 0) * (item.qty || 1);
                      return (
                        <div key={item.id || idx} className="order-product-row">
                          {/* Image Thumbnail */}
                          <div className="order-product-img-box">
                            <img 
                              src={getAssetUrl(item.image || '/images/hardware/t5324-mdvr.svg')} 
                              alt={item.name} 
                              className="order-product-img"
                              onError={(e) => {
                                e.target.src = getAssetUrl('/images/hardware/t5324-mdvr.svg');
                              }}
                            />
                          </div>

                          {/* Product Name */}
                          <div className="order-product-info">
                            <h3 className="order-product-name">{item.name}</h3>
                          </div>

                          {/* SKU Id */}
                          <div className="order-meta-col">
                            <span className="order-meta-label">SKU Id</span>
                            <span className="order-meta-val order-meta-val--mono">{item.skuId}</span>
                          </div>

                          {/* Sold by */}
                          <div className="order-meta-col order-meta-col--seller">
                            <span className="order-meta-label">Sold by</span>
                            <span className="order-meta-val order-meta-val--seller">{item.sellerName}</span>
                          </div>

                          {/* Quantity */}
                          <div className="order-meta-col order-meta-col--qty">
                            <span className="order-meta-label">Quantity</span>
                            <span className="order-meta-val">{item.qty || 1}</span>
                          </div>

                          {/* Total Price */}
                          <div className="order-meta-col order-meta-col--price">
                            <span className="order-meta-label">Total Price</span>
                            <span className="order-price-val">{formatINR(itemTotal)}</span>
                            <span className="order-unit-price-sub">
                              (Unit Price: {formatINR(item.price)} {item.consumptionUnit || 'Per Units'})
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Apply Coupon Row (Bottom Right of Product List Card) */}
                    <div className="order-coupon-container">
                      {!appliedCoupon ? (
                        <>
                          {!showCouponInput ? (
                            <button
                              type="button"
                              className="order-apply-coupon-btn"
                              onClick={() => setShowCouponInput(true)}
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="16" rx="2"/>
                                <line x1="7" y1="8" x2="17" y2="8"/>
                                <line x1="7" y1="12" x2="17" y2="12"/>
                                <line x1="7" y1="16" x2="13" y2="16"/>
                              </svg>
                              <span>Apply Coupon</span>
                            </button>
                          ) : (
                            <form className="order-coupon-form" onSubmit={handleApplyCoupon}>
                              <input
                                type="text"
                                placeholder="Enter Code (e.g. SETU10)"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="order-coupon-input"
                                autoFocus
                              />
                              <button type="submit" className="order-coupon-submit-btn">Apply</button>
                              <button 
                                type="button" 
                                className="order-coupon-cancel-btn"
                                onClick={() => {
                                  setShowCouponInput(false);
                                  setCouponError('');
                                }}
                              >
                                ✕
                              </button>
                            </form>
                          )}
                          {couponError && <span className="order-coupon-error">{couponError}</span>}
                        </>
                      ) : (
                        <div className="order-coupon-applied-badge">
                          <span className="order-coupon-applied-text">
                            ✓ {appliedCoupon.code} applied ({appliedCoupon.label})
                          </span>
                          <button 
                            type="button" 
                            className="order-coupon-remove-btn" 
                            onClick={handleRemoveCoupon}
                            title="Remove coupon"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                {/* 2. Billing Address Section */}
                <section className="order-section">
                  <div className="order-billing-header">
                    <h2 className="order-section__title" style={{ margin: 0 }}>Billing Address</h2>
                    <button 
                      type="button" 
                      className="order-edit-billing-btn"
                      onClick={handleOpenEditBilling}
                      title="Edit Billing Address"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      <span>Edit</span>
                    </button>
                  </div>
                  
                  <div className="order-card order-card--address">
                    <div className="order-addr-line">
                      <span className="order-addr-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </span>
                      <span className="order-addr-name">{billingAddress.name}</span>
                    </div>

                    {(billingAddress.phone || billingAddress.email) && (
                      <div className="order-addr-contact-row">
                        {billingAddress.phone && (
                          <span className="order-addr-contact-item">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <span>{billingAddress.phone}</span>
                          </span>
                        )}
                        {billingAddress.phone && billingAddress.email && <span className="order-addr-contact-dot">•</span>}
                        {billingAddress.email && (
                          <span className="order-addr-contact-item">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                              <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <span>{billingAddress.email}</span>
                          </span>
                        )}
                      </div>
                    )}

                    <div className="order-addr-line">
                      <span className="order-addr-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                      </span>
                      <span className="order-addr-text">{billingAddress.address}</span>
                    </div>

                    <div className="order-addr-line">
                      <span className="order-addr-icon">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                      </span>
                      <span className="order-addr-gst">GSTIN: {billingAddress.gstin}</span>
                    </div>
                  </div>
                </section>

                {/* 3. Shipping Address Section (Matches media_1791193485645.png) */}
                <section className="order-section">
                  <div className="order-shipping-header">
                    <h2 className="order-section__title" style={{ margin: 0 }}>Shipping Address</h2>
                    <button 
                      type="button" 
                      className="order-add-addr-btn"
                      onClick={handleOpenAddShipping}
                    >
                      <span className="order-add-addr-icon">+</span> Add New Address
                    </button>
                  </div>

                  <div className="order-card order-card--address order-card--shipping">
                    {/* Checkbox: Shipping address is same as billing address */}
                    <div className="order-same-addr-checkrow">
                      <label className="order-checkbox-label">
                        <input 
                          type="checkbox"
                          checked={isSameAddress}
                          onChange={(e) => setIsSameAddress(e.target.checked)}
                          className="order-custom-checkbox"
                        />
                        <span className="order-checkbox-text">Shipping address is same as billing address</span>
                      </label>
                    </div>

                    {/* Address List or Same as Billing Display */}
                    {isSameAddress ? (
                      <div className="order-same-addr-active-box">
                        <div className="order-addr-line">
                          <span className="order-addr-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                              <circle cx="12" cy="7" r="4"/>
                            </svg>
                          </span>
                          <span className="order-addr-name">{billingAddress.name}</span>
                          <span className="order-same-addr-pill">Using Billing Address</span>
                        </div>

                        {(billingAddress.phone || billingAddress.email) && (
                          <div className="order-addr-contact-row">
                            {billingAddress.phone && (
                              <span className="order-addr-contact-item">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                <span>{billingAddress.phone}</span>
                              </span>
                            )}
                            {billingAddress.phone && billingAddress.email && <span className="order-addr-contact-dot">•</span>}
                            {billingAddress.email && (
                              <span className="order-addr-contact-item">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                  <polyline points="22,6 12,13 2,6"/>
                                </svg>
                                <span>{billingAddress.email}</span>
                              </span>
                            )}
                          </div>
                        )}

                        <div className="order-addr-line">
                          <span className="order-addr-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                          </span>
                          <span className="order-addr-text">{billingAddress.address}</span>
                        </div>

                        {billingAddress.gstin && (
                          <div className="order-addr-line">
                            <span className="order-addr-icon">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                              </svg>
                            </span>
                            <span className="order-addr-gst">GSTIN: {billingAddress.gstin}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="order-shipping-items-list">
                        {savedShippingAddresses.map((addr) => {
                          const isSelected = selectedShippingId === addr.id;
                          return (
                            <div 
                              key={addr.id}
                              className={`order-shipping-row ${isSelected ? 'order-shipping-row--selected' : ''}`}
                              onClick={() => setSelectedShippingId(addr.id)}
                            >
                              {/* Radio Selection */}
                              <div className="order-shipping-radio-col">
                                <input 
                                  type="radio" 
                                  name="shippingAddressSelection"
                                  checked={isSelected}
                                  onChange={() => setSelectedShippingId(addr.id)}
                                  className="order-custom-radio"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>

                              {/* Address Details */}
                              <div className="order-shipping-content-col">
                                <div className="order-addr-line">
                                  <span className="order-addr-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                      <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                  </span>
                                  <span className="order-addr-name">{addr.name}</span>
                                </div>

                                {(addr.phone || addr.email) && (
                                  <div className="order-addr-contact-row">
                                    {addr.phone && (
                                      <span className="order-addr-contact-item">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        <span>{addr.phone}</span>
                                      </span>
                                    )}
                                    {addr.phone && addr.email && <span className="order-addr-contact-dot">•</span>}
                                    {addr.email && (
                                      <span className="order-addr-contact-item">
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                          <polyline points="22,6 12,13 2,6"/>
                                        </svg>
                                        <span>{addr.email}</span>
                                      </span>
                                    )}
                                  </div>
                                )}

                                <div className="order-addr-line">
                                  <span className="order-addr-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                      <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                  </span>
                                  <span className="order-addr-text">{addr.address}</span>
                                </div>

                                {addr.gstin && addr.gstin !== 'Unregistered' && (
                                  <div className="order-addr-line">
                                    <span className="order-addr-icon">
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                                      </svg>
                                    </span>
                                    <span className="order-addr-gst">GSTIN: {addr.gstin}</span>
                                  </div>
                                )}
                              </div>

                              {/* Action Buttons on the right (Pen & Trash) */}
                              <div className="order-shipping-actions-col" onClick={(e) => e.stopPropagation()}>
                                <button
                                  type="button"
                                  className="order-addr-action-btn order-addr-action-btn--edit"
                                  title="Edit Address"
                                  onClick={() => handleOpenEditShipping(addr)}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  className="order-addr-action-btn order-addr-action-btn--delete"
                                  title="Delete Address"
                                  onClick={() => handleDeleteShipping(addr.id)}
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </section>

              </div>

              {/* ════ Right Column: Price Details & Submit ════ */}
              <aside className="order-page__side-col">
                <h2 className="order-section__title">Price Details</h2>

                <div className="order-card order-card--summary">
                  {/* Line Items */}
                  <div className="order-summary-row">
                    <span className="order-summary-label">Subtotal <em>({itemCount} item{itemCount !== 1 ? 's' : ''})</em></span>
                    <span className="order-summary-val">{formatINR(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="order-summary-row order-summary-row--discount">
                      <span className="order-summary-label">Coupon Discount ({appliedCoupon.code})</span>
                      <span className="order-summary-val order-summary-val--green">− {formatINR(discountAmount)}</span>
                    </div>
                  )}

                  <div className="order-summary-row">
                    <span className="order-summary-label">Taxes <em>(GST 18%)</em></span>
                    <span className="order-summary-val">{formatINR(taxes)}</span>
                  </div>

                  <div className="order-summary-row">
                    <span className="order-summary-label">Shipping Charges</span>
                    <span className="order-summary-val">{formatINR(shippingCharges)}</span>
                  </div>

                  <div className="order-summary-row">
                    <span className="order-summary-label">Rounding off</span>
                    <span className="order-summary-val">
                      {roundingOff >= 0 ? `+${roundingOff.toFixed(2)}` : roundingOff.toFixed(2)}
                    </span>
                  </div>

                  {/* Total Row */}
                  <div className="order-summary-divider" />

                  <div className="order-summary-row order-summary-row--total">
                    <span className="order-summary-total-label">Order Total</span>
                    <span className="order-summary-total-val">{formatINR(orderTotal)}</span>
                  </div>

                  {/* Payment Mode Selection matching media_1791183769912.png */}
                  <div className="order-payment-mode-section">
                    <span className="order-payment-mode-title">Payment Mode</span>
                    <div className="order-payment-options">
                      <label className="order-radio-label">
                        <input
                          type="radio"
                          name="paymentMode"
                          value="razorpay"
                          checked={paymentMode === 'razorpay'}
                          onChange={() => setPaymentMode('razorpay')}
                          className="order-custom-radio"
                        />
                        <span className="order-radio-text">Pay via Razorpay</span>
                      </label>
                      <label className="order-radio-label">
                        <input
                          type="radio"
                          name="paymentMode"
                          value="credit"
                          checked={paymentMode === 'credit'}
                          onChange={() => setPaymentMode('credit')}
                          className="order-custom-radio"
                        />
                        <span className="order-radio-text">Pay via Credit Line</span>
                      </label>
                    </div>
                  </div>

                  {/* Terms and Conditions Disclaimer Box */}
                  <div className="order-disclaimer-card">
                    <label className="order-disclaimer-label">
                      <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        className="order-custom-checkbox order-disclaimer-checkbox"
                      />
                      <span className="order-disclaimer-text">
                        By clicking &ldquo;Proceed To Payment,&rdquo; your order request will be sent to the seller. 
                        Payment options will be enabled, once seller confirms the order. I have read, understood, 
                        and agree to the Terms and Conditions of Sale.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Proceed To Payment Action Button */}
                <button
                  type="button"
                  className={`order-submit-btn ${isAgreed ? 'order-submit-btn--active' : 'order-submit-btn--disabled'}`}
                  disabled={!isAgreed}
                  onClick={handleSubmitRequest}
                >
                  Proceed To Payment
                </button>
              </aside>

            </div>
          </div>
        </div>
      </div>

      {/* ── Modal: Add / Edit Address (Shipping or Billing) ── */}
      {addressModalConfig.isOpen && (
        <div 
          className="order-modal__overlay" 
          onClick={() => setAddressModalConfig(prev => ({ ...prev, isOpen: false }))}
        >
          <div className="order-modal__card order-modal__card--address" onClick={(e) => e.stopPropagation()}>
            {/* Deep Blue Header Bar matching media_1791815185261_068866c1.png */}
            <div className="order-modal__header order-modal__header--blue">
              <h3 className="order-modal__title order-modal__title--white">
                {addressModalConfig.target === 'billing' 
                  ? 'Edit Billing Address' 
                  : addressModalConfig.mode === 'edit' 
                    ? 'Edit Shipping Address' 
                    : 'Add Shipping Address'}
              </h3>
              <button 
                type="button" 
                className="order-modal__close-btn order-modal__close-btn--white"
                onClick={() => setAddressModalConfig(prev => ({ ...prev, isOpen: false }))}
                title="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAddressModal} className="order-modal__form order-modal__form--grid">
              <div className="order-modal-grid">
                
                {/* Row 1: First Name & Last Name */}
                <div className="order-form-group">
                  <label htmlFor="addrFirstName">First Name *</label>
                  <input 
                    id="addrFirstName"
                    type="text" 
                    required
                    maxLength={40}
                    placeholder="First Name" 
                    value={addrFormData.firstName}
                    onChange={(e) => setAddrFormData({ ...addrFormData, firstName: e.target.value })}
                    autoFocus
                  />
                </div>

                <div className="order-form-group">
                  <label htmlFor="addrLastName">Last Name</label>
                  <input 
                    id="addrLastName"
                    type="text" 
                    maxLength={40}
                    placeholder="Last Name" 
                    value={addrFormData.lastName}
                    onChange={(e) => setAddrFormData({ ...addrFormData, lastName: e.target.value })}
                  />
                </div>

                {/* Row 2: Mobile Number & Email ID (User Requested) */}
                <div className="order-form-group">
                  <label htmlFor="addrPhone">Mobile Number *</label>
                  <input 
                    id="addrPhone"
                    type="tel" 
                    required
                    maxLength={15}
                    placeholder="Mobile Number" 
                    value={addrFormData.phone}
                    onChange={(e) => setAddrFormData({ ...addrFormData, phone: e.target.value })}
                  />
                  <span className="order-form-help">10-digit mobile number</span>
                </div>

                <div className="order-form-group">
                  <label htmlFor="addrEmail">Email ID *</label>
                  <input 
                    id="addrEmail"
                    type="email" 
                    required
                    maxLength={60}
                    placeholder="Email ID" 
                    value={addrFormData.email}
                    onChange={(e) => setAddrFormData({ ...addrFormData, email: e.target.value })}
                  />
                  <span className="order-form-help">For dispatch updates & invoice</span>
                </div>

                {/* Row 3: Address Line 1 & Address Line 2 */}
                <div className="order-form-group">
                  <label htmlFor="addrLine1">Address Line 1 *</label>
                  <input 
                    id="addrLine1"
                    type="text" 
                    required
                    maxLength={60}
                    placeholder="Address Line 1" 
                    value={addrFormData.addressLine1}
                    onChange={(e) => setAddrFormData({ ...addrFormData, addressLine1: e.target.value })}
                  />
                  <span className="order-form-help">Maximum Character Limit is 60</span>
                </div>

                <div className="order-form-group">
                  <label htmlFor="addrLine2">Address Line 2 *</label>
                  <input 
                    id="addrLine2"
                    type="text" 
                    maxLength={60}
                    placeholder="Address Line 2" 
                    value={addrFormData.addressLine2}
                    onChange={(e) => setAddrFormData({ ...addrFormData, addressLine2: e.target.value })}
                  />
                  <span className="order-form-help">Maximum Character Limit is 60</span>
                </div>

                {/* Row 4: City / Town & State / Region */}
                <div className="order-form-group">
                  <label htmlFor="addrCity">City / Town *</label>
                  <input 
                    id="addrCity"
                    type="text" 
                    required
                    maxLength={40}
                    placeholder="City / Town" 
                    value={addrFormData.city}
                    onChange={(e) => setAddrFormData({ ...addrFormData, city: e.target.value })}
                  />
                  <span className="order-form-help">Maximum Character Limit is 40</span>
                </div>

                <div className="order-form-group">
                  <label htmlFor="addrState">State / Region *</label>
                  <div className="order-select-wrapper">
                    <select 
                      id="addrState"
                      required
                      value={addrFormData.state}
                      onChange={(e) => setAddrFormData({ ...addrFormData, state: e.target.value })}
                      className="order-select-input"
                    >
                      <option value="" disabled>Select State / Region</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                    <span className="order-select-chevron">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Row 5: Zip / Postal Code & Country */}
                <div className="order-form-group">
                  <label htmlFor="addrZip">Zip / Postal Code</label>
                  <input 
                    id="addrZip"
                    type="text" 
                    required
                    maxLength={6}
                    placeholder="Zip / Postal Code" 
                    value={addrFormData.zipCode}
                    onChange={(e) => setAddrFormData({ ...addrFormData, zipCode: e.target.value.replace(/\D/g, '') })}
                  />
                  <span className="order-form-help">Maximum Character Limit is 6</span>
                </div>

                <div className="order-form-group">
                  <label htmlFor="addrCountry">Country *</label>
                  <div className="order-select-wrapper">
                    <select 
                      id="addrCountry"
                      required
                      value={addrFormData.country}
                      onChange={(e) => setAddrFormData({ ...addrFormData, country: e.target.value })}
                      className="order-select-input"
                    >
                      <option value="India">India</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="United States">United States</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                    <span className="order-select-chevron">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Row 6: GSTIN spanning full width */}
                <div className="order-form-group order-form-group--full">
                  <label htmlFor="addrGstin">GSTIN (Optional for Fleet Tax Credit)</label>
                  <input 
                    id="addrGstin"
                    type="text" 
                    maxLength={15}
                    placeholder="e.g. 27AAJCA4191J1ZE" 
                    value={addrFormData.gstin}
                    onChange={(e) => setAddrFormData({ ...addrFormData, gstin: e.target.value.toUpperCase() })}
                  />
                  <span className="order-form-help">15-digit GST identification number</span>
                </div>

              </div>

              {/* Footer action: Save Address matching media_1791815185261_068866c1.png */}
              <div className="order-modal__footer-bar">
                <button 
                  type="submit" 
                  className={`order-modal-save-btn ${isAddrFormValid ? 'order-modal-save-btn--active' : 'order-modal-save-btn--disabled'}`}
                  disabled={!isAddrFormValid}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: Order Submitted Success Confirmation ── */}
      {showSuccessModal && (
        <div className="order-modal__overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="order-modal__card order-modal__card--success" onClick={(e) => e.stopPropagation()}>
            <div className="order-success-icon-wrap">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>

            <h3 className="order-success-title">Order Request Submitted!</h3>
            <p className="order-success-sub">
              Your request reference number is <strong style={{ color: '#2563eb' }}>{orderId}</strong>
            </p>

            <div className="order-success-summary-box">
              <div className="order-success-row">
                <span>Product</span>
                <strong>{orderItems[0]?.name}</strong>
              </div>
              <div className="order-success-row">
                <span>Quantity</span>
                <strong>{itemCount} Units</strong>
              </div>
              <div className="order-success-row">
                <span>Total Payable</span>
                <strong>{formatINR(orderTotal)}</strong>
              </div>
              <div className="order-success-row">
                <span>Billed To</span>
                <span>{billingAddress.name}</span>
              </div>
              <div className="order-success-row">
                <span>Deliver To</span>
                <span>{effectiveShippingAddress.name}</span>
              </div>
              <div className="order-success-row">
                <span>Seller</span>
                <span>{orderItems[0]?.sellerName}</span>
              </div>
            </div>

            <p className="order-success-notice">
              The seller has been notified. Once approved, the payment gateway link and official GST proforma 
              invoice will be sent to your registered email and fleet dashboard.
            </p>

            <div className="order-modal__actions" style={{ justifyContent: 'center', marginTop: '24px', gap: '10px' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => navigate('/order-history')}
              >
                View Order History
              </button>
              <button 
                type="button" 
                className="btn btn-outline"
                onClick={() => navigate('/hardware')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
