// Updated version of pages/Components/MenuePage.js

import { useState, useEffect } from 'react';
import Head from 'next/head';
import LanguageCurrencyBar from './LanguageCurrencyBar';
import CategorySlider from './CategorySlider';
 
import { useTranslation } from '../../src/data/useTranslation';
import { useCurrencyConverter } from '../../src/data/useCurrencyConverter';
import { menuData } from '../../src/data/menuData';
import MenuItemCard from './MenuItemCard';

export default function MenuePage() {
  // State management
  const [activeCategory, setActiveCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Custom hooks
  const { t } = useTranslation(language);
  const { convertPrice, getCurrencySymbol } = useCurrencyConverter(currency);
  
  // Get unique categories
  const categories = ['all', ...new Set(menuData.map(item => item.category))];
  
  // Filter menu items based on active category and search
  const filteredMenu = menuData.filter(item => {
    // Category filter
    if (activeCategory !== 'all' && item.category !== activeCategory) {
      return false;
    }
    
    // Search filter
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    // Add/remove dark mode class from body
    if (!darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  };
  
  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.getElementById('navbarNav');
      if (isMenuOpen && navbar && !navbar.contains(event.target) && !event.target.classList.contains('navbar-toggler')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Initialize theme based on user preference or localStorage
  useEffect(() => {
    // Check localStorage first
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      const isDarkMode = storedDarkMode === 'true';
      setDarkMode(isDarkMode);
      document.body.classList.toggle('dark-mode', isDarkMode);
      document.body.classList.toggle('light-mode', !isDarkMode);
    } else {
      // If no localStorage, check system preference
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDarkMode);
      document.body.classList.toggle('dark-mode', prefersDarkMode);
      document.body.classList.toggle('light-mode', !prefersDarkMode);
    }
    
    // Check for language and currency preferences
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
    
    const storedCurrency = localStorage.getItem('currency');
    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
  }, []);
  
  // Set document direction for RTL languages
  useEffect(() => {
    localStorage.setItem('language', language);
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);
  
  // Save currency preference
  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

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
      
      {/* Updated Navbar */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} sticky-top`}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <i className="fas fa-utensils me-2 text-primary"></i>
            <span className="fw-bold gradient-text">Savory</span>
          </a>
          
          <div className="d-flex align-items-center order-lg-3">
            <button 
              className="btn btn-sm btn-outline-primary rounded-circle me-3 d-none d-lg-block"
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
            
            <a href="#" className="btn btn-sm position-relative me-3">
              <i className="fas fa-shopping-cart fs-5 text-primary"></i>
              <span className="cart-count">0</span>
            </a>
            
            <a className="btn btn-primary px-4 rounded-pill d-none d-lg-block" href="#">
              <i className="fas fa-shopping-bag me-2"></i>
              {t('order')}
            </a>
          </div>
          
          <button 
            className="navbar-toggler border-0" 
            type="button" 
            onClick={toggleMenu}
            aria-controls="navbarNav" 
            aria-expanded={isMenuOpen ? "true" : "false"} 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">{t('menu')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{t('about')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{t('contact')}</a>
              </li>
              <li className="nav-item d-lg-none">
                <button 
                  className="btn btn-sm btn-outline-primary rounded-circle mt-2"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
                </button>
              </li>
              <li className="nav-item d-lg-none">
                <a className="btn btn-primary px-4 rounded-pill ms-3 mt-3" href="#">
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
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold main-title">{t('ourMenu')}</h1>
            <p className="lead text-muted mx-auto" style={{maxWidth: '700px'}}>{t('menuDescription')}</p>
          </div>
          
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <i className="fas fa-search search-icon"></i>
              <input
                type="search"
                className="search-input"
                placeholder={t('searchMenu')}
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')}>
                  <i className="fas fa-times"></i>
                </button>
              )}
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
          
          {/* Menu items - with conditional rendering for no results */}
          {filteredMenu.length > 0 ? (
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
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="empty-title">{t('noResultsFound')}</h3>
              <p className="empty-text">{t('tryDifferentSearch')}</p>
              <button className="empty-button" onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}>
                {t('clearFilters')}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}