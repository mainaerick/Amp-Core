<?php

namespace Database\Seeders;

use App\Models\Dealer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DealerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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

        // Optionally add more fake dealers
        Dealer::factory(5)->create();
    }
}
