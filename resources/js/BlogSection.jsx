import React from 'react';

const blogs = [
    {
        title: 'How to Choose the Right Power Solution',
        image: '/Frontend/slider/slider1.jpg',
        date: '2025-08-01',
        excerpt: 'Learn how to select the best power solution for your business needs, including generators, UPS, and solar panels.'
    },
    {
        title: 'Benefits of Solar Energy for Businesses',
        image: '/Frontend/slider/slider2.jpg',
        date: '2025-07-20',
        excerpt: 'Discover how solar energy can reduce costs and improve sustainability for companies of all sizes.'
    },
    {
        title: 'Maintaining Your UPS System',
        image: '/Frontend/slider/slider3.jpg',
        date: '2025-07-10',
        excerpt: 'Tips and tricks for keeping your UPS system running smoothly and avoiding downtime.'
    },
    {
        title: 'Energy Efficiency Tips for Factories',
        image: '/Frontend/slider/slider1.jpg',
        date: '2025-06-30',
        excerpt: 'Boost efficiency in your factory with these easy-to-implement energy-saving methods.'
    },
    {
        title: 'How to Extend Generator Life',
        image: '/Frontend/slider/slider2.jpg',
        date: '2025-06-15',
        excerpt: 'Proper care can help your generator last years longer without costly repairs.'
    },
    {
        title: 'Why UPS Maintenance is Critical',
        image: '/Frontend/slider/slider3.jpg',
        date: '2025-05-20',
        excerpt: 'Avoid unexpected downtime by keeping your UPS in top shape.'
    },
    {
        title: 'The Future of Renewable Energy',
        image: '/Frontend/slider/slider1.jpg',
        date: '2025-05-05',
        excerpt: 'Explore upcoming trends in renewable power solutions.'
    },
    {
        title: 'Choosing the Right Solar Panel',
        image: '/Frontend/slider/slider2.jpg',
        date: '2025-04-25',
        excerpt: 'A quick guide to finding the best solar panel for your needs.'
    }
];

export default function BlogSection() {
    return (
        <div style={{
            background: '#f8fafc',
            
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#272863',
                marginBottom: '2rem'
            }}>
                Latest Blog Posts
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem', // reduced gap
                width: '100%',
                maxWidth: '1200px'
            }}>
                {blogs.map((blog, idx) => (
                    <div key={idx} style={{
                        background: '#fff',
                        borderRadius: '18px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        overflow: 'hidden', // so image aligns with card edges
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <img
                            src={blog.image}
                            alt={blog.title}
                            style={{
                                width: '100%',
                                height: '160px',
                                objectFit: 'cover',
                                display: 'block', // no extra space
                                background: '#eee'
                            }}
                        />
                        <div style={{
                            padding: '1rem'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                color: '#272863',
                                margin: '0.5rem 0'
                            }}>
                                {blog.title}
                            </h3>
                            <div style={{
                                fontSize: '0.95rem',
                                color: '#888',
                                marginBottom: '0.5rem'
                            }}>
                                {blog.date}
                            </div>
                            <p style={{
                                fontSize: '1rem',
                                color: '#444',
                                margin: 0
                            }}>
                                {blog.excerpt}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
