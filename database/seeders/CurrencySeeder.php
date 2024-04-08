<?php

namespace Database\Seeders;

use App\Models\Currency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $countriesArray = ['arg','chi','per','bra','col'];
        foreach($countriesArray as $item){
            $currency = new Currency();
            $currency->cur_country = $item;
            $currency->cur_price = fake()->numberBetween(700, 1500);
            $currency->save();
        }

    }
}
