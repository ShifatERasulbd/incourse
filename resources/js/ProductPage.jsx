// Import necessary libraries and modules
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import frontendService from "./services/frontendService";
import "./ProductPage.css";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const categoriesResult = await frontendService.getCategories();
        const categoryArray = Array.isArray(categoriesResult.data) ? categoriesResult.data : [];
        setCategories(['All', ...categoryArray.map(cat => cat.name)]);

        // Fetch products
        const productsResult = await frontendService.getProducts();
        let productArray = [];
        if (productsResult.success) {
          // If paginated, productsResult.data.data is the array
          if (Array.isArray(productsResult.data?.data)) {
            productArray = productsResult.data.data;
          } else if (Array.isArray(productsResult.data)) {
            productArray = productsResult.data;
          }
        }
        setProducts(productArray);
        if (!Array.isArray(productArray)) {
          setError('Failed to fetch products');
        }
      } catch (error) {
        setError('Failed to fetch products/categories');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category?.name === selectedCategory);

  return (
    <div className="product-grid">
      {/* Sidebar */}
      <aside className="product-sidebar">
        <h2>Filter</h2>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "active" : ""}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Products */}
      <section className="product-cards">
        {loading && <div>Loading products...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && filteredProducts.length === 0 && (
          <div>No products found.</div>
        )}
        {!loading && !error && filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img
              src={p.image_path ? `/${p.image_path}` : "/Frontend/slider/slider1.jpg"}
              alt={p.name}
            />
            <h3>{p.name}</h3>
            <p>{p.short_description || p.description}</p>
        
            <button
              className="view-btn"
              onClick={() => {
                if (p.redirection_url) {
                  window.open(p.redirection_url, '_blank');
                } else {
                  navigate(`/products/${p.id}`);
                }
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
