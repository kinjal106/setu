import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom';
import './OrderDetails.css';

// Default mock order details matching media_1791184472775.png
const DEFAULT_ORDER_DETAIL = {
  id: 'ord-1001',
  orderIdHex: '8a848eb6a0a57cc101a100e83cbc0e06',
  dateOrdered: '03/10/2026',
  paymentStatus: 'Pending',
  orderTotal: 106200,
  itemTotal: 90000,
  taxes: 16200,
  status: 'Order Placed',
  currentStep: 1, // 1 = Order Created
  billingAddress: {
    name: 'Hetal Lulla',
    address: 'office no 2, Anupam Annapolis,, 3rd floor, Goregoan East, Mumbai, Maharashtra, 400063'
  },
  shippingAddress: {
    name: 'Ankush Bidari',
    address: '197, 1st Floor, New No. 15, 4th Cross Road, 7th Block West,, Bengaluru, Karnataka, 560070'
  },
  product: {
    name: 'GL500 2G - STANDARD',
    image: '/images/hardware/gl500-2g.svg',
    qty: 10,
    unitPrice: 9000,
    totalPrice: 90000
  },
  alert: {
    title: 'Waiting for Seller Confirmation',
    description: 'Your request has been shared with the seller. Awaiting their confirmation within 24 hours.'
  }
};

