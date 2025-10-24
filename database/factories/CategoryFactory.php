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
        $logoPath = match ($slug) {
            'speakers'     => 'category_images/speakers2.webp',
            'amplifiers'   => 'category_images/Amplifier.jpg',
            'subwoofers'   => 'category_images/subwoofer.webp',
            'accessories'  => 'category_images/Audio accessories.webp',
            'car-audio'    => 'category_images/Car video.webp',
            default        => 'category_images/default.jpg',
        };
        $trueDescription = match ($slug) {
        'speakers'    => 'High-quality speakers that deliver crystal-clear audio for every setup.',
        'amplifiers'  => 'Powerful amplifiers built for precision and performance.',
        'subwoofers'  => 'Deep, rich bass from professional-grade subwoofers.',
        'accessories' => 'Essential audio accessories to complete your setup.',
        'car-audio'   => 'Premium car audio systems for immersive sound on the road.',
        default       => $this->faker->sentence(),
    };
        $index++;

        return [
            'id' => 'CAT-' . $index,
            'name' => $name,
            'slug' => $slug,
            'logo'=> $logoPath,
            'description' => $trueDescription,
            'status' => 'active',
        ];
    }
}
