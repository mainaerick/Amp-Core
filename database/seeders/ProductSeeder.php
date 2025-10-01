<?php
namespace Database\Seeders;

use App\Models\ProductImage;
use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        ProductImage::truncate();
        Product::truncate();

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        Product::factory()->count(20)->hasImages(ProductImage::factory()->count(3))->create();

    }
}
