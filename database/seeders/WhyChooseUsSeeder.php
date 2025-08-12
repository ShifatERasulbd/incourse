<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\WhyChooseUs;

class WhyChooseUsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            [
                'title' => 'Expert Team',
                'description' => 'Our experienced professionals provide top-quality service and support for all your power needs.',
                'icon' => 'fas fa-users',
                'icon_type' => 'class',
                'icon_color' => '#c41c13',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => '24/7 Support',
                'description' => 'Round-the-clock customer support ensures your power systems are always running smoothly.',
                'icon' => 'fas fa-clock',
                'icon_type' => 'class',
                'icon_color' => '#c41c13',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Quality Products',
                'description' => 'We offer only the highest quality power solutions from trusted manufacturers worldwide.',
                'icon' => 'fas fa-award',
                'icon_type' => 'class',
                'icon_color' => '#c41c13',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Competitive Pricing',
                'description' => 'Get the best value for your investment with our competitive pricing and flexible payment options.',
                'icon' => 'fas fa-dollar-sign',
                'icon_type' => 'class',
                'icon_color' => '#c41c13',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Fast Delivery',
                'description' => 'Quick and reliable delivery ensures you get your power solutions when you need them most.',
                'icon' => 'fas fa-shipping-fast',
                'icon_type' => 'class',
                'icon_color' => '#c41c13',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Warranty Coverage',
                'description' => 'Comprehensive warranty coverage gives you peace of mind with every purchase.',
                'icon' => 'fas fa-shield-alt',
                'icon_type' => 'class',
                'icon_color' => '#c41c13',
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            WhyChooseUs::create($item);
        }
    }
}
