import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const categories = ['Generators', 'Solar', 'UPS', 'Batteries', 'Inverters'];

const menuItems = [
  { label: 'Home' },
  { label: 'Products', submenu: categories },
  { label: 'About' },
  { label: 'News' },
  { label: 'Contact Us' },
];

export default function MenuBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null); // for mobile submenu toggle & desktop submenu click toggle

  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) {
        setMenuOpen(false);
        setOpenSubmenuIndex(null);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close submenu if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpenSubmenuIndex(null);
      }
    };

    if (openSubmenuIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSubmenuIndex]);

  // Toggle submenu on desktop (click)
  const toggleSubmenu = (idx) => {
    setOpenSubmenuIndex((current) => (current === idx ? null : idx));
  };

  return (
    <header
      style={{
        background: '#fff',
        borderBottom: '1px solid #eee',
        padding: '0.5rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100vw',
        left: 0,
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      <div
        ref={menuRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          padding: '0 1rem',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            fontSize: '2rem',
            color: '#1F1F66',
            letterSpacing: '0.1em',
            flexShrink: 0,
          }}
        >
          Incourses
        </div>

        {/* Desktop menu */}
        {!isMobile && (
          <nav
            role="menubar"
            aria-label="Primary Navigation"
            style={{
              display: 'flex',
              gap: '2rem',
              overflowX: 'visible',
              flexWrap: 'wrap',
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
              position: 'relative',
            }}
            className="menu-bar-nav"
          >
            {menuItems.map(({ label, submenu }, idx) => {
              if (label === 'Home') {
                return (
                  <Link
                    to="/"
                    key={idx}
                    role="menuitem"
                    tabIndex={0}
                    className="menu-item"
                    style={{
                      color: '#1F1F66',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      fontSize: '1rem',
                      userSelect: 'none',
                      padding: '0.25rem 0',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </Link>
                );
              }

              if (label === 'Products') {
                return (
                  <div
                    key={idx}
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={openSubmenuIndex === idx}
                    tabIndex={0}
                    onClick={() => toggleSubmenu(idx)}
                    className="menu-item"
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <span
                      style={{
                        color: '#1F1F66',
                        whiteSpace: 'nowrap',
                        fontSize: '1rem',
                        padding: '0.25rem 0',
                        display: 'inline-block',
                        userSelect: 'none',
                      }}
                    >
                      {label}{' '}
                      <span style={{ fontSize: '0.7em', marginLeft: '0.3em' }}>
                        ▼
                      </span>
                    </span>
                    {submenu && openSubmenuIndex === idx && (
                      <div
                        role="menu"
                        className="submenu"
                        style={{
                          display: 'block',
                          position: 'absolute',
                          top: '2.2rem',
                          left: 0,
                          background: '#fff',
                          boxShadow: '0 8px 32px rgba(28,30,92,0.10)',
                          borderRadius: '12px',
                          minWidth: '180px',
                          zIndex: 10000,
                          padding: '0.5rem 0',
                        }}
                      >
                        {submenu.map((sub, subIdx) => (
                          <Link
                            key={subIdx}
                            role="menuitem"
                            to={`/products?category=${encodeURIComponent(sub)}`}
                            className="submenu-item"
                            style={{
                              display: 'block',
                              padding: '0.7rem 1.2rem',
                              color: '#272863',
                              fontSize: '1rem',
                              cursor: 'pointer',
                              borderBottom:
                                subIdx < submenu.length - 1
                                  ? '1px solid #f3f3f3'
                                  : 'none',
                              borderRadius: '8px',
                              margin: '2px 0',
                              textDecoration: 'none',
                            }}
                            onClick={() => setOpenSubmenuIndex(null)}
                          >
                            {sub}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (label === 'About') {
                return (
                  <Link
                    to="/about"
                    key={idx}
                    className="menu-item"
                    style={{
                      color: '#1F1F66',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      fontSize: '1rem',
                      userSelect: 'none',
                      padding: '0.25rem 0',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </Link>
                );
              }

              if (label === 'News') {
                return (
                  <Link
                    to="/news" // Change this route if your blog page uses a different path
                    key={idx}
                    className="menu-item"
                    style={{
                      color: '#1F1F66',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      fontSize: '1rem',
                      userSelect: 'none',
                      padding: '0.25rem 0',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </Link>
                );
              }

               if (label === 'Contact Us') {
                return (
                  <Link
                    to="/Contact-Us" // Change this route if your blog page uses a different path
                    key={idx}
                    className="menu-item"
                    style={{
                      color: '#1F1F66',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      position: 'relative',
                      fontSize: '1rem',
                      userSelect: 'none',
                      padding: '0.25rem 0',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </Link>
                );
              }

              // Other menu items without submenu
              return (
                <div
                  key={idx}
                  role="menuitem"
                  tabIndex={0}
                  className="menu-item"
                  style={{
                    color: '#1F1F66',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    fontSize: '1rem',
                    userSelect: 'none',
                    padding: '0.25rem 0',
                    transition: 'color 0.2s',
                  }}
                >
                  {label}
                </div>
              );
            })}
          </nav>
        )}

        {/* Burger menu icon for mobile */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              aria-label="Open menu"
              onClick={() => {
                setMenuOpen((open) => !open);
                setOpenSubmenuIndex(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                marginRight: '0.5rem',
                cursor: 'pointer',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: '2rem', color: '#1F1F66' }}>&#9776;</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {isMobile && menuOpen && (
        <nav
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100vw',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem 0',
          }}
        >
          {menuItems.map(({ label, submenu }, idx) => (
            <div
              key={idx}
              style={{
                width: '100%',
                borderBottom: idx < menuItems.length - 1 ? '1px solid #eee' : 'none',
              }}
            >
              <div
                onClick={() => (submenu ? toggleSubmenu(idx) : setMenuOpen(false))}
                style={{
                  color: '#1F1F66',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  userSelect: 'none',
                }}
              >
                <span>{label}</span>
                {submenu && (
                  <span
                    style={{
                      fontSize: '1.2rem',
                      transform: openSubmenuIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                    }}
                  >
                    ▼
                  </span>
                )}
              </div>
              {submenu && openSubmenuIndex === idx && (
                <div
                  style={{
                    background: '#f9f9f9',
                    paddingLeft: '1.5rem',
                    paddingBottom: '0.75rem',
                  }}
                >
                  {submenu.map((sub, subIdx) => (
                    <Link
                      key={subIdx}
                      to={`/products?category=${encodeURIComponent(sub)}`}
                      onClick={() => {
                        setMenuOpen(false);
                        setOpenSubmenuIndex(null);
                      }}
                      style={{
                        display: 'block',
                        padding: '0.5rem 0',
                        color: '#333',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        textDecoration: 'none',
                      }}
                      tabIndex={0}
                      role="menuitem"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}

      <style>{`
        .menu-bar-nav::-webkit-scrollbar {
          display: none;
        }
        .submenu-item:hover,
        .submenu-item:focus {
          background: #f8fafc;
          color: #1F1F66;
          outline: none;
        }
      `}</style>
    </header>
  );
}
