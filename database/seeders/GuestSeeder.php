<?php

namespace Database\Seeders;

use App\Models\Guest;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        foreach ($users as $user) {
            $guests = Guest::factory(200)->create();
            foreach ($guests as $guest) {
                $guest->gue_usu_id = $user->id;
                $guest->save();
            }

        }

    }
}
