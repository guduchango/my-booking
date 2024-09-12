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
        DB::table('configurations')->truncate();
        DB::table('currencies')->truncate();
        DB::table('promotions')->truncate();
        DB::table('guests')->truncate();
        DB::table('units')->truncate();
        DB::table('prices')->truncate();
        DB::table('expenses')->truncate();
        DB::table('reservations')->truncate();
        DB::table('users')->truncate();

        $this->call([
            UserSeeder::class,
            ConfigurationSeeder::class,
            PromotionSeeder::class,
            CurrencySeeder::class,
            GuestSeeder::class,
            UnitSeeder::class,
            PriceSeeder::class,
            ExpenseSeeder::class,
            ReservationSeeder::class
        ]);

    }
}
