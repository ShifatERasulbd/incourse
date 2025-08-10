import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MenuBar() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null); // For mobile submenu toggle

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

  const menuItems = [
    { label: 'Home' },
    { label: 'Products', submenu: ['Product A', 'Product B', 'Product C'] },
    { label: 'About' },
    { label: 'News' },
    { label: 'Contact Us' },
  ];

  // Toggle submenu on mobile
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

        {/* Desktop menu with hover dropdown */}
        {!isMobile && (
          <nav
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
            {menuItems.map(({ label, submenu }, idx) => (
              label === 'Home' ? (
                <Link
                  to="/"
                  key={idx}
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
                  className="menu-item"
                >
                  {label}
                </Link>
              ) : label === 'Products' ? (
                <Link
                  to="/products"
                  key={idx}
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
                  className="menu-item"
                >
                  {label} {submenu && <span style={{ fontSize: '0.7em', marginLeft: '0.3em' }}>▼</span>}
                </Link>
              ) : (
                <div
                  key={idx}
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
                  className="menu-item"
                >
                  {label} {submenu && <span style={{ fontSize: '0.7em', marginLeft: '0.3em' }}>▼</span>}
                  {submenu && (
                    <div className="submenu">
                      {submenu.map((sub, subIdx) => (
                        <div
                          key={subIdx}
                          style={{
                            padding: '0.7rem 1.2rem',
                            color: '#272863',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            borderBottom: subIdx < submenu.length - 1 ? '1px solid #f3f3f3' : 'none',
                            transition: 'background 0.2s, color 0.2s',
                            borderRadius: '8px',
                            margin: '2px 0',
                          }}
                          className="submenu-item"
                          tabIndex={0}
                          role="button"
                          onClick={() => alert(`Clicked ${sub}`)}
                          onKeyDown={() => {}}
                        >
                          {sub}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
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
                    <div
                      key={subIdx}
                      onClick={() => {
                        alert(`Clicked ${sub}`);
                        setMenuOpen(false);
                        setOpenSubmenuIndex(null);
                      }}
                      style={{
                        padding: '0.5rem 0',
                        color: '#333',
                        cursor: 'pointer',
                        fontSize: '1rem',
                      }}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                    >
                      {sub}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Hide scrollbar for webkit browsers */}
      <style>{`
        .menu-bar-nav::-webkit-scrollbar {
          display: none;
        }
        .menu-item:hover > .submenu {
          display: block;
          opacity: 1;
          pointer-events: auto;
        }
        .submenu {
          display: none;
          position: absolute;
          top: 2.2rem;
          left: 0;
          background: #fff;
          box-shadow: 0 8px 32px rgba(28,30,92,0.10);
          border-radius: 12px;
          min-width: 180px;
          z-index: 10000;
          padding: 0.5rem 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .submenu-item:hover {
          background: #f8fafc;
          color: #1F1F66;
        }
      `}</style>
    </header>
  );
}
