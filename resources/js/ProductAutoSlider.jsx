import React, { useState, useRef, useEffect } from 'react';

const products = [
  { image: '/Frontend/slider/slider1.jpg', name: 'Power Generator', desc: 'High-efficiency generator for industrial use.' },
  { image: '/Frontend/slider/slider2.jpg', name: 'Solar Panel', desc: 'Eco-friendly solar panel for homes and businesses.' },
  { image: '/Frontend/slider/slider3.jpg', name: 'UPS System', desc: 'Reliable UPS for uninterrupted power supply.' },
  { image: '/Frontend/slider/slider1.jpg', name: 'Battery Pack', desc: 'Long-lasting battery pack for backup.' },
  { image: '/Frontend/slider/slider2.jpg', name: 'Smart Inverter', desc: 'Efficient inverter for smart energy management.' },
  { image: '/Frontend/slider/slider3.jpg', name: 'Voltage Stabilizer', desc: 'Protect your devices from voltage fluctuations.' },
  { image: '/Frontend/slider/slider1.jpg', name: 'Energy Meter', desc: 'Accurate energy consumption monitoring.' },
  { image: '/Frontend/slider/slider2.jpg', name: 'Wind Turbine', desc: 'Harness wind energy for your needs.' },
  { image: '/Frontend/slider/slider3.jpg', name: 'Portable Charger', desc: 'Charge devices on the go.' },
  { image: '/Frontend/slider/slider1.jpg', name: 'LED Lighting', desc: 'Bright and energy-saving LED lights.' },
  { image: '/Frontend/slider/slider2.jpg', name: 'Surge Protector', desc: 'Keep electronics safe from surges.' },
  { image: '/Frontend/slider/slider3.jpg', name: 'Electric Scooter', desc: 'Eco-friendly urban mobility.' }
];

export default function ProductAutoSlider() {
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const scrollSpeed = 0.5;

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId;

    const scrollStep = () => {
      if (!isDragging.current) {
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = 'grabbing';
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const onMouseUp = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .product-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          text-align: center;
          min-width: 18%;
          max-width: 18%;
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: min-width 0.3s ease;
          padding: 1rem;
          box-sizing: border-box;
        }
        .product-card img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          border-radius: 10px 10px 0 0;
          margin: 0;
          padding: 0;
          display: block;
        }
        .view-details-btn {
          margin-top: auto;
          background-color: #1C1E5C;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1rem;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: background-color 0.3s ease;
          width: 100%;
        }
        .view-details-btn:hover {
          background-color: #151742;
        }
        @media (max-width: 600px) {
          .product-card {
            min-width: 45% !important;
            max-width: 45% !important;
            padding: 0.75rem;
          }
          .product-card img {
            height: 320px;
          }
        }
      `}</style>

      <div
        style={{
          background: '#1F1F66',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 0',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>
          Our Products
        </h2>

        <div
          ref={sliderRef}
          className="hide-scrollbar"
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            gap: '0.6rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            cursor: 'grab',
            paddingBottom: '1rem',
            userSelect: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {products.map((product, idx) => (
            <div key={idx} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3 style={{ fontSize: '1.1rem', color: '#272863', margin: '0.5rem 0' }}>{product.name}</h3>
              <p style={{ fontSize: '0.95rem', color: '#444', margin: '0 0 1rem 0' }}>{product.desc}</p>
              <button className="view-details-btn" onClick={() => alert(`Viewing details for ${product.name}`)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
