<?php
namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $name = $this->faker->words(3, true),
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'category' => $this->faker->randomElement(['speakers', 'amplifiers', 'subwoofers', 'accessories', 'car-audio']),
            'short_description' => $this->faker->sentence(10),
            'description' => $this->faker->paragraph(4),
            'price' => $this->faker->optional()->randomFloat(2, 50, 2000),
            'images' => ["/placeholder.svg?height=600&width=600"],
            'specs' => [
                ['name' => 'Power', 'value' => '100W'],
                ['name' => 'Dimensions', 'value' => '10x10x10'],
            ],
            'features' => $this->faker->optional()->sentences(3),
            'demo_video' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'is_new' => $this->faker->boolean(30),
        ];
    }
}
