import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import frontendService from './services/frontendService';
import ReactMarkdown from 'react-markdown';

// Default fallback blogs
const defaultBlogs = [
    {
        title: 'How to Choose the Right Power Solution',
        image_path: 'Frontend/slider/slider1.jpg',
        published_date: '2025-08-01',
        excerpt: 'Learn how to select the best power solution for your business needs, including generators, UPS, and solar panels.'
    },
    {
        title: 'Benefits of Solar Energy for Businesses',
        image_path: 'Frontend/slider/slider2.jpg',
        published_date: '2025-07-20',
        excerpt: 'Discover how solar energy can reduce costs and improve sustainability for companies of all sizes.'
    },
    {
        title: 'Maintaining Your UPS System',
        image_path: 'Frontend/slider/slider3.jpg',
        published_date: '2025-07-10',
        excerpt: 'Tips and tricks for keeping your UPS system running smoothly and avoiding downtime.'
    },
    {
        title: 'Energy Efficiency Tips for Factories',
        image_path: 'Frontend/slider/slider1.jpg',
        published_date: '2025-06-30',
        excerpt: 'Boost efficiency in your factory with these easy-to-implement energy-saving methods.'
    },
    {
        title: 'How to Extend Generator Life',
        image_path: 'Frontend/slider/slider2.jpg',
        published_date: '2025-06-15',
        excerpt: 'Proper care can help your generator last years longer without costly repairs.'
    },
    {
        title: 'Why UPS Maintenance is Critical',
        image_path: 'Frontend/slider/slider3.jpg',
        published_date: '2025-05-20',
        excerpt: 'Avoid unexpected downtime by keeping your UPS in top shape.'
    },
    {
        title: 'The Future of Renewable Energy',
        image_path: 'Frontend/slider/slider1.jpg',
        published_date: '2025-05-05',
        excerpt: 'Explore upcoming trends in renewable power solutions.'
    },
    {
        title: 'Choosing the Right Solar Panel',
        image_path: 'Frontend/slider/slider2.jpg',
        published_date: '2025-04-25',
        excerpt: 'A quick guide to finding the best solar panel for your needs.'
    }
];

export default function BlogSection() {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState(defaultBlogs);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const result = await frontendService.getBlogs({ limit: 8 });
                if (result.success && result.data && result.data.length > 0) {
                    setBlogs(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                // Keep default blogs
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleReadMore = (blog) => {
        navigate(`/blog/${blog.id}`);
    };
    return (
        <div style={{
            background: '#f8fafc',
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '4rem',  // added padding before footer
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
                gap: '1rem',
                width: '100%',
                maxWidth: '1200px'
            }}>
                {blogs.map((blog, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleReadMore(blog)}
                        style={{
                            background: '#fff',
                            borderRadius: '18px',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-4px)';
                            e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                        }}
                    >
                        <img
                            src={blog.image_path ?
                                `/${blog.image_path}` :
                                "/Frontend/slider/slider1.jpg"
                            }
                            alt={blog.title}
                            style={{
                                width: '100%',
                                height: '160px',
                                objectFit: 'cover',
                                display: 'block',
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
                                {blog.published_date}
                            </div>
                            <div
                                style={{
                                    fontSize: '1rem',
                                    color: '#444',
                                    margin: 0,
                                    marginBottom: '1rem'
                                }}
                            >
                                <ReactMarkdown>{blog.excerpt}</ReactMarkdown>
                            </div>
                            <button
                                onClick={() => handleReadMore(blog)}
                                style={{
                                    backgroundColor: '#c41c13',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'background-color 0.3s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#a01610'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#c41c13'}
                            >
                                Read Full Article →
                            </button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
}
