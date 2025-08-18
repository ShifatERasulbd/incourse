<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Generators', 'description' => 'Power generators for all needs', 'order' => 1],
            ['name' => 'Solar', 'description' => 'Solar panels and solar energy solutions', 'order' => 2],
            ['name' => 'UPS', 'description' => 'Uninterruptible Power Supply systems', 'order' => 3],
            ['name' => 'Batteries', 'description' => 'High-quality batteries for various applications', 'order' => 4],
            ['name' => 'Inverters', 'description' => 'Power inverters and conversion equipment', 'order' => 5],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
