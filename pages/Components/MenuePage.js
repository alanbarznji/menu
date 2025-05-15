import { useState } from 'react';
import Head from 'next/head';
import LanguageCurrencyBar from './LanguageCurrencyBar';
import CategorySlider from './CategorySlider';
import MenuItemCard from './MenuItemCard';
import { useTranslation } from '../data/useTranslation';
import { useCurrencyConverter } from '../data/useCurrencyConverter';
import { menuData } from '../data/menuData';
 
// import { useTranslation } from '../hooks/useTranslation';
// import { useCurrencyConverter } from '../utils/currencyConverter';
 

export default function Home() {
  // State management
  const [activeCategory, setActiveCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  
  // Custom hooks
  const { t } = useTranslation(language);
  const { convertPrice, getCurrencySymbol } = useCurrencyConverter(currency);
  
  // Get unique categories
  const categories = ['all', ...new Set(menuData.map(item => item.category))];
  
  // Filter menu items based on active category
  const filteredMenu = activeCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Add/remove dark mode class from body
    if (!darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>

      <LanguageCurrencyBar 
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        darkMode={darkMode}
      />
      
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} sticky-top shadow-sm`}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fas fa-utensils me-2"></i>
            <span className="fw-bold gradient-text">Savory</span>
          </a>
          
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <a className="nav-link active" href="#">{t('menu')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{t('about')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{t('contact')}</a>
              </li>
              <li className="nav-item ms-2">
                <button 
                  className="btn btn-sm btn-outline-primary rounded-circle"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                </button>
              </li>
              <li className="nav-item ms-3">
                <a className="btn btn-primary px-4 rounded-pill" href="#">
                  <i className="fas fa-shopping-bag me-2"></i>
                  {t('order')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="main-content">
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h1 className="display-4 fw-bold main-title">{t('ourMenu')}</h1>
              <p className="lead text-muted">{t('menuDescription')}</p>
            </div>
          </div>
          
          {/* Categories */}
          <CategorySlider 
            categories={categories} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            t={t}
            darkMode={darkMode}
          />
          
          {/* Menu items - grouped by category */}
          <div className="menu-grid">
            {filteredMenu.map((item, index) => (
              <div key={item.id} className="menu-item" style={{animationDelay: `${index * 0.05}s`}}>
                <MenuItemCard 
                  item={item}
                  currencySymbol={getCurrencySymbol()}
                  convertPrice={convertPrice}
                  t={t}
                  darkMode={darkMode}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <h5 className="footer-brand mb-4">
                <i className="fas fa-utensils me-2"></i>
                <span className="gradient-text">Savory</span>
              </h5>
              <p className="text-muted">{t('footerDescription')}</p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
            
            <div className="col-lg-4">
              <h5 className="mb-4">{t('openingHours')}</h5>
              <ul className="hours-list">
                <li>
                  <span>{t('weekdays')}</span>
                  <span>11:00 AM - 10:00 PM</span>
                </li>
                <li>
                  <span>{t('weekends')}</span>
                  <span>10:00 AM - 11:00 PM</span>
                </li>
                <li className="special">
                  <span>{t('happyHour')}</span>
                  <span>4:00 PM - 6:00 PM</span>
                </li>
              </ul>
            </div>
            
            <div className="col-lg-4">
              <h5 className="mb-4">{t('contactUs')}</h5>
              <ul className="contact-list">
                <li>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>123 Main Street, New York, NY 10001</span>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li>
                  <i className="fas fa-envelope"></i>
                  <span>info@savoryrestaurant.com</span>
                </li>
              </ul>
              <div className="mt-4">
                <a href="#" className="btn btn-outline-light rounded-pill">
                  {t('reserveTable')}
                </a>
              </div>
            </div>
          </div>
          
          <hr className="mt-4 mb-3 border-secondary" />
          
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="mb-0 text-muted">
                &copy; {new Date().getFullYear()} Savory. {t('allRightsReserved')}
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <ul className="footer-links">
                <li><a href="#">{t('privacyPolicy')}</a></li>
                <li><a href="#">{t('termsOfService')}</a></li>
                <li><a href="#">{t('cookiePolicy')}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}