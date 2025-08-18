import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CounterCard({ label, end, suffix, icon, iconType, iconColor }) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 4200; // Slower animation
        const increment = end / (duration / 50); // Increase interval for smoother, slower count
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 30);
        return () => clearInterval(timer);
    }, [end]);
    return (
        <div style={{
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            padding: '2rem 1.5rem',
            minWidth: '180px',
            textAlign: 'center',
            margin: '0 1rem',
            flex: '1 1 180px',
        }}>
            {/* Icon */}
            {icon && (
                <div style={{ marginBottom: '1rem' }}>
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

            <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#272863', marginBottom: '0.5rem'}}>
                {count}{suffix}
            </div>
            <div style={{fontSize: '1.1rem', color: '#222', fontWeight: '500'}}>{label}</div>
        </div>
    );
}

export default function CounterSection() {
    const [counters, setCounters] = useState([]);
    const [loading, setLoading] = useState(true);

    // Default fallback data
    const defaultCounters = [
        { id: 1, label: 'Products Sold / Month', value: 1200, suffix: '+', icon: 'fas fa-shopping-cart', icon_type: 'class', icon_color: '#272863', order: 1, is_active: true },
        { id: 2, label: 'Happy Seniors', value: 350, suffix: '+', icon: 'fas fa-smile', icon_type: 'class', icon_color: '#272863', order: 2, is_active: true },
        { id: 3, label: 'Years of Experience', value: 15, suffix: '', icon: 'fas fa-calendar-alt', icon_type: 'class', icon_color: '#272863', order: 3, is_active: true },
        { id: 4, label: 'Total Staffs', value: 80, suffix: '+', icon: 'fas fa-users', icon_type: 'class', icon_color: '#272863', order: 4, is_active: true }
    ];

    // Fetch counters from API
    useEffect(() => {
        const fetchCounters = async () => {
            try {
                console.log('Fetching counters from API...');
                const response = await axios.get('/api/counters/active');
                console.log('Counters API Response:', response.data);

                if (response.data && response.data.length > 0) {
                    setCounters(response.data);
                    console.log('✅ Successfully loaded counters:', response.data);
                } else {
                    console.log('⚠️ No counters found, using default data');
                    setCounters(defaultCounters);
                }
            } catch (error) {
                console.error('❌ Failed to fetch counters:', error);
                setCounters(defaultCounters);
            } finally {
                setLoading(false);
            }
        };

        fetchCounters();
    }, []);

    if (loading) {
        return (
            <div style={{
                background: '#f3f6fa',
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

    return (
        <div style={{
            background: '#f3f6fa',
            padding: '3rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
        }}>
            {counters.map((counter) => (
                <CounterCard
                    key={counter.id}
                    label={counter.label}
                    end={counter.value}
                    suffix={counter.suffix || ''}
                    icon={counter.icon}
                    iconType={counter.icon_type}
                    iconColor={counter.icon_color}
                />
            ))}
        </div>
    );
}