const ORDER_STEPS = [
  { id: 1, label: 'Order Created' },
  { id: 2, label: 'Order Confirmed' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Ready to Ship' },
  { id: 5, label: 'In Transit' },
  { id: 6, label: 'Delivered' },
  { id: 7, label: 'Buyer Approved' }
];

export default function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: paramId } = useParams();

  // Comments state for Activity Log
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'System',
      time: '03/10/2026, 11:30 AM',
      text: 'Order request initiated and notification dispatched to seller.'
    }
  ]);

  // Tax/price breakdown tooltip
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  // Compute order details from passed state, params, or default screenshot data
  const orderData = useMemo(() => {
    const passedOrder = location.state?.order;
    if (passedOrder) {
      const rawPrice = Number(passedOrder.totalPrice.replace(/[^\d.]/g, '')) || 106200;
      const qty = passedOrder.quantity || 10;
      const itemSubtotal = Math.round(rawPrice / 1.18);
      const unitPrice = Math.round(itemSubtotal / qty);
      const taxAmount = rawPrice - itemSubtotal;

      let currentStep = 1;
      let paymentStatus = 'Pending';
      let alertInfo = {
        title: 'Waiting for Seller Confirmation',
        description: 'Your request has been shared with the seller. Awaiting their confirmation within 24 hours.'
      };

      if (passedOrder.status === 'Confirmed' || passedOrder.statusType === 'confirmed') {
        currentStep = 2;
        paymentStatus = 'Pending';
        alertInfo = {
          title: 'Order Confirmed by Seller',
          description: 'Seller has accepted your request. Please proceed to payment to initiate dispatch.'
        };
      } else if (passedOrder.status === 'Completed' || passedOrder.statusType === 'completed') {
        currentStep = 7;
        paymentStatus = 'Paid';
        alertInfo = {
          title: 'Order Completed & Delivered',
          description: 'Shipment verified and received at destination depot. Inspection approved.'
        };
      }

      return {
        id: passedOrder.id,
        orderIdHex: passedOrder.orderIdHex || (passedOrder.id === 'ord-1001' ? '8a848eb6a0a57cc101a100e83cbc0e06' : `8a848eb${passedOrder.id.replace('ord-', '')}101a100e83cbc0e06`),
        dateOrdered: passedOrder.orderDate || '03/10/2026',
        paymentStatus,
        orderTotal: rawPrice,
        itemTotal: itemSubtotal,
        taxes: taxAmount,
        status: passedOrder.status,
        currentStep,
        billingAddress: DEFAULT_ORDER_DETAIL.billingAddress,
        shippingAddress: DEFAULT_ORDER_DETAIL.shippingAddress,
        product: {
          name: `${passedOrder.item} - STANDARD`,
          image: passedOrder.image || '/images/hardware/gl500-2g.svg',
          qty,
          unitPrice,
          totalPrice: itemSubtotal
        },
        alert: alertInfo
      };
    }

    return DEFAULT_ORDER_DETAIL;
  }, [location.state, paramId]);

  const formatINR = (val) => {
    return '₹ ' + Number(val).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newEntry = {
      id: Date.now(),
      author: 'Fleet Manager (You)',
      time: 'Just now',
      text: commentText.trim()
    };
    setComments([newEntry, ...comments]);
    setCommentText('');
    setShowCommentModal(false);
  };

  return (
    <div className="order-details-page">
      {/* ── Single Unified Curved Card Layout (Matching all portal screens) ── */}
      <div className="order-details-unified-card">
        
        {/* ── Fixed Topbar: Breadcrumbs + Navigation ── */}
        <div className="order-details-topbar">
          <nav className="order-details-breadcrumbs">
            <Link to="/setu">Home</Link>
            <span className="order-details-sep">›</span>
            <Link to="/order-history">Order History</Link>
            <span className="order-details-sep">›</span>
            <span className="order-details-current-crumb">Order Details</span>
          </nav>

          <button 
            type="button" 
            className="order-details-back-btn" 
            onClick={() => navigate('/order-history')}
          >
            ‹ Back
          </button>
        </div>

        {/* ── Scrollable Body within the Curved Card ── */}
        <div className="order-details-scroll-body">
          <div className="order-details-inner-container">

            {/* ── Section 1: 7-Step Progress Tracker Card ── */}
            <div className="order-details-stepper-card">
              <div className="order-stepper-track">
                {ORDER_STEPS.map((step, idx) => {
                  const isCompleted = step.id <= orderData.currentStep;
                  const isNextStepActive = step.id < orderData.currentStep;

                  return (
                    <React.Fragment key={step.id}>
                      <div className="order-step-item">
                        {/* Step Circle */}
                        <div className={`order-step-circle ${isCompleted ? 'order-step-circle--active' : 'order-step-circle--pending'}`}>
                          {isCompleted ? (
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : null}
                        </div>

                        {/* Step Title Label */}
                        <span className={`order-step-label ${isCompleted ? 'order-step-label--active' : 'order-step-label--pending'}`}>
                          {step.label}
                        </span>
                      </div>

                      {/* Connecting Line between Steps */}
                      {idx < ORDER_STEPS.length - 1 && (
                        <div className={`order-stepper-line ${isNextStepActive ? 'order-stepper-line--active' : ''}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* ── Section 2: Order Request Alert + Activity Log Row ── */}
            <div className="order-details-request-log-row">
              
              {/* Left Column: Order Request Alert */}
              <div className="order-request-col">
                <span className="order-section-subtitle">Order Request</span>
                
                <div className="order-alert-box">
                  <div className="order-alert-icon-wrap">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                      <line x1="8" y1="7" x2="16" y2="7" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                      <line x1="8" y1="17" x2="13" y2="17" />
                    </svg>
                  </div>
                  
                  <div className="order-alert-text-wrap">
                    <h3 className="order-alert-title">{orderData.alert.title}</h3>
                    <p className="order-alert-desc">{orderData.alert.description}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Activity Log */}
              <div className="order-activity-col">
                <span className="order-section-subtitle">Activity Log</span>

                <div className="order-activity-card">
                  <button 
                    type="button" 
                    className="order-add-comment-btn"
                    onClick={() => setShowCommentModal(true)}
                  >
                    Add Comment
                  </button>
                </div>
              </div>

            </div>

            {/* ── Section 3: Order Summary Card ── */}
            <div className="order-details-section-wrap">
              <span className="order-section-subtitle">Order Summary</span>

              <div className="order-summary-meta-card">
                {/* 1. Order ID */}
                <div className="order-meta-field">
                  <span className="order-meta-field-label">Order ID</span>
                  <span className="order-meta-field-val order-meta-field-val--mono">
                    {orderData.orderIdHex}
                  </span>
                </div>

                {/* 2. Date Ordered */}
                <div className="order-meta-field">
                  <span className="order-meta-field-label">Date Ordered</span>
                  <span className="order-meta-field-val">
                    {orderData.dateOrdered}
                  </span>
                </div>

                {/* 3. Payment Status */}
                <div className="order-meta-field">
                  <span className="order-meta-field-label">Payment Status</span>
                  <div className="order-payment-status-badge">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{orderData.paymentStatus}</span>
                  </div>
                </div>

                {/* 4. Order Total */}
                <div className="order-meta-field">
                  <span className="order-meta-field-label">Order Total</span>
                  <div className="order-total-val-row">
                    <span className="order-total-amount">{formatINR(orderData.orderTotal)}</span>
                    <button 
                      type="button" 
                      className="order-info-icon-btn" 
                      onClick={() => setShowPriceBreakdown(prev => !prev)}
                      title="View Price Breakdown"
                      aria-label="View Price Breakdown"
                    >
                      ⓘ
                    </button>

                    {showPriceBreakdown && (
                      <div className="order-price-tooltip">
                        <div className="order-tooltip-row">
                          <span>Items Subtotal:</span>
                          <strong>{formatINR(orderData.itemTotal)}</strong>
                        </div>
                        <div className="order-tooltip-row">
                          <span>GST (18%):</span>
                          <strong>{formatINR(orderData.taxes)}</strong>
                        </div>
                        <div className="order-tooltip-divider" />
                        <div className="order-tooltip-row order-tooltip-row--total">
                          <span>Grand Total:</span>
                          <strong>{formatINR(orderData.orderTotal)}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* ── Section 4: Billing Address & Shipping Address (2 Columns) ── */}
            <div className="order-details-addresses-row">
              
              {/* Billing Address Card */}
              <div className="order-addr-col">
                <span className="order-section-subtitle">Billing Address</span>
                
                <div className="order-addr-card">
                  <div className="order-addr-line">
                    <span className="order-addr-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <span className="order-addr-name">{orderData.billingAddress.name}</span>
                  </div>

                  <div className="order-addr-line">
                    <span className="order-addr-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </span>
                    <span className="order-addr-text">{orderData.billingAddress.address}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address Card */}
              <div className="order-addr-col">
                <span className="order-section-subtitle">Shipping Address</span>

                <div className="order-addr-card">
                  <div className="order-addr-line">
                    <span className="order-addr-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </span>
                    <span className="order-addr-name">{orderData.shippingAddress.name}</span>
                  </div>

                  <div className="order-addr-line">
                    <span className="order-addr-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </span>
                    <span className="order-addr-text">{orderData.shippingAddress.address}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Section 5: Product Card ── */}
            <div className="order-details-section-wrap" style={{ marginBottom: '32px' }}>
              <span className="order-section-subtitle">Product</span>

              <div className="order-product-card">
                <div className="order-product-card-left">
                  {/* Thumbnail */}
                  <div className="order-product-thumb-box">
                    <img 
                      src={orderData.product.image} 
                      alt={orderData.product.name} 
                      className="order-product-thumb"
                      onError={(e) => {
                        e.target.src = '/images/hardware/gl500-2g.svg';
                      }}
                    />
                  </div>

                  {/* Title & Quantity */}
                  <div className="order-product-info-col">
                    <h3 className="order-product-card-title">{orderData.product.name}</h3>
                    <span className="order-product-card-qty">
                      Quantity: {orderData.product.qty} x ₹{Number(orderData.product.unitPrice).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="order-product-card-price">
                  ₹ {Number(orderData.product.totalPrice).toFixed(2)}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ── Modal: Add Comment / Activity Log ── */}
      {showCommentModal && (
        <div className="order-modal__overlay" onClick={() => setShowCommentModal(false)}>
          <div className="order-modal__card" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal__header">
              <h3 className="order-modal__title">Add Comment to Order</h3>
              <button 
                type="button" 
                className="order-modal__close-btn"
                onClick={() => setShowCommentModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddComment} className="order-modal__form">
              <div className="order-form-group">
                <label>Comment / Dispatch Instruction *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="e.g. Please ensure shipment is tagged with Gate 4 dock delivery instructions..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  autoFocus
                />
              </div>

              {/* History Preview */}
              {comments.length > 0 && (
                <div className="order-comment-history">
                  <span className="order-comment-history-title">Recent Activity</span>
                  {comments.map(c => (
                    <div key={c.id} className="order-comment-item">
                      <div className="order-comment-head">
                        <strong>{c.author}</strong>
                        <span>{c.time}</span>
                      </div>
                      <p className="order-comment-text">{c.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="order-modal__actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowCommentModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
