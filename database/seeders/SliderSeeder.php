<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Slider;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sliders = [
            [
                'title' => 'Power Solutions',
                'description' => 'Reliable energy for your business.',
                'image_path' => 'Frontend/slider/slider1.jpg',
                'button_text' => 'Learn More',
                'button_link' => '#',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Innovative Products',
                'description' => 'Cutting-edge technology for every need.',
                'image_path' => 'Frontend/slider/slider2.jpg',
                'button_text' => 'Explore',
                'button_link' => '#',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Global Support',
                'description' => 'We are here for you, worldwide.',
                'image_path' => 'Frontend/slider/slider3.jpg',
                'button_text' => 'Contact Us',
                'button_link' => '#',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($sliders as $slider) {
            Slider::create($slider);
        }
    }
}
