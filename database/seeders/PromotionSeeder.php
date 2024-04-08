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
            ['1','people','45'],
            ['2','people','45'],
            ['3','people','11'],
            ['4','people','11'],
            ['5','days','5'],
            ['10','days','18'],
        ];
        foreach($data as $item){
            $promotion = new Promotion();
            $promotion->pro_units = $item[0];
            $promotion->pro_type = $item[1];
            $promotion->pro_value = $item[2];
            $promotion->save();
        }

    }
}
