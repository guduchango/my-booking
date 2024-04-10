<?php

namespace Database\Seeders;

use App\Models\Guest;
use App\Models\Reservation;
use App\Models\Unit;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $reservationDays = fake()->numberBetween(2, 7);
        $initialDay = fake()->dateTimeBetween('+1 day', '+90 day')->format('Y-m-d');
        $currentStart =  Carbon::createFromFormat('Y-m-d',$initialDay);
        $currentEnd = Carbon::createFromFormat('Y-m-d',$initialDay);
        $currentEnd =  $currentEnd->addDays($reservationDays);
        $gueId = Guest::select('gue_id')->get('gue_id')->random(1)->pluck('gue_id')->first();
        $units = Unit::select('uni_id')->get('uni_id')->pluck('uni_id');

        foreach($units as $uniId){
            for($i=0 ; $i<=20 ; $i++){
                $reservation = new Reservation();
                $reservation->res_start_date = $currentStart;
                $reservation->res_end_date = $currentEnd;
                $reservation->res_adults = fake()->numberBetween(1, 5);
                $reservation->res_children = fake()->numberBetween(0, 5);
                $reservation->res_beds = fake()->numberBetween(1, 5);
                $reservation->res_days = fake()->numberBetween(1, 5);
                $reservation->res_discount_value = fake()->numberBetween(0, 60);
                $reservation->res_discount_detail = json_encode(['json','example','data']);
                $reservation->res_price = fake()->numberBetween(50000, 200000);
                $reservation->res_price_dolar = fake()->numberBetween(20, 200);
                $reservation->res_price_final = fake()->numberBetween(50000, 200000);
                $reservation->res_advance_payment = fake()->numberBetween(10000, 80000);
                $reservation->res_status = fake()->randomElement(['pending', 'approved', 'canceled']);
                $reservation->res_channel = fake()->randomElement(['direct', 'booking']);
                $reservation->res_comments = fake()->text(100);
                $reservation->res_gue_id = $gueId;
                $reservation->res_uni_id = $uniId;
                $reservation->save();
            }
        }

    }
}
