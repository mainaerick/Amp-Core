<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImageFactory extends Factory
{
    protected $model = ProductImage::class;

    public function definition(): array
    {
        return [
            'path' => 'products/' . $this->faker->unique()->lexify('image_????') . '.jpg',
            'product_id' => Product::factory(), // will be overridden if attached via has()
        ];
    }
}
