// Updated version of pages/Components/MenuItemCard.js

import React from 'react';

export default function MenuItemCard({ item, currencySymbol, convertPrice, t, darkMode, onAddToCart }) {

  // Map category to icons if the item doesn't have an icon
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

  return (
    <div className="menu-item-card">
      <div className={`card h-100 border-0 shadow-hover ${darkMode ? 'bg-dark text-light' : ''}`}>
        <div className="card-img-container" data-category={item.category}>
          {/* Replace image with icon */}
          <div className="item-icon">
                  <img 
    src="https://images.ctfassets.net/j8tkpy1gjhi5/5OvVmigx6VIUsyoKz1EHUs/b8173b7dcfbd6da341ce11bcebfa86ea/Salami-pizza-hero.jpg?w=1440&fm=webp&q=80" 
    className="card-img-top" 
    alt={item.name}
    loading="lazy"
    />
          </div>
          
          {/* Special badges */}
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
          
          {/* Category badge */}
          <div className="category-badge">
            {t(`categories.${item.category}`)}
          </div>
          
          {/* Quick view button */}
          <div className="overlay-buttons">
            <button className="action-btn favorite" aria-label="Add to favorites">
              <i className="far fa-heart"></i>
            </button>
            <button className="action-btn view" aria-label="Quick view">
              <i className="fas fa-eye"></i>
            </button>
          </div>
        </div>
        
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="item-title">{item.name}</h5>
            <div className="price-tag">
              {currencySymbol}{convertPrice(item.price)}
            </div>
          </div>
          
          <p className="item-description">{item.description}</p>
          
          {/* Item attributes */}
          <div className="dietary-indicators d-flex gap-1">
            {item.vegetarian && (
              <span className="attribute vegetarian" title={t('vegetarian')}>
                <i className="fas fa-leaf"></i>
              </span>
            )}
            {item.spicy && (
              <span className="attribute spicy" title={t('spicy')}>
                <i className="fas fa-pepper-hot"></i>
              </span>
            )}
            {item.glutenFree && (
              <span className="attribute gluten-free" title={t('glutenFree')}>
                <i className="fas fa-wheat-awn-circle-exclamation"></i>
              </span>
            )}
            {item.vegan && (
              <span className="attribute vegan" title={t('vegan')}>
                <i className="fas fa-seedling"></i>
              </span>
            )}
          </div>
        </div>
        
        <div className="card-footer bg-transparent border-0 pb-3">
<button className="btn btn-add-to-cart w-100" onClick={() => onAddToCart(item)}>
  <i className="fas fa-plus me-2"></i> {t('addToCart')}
</button>

        </div>
      </div>
    </div>
  );
}