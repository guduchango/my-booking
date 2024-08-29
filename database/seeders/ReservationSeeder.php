<?php

namespace Database\Seeders;

use App\Models\Guest;
use App\Models\Price;
use App\Models\Reservation;
use App\Models\Unit;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {

        $prices = [
            [
                'start' => '01-08-2024',
                'end' => '30-10-2024',
                'unit' => '1'
            ],
            [
                'start' => '01-08-2024',
                'end' => '30-10-2024',
                'unit' => '2'
            ],
            [
                'start' => '01-08-2024',
                'end' => '30-10-2024',
                'unit' => '3'
            ],
            [
                'start' => '01-08-2024',
                'end' => '30-10-2024',
                'unit' => '4'
            ],
            [
            'start' => '01-08-2024',
            'end' => '30-10-2024',
            'unit' => '5'
        ]
        ];

        foreach ($prices as $item) {
            $startDate = Carbon::createFromFormat('d-m-Y', $item['start'])->format('Y-m-d');
            $endDate = Carbon::createFromFormat('d-m-Y', $item['end'])->format('Y-m-d');
            $unit = $item['unit'];
            $dates = getDaysBetweenDates($startDate,$endDate);
            foreach ($dates as $date) {
                $price = new Price();
                $price->pri_date = $date;
                $price->pri_price = 15;
                $price->pri_uni_id = $unit;
                $price->save();
            }
        }

        $reservatios = [
            [
                'unit' => 1,
                'start' => '01-08-2024',
                'end' => '07-08-2024',
            ],
            [

                'unit' => 1,
                'start' => '13-08-2024',
                'end' => '20-08-2024',
            ],
            [
                'unit' => 1,
                'start' => '21-08-2024',
                'end' => '30-08-2024',
            ],
            [
                'unit' => 1,
                'start' => '05-09-2024',
                'end' => '10-09-2024',
            ],
            [
                'unit' => 1,
                'start' => '15-09-2024',
                'end' => '20-09-2024',
            ],
            [
                'unit' => 1,
                'start' => '26-09-2024',
                'end' => '30-09-2024',
            ],
            //unit 2
            [
                'unit' => 2,
                'start' => '05-08-2024',
                'end' => '15-08-2024',
            ],
            [
                'unit' => 2,
                'start' => '18-08-2024',
                'end' => '25-08-2024',
            ],
            [
                'unit' => 2,
                'start' => '27-08-2024',
                'end' => '30-08-2024',
            ],
            [
                'unit' => 2,
                'start' => '05-09-2024',
                'end' => '09-06-2024',
            ],
            [
                'unit' => 2,
                'start' => '14-09-2024',
                'end' => '18-09-2024',
            ],
            [
                'unit' => 2,
                'start' => '25-09-2024',
                'end' => '30-09-2024',
            ],

        ];

        //$units = Unit::select('uni_id')->get('uni_id')->pluck('uni_id');

        foreach ($reservatios as $item) {
            $startDate = Carbon::createFromFormat('d-m-Y', $item['start'])->format('Y-m-d');
            $endDate = Carbon::createFromFormat('d-m-Y', $item['end'])->format('Y-m-d');
            $unit = $item['unit'];

            $reservationDays = fake()->numberBetween(2, 7);
            $initialDay = fake()->dateTimeBetween('+1 day', '+90 day')->format('Y-m-d');
            //$currentStart =  Carbon::createFromFormat('Y-m-d',$initialDay);
            //$currentEnd = Carbon::createFromFormat('Y-m-d',$initialDay);
            //$currentEnd =  $currentEnd->addDays($reservationDays);
            $gueId = Guest::select('gue_id')->get('gue_id')->random(1)->pluck('gue_id')->first();
            $reservation = new Reservation();
            $reservation->res_start_date = $startDate;
            $reservation->res_end_date = $endDate;
            $reservation->res_adults = fake()->numberBetween(1, 5);
            $reservation->res_children = fake()->numberBetween(0, 5);
            $reservation->res_beds = fake()->numberBetween(1, 5);
            $reservation->res_nights = fake()->numberBetween(1, 5);
            $reservation->res_price = fake()->numberBetween(50000, 200000);
            $reservation->res_price_dolar = fake()->numberBetween(20, 200);
            $reservation->res_price_final = fake()->numberBetween(50000, 200000);
            $reservation->res_advance_payment = fake()->numberBetween(10000, 80000);
            $reservation->res_status = 'approved'; //fake()->randomElement(['pending', 'approved', 'canceled']);
            $reservation->res_channel = fake()->randomElement(['direct', 'booking']);
            $reservation->res_comments = fake()->text(100);
            $reservation->res_pro_id = fake()->numberBetween(1, 5);
            $reservation->res_gue_id = $gueId;
            $reservation->res_uni_id = $unit;
            $reservation->save();

            $dates = getDaysBetweenDates($startDate,$endDate);
            foreach ($dates as $date) {

                $price = DB::table('prices')
                    ->where('pri_date', '=', $date)
                    ->where('pri_uni_id', '=', $unit);

                if($price->count() == 0){
                    $price = new Price();
                    $price->pri_uni_id = $unit;
                    $price->pri_res_id = $reservation->res_id;
                    $price->save();
                }else {
                    $priceOld = $price->first();
                    $price = Price::find($priceOld->pri_id);
                    $price->pri_uni_id = $unit;
                    $price->pri_res_id = $reservation->res_id;
                    $price->save();
                }
            }

        }

    }
}
