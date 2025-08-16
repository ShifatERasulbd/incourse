import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import frontendService from "./services/frontendService";


export default function Navbar() {
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await frontendService.getCategories();
      if (res.success && Array.isArray(res.data)) {
        setCategories(res.data.map(cat => cat.name));
      }
    };
    fetchCategories();
  }, []);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    {
      label: "Products",path:"/products",
      submenu: categories,
    },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src="/FrontEnd/logo/logo.png"
          alt="Incourses Logo"
          style={{
            width: "160px",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </Link>

      {/* Menu */}
      <div style={{ display: "flex", gap: "2rem" }}>
        {menuItems.map(({ label, path, submenu }, idx) => {
          if (submenu) {
            return (
              <div
                key={idx}
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenSubmenuIndex(idx)}
               
              >
                {/* Parent link */}
                <div
                  style={{
                    cursor: "pointer",
                    color: "#1F1F66",
                    fontSize: "1rem",
                    padding: "0.25rem 0",
                  }}
                >
                  {label} <span style={{ fontSize: "0.7em" }}>▼</span>
                </div>

                {/* Submenu */}
                {openSubmenuIndex === idx && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2.2rem",
                      left: 0,
                      background: "#fff",
                      boxShadow: "0 8px 32px rgba(28,30,92,0.10)",
                      borderRadius: "12px",
                      minWidth: "180px",
                      zIndex: 10000,
                      padding: "0.5rem 0",
                    }}
                     onMouseLeave={() => setOpenSubmenuIndex(null)}
                  >
                    {submenu.map((sub, subIdx) => (
                      <Link
                        key={subIdx}
                        to={`/products?category=${encodeURIComponent(sub)}`}
                        style={{
                          display: "block",
                          padding: "0.7rem 1.2rem",
                          color: "#272863",
                          fontSize: "1rem",
                          textDecoration: "none",
                          borderBottom:
                            subIdx < submenu.length - 1
                              ? "1px solid #f3f3f3"
                              : "none",
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

          return (
            <Link
              key={idx}
              to={path}
              style={{
                color: "#1F1F66",
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
