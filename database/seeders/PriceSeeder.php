<?php

namespace Database\Seeders;

use App\Models\Price;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = Unit::select('uni_id')->get('id')->toArray();
        $startDate = date('Y-m-d');
        $period = new \DatePeriod(new \DateTime($startDate),
            new \DateInterval('P1D'),
            new \DateTime($startDate.' +3 month'));

        foreach($units as $item){
            foreach ($period as $date) {
                $price = new Price();
                $price->pri_date = $date->format('Y-m-d');
                $price->pri_price = fake()->numberBetween(40, 60);
                $price->pri_uni_id = $item['uni_id'];
                $price->save();
            }
        }
    }

}
