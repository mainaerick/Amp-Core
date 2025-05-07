<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dealer>
 */
class DealerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'custom_id' => 'DEALER-' . $this->faker->unique()->numberBetween(1002, 9999),
            'name' => $this->faker->company,
            'location' => $this->faker->city . ', ' . $this->faker->stateAbbr,
            'region' => $this->faker->randomElement(['East', 'West', 'North', 'South']),
            'phone' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->companyEmail,
            'website' => $this->faker->url,
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
