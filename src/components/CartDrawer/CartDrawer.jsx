import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { getAssetUrl } from '../../utils/assetUrl';
import './CartDrawer.css';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { cartItems, cartCount, removeFromCart, updateQty, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Your Cart
            {cartCount > 0 && (
              <span className="cart-drawer__count">{cartCount}</span>
            )}
          </div>
          <button className="cart-drawer__close" onClick={() => setIsCartOpen(false)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p>Your cart is empty</p>
              <span>Add hardware or solutions to get started</span>
            </div>
          ) : (
            <div className="cart-drawer__items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__image">
                    {item.image ? (
                      <img src={getAssetUrl(item.image)} alt={item.name} className="cart-item__thumb-img" />
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                        <rect x="2" y="7" width="20" height="14" rx="2"/>
                        <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
                        <circle cx="12" cy="14" r="2"/>
                      </svg>
                    )}
                  </div>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__type">{item.specifications?.productType || 'Hardware'}</p>
                  </div>
                  <div className="cart-item__qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setIsCartOpen(false);
                navigate('/order');
              }}
            >
              Proceed to Order
            </button>
            <button
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
