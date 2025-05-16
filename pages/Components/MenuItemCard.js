import React, { useState } from 'react';

export default function MenuItemCard({ item, currencySymbol, convertPrice, t, darkMode, onAddToCart }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      burgers: "fa-hamburger",
      sandwiches: "fa-bread-slice",
      pizzas: "fa-pizza-slice",
      salads: "fa-leaf",
      desserts: "fa-ice-cream",
      drinks: "fa-glass-martini",
      sides: "fa-french-fries",
      mains: "fa-utensils"
    };
    return categoryIcons[category] || "fa-utensils";
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Optional: trigger global save, API call, or localStorage
  };

  return (
    <div className="menu-item-card">
      <div className={`card h-100 border-0 shadow-hover ${darkMode ? 'bg-dark text-light' : ''}`}>
        <div className="card-img-container" data-category={item.category}>
          <div className="item-icon">
            <img 
              src="https://images.ctfassets.net/j8tkpy1gjhi5/5OvVmigx6VIUsyoKz1EHUs/b8173b7dcfbd6da341ce11bcebfa86ea/Salami-pizza-hero.jpg?w=1440&fm=webp&q=80" 
              className="card-img-top" 
              alt={item.name}
              loading="lazy"
            />
          </div>

          <div className="item-badges">
            {item.bestseller && (
              <span className="badge badge-bestseller">
                <i className="fas fa-star me-1"></i> {t('bestseller')}
              </span>
            )}
            {item.new && (
              <span className="badge badge-new">
                {t('new')}
              </span>
            )}
          </div>

          <div className="category-badge">
            {t(`categories.${item.category}`)}
          </div>

          {/* Toggle Favorite */}
          <div className="overlay-buttons">
            <button 
              className="action-btn favorite" 
              aria-label="Add to favorites"
              onClick={toggleFavorite}
            >
              <i className={`fa-heart ${isFavorite ? 'fas text-danger' : 'far'}`}></i>
            </button>
          </div>
        </div>

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="item-title">{item.name}</h5>
            <div className="price-tag-new">
              {currencySymbol}{convertPrice(item.price)}
            </div>
          </div>

          <div className="item-content">
            <div className="item-description-wrapper">
              <p className="item-description-new">{item.description}</p>
            </div>
          </div>
        </div>

        <div className="card-footer bg-transparent border-0 pb-3">
          <button className="btn-add-to-cart-new w-100" onClick={() => onAddToCart(item)}>
            <span className="btn-text">{t('addToCart')}</span>
            <span className="btn-icon">
              <i className="fas fa-shopping-cart"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
