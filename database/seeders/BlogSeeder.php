<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Blog;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'How to Choose the Right Power Solution',
                'excerpt' => 'Learn how to select the best power solution for your business needs, including generators, UPS, and solar panels.',
                'content' => 'Choosing the right power solution for your business is crucial for maintaining operations and ensuring productivity. This comprehensive guide will walk you through the key factors to consider when selecting between generators, UPS systems, and solar panels. We\'ll cover power requirements, budget considerations, environmental factors, and long-term maintenance needs.',
                'image_path' => 'Frontend/slider/slider1.jpg',
                'published_date' => '2025-08-01',
                'author' => 'Admin',
                'is_featured' => true,
                'is_published' => true,
            ],
            [
                'title' => 'Benefits of Solar Energy for Businesses',
                'excerpt' => 'Discover how solar energy can reduce costs and improve sustainability for companies of all sizes.',
                'content' => 'Solar energy offers numerous benefits for businesses looking to reduce operational costs and improve their environmental footprint. From significant cost savings on electricity bills to tax incentives and improved brand reputation, solar power is becoming an increasingly attractive option for companies of all sizes.',
                'image_path' => 'Frontend/slider/slider2.jpg',
                'published_date' => '2025-07-20',
                'author' => 'Admin',
                'is_featured' => true,
                'is_published' => true,
            ],
            [
                'title' => 'Maintaining Your UPS System',
                'excerpt' => 'Tips and tricks for keeping your UPS system running smoothly and avoiding downtime.',
                'content' => 'Proper maintenance of your UPS system is essential for ensuring reliable power protection. Regular battery testing, cleaning, and monitoring can extend the life of your UPS and prevent costly downtime. This guide covers essential maintenance tasks and schedules.',
                'image_path' => 'Frontend/slider/slider3.jpg',
                'published_date' => '2025-07-10',
                'author' => 'Admin',
                'is_published' => true,
            ],
            [
                'title' => 'Energy Efficiency Tips for Factories',
                'excerpt' => 'Boost efficiency in your factory with these easy-to-implement energy-saving methods.',
                'content' => 'Manufacturing facilities consume significant amounts of energy, but there are many ways to improve efficiency without compromising productivity. From equipment upgrades to operational changes, these tips can help reduce energy costs and environmental impact.',
                'image_path' => 'Frontend/slider/slider1.jpg',
                'published_date' => '2025-06-30',
                'author' => 'Admin',
                'is_published' => true,
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::create($blog);
        }
    }
}
