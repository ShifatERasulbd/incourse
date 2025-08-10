import React, { useState } from "react";
import "./ProductPage.css";

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const products = [
    { id: 1, name: "Generator 1", category: "Generators", image: "/Frontend/slider/slider1.jpg", desc: "High performance generator" },
    { id: 2, name: "Solar Panel 1", category: "Solar", image: "/Frontend/slider/slider2.jpg", desc: "Efficient solar panel" },
    { id: 3, name: "UPS 1", category: "UPS", image: "/Frontend/slider/slider3.jpg", desc: "Reliable UPS backup" },
    { id: 4, name: "Battery 1", category: "Batteries", image: "/Frontend/slider/slider1.jpg", desc: "Long-lasting battery" },
    { id: 5, name: "Inverter 1", category: "Inverters", image: "/Frontend/slider/slider2.jpg", desc: "Smart inverter" },
    { id: 6, name: "Generator 2", category: "Generators", image: "/Frontend/slider/slider3.jpg", desc: "Fuel efficient model" },
    { id: 7, name: "Solar Panel 2", category: "Solar", image: "/Frontend/slider/slider1.jpg", desc: "Premium solar panel" },
    { id: 8, name: "UPS 2", category: "UPS", image: "/Frontend/slider/slider2.jpg", desc: "Compact UPS system" },
  ];

  const categories = ["All", "Generators", "Solar", "UPS", "Batteries", "Inverters"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <button className="view-btn">View Details</button>
          </div>
        ))}
      </section>
    </div>
  );
}
