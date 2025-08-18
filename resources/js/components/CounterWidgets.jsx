import React, { useEffect, useState } from 'react';
import { useCounters } from '../hooks/useFrontendData';

// Compact Counter Widget
export function CompactCounterWidget({ counterId, showIcon = true, size = 'medium' }) {
  const { data: counters } = useCounters();
  const counter = counters.find(c => c.id === counterId) || counters[0];
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!counter) return;
    
    let start = 0;
    const end = counter.value;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [counter]);

  if (!counter) return null;

  const sizes = {
    small: { fontSize: '1.5rem', iconSize: '1.5rem', padding: '1rem' },
    medium: { fontSize: '2rem', iconSize: '2rem', padding: '1.5rem' },
    large: { fontSize: '2.5rem', iconSize: '2.5rem', padding: '2rem' },
  };

  const currentSize = sizes[size] || sizes.medium;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: 'white',
      borderRadius: '12px',
      padding: currentSize.padding,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      minWidth: '150px',
    }}>
      {showIcon && counter.icon && (
        <div style={{ marginRight: '1rem' }}>
          {counter.icon_type === 'image' ? (
            <img
              src={`/${counter.icon}`}
              alt={counter.label}
              style={{
                width: currentSize.iconSize,
                height: currentSize.iconSize,
                objectFit: 'contain'
              }}
            />
          ) : (
            <i 
              className={counter.icon}
              style={{
                fontSize: currentSize.iconSize,
                color: counter.icon_color || '#272863'
              }}
            />
          )}
        </div>
      )}
      <div>
        <div style={{
          fontSize: currentSize.fontSize,
          fontWeight: 'bold',
          color: '#272863',
          lineHeight: 1,
        }}>
          {count.toLocaleString()}{counter.suffix}
        </div>
        <div style={{
          fontSize: '0.9rem',
          color: '#666',
          marginTop: '0.25rem',
        }}>
          {counter.label}
        </div>
      </div>
    </div>
  );
}

// Circular Counter Widget
export function CircularCounterWidget({ counterId, size = 100, strokeWidth = 8 }) {
  const { data: counters } = useCounters();
  const counter = counters.find(c => c.id === counterId) || counters[0];
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!counter) return;
    
    let start = 0;
    const end = counter.value;
    const maxValue = Math.max(end, 100); // For progress calculation
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        setProgress((end / maxValue) * 100);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
        setProgress((start / maxValue) * 100);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [counter]);

  if (!counter) return null;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    }}>
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={counter.icon_color || '#272863'}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.3s ease',
            }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          {counter.icon && (
            <i 
              className={counter.icon}
              style={{
                fontSize: '1.5rem',
                color: counter.icon_color || '#272863',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            />
          )}
          <div style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            color: '#272863',
          }}>
            {count.toLocaleString()}{counter.suffix}
          </div>
        </div>
      </div>
      <div style={{
        fontSize: '0.9rem',
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
      }}>
        {counter.label}
      </div>
    </div>
  );
}

// Minimal Counter Widget
export function MinimalCounterWidget({ counterId, alignment = 'center' }) {
  const { data: counters } = useCounters();
  const counter = counters.find(c => c.id === counterId) || counters[0];
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!counter) return;
    
    let start = 0;
    const end = counter.value;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [counter]);

  if (!counter) return null;

  return (
    <div style={{
      textAlign: alignment,
      padding: '1rem',
    }}>
      <div style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        color: counter.icon_color || '#272863',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        {count.toLocaleString()}{counter.suffix}
      </div>
      <div style={{
        fontSize: '1rem',
        color: '#666',
        fontWeight: '500',
      }}>
        {counter.label}
      </div>
    </div>
  );
}

// Card Counter Widget
export function CardCounterWidget({ counterId, variant = 'default' }) {
  const { data: counters } = useCounters();
  const counter = counters.find(c => c.id === counterId) || counters[0];
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!counter) return;
    
    let start = 0;
    const end = counter.value;
    const duration = 1800;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [counter]);

  if (!counter) return null;

  const variants = {
    default: {
      background: 'white',
      color: '#333',
      border: '1px solid #e0e0e0',
    },
    primary: {
      background: counter.icon_color || '#272863',
      color: 'white',
      border: 'none',
    },
    gradient: {
      background: `linear-gradient(135deg, ${counter.icon_color || '#272863'}, ${counter.icon_color || '#272863'}99)`,
      color: 'white',
      border: 'none',
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <div style={{
      ...currentVariant,
      borderRadius: '12px',
      padding: '2rem',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-4px)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
    }}
    >
      {counter.icon && (
        <div style={{ marginBottom: '1rem' }}>
          {counter.icon_type === 'image' ? (
            <img
              src={`/${counter.icon}`}
              alt={counter.label}
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain',
                filter: variant !== 'default' ? 'brightness(0) invert(1)' : 'none',
              }}
            />
          ) : (
            <i 
              className={counter.icon}
              style={{
                fontSize: '3rem',
                color: variant === 'default' ? (counter.icon_color || '#272863') : 'currentColor',
              }}
            />
          )}
        </div>
      )}
      <div style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        lineHeight: 1,
      }}>
        {count.toLocaleString()}{counter.suffix}
      </div>
      <div style={{
        fontSize: '1.1rem',
        opacity: variant === 'default' ? 0.7 : 0.9,
        fontWeight: '500',
      }}>
        {counter.label}
      </div>
    </div>
  );
}

// Counter Grid Widget
export function CounterGridWidget({ 
  counterIds = [], 
  columns = 2, 
  gap = '1rem',
  variant = 'compact' 
}) {
  const { data: counters } = useCounters();
  const displayCounters = counterIds.length > 0 
    ? counterIds.map(id => counters.find(c => c.id === id)).filter(Boolean)
    : counters.slice(0, 4);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: gap,
      width: '100%',
    }}>
      {displayCounters.map((counter) => {
        switch (variant) {
          case 'compact':
            return <CompactCounterWidget key={counter.id} counterId={counter.id} />;
          case 'circular':
            return <CircularCounterWidget key={counter.id} counterId={counter.id} />;
          case 'minimal':
            return <MinimalCounterWidget key={counter.id} counterId={counter.id} />;
          case 'card':
            return <CardCounterWidget key={counter.id} counterId={counter.id} />;
          default:
            return <CompactCounterWidget key={counter.id} counterId={counter.id} />;
        }
      })}
    </div>
  );
}
