<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Counter;

class CounterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $counters = [
            [
                'label' => 'Products Sold / Month',
                'value' => 1200,
                'suffix' => '+',
                'icon' => 'fas fa-shopping-cart',
                'icon_type' => 'class',
                'icon_color' => '#272863',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'label' => 'Happy Seniors',
                'value' => 350,
                'suffix' => '+',
                'icon' => 'fas fa-smile',
                'icon_type' => 'class',
                'icon_color' => '#272863',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'label' => 'Years of Experience',
                'value' => 15,
                'suffix' => '',
                'icon' => 'fas fa-calendar-alt',
                'icon_type' => 'class',
                'icon_color' => '#272863',
                'order' => 3,
                'is_active' => true,
            ],
            [
                'label' => 'Total Staffs',
                'value' => 80,
                'suffix' => '+',
                'icon' => 'fas fa-users',
                'icon_type' => 'class',
                'icon_color' => '#272863',
                'order' => 4,
                'is_active' => true,
            ],
            [
                'label' => 'Projects Completed',
                'value' => 850,
                'suffix' => '+',
                'icon' => 'fas fa-project-diagram',
                'icon_type' => 'class',
                'icon_color' => '#272863',
                'order' => 5,
                'is_active' => true,
            ],
            [
                'label' => 'Awards Won',
                'value' => 25,
                'suffix' => '+',
                'icon' => 'fas fa-trophy',
                'icon_type' => 'class',
                'icon_color' => '#272863',
                'order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($counters as $counter) {
            Counter::create($counter);
        }
    }
}
