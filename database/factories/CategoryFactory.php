<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $slugs = ['speakers', 'amplifiers', 'subwoofers', 'accessories', 'car-audio'];
        static $index = 0;

        $slug = $slugs[$index % count($slugs)];
        $name = ucfirst(str_replace('-', ' ', $slug));

        $index++;

        return [
            'id' => 'CAT-' . $index,
            'name' => $name,
            'slug' => $slug,
            'description' => $this->faker->sentence(),
            'status' => 'active',
        ];
    }
}
