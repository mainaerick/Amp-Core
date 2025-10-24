<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Brand>
 */
class BrandFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $brands = [
            [
                'name' => 'Pioneer',
                'logo' => 'brand_images/Pioneer-Logo.jpg',
                'description' => 'Renowned for innovation and superior sound quality in audio systems.',
            ],
            [
                'name' => 'JBL',
                'logo' => 'brand_images/JBL-Logo.png',
                'description' => 'Delivers bold, vibrant sound with iconic designs for all environments.',
            ],
            [
                'name' => 'Kenwood',
                'logo' => 'brand_images/Kenwood.png',
                'description' => 'Known for precision engineering and high-performance car audio products.',
            ],
            [
                'name' => 'Rockford',
                'logo' => 'brand_images/Rockford.png',
                'description' => 'Powerful audio solutions built for deep bass and unmatched clarity.',
            ],
        ];

        static $index = 0;
        $brand = $brands[$index % count($brands)];
        $index++;

        return [
            'id' => 'BRAND-' . $index,
            'name' => $brand['name'],
            'slug' => Str::slug($brand['name']),
            'logo' => $brand['logo'],
            'description' => $brand['description'],
            'status' => 'active',
        ];
    }
}
