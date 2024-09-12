<?php

namespace Database\Seeders;

use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $users = User::all();
        foreach ($users as $user){
            $units = Unit::factory(5)->create();
            $count = 0;
            foreach ($units as $unit) {
                $count++;
                $unit->uni_name = "departamento".$count;
                $unit->uni_usu_id = $user->id;
                $unit->save();
            }
        }

    }
}
