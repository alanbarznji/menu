import logo from "../assets/image.png";

export default function MenuItemCard({ item, currencySymbol, convertPrice, t, darkMode }) {
  return (
    <div className="menu-item-card">
      <div className={`card h-100 border-0 shadow-sm hover-effect ${darkMode ? 'bg-dark text-light' : ''}`}>
        <div className="card-img-container">
    <img 
  src="https://images.ctfassets.net/j8tkpy1gjhi5/5OvVmigx6VIUsyoKz1EHUs/b8173b7dcfbd6da341ce11bcebfa86ea/Salami-pizza-hero.jpg?w=1440&fm=webp&q=80" 
  className="card-img-top" 
  alt={item.name}
  loading="lazy"
/>

          
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
          
          {/* Quick view button */}
          <div className="overlay-buttons">
            <button className="btn btn-sm btn-light rounded-circle" aria-label="Add to favorites">
              <i className="far fa-heart"></i>
            </button>
            <button className="btn btn-sm btn-light rounded-circle" aria-label="Quick view">
              <i className="fas fa-eye"></i>
            </button>
          </div>
        </div>
        
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{item.name}</h5>
            <div className="price-tag">
              {currencySymbol}{convertPrice(item.price)}
            </div>
          </div>
          
          <p className={`card-text ${darkMode ? 'text-light opacity-75' : 'text-muted'} small`}>{item.description}</p>
          
          {/* Item attributes */}
          <div className="item-attributes mb-3">
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
          <button className="btn btn-add-to-cart w-100">
            <i className="fas fa-plus me-2"></i> {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
