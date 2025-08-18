<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all()->keyBy('name');

        $products = [
            [
                'name' => 'Generator 1',
                'short_description' => 'High performance generator',
                'description' => 'A high-performance generator suitable for residential and commercial use. Provides reliable power backup during outages.',
                'image_path' => 'Frontend/products/generator1.jpg',
                'price' => 1500.00,
                'sku' => 'GEN001',
                'stock_quantity' => 10,
                'category_id' => $categories['Generators']->id,
                'is_featured' => true,
            ],
            [
                'name' => 'Solar Panel 1',
                'short_description' => 'Efficient solar panel',
                'description' => 'High-efficiency solar panel with excellent power output. Perfect for residential solar installations.',
                'image_path' => 'Frontend/products/solar1.jpg',
                'price' => 300.00,
                'sku' => 'SOL001',
                'stock_quantity' => 25,
                'category_id' => $categories['Solar']->id,
                'is_featured' => true,
            ],
            [
                'name' => 'UPS 1',
                'short_description' => 'Reliable UPS backup',
                'description' => 'Uninterruptible Power Supply system for critical equipment protection. Ensures continuous power during outages.',
                'image_path' => 'Frontend/products/ups1.jpg',
                'price' => 800.00,
                'sku' => 'UPS001',
                'stock_quantity' => 15,
                'category_id' => $categories['UPS']->id,
            ],
            [
                'name' => 'Battery 1',
                'short_description' => 'Long-lasting battery',
                'description' => 'Deep cycle battery with extended lifespan. Ideal for solar systems and backup power applications.',
                'image_path' => 'Frontend/products/battery1.jpg',
                'price' => 200.00,
                'sku' => 'BAT001',
                'stock_quantity' => 30,
                'category_id' => $categories['Batteries']->id,
            ],
            [
                'name' => 'Inverter 1',
                'short_description' => 'Smart inverter',
                'description' => 'Advanced power inverter with smart monitoring capabilities. Converts DC to AC power efficiently.',
                'image_path' => 'Frontend/products/inverter1.jpg',
                'price' => 600.00,
                'sku' => 'INV001',
                'stock_quantity' => 20,
                'category_id' => $categories['Inverters']->id,
            ],
            [
                'name' => 'Generator 2',
                'short_description' => 'Fuel efficient model',
                'description' => 'Fuel-efficient generator with low emissions. Perfect for extended use and environmentally conscious users.',
                'image_path' => 'Frontend/products/generator2.jpg',
                'price' => 2000.00,
                'sku' => 'GEN002',
                'stock_quantity' => 8,
                'category_id' => $categories['Generators']->id,
            ],
            [
                'name' => 'Solar Panel 2',
                'short_description' => 'Premium solar panel',
                'description' => 'Premium grade solar panel with maximum efficiency rating. Built for commercial installations.',
                'image_path' => 'Frontend/products/solar2.jpg',
                'price' => 450.00,
                'sku' => 'SOL002',
                'stock_quantity' => 18,
                'category_id' => $categories['Solar']->id,
            ],
            [
                'name' => 'UPS 2',
                'short_description' => 'Compact UPS system',
                'description' => 'Compact UPS system designed for small offices and home use. Reliable protection for sensitive electronics.',
                'image_path' => 'Frontend/products/ups2.jpg',
                'price' => 400.00,
                'sku' => 'UPS002',
                'stock_quantity' => 22,
                'category_id' => $categories['UPS']->id,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
