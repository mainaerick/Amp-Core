<?php
namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'slug' => $this->faker->unique()->slug,
            'category_id' => Category::inRandomOrder()->first()->id,
            'short_description' => $this->faker->sentence,
            'description' => $this->faker->paragraph(4),
            'price' => $this->faker->randomFloat(2, 100, 1000),
            'images' => json_encode([
                '/placeholder.svg?height=600&width=600',
                '/placeholder.svg?height=600&width=600',
            ]),
            'specs' => json_encode([
                ['name' => 'Power', 'value' => '500W'],
                ['name' => 'Frequency Response', 'value' => '45Hz - 20kHz'],
            ]),
            'features' => json_encode([
                'High output', 'Low distortion'
            ]),
            'demo_video' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            'is_new' => $this->faker->boolean(40),
        ];
    }
}
