import React, { useState, useEffect, useRef } from 'react';
import frontendService from './services/frontendService';

// Fallback slides in case API fails
const fallbackSlides = [
  {
    image: '/Frontend/slider/slider1.jpg',
    title: 'Power Solutions',
    description: 'Reliable energy for your business.'
  },
  {
    image: '/Frontend/slider/slider2.jpg',
    title: 'Innovative Products',
    description: 'Cutting-edge technology for every need.'
  },
  {
    image: '/Frontend/slider/slider3.jpg',
    title: 'Global Support',
    description: 'We are here for you, worldwide.'
  }
];


export default function Slider({ slides: propSlides }) {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slides, setSlides] = useState(propSlides || fallbackSlides);
  const [loading, setLoading] = useState(!propSlides);
  const timeoutRef = useRef(null);

  // Fetch sliders from API using frontend service (only if not provided as props)
  useEffect(() => {
    if (propSlides) {
      // If slides are provided as props, transform them and skip API call
      const transformedSlides = propSlides.map(slider => ({
        image: slider.image_path ? `/${slider.image_path}` : '/Frontend/slider/slider1.jpg',
        title: slider.title,
        description: slider.description || '',
        button_text: slider.button_text,
        button_link: slider.button_link,
      }));
      setSlides(transformedSlides);
      setLoading(false);
      return;
    }

    const fetchSliders = async () => {
      try {
        const result = await frontendService.getSliders();
        if (result.success && result.data && result.data.length > 0) {
          // Transform API data to match component expectations
          const transformedSlides = result.data.map(slider => ({
            image: slider.image_path ? `/${slider.image_path}` : '/Frontend/slider/slider1.jpg',
            title: slider.title,
            description: slider.description || '',
            button_text: slider.button_text,
            button_link: slider.button_link,
          }));
          setSlides(transformedSlides);
        }
      } catch (error) {
        console.error('Failed to fetch sliders:', error);
        // Keep fallback slides
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, [propSlides]);

  useEffect(() => {
    // Detect mobile view
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!loading && slides.length > 0) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 3500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, loading, slides.length]);

  if (loading) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          overflow: 'hidden',
          minHeight: '400px',
          maxHeight: '500px',
          height: '500px',
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ color: '#fff', fontSize: '1.2rem' }}>Loading slides...</div>
      </div>
    );
  }

  if (!slides || slides.length === 0) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          overflow: 'hidden',
          minHeight: '400px',
          maxHeight: '500px',
          height: '500px',
          background: '#111',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ color: '#fff', fontSize: '1.2rem' }}>No slides available</div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        overflow: 'hidden',
        minHeight: '400px',
        maxHeight: '500px',
        height: '500px',
        background: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Slides */}
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          maxHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: '#222'
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: current === idx ? 1 : 0,
              transition: 'opacity 1s cubic-bezier(.77,0,.18,1)',
              zIndex: current === idx ? 2 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 32px rgba(0,0,0,0.18)'
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '400px',
                  maxHeight: '500px',
                  objectFit: 'cover',
                  display: 'block',
                  background: '#333'
                }}
                onError={(e) => {
                  e.target.style.background = '#c41c13';
                  e.target.alt = 'Image not found';
                }}
              />
              {/* Curved hover overlay — only for desktop */}
              {!isMobile && (
                <div
                  className="curved-hover-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '40%',
                    height: '100%',
                    pointerEvents: 'none',
                    background:
                      'linear-gradient(135deg, rgba(28, 30, 92, 0.65) 40%, transparent 80%)',
                    clipPath:
                      'path("M0 0 C 20% 10%, 38% 55%, 35% 100% L 0 100% Z")',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    borderRadius: '24px 0 0 24px'
                  }}
                />
              )}
              {!isMobile && (
                <style>
                  {`
                    div:hover > .curved-hover-overlay {
                      opacity: 1 !important;
                      pointer-events: auto;
                    }
                  `}
                </style>
              )}
            </div>

            {/* Text without black background */}
            <div
              style={{
                position: 'absolute',
                left: '5%',
                bottom: '12%',
                color: '#fff',
                padding: '0', // removed padding from background box
                borderRadius: '0', // no box rounding needed
                minWidth: '220px',
                maxWidth: '40vw',
                textAlign: 'left',
                textShadow: '0 2px 4px rgba(0,0,0,0.4)' // keep text readable over images
              }}
            >
              <h2 style={{ fontSize: '2rem', margin: 0, fontWeight: 'bold' }}>{slide.title}</h2>
              <p style={{ fontSize: '1.1rem', margin: '0.5rem 0 0', fontWeight: '500' }}>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '2vw',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 10,
          background: 'rgba(255,255,255,0.15)',
          padding: '0.5rem 1rem',
          borderRadius: '2rem',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)'
        }}
      >
        {slides.map((_, dotIdx) => (
          <span
            key={dotIdx}
            onClick={() => setCurrent(dotIdx)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: current === dotIdx ? '#fff' : 'rgba(255,255,255,0.5)',
              border: current === dotIdx ? '2px solid #c41c13' : '2px solid #fff',
              cursor: 'pointer',
              transition: 'background 0.3s, border 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  );
}
