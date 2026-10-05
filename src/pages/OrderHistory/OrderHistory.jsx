import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './OrderHistory.css';

// Default order history items matching exact screenshot media_1791183233401.png
const DEFAULT_ORDERS = [
  {
    id: 'ord-1001',
    item: 'GL500 2G',
    image: '/images/hardware/gl500-2g.svg',
    orderDate: '03/10/2026',
    quantity: 10,
    totalPrice: '₹ 1,06,200.00',
    status: 'Order Placed',
    statusType: 'placed',
    skuId: 'X0GL-500G-D10B',
    seller: 'TREXSIFY TECHGLOBE PRIVATE LIMITED'
  },
  {
    id: 'ord-1002',
    item: 'DASHCAM - M02-A 2CH',
    image: '/images/hardware/vector-v2-pro.svg',
    orderDate: '03/10/2026',
    quantity: 10,
    totalPrice: '₹ 68,440.00',
    status: 'Confirmed',
    statusType: 'confirmed',
    skuId: 'X0DC-M02A-2CH',
    seller: 'TREXSIFY TECHGLOBE PRIVATE LIMITED'
  },
  {
    id: 'ord-1003',
    item: 'Advance - 4 Wire',
    image: '/images/hardware/advance-4wire.svg',
    orderDate: '03/10/2026',
    quantity: 25,
    totalPrice: '₹ 15,930.00',
    status: 'Confirmed',
    statusType: 'confirmed',
    skuId: 'X0AD-4WIR-D10A',
    seller: 'TREXSIFY TECHGLOBE PRIVATE LIMITED'
  },
  {
    id: 'ord-1004',
    item: 'SK15',
    image: '/images/hardware/br06.svg',
    orderDate: '01/10/2026',
    quantity: 100,
    totalPrice: '₹ 61,360.00',
    status: 'Confirmed',
    statusType: 'confirmed',
    skuId: 'X0SK-1500-D10B',
    seller: 'TREXSIFY TECHGLOBE PRIVATE LIMITED'
  },
  {
    id: 'ord-1005',
    item: 'SK15',
    image: '/images/hardware/br06.svg',
    orderDate: '31/08/2026',
    quantity: 200,
    totalPrice: '₹ 1,22,720.00',
    status: 'Confirmed',
    statusType: 'confirmed',
    skuId: 'X0SK-1500-D10B',
    seller: 'TREXSIFY TECHGLOBE PRIVATE LIMITED'
  },
  {
    id: 'ord-1006',
    item: 'SK15',
    image: '/images/hardware/br06.svg',
    orderDate: '27/08/2026',
    quantity: 50,
    totalPrice: '₹ 30,680.00',
    status: 'Confirmed',
    statusType: 'confirmed',
    skuId: 'X0SK-1500-D10B',
    seller: 'TREXSIFY TECHGLOBE PRIVATE LIMITED'
  },
  {
    id: 'ord-1007',
    item: 'FETACA E-LOCK',
    image: '/images/hardware/7h-elock.svg',
    orderDate: '26/08/2026',
    quantity: 15,
    totalPrice: '₹ 1,56,940.00',
    status: 'Completed',
    statusType: 'completed',
    skuId: 'X0FT-ELCK-D10C',
    seller: 'TREXSIFY TECHGLOBE PRIVATE LIMITED'
  },
  {
    id: 'ord-1008',
    item: 'Advance - 4 Wire',
    image: '/images/hardware/advance-4wire.svg',
    orderDate: '25/08/2026',
    quantity: 35,
    totalPrice: '₹ 45,625.00',
    status: 'Confirmed',
    statusType: 'confirmed',
    skuId: 'X0AD-4WIR-D10A',
    seller: 'TREXSIFY TECHGLOBE PRIVATE LIMITED'
  }
];

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders] = useState(DEFAULT_ORDERS);

  // Navigate to order details screen matching media_1791184472775.png
  const handleViewOrder = (order) => {
    navigate(`/order-details/${order.id}`, {
      state: { order }
    });
  };

  return (
    <div className="history-page">
      <div className="history-unified-card">
        
        {/* ── Fixed Topbar: Breadcrumbs + Navigation ── */}
        <div className="history-topbar">
          <nav className="history-breadcrumbs">
            <Link to="/setu">Home</Link>
            <span className="history-sep">›</span>
            <span className="history-current-crumb">Order History</span>
          </nav>

          <button 
            type="button" 
            className="history-back-btn" 
            onClick={() => navigate(-1)}
          >
            ‹ Back
          </button>
        </div>

        {/* ── Scrollable Body within the Curved Card ── */}
        <div className="history-scroll-body">
          <div className="history-inner-container">

            {/* ── Table Card matching media_1791183233401.png ── */}
            <div className="history-table-card">
              <div className="history-table-wrapper">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th className="th-item">Item</th>
                      <th className="th-date">Order Date</th>
                      <th className="th-qty">Quantity</th>
                      <th className="th-price">Total Price</th>
                      <th className="th-status">Order Status</th>
                      <th className="th-action">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((ord) => (
                      <tr key={ord.id} className="history-row">
                        {/* Item with Cyan device icon container */}
                        <td className="td-item">
                          <div className="history-item-cell">
                            <div className="history-item-icon-box">
                              <img 
                                src={ord.image} 
                                alt={ord.item} 
                                className="history-item-icon"
                                onError={(e) => {
                                  e.target.src = '/images/hardware/advance-4wire.svg';
                                }}
                              />
                            </div>
                            <span className="history-item-name">{ord.item}</span>
                          </div>
                        </td>

                        {/* Order Date */}
                        <td className="td-date">{ord.orderDate}</td>

                        {/* Quantity */}
                        <td className="td-qty">{ord.quantity}</td>

                        {/* Total Price */}
                        <td className="td-price">{ord.totalPrice}</td>

                        {/* Order Status Badge */}
                        <td className="td-status">
                          <span className={`history-status-badge history-status-badge--${ord.statusType}`}>
                            {ord.status}
                          </span>
                        </td>

                        {/* Action: View Order */}
                        <td className="td-action">
                          <button
                            type="button"
                            className="history-view-btn"
                            onClick={() => handleViewOrder(ord)}
                          >
                            View Order
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
