import React, { useEffect, useState } from 'react';

function CounterCard({ label, end, suffix }) {
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
            <div style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#272863', marginBottom: '0.5rem'}}>
                {count}{suffix}
            </div>
            <div style={{fontSize: '1.1rem', color: '#222', fontWeight: '500'}}>{label}</div>
        </div>
    );
}

export default function CounterSection() {
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
            <CounterCard label="Products Sold / Month" end={1200} suffix="+" />
            <CounterCard label="Happy Seniors" end={350} suffix="+" />
            <CounterCard label="Years of Experience" end={15} suffix="" />
            <CounterCard label="Total Staffs" end={80} suffix="+" />
        </div>
    );
}
