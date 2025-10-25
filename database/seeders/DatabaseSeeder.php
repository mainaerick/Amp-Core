<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Dealer;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Setting;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\ProductImageFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        Category::factory()->count(5)->create();
        Dealer::create([
            'custom_id' => 'DEALER-1001',
            'name' => 'SoundWave Audio Center',
            'location' => 'New York, NY',
            'region' => 'East',
            'phone' => '+1 (212) 555-7890',
            'email' => 'contact@soundwaveaudio.com',
            'website' => 'https://soundwaveaudio.com',
            'status' => 'active',
        ]);
        Dealer::factory(5)->create();
        Brand::factory()->count(4)->create();
//        ProductImage::truncate();
//        Product::truncate();
        Product::factory()->count(20)->hasImages(ProductImage::factory()->count(3))->create();
        Setting::setSection('general', [
            'storeName' => 'AMPCORE',
            'storeUrl' => 'https://ampcore.fluxnerve.com',
            'currency' => 'KSH',
        ]);

        Setting::setSection('contact', [
            'email' => 'support@ampcore.com',
            'phone' => '+254740212762',
            'whatsapp' => '+254740212762',
            'mapEmbed'=>'https://maps.app.goo.gl/VGYsA15SyCbzYs4s7',
            'address' => '123 Audio Street Nairobi, Dandora Phase II, Kenya',
        ]);

    }

}
