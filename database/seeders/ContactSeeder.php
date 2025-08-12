<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Contact;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Contact::create([
            'title' => 'Get in Touch',
            'description' => 'Feel free to reach out with any questions or requests. We\'re here to help!',
            'address' => '123 Power St, Energy City, Country',
            'phone' => '+880 1234 567890',
            'email' => 'support@incourses.com',
            'working_hours' => 'Mon - Fri, 9am - 6pm',
            'banner_image' => 'Frontend/slider/slider2.jpg',
            'map_url' => 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3651.0977!2d90.4125!3d23.8103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzM3LjEiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890',
            'facebook_url' => 'https://facebook.com/incourses',
            'twitter_url' => 'https://twitter.com/incourses',
            'linkedin_url' => 'https://linkedin.com/company/incourses',
            'instagram_url' => 'https://instagram.com/incourses',
            'is_active' => true,
        ]);
    }
}
