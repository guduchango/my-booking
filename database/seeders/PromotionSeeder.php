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
            ['0', 'nada'],
            ['5', '5% de descuento'],
            ['10', '10% de descuento'],
            ['15', '15% de descuento'],
            ['20', '20% de descuento'],
            ['25', '25% de descuento'],
            ['30', '30% de descuento'],
            ['35', '35% de descuento'],
            ['40', '40% de descuento'],
            ['45', '45% de descuento'],
            ['50', '50% de descuento'],
            ['60', '60% de descuento'],
            ['70', '70% de descuento'],
            ['80', '80% de descuento'],
            ['90', '90% de descuento'],
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
