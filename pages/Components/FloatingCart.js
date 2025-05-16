import React from 'react';

export default function FloatingCart({ cartItems, currencySymbol, convertPrice, t, onClose, darkMode }) {
  if (cartItems.length === 0) return null;

  return (
    <div className={`floating-cart ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="floating-cart-header d-flex justify-content-between align-items-center">
        <h6 className="mb-0">{t('yourCart')}</h6>
        <button className="btn-close" onClick={onClose}></button>
      </div>
      <div className="floating-cart-body">
        {cartItems.map((item, i) => (
          <div key={i} className="cart-item d-flex align-items-center mb-3">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="ms-3">
              <div className="fw-semibold">{item.name}</div>
              <small className="text-muted">{currencySymbol}{convertPrice(item.price)}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
