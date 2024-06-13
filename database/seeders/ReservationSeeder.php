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
                'start' => '01-05-2024',
                'end' => '30-07-2024',
                'unit' => '1'
            ],
            [
                'start' => '01-05-2024',
                'end' => '30-07-2024',
                'unit' => '2'
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
                'start' => '01-05-2024',
                'end' => '07-05-2024',
            ],
            [

                'unit' => 1,
                'start' => '13-05-2024',
                'end' => '20-05-2024',
            ],
            [
                'unit' => 1,
                'start' => '21-05-2024',
                'end' => '30-05-2024',
            ],
            [
                'unit' => 1,
                'start' => '05-06-2024',
                'end' => '10-06-2024',
            ],
            [
                'unit' => 1,
                'start' => '15-06-2024',
                'end' => '20-06-2024',
            ],
            [
                'unit' => 1,
                'start' => '26-06-2024',
                'end' => '30-06-2024',
            ],
            //unit 2
            [
                'unit' => 2,
                'start' => '05-05-2024',
                'end' => '15-05-2024',
            ],
            [
                'unit' => 2,
                'start' => '18-05-2024',
                'end' => '25-05-2024',
            ],
            [
                'unit' => 2,
                'start' => '27-05-2024',
                'end' => '30-05-2024',
            ],
            [
                'unit' => 2,
                'start' => '05-06-2024',
                'end' => '09-06-2024',
            ],
            [
                'unit' => 2,
                'start' => '14-06-2024',
                'end' => '18-06-2024',
            ],
            [
                'unit' => 2,
                'start' => '25-06-2024',
                'end' => '30-06-2024',
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
