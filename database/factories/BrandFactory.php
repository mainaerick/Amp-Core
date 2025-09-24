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
        $name = $this->faker->company;
        return [
            'id' => 'BRAND-' . $this->faker->unique()->numberBetween(1000, 9999),
            'name' => $name,
            'slug' => Str::slug($name),
            'logo' => null,
            'description' => $this->faker->sentence,
            'status' => 'active',
        ];
    }
}
