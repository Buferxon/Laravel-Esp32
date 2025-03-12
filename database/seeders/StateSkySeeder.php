<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StateSkySeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();
        
        $states = [
            // Thunderstorm conditions (200-232)
            ['id' => 200, 'name' => 'Thunderstorm', 'description' => 'thunderstorm with light rain'],
            ['id' => 201, 'name' => 'Thunderstorm', 'description' => 'thunderstorm with rain'],
            ['id' => 202, 'name' => 'Thunderstorm', 'description' => 'thunderstorm with heavy rain'],
            ['id' => 210, 'name' => 'Thunderstorm', 'description' => 'light thunderstorm'],
            ['id' => 211, 'name' => 'Thunderstorm', 'description' => 'thunderstorm'],
            ['id' => 212, 'name' => 'Thunderstorm', 'description' => 'heavy thunderstorm'],
            ['id' => 221, 'name' => 'Thunderstorm', 'description' => 'ragged thunderstorm'],
            ['id' => 230, 'name' => 'Thunderstorm', 'description' => 'thunderstorm with light drizzle'],
            ['id' => 231, 'name' => 'Thunderstorm', 'description' => 'thunderstorm with drizzle'],
            ['id' => 232, 'name' => 'Thunderstorm', 'description' => 'thunderstorm with heavy drizzle'],
            
            // Drizzle conditions (300-321)
            ['id' => 300, 'name' => 'Drizzle', 'description' => 'light intensity drizzle'],
            ['id' => 301, 'name' => 'Drizzle', 'description' => 'drizzle'],
            ['id' => 302, 'name' => 'Drizzle', 'description' => 'heavy intensity drizzle'],
            ['id' => 310, 'name' => 'Drizzle', 'description' => 'light intensity drizzle rain'],
            ['id' => 311, 'name' => 'Drizzle', 'description' => 'drizzle rain'],
            ['id' => 312, 'name' => 'Drizzle', 'description' => 'heavy intensity drizzle rain'],
            ['id' => 313, 'name' => 'Drizzle', 'description' => 'shower rain and drizzle'],
            ['id' => 314, 'name' => 'Drizzle', 'description' => 'heavy shower rain and drizzle'],
            ['id' => 321, 'name' => 'Drizzle', 'description' => 'shower drizzle'],
            
            // Rain conditions (500-531)
            ['id' => 500, 'name' => 'Rain', 'description' => 'light rain'],
            ['id' => 501, 'name' => 'Rain', 'description' => 'moderate rain'],
            ['id' => 502, 'name' => 'Rain', 'description' => 'heavy intensity rain'],
            ['id' => 503, 'name' => 'Rain', 'description' => 'very heavy rain'],
            ['id' => 504, 'name' => 'Rain', 'description' => 'extreme rain'],
            ['id' => 511, 'name' => 'Rain', 'description' => 'freezing rain'],
            ['id' => 520, 'name' => 'Rain', 'description' => 'light intensity shower rain'],
            ['id' => 521, 'name' => 'Rain', 'description' => 'shower rain'],
            ['id' => 522, 'name' => 'Rain', 'description' => 'heavy intensity shower rain'],
            ['id' => 531, 'name' => 'Rain', 'description' => 'ragged shower rain'],
            
            // Snow conditions (600-622)
            ['id' => 600, 'name' => 'Snow', 'description' => 'light snow'],
            ['id' => 601, 'name' => 'Snow', 'description' => 'snow'],
            ['id' => 602, 'name' => 'Snow', 'description' => 'heavy snow'],
            ['id' => 611, 'name' => 'Snow', 'description' => 'sleet'],
            ['id' => 612, 'name' => 'Snow', 'description' => 'light shower sleet'],
            ['id' => 613, 'name' => 'Snow', 'description' => 'shower sleet'],
            ['id' => 615, 'name' => 'Snow', 'description' => 'light rain and snow'],
            ['id' => 616, 'name' => 'Snow', 'description' => 'rain and snow'],
            ['id' => 620, 'name' => 'Snow', 'description' => 'light shower snow'],
            ['id' => 621, 'name' => 'Snow', 'description' => 'shower snow'],
            ['id' => 622, 'name' => 'Snow', 'description' => 'heavy shower snow'],
            
            // Atmosphere conditions (701-781)
            ['id' => 701, 'name' => 'Mist', 'description' => 'mist'],
            ['id' => 711, 'name' => 'Smoke', 'description' => 'smoke'],
            ['id' => 721, 'name' => 'Haze', 'description' => 'haze'],
            ['id' => 731, 'name' => 'Dust', 'description' => 'sand/dust whirls'],
            ['id' => 741, 'name' => 'Fog', 'description' => 'fog'],
            ['id' => 751, 'name' => 'Sand', 'description' => 'sand'],
            ['id' => 761, 'name' => 'Dust', 'description' => 'dust'],
            ['id' => 762, 'name' => 'Ash', 'description' => 'volcanic ash'],
            ['id' => 771, 'name' => 'Squall', 'description' => 'squalls'],
            ['id' => 781, 'name' => 'Tornado', 'description' => 'tornado'],
            
            // Clear and Clouds (800-804)
            ['id' => 800, 'name' => 'Clear', 'description' => 'clear sky'],
            ['id' => 801, 'name' => 'Clouds', 'description' => 'few clouds: 11-25%'],
            ['id' => 802, 'name' => 'Clouds', 'description' => 'scattered clouds: 25-50%'],
            ['id' => 803, 'name' => 'Clouds', 'description' => 'broken clouds: 51-84%'],
            ['id' => 804, 'name' => 'Clouds', 'description' => 'overcast clouds: 85-100%']
        ];

        // Insert records in chunks to avoid memory issues
        foreach (array_chunk($states, 10) as $chunk) {
            DB::table('state_sky')->insert($chunk);
        }
    }
}
