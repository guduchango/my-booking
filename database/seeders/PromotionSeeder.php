<?php

namespace Database\Seeders;

use App\Models\Promotion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['0','nothing'],
            ['10','new guest'],
            ['20','old guest'],
            ['30','5 days or more'],
            ['40','10 days or more']
        ];
        foreach($data as $item){
            $promotion = new Promotion();
            $promotion->pro_value = $item[0];
            $promotion->pro_name = $item[1];
            $promotion->save();
        }

    }
}
