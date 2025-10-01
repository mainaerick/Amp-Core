<?php
namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = $this->faker->words(3, true);
        return [
            'name' => ucfirst($name),
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(100, 999),
            'category_id' => Category::inRandomOrder()->value('id'),
            'brand_id' => Brand::inRandomOrder()->value('id'),
            'short_description' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'price' => $this->faker->randomFloat(2, 50, 1000),
            'sale_price' => $this->faker->optional()->randomFloat(2, 30, 900),
            'specs' => [
                ['name' => 'Power Output', 'value' => $this->faker->numberBetween(50, 500) . 'W RMS'],
                ['name' => 'Impedance', 'value' => '4 Ohms'],
            ],
            'features' => $this->faker->randomElements(
                ['Bluetooth', 'Water Resistant', 'Wireless Remote', 'App Support'],
                2
            ),
            'demo_video' => $this->faker->optional()->url(),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'low_stock_threshold' => 5,
            'stock_status' => $this->faker->randomElement(['in-stock', 'out-of-stock', 'on-backorder']),
            'track_inventory' => true,
            'allow_backorders' => false,
            'is_new' => $this->faker->boolean(30),
            'is_featured' => $this->faker->boolean(20),
            'is_published' => true,
        ];
    }
}
