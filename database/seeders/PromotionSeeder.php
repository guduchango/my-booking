<?php

namespace Database\Seeders;

use App\Models\Promotion;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $data = [
            ['0', '0%'],
            ['5', '5%'],
            ['10', '10%'],
            ['15', '15%'],
            ['20', '20%'],
            ['25', '25%'],
            ['30', '30%'],
            ['35', '35%'],
            ['40', '40%'],
            ['45', '45%'],
            ['50', '50%'],
            ['60', '60%'],
            ['70', '70%'],
            ['80', '80%'],
            ['90', '90%'],
        ];

        $users = User::all();

        foreach ($users as $user) {
            foreach ($data as $item) {
                $promotion = new Promotion();
                $promotion->pro_value = $item[0];
                $promotion->pro_name = $item[1];
                $promotion->pro_usu_id = $user->id;
                $promotion->save();
            }

        }


    }
}
