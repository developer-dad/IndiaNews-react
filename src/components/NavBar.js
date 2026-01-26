import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/NavBar.css";

export default function NavBar() {
  const { country = "in", category = "top" } = useParams();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    "top",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const countries = [
    { code: "in", name: "India" },
    { code: "us", name: "USA" },
    { code: "ru", name: "Russia" },
    { code: "gb", name: "UK" },
    { code: "cn", name: "China" },
  ];

  const handleCategoryClick = () => {
    if (isMobile) {
      setCategoryOpen(!categoryOpen);
      setCountryOpen(false);
    }
  };

  const handleCountryClick = () => {
    if (isMobile) {
      setCountryOpen(!countryOpen);
      setCategoryOpen(false);
    }
  };

  const handleLinkClick = () => {
    setCategoryOpen(false);
    setCountryOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="apple-navbar">
      <div className="navbar-blur"></div>
      <div className="navbar-content">
        <Link className="navbar-logo" to={`/${country}/${category}`} onClick={handleLinkClick}>
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="logo-text">IndiaNews</span>
        </Link>

        <div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarContent">
          <ul className="navbar-nav me-3">
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Category
              </span>
              <ul className="dropdown-menu">
                {[
                  "top",
                  "business",
                  "entertainment",
                  "health",
                  "science",
                  "sports",
                  "technology",
                ].map((cat) => (
                  <li key={cat}>
                    <Link className="dropdown-item" to={`/${country}/${cat}`}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Link>
                  </li>
                ))}
              </div>
            )}
          </div>

          <div
            className="nav-dropdown"
            onMouseEnter={() => !isMobile && setCountryOpen(true)}
            onMouseLeave={() => !isMobile && setCountryOpen(false)}
          >
            <button
              className="nav-link"
              onClick={handleCountryClick}
            >
              {countries.find(c => c.code === country)?.name || "Country"}
              <svg className={`chevron ${countryOpen ? 'open' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {countryOpen && (
              <div className="dropdown-panel">
                {countries.map((c) => (
                  <Link
                    key={c.code}
                    className={`dropdown-link ${country === c.code ? 'active' : ''}`}
                    to={`/${c.code}/${category}`}
                    onClick={handleLinkClick}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </nav>
  );
}
