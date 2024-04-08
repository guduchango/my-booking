<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('guests')->truncate();
        DB::table('units')->truncate();
        DB::table('prices')->truncate();
        DB::table('expenses')->truncate();

        $this->call([
            GuestSeeder::class,
            UnitSeeder::class,
            PriceSeeder::class,
            ExpenseSeeder::class
        ]);

    }
}
