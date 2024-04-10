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
                $reservation->res_startDate = $currentStart;
                $reservation->res_endDate = $currentEnd;
                $reservation->res_adults = fake()->numberBetween(1, 5);
                $reservation->res_children = fake()->numberBetween(0, 5);
                $reservation->res_beds = fake()->numberBetween(1, 5);
                $reservation->res_days = fake()->numberBetween(1, 5);
                $reservation->res_discountValue = fake()->numberBetween(0, 60);
                $reservation->res_discountDetail = json_encode(['json','example','data']);
                $reservation->res_price = fake()->numberBetween(50000, 200000);
                $reservation->res_priceDolar = fake()->numberBetween(20, 200);
                $reservation->res_priceFinal = fake()->numberBetween(50000, 200000);
                $reservation->res_advancePayment = fake()->numberBetween(10000, 80000);
                $reservation->res_status = fake()->randomElement(['pending', 'approved', 'canceled']);
                $reservation->res_channel = fake()->randomElement(['direct', 'booking']);
                $reservation->res_comments = fake()->text(100);
                $reservation->res_guestId = $gueId;
                $reservation->res_unitId = $uniId;
                $reservation->save();
            }
        }

    }
}
