import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import frontendService from "./services/frontendService";
import "./ProductPage.css";

// Default fallback data
const defaultProducts = [
  { id: 1, name: "Generator 1", category: { name: "Generators" }, image_path: "Frontend/slider/slider1.jpg", short_description: "High performance generator" },
  { id: 2, name: "Solar Panel 1", category: { name: "Solar" }, image_path: "Frontend/slider/slider2.jpg", short_description: "Efficient solar panel" },
  { id: 3, name: "UPS 1", category: { name: "UPS" }, image_path: "Frontend/slider/slider3.jpg", short_description: "Reliable UPS backup" },
  { id: 4, name: "Battery 1", category: { name: "Batteries" }, image_path: "Frontend/slider/slider1.jpg", short_description: "Long-lasting battery" },
  { id: 5, name: "Inverter 1", category: { name: "Inverters" }, image_path: "Frontend/slider/slider2.jpg", short_description: "Smart inverter" },
  { id: 6, name: "Generator 2", category: { name: "Generators" }, image_path: "Frontend/slider/slider3.jpg", short_description: "Fuel efficient model" },
  { id: 7, name: "Solar Panel 2", category: { name: "Solar" }, image_path: "Frontend/slider/slider1.jpg", short_description: "Premium solar panel" },
  { id: 8, name: "UPS 2", category: { name: "UPS" }, image_path: "Frontend/slider/slider2.jpg", short_description: "Compact UPS system" },
];

const defaultCategories = ["All", "Generators", "Solar", "UPS", "Batteries", "Inverters"];

export default function ProductPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState(defaultProducts);
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories using frontend service
        const categoriesResult = await frontendService.getCategories();
        if (categoriesResult.success && categoriesResult.data && categoriesResult.data.length > 0) {
          const categoryNames = ['All', ...categoriesResult.data.map(cat => cat.name)];
          setCategories(categoryNames);
        }

        // Fetch products using frontend service
        const productsResult = await frontendService.getProducts();
        if (productsResult.success && productsResult.data && productsResult.data.length > 0) {
          setProducts(productsResult.data);
        }
      } catch (error) {
        console.error('Failed to fetch products/categories:', error);
        // Keep default data
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
        {filteredProducts.map((p) => (
          <div className="product-card" key={p.id}>
            <img
              src={p.image_path ?
                `/${p.image_path}` :
                "/Frontend/slider/slider1.jpg"
              }
              alt={p.name}
            />
            <h3>{p.name}</h3>
            <p>{p.short_description || p.description}</p>
            {p.price && <div className="price">${p.price}</div>}
            <button
              className="view-btn"
              onClick={() => navigate(`/products/${p.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
