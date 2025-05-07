<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Dealer;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        Product::factory()->count(20)->create();

    }

}
