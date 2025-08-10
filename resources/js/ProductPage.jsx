
import React, { useState } from 'react';

const products = [
	{ image: '/Frontend/slider/slider1.jpg', name: 'Power Generator', desc: 'High-efficiency generator for industrial use.', category: 'Generators' },
	{ image: '/Frontend/slider/slider2.jpg', name: 'Solar Panel', desc: 'Eco-friendly solar panel for homes and businesses.', category: 'Solar' },
	{ image: '/Frontend/slider/slider3.jpg', name: 'UPS System', desc: 'Reliable UPS for uninterrupted power supply.', category: 'UPS' },
	{ image: '/Frontend/slider/slider1.jpg', name: 'Battery Pack', desc: 'Long-lasting battery pack for backup.', category: 'Batteries' },
	{ image: '/Frontend/slider/slider2.jpg', name: 'Smart Inverter', desc: 'Efficient inverter for smart energy management.', category: 'Inverters' },
];

const categories = ['Generators', 'Solar', 'UPS', 'Batteries', 'Inverters'];

export default function ProductPage() {
	const [selectedCategory, setSelectedCategory] = useState('All');
	const filteredProducts = selectedCategory === 'All'
		? products
		: products.filter(p => p.category === selectedCategory);

	return (
		<div style={{
			background: '#f8fafc',
			minHeight: '80vh',
			width: '100vw',
			marginLeft: 'calc(-50vw + 50%)',
			padding: '3rem 0',
		}}>
			<style>{`
				.product-grid {
					display: grid;
					grid-template-columns: 220px 1fr;
					gap: 2rem;
					max-width: 1200px;
					margin: 0 auto;
				}
				.product-sidebar {
					background: #fff;
					border-radius: 16px;
					box-shadow: 0 2px 12px rgba(0,0,0,0.07);
					padding: 2rem 1.5rem;
					min-width: 180px;
					height: fit-content;
				}
				.product-cards {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
					gap: 2rem;
				}
				.product-card {
					background: #fff;
					border-radius: 18px;
					box-shadow: 0 2px 12px rgba(0,0,0,0.08);
					text-align: center;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 1rem;
				}
				.product-card img {
					width: 100%;
					height: 140px;
					object-fit: cover;
					border-radius: 10px;
					margin-bottom: 0.5rem;
					background: #eee;
				}
				.product-card h3 {
					font-size: 1.1rem;
					color: #272863;
					margin: 0.5rem 0;
				}
				.product-card p {
					font-size: 0.95rem;
					color: #444;
					margin: 0;
				}
				@media (max-width: 900px) {
					.product-grid {
						grid-template-columns: 1fr;
					}
					.product-sidebar {
						margin-bottom: 2rem;
						min-width: 0;
					}
				}
				@media (max-width: 600px) {
					.product-cards {
						grid-template-columns: 1fr 1fr;
						gap: 1rem;
					}
					.product-sidebar {
						padding: 1rem;
					}
				}
			`}</style>
			<h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#272863', marginBottom: '2rem', textAlign: 'center' }}>
				Our Products
			</h2>
			<div className="product-grid">
				<aside className="product-sidebar">
					<h4 style={{ fontSize: '1.1rem', color: '#272863', marginBottom: '1rem' }}>Filter by Category</h4>
					<div>
						<label style={{ display: 'block', marginBottom: '0.7rem', color: '#444', fontWeight: 500 }}>
							<input
								type="radio"
								name="category"
								value="All"
								checked={selectedCategory === 'All'}
								onChange={() => setSelectedCategory('All')}
								style={{ marginRight: '0.5rem' }}
							/>
							All
						</label>
						{categories.map(cat => (
							<label key={cat} style={{ display: 'block', marginBottom: '0.7rem', color: '#444', fontWeight: 500 }}>
								<input
									type="radio"
									name="category"
									value={cat}
									checked={selectedCategory === cat}
									onChange={() => setSelectedCategory(cat)}
									style={{ marginRight: '0.5rem' }}
								/>
								{cat}
							</label>
						))}
					</div>
				</aside>
				<section className="product-cards">
					{filteredProducts.map((product, idx) => (
						<div key={idx} className="product-card">
							<img src={product.image} alt={product.name} />
							<h3>{product.name}</h3>
							<p>{product.desc}</p>
						</div>
					))}
				</section>
			</div>
		</div>
	);
}
