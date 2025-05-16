// Enhanced CategorySlider Component with improved styling
import React from 'react';

export default function CategorySlider({ categories, activeCategory, setActiveCategory, t, darkMode }) {
  // Category icons mapping
  const categoryIcons = {
    all: "fa-th-large",
    burgers: "fa-hamburger",
    sandwiches: "fa-bread-slice",
    pizzas: "fa-pizza-slice",
    salads: "fa-leaf",
    desserts: "fa-ice-cream",
    drinks: "fa-glass-martini",
    sides: "fa-french-fries",
    mains: "fa-utensils"
  };

  return (
    <div className="category-slider">
      <div className="d-flex justify-content-center flex-nowrap overflow-auto pb-3 hide-scrollbar">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="px-2"
          >
            <button
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter by ${t(`categories.${category}`) || category}`}
            >
              <div className="category-icon">
                <i className={`fas ${categoryIcons[category] || 'fa-utensils'}`}></i>
              </div>
              <span>{t(`categories.${category}`) || category}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}