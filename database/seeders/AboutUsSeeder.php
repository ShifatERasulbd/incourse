<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AboutUs;

class AboutUsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AboutUs::create([
            'section_title' => 'About Us',
            'main_text' => 'Incourses is dedicated to providing innovative power solutions and global support for businesses of all sizes. Our mission is to deliver reliable energy and cutting-edge technology, ensuring our clients thrive in a rapidly changing world.',
            'banner_image_path' => 'Frontend/about/banner.jpg',
            'main_image_path' => 'Frontend/about/main.jpg',
            'show_banner' => true,
            'is_active' => true,
        ]);
    }
}
