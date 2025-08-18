<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General Settings
            [
                'key' => 'site_name',
                'value' => 'InCourse',
                'type' => 'text',
                'group' => 'general',
                'label' => 'Site Name',
                'description' => 'The name of your website',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'key' => 'site_description',
                'value' => 'Professional Training & Development Platform',
                'type' => 'textarea',
                'group' => 'general',
                'label' => 'Site Description',
                'description' => 'A brief description of your website',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'site_logo',
                'value' => 'Frontend/logo.png',
                'type' => 'image',
                'group' => 'general',
                'label' => 'Site Logo',
                'description' => 'Upload your site logo',
                'sort_order' => 3,
                'is_active' => true
            ],
            [
                'key' => 'maintenance_mode',
                'value' => 'false',
                'type' => 'boolean',
                'group' => 'general',
                'label' => 'Maintenance Mode',
                'description' => 'Enable maintenance mode to show a maintenance page',
                'sort_order' => 4,
                'is_active' => true
            ],

            // Contact Settings
            [
                'key' => 'contact_email',
                'value' => 'support@incourses.com',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Contact Email',
                'description' => 'Primary contact email address',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'key' => 'contact_phone',
                'value' => '+880 1234 567890',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Contact Phone',
                'description' => 'Primary contact phone number',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'contact_address',
                'value' => '123 Power St, Energy City, Country',
                'type' => 'textarea',
                'group' => 'contact',
                'label' => 'Contact Address',
                'description' => 'Physical address of your business',
                'sort_order' => 3,
                'is_active' => true
            ],

            // Social Media Settings
            [
                'key' => 'facebook_url',
                'value' => 'https://facebook.com/incourses',
                'type' => 'text',
                'group' => 'social',
                'label' => 'Facebook URL',
                'description' => 'Your Facebook page URL',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'key' => 'twitter_url',
                'value' => 'https://twitter.com/incourses',
                'type' => 'text',
                'group' => 'social',
                'label' => 'Twitter URL',
                'description' => 'Your Twitter profile URL',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'linkedin_url',
                'value' => 'https://linkedin.com/company/incourses',
                'type' => 'text',
                'group' => 'social',
                'label' => 'LinkedIn URL',
                'description' => 'Your LinkedIn company page URL',
                'sort_order' => 3,
                'is_active' => true
            ],
            [
                'key' => 'instagram_url',
                'value' => 'https://instagram.com/incourses',
                'type' => 'text',
                'group' => 'social',
                'label' => 'Instagram URL',
                'description' => 'Your Instagram profile URL',
                'sort_order' => 4,
                'is_active' => true
            ],

            // SEO Settings
            [
                'key' => 'meta_title',
                'value' => 'InCourse - Professional Training & Development',
                'type' => 'text',
                'group' => 'seo',
                'label' => 'Meta Title',
                'description' => 'Default meta title for SEO',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'key' => 'meta_description',
                'value' => 'Professional training and development platform offering comprehensive courses and certifications.',
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'Meta Description',
                'description' => 'Default meta description for SEO',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'meta_keywords',
                'value' => 'training, courses, education, certification, professional development',
                'type' => 'text',
                'group' => 'seo',
                'label' => 'Meta Keywords',
                'description' => 'Default meta keywords for SEO',
                'sort_order' => 3,
                'is_active' => true
            ],

            // Email Settings
            [
                'key' => 'smtp_host',
                'value' => 'smtp.gmail.com',
                'type' => 'text',
                'group' => 'email',
                'label' => 'SMTP Host',
                'description' => 'SMTP server hostname',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'key' => 'smtp_port',
                'value' => '587',
                'type' => 'number',
                'group' => 'email',
                'label' => 'SMTP Port',
                'description' => 'SMTP server port',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'smtp_encryption',
                'value' => 'tls',
                'type' => 'text',
                'group' => 'email',
                'label' => 'SMTP Encryption',
                'description' => 'SMTP encryption type (tls/ssl)',
                'sort_order' => 3,
                'is_active' => true
            ]
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
