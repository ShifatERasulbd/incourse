import React from "react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: "⚡",
      title: "Fast & Reliable",
      description: "We deliver energy solutions quickly and consistently to keep you powered up.",
    },
    {
      icon: "🌍",
      title: "Global Support",
      description: "Our support team is available worldwide to assist you anytime.",
    },
    {
      icon: "💡",
      title: "Innovative Products",
      description: "We offer cutting-edge technology tailored to your needs.",
    },
    {
      icon: "🔒",
      title: "Trusted Security",
      description: "Safety and security are at the core of every product we provide.",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        padding: "3rem 1rem",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
        color: "#272863",
      }}
    >
      <h2 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: "2rem" }}>
        Why Choose Us
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "nowrap", // Prevent wrapping so all 4 stay in one row
        }}
      >
        {reasons.map(({ icon, title, description }, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 23%",  // Fixed width approx 1/4 with gap allowance
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "1.5rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              color: "#444",
            }}
          >
            <div
              style={{
                fontSize: "2.5rem",
                marginBottom: "1rem",
              }}
              aria-hidden="true"
            >
              {icon}
            </div>
            <h3 style={{ marginBottom: "0.8rem", fontWeight: "600" }}>{title}</h3>
            <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
