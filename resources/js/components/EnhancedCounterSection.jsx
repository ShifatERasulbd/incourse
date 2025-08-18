import React, { useEffect, useState } from 'react';
import { useCounters } from '../hooks/useFrontendData';

// Enhanced Counter Card with configurable animations
function EnhancedCounterCard({ 
  label, 
  end, 
  suffix, 
  icon, 
  iconType, 
  iconColor,
  animationDuration = 2000,
  animationDelay = 0,
  animationEasing = 'easeOutCubic',
  showIcon = true,
  cardStyle = 'default'
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Easing functions
  const easingFunctions = {
    linear: (t) => t,
    easeInQuad: (t) => t * t,
    easeOutQuad: (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeOutCubic: (t) => (--t) * t * t + 1,
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  };

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${label.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [label]);

  // Animated counting effect
  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now() + animationDelay;
    const easingFunction = easingFunctions[animationEasing] || easingFunctions.easeOutCubic;

    const animate = () => {
      const now = Date.now();
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / animationDuration, 1);
      
      const easedProgress = easingFunction(progress);
      const currentCount = Math.floor(easedProgress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, animationDelay);

    return () => clearTimeout(timeoutId);
  }, [end, animationDuration, animationDelay, animationEasing, isVisible]);

  // Card style variants
  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: '16px',
      padding: '2rem 1.5rem',
      minWidth: '180px',
      textAlign: 'center',
      margin: '0 1rem',
      flex: '1 1 180px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    };

    const variants = {
      default: {
        ...baseStyle,
        background: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      },
      gradient: {
        ...baseStyle,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
      },
      minimal: {
        ...baseStyle,
        background: 'transparent',
        border: '2px solid #e0e0e0',
        boxShadow: 'none',
      },
      elevated: {
        ...baseStyle,
        background: '#fff',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        transform: 'translateY(-4px)',
      },
    };

    return variants[cardStyle] || variants.default;
  };

  return (
    <div 
      id={`counter-${label.replace(/\s+/g, '-').toLowerCase()}`}
      style={getCardStyle()}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-8px)';
        e.target.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = cardStyle === 'elevated' ? 'translateY(-4px)' : 'translateY(0)';
        e.target.style.boxShadow = getCardStyle().boxShadow;
      }}
    >
      {/* Icon */}
      {showIcon && icon && (
        <div style={{ 
          marginBottom: '1rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
          transitionDelay: `${animationDelay}ms`
        }}>
          {iconType === 'image' ? (
            <img
              src={`/${icon}`}
              alt={label}
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <i 
              className={icon}
              style={{
                fontSize: '3rem',
                color: iconColor || '#272863'
              }}
            />
          )}
        </div>
      )}
      
      <div style={{
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        color: cardStyle === 'gradient' ? 'white' : '#272863', 
        marginBottom: '0.5rem',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
        transitionDelay: `${animationDelay + 200}ms`
      }}>
        {count.toLocaleString()}{suffix}
      </div>
      
      <div style={{
        fontSize: '1.1rem', 
        color: cardStyle === 'gradient' ? 'rgba(255,255,255,0.9)' : '#222', 
        fontWeight: '500',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease',
        transitionDelay: `${animationDelay + 400}ms`
      }}>
        {label}
      </div>
    </div>
  );
}

// Enhanced Counter Section with multiple layout options
export default function EnhancedCounterSection({ 
  layout = 'horizontal',
  cardStyle = 'default',
  animationDuration = 2000,
  animationStagger = 200,
  showIcons = true,
  backgroundColor = '#f3f6fa',
  maxCounters = null,
  title = null,
  subtitle = null
}) {
  const { data: counters, loading, error } = useCounters();

  if (loading) {
    return (
      <div style={{
        background: backgroundColor,
        padding: '3rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}>
        <div style={{ color: '#666', fontSize: '1.2rem' }}>Loading counters...</div>
      </div>
    );
  }

  if (error) {
    return null; // Gracefully hide on error
  }

  const displayCounters = maxCounters ? counters.slice(0, maxCounters) : counters;

  const getLayoutStyle = () => {
    const baseStyle = {
      background: backgroundColor,
      padding: '3rem 0',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)',
    };

    const layouts = {
      horizontal: {
        ...baseStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      grid: {
        ...baseStyle,
        display: 'flex',
        justifyContent: 'center',
      },
      vertical: {
        ...baseStyle,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    };

    return layouts[layout] || layouts.horizontal;
  };

  const getGridStyle = () => {
    if (layout !== 'grid') return {};
    
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
      gap: '2rem',
      maxWidth: '1200px',
      width: '100%',
      padding: '0 2rem',
    };
  };

  return (
    <div style={getLayoutStyle()}>
      <div style={getGridStyle()}>
        {/* Title and Subtitle */}
        {(title || subtitle) && (
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            gridColumn: layout === 'grid' ? '1 / -1' : 'auto',
          }}>
            {title && (
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '1rem'
              }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Counters */}
        {displayCounters.map((counter, index) => (
          <EnhancedCounterCard 
            key={counter.id}
            label={counter.label}
            end={counter.value}
            suffix={counter.suffix || ''}
            icon={counter.icon}
            iconType={counter.icon_type}
            iconColor={counter.icon_color}
            animationDuration={animationDuration}
            animationDelay={index * animationStagger}
            showIcon={showIcons}
            cardStyle={cardStyle}
          />
        ))}
      </div>
    </div>
  );
}
