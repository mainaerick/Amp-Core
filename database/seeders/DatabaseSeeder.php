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
            'mapEmbed'=>'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4731.523926883942!2d36.82348817569007!3d-1.2849487356261509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f116041c8127d%3A0x97121230126f6bd0!2sCBD!5e1!3m2!1sen!2ske!4v1761358900462!5m2!1sen!2ske',
            'address' => '123 Audio Street Nairobi, Dandora Phase II, Kenya',
        ]);

    }

}
