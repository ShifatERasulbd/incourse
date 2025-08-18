<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
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
                'value' => 'A comprehensive learning management system',
                'type' => 'textarea',
                'group' => 'general',
                'label' => 'Site Description',
                'description' => 'A brief description of your website',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'site_logo',
                'value' => 'images/logo.png',
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
                'value' => 'info@incourse.com',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Contact Email',
                'description' => 'Primary contact email address',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'key' => 'contact_phone',
                'value' => '+1 (555) 123-4567',
                'type' => 'text',
                'group' => 'contact',
                'label' => 'Contact Phone',
                'description' => 'Primary contact phone number',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'contact_address',
                'value' => '123 Education Street, Learning City, LC 12345',
                'type' => 'textarea',
                'group' => 'contact',
                'label' => 'Contact Address',
                'description' => 'Physical address of your organization',
                'sort_order' => 3,
                'is_active' => true
            ],

            // Social Media Settings
            [
                'key' => 'facebook_url',
                'value' => 'https://facebook.com/incourse',
                'type' => 'text',
                'group' => 'social',
                'label' => 'Facebook URL',
                'description' => 'Your Facebook page URL',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'key' => 'twitter_url',
                'value' => 'https://twitter.com/incourse',
                'type' => 'text',
                'group' => 'social',
                'label' => 'Twitter URL',
                'description' => 'Your Twitter profile URL',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'linkedin_url',
                'value' => 'https://linkedin.com/company/incourse',
                'type' => 'text',
                'group' => 'social',
                'label' => 'LinkedIn URL',
                'description' => 'Your LinkedIn company page URL',
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
                'description' => 'SMTP server port number',
                'sort_order' => 2,
                'is_active' => true
            ],
            [
                'key' => 'smtp_encryption',
                'value' => 'tls',
                'type' => 'text',
                'group' => 'email',
                'label' => 'SMTP Encryption',
                'description' => 'SMTP encryption method (tls/ssl)',
                'sort_order' => 3,
                'is_active' => true
            ],

            // SEO Settings
            [
                'key' => 'meta_keywords',
                'value' => 'education, learning, courses, online learning',
                'type' => 'textarea',
                'group' => 'seo',
                'label' => 'Meta Keywords',
                'description' => 'Default meta keywords for SEO',
                'sort_order' => 1,
                'is_active' => true
            ],
            [
                'key' => 'google_analytics_id',
                'value' => 'GA-XXXXXXXXX-X',
                'type' => 'text',
                'group' => 'seo',
                'label' => 'Google Analytics ID',
                'description' => 'Your Google Analytics tracking ID',
                'sort_order' => 2,
                'is_active' => true
            ],

            // API Settings
            [
                'key' => 'api_settings',
                'value' => '{"rate_limit": 1000, "timeout": 30}',
                'type' => 'json',
                'group' => 'api',
                'label' => 'API Configuration',
                'description' => 'JSON configuration for API settings',
                'sort_order' => 1,
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
