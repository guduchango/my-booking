<?php

namespace Database\Seeders;

use App\Models\Guest;
use App\Models\Price;
use App\Models\Promotion;
use App\Models\Reservation;
use App\Models\Unit;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonImmutable;
use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservationSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {


        $users = User::all();
        $reservations = $this->validRangeDates();



        foreach ($users as $user) {
            $units = Unit::where('uni_usu_id', $user->id)->get();
            foreach ($units as $unit) {
                foreach ($reservations as $item) {

                    $proId = Promotion::where('pro_usu_id', $user->id)->select('pro_id')->get('pro_id')->random(1)->pluck('pro_id')->first();
                    $promotion = Promotion::find($proId);
                    $price = $item['dias_reserva'] * fake()->numberBetween(10, 30);
                    $finalPrice = $price -($promotion->pro_value * 0.01 * $price);
                    $advance = $finalPrice - (fake()->randomElement([20,30,40,50]) * 0.01 * $finalPrice);

                    //price - (proValue * 0.01 * price)

                    $gueId = Guest::where('gue_usu_id', $user->id)->select('gue_id')->get('gue_id')->random(1)->pluck('gue_id')->first();

                    $reservation = new Reservation();
                    $reservation->res_start_date = $item['check_in'];
                    $reservation->res_end_date = $item['check_out'];
                    $reservation->res_adults = fake()->numberBetween(1, 5);
                    $reservation->res_children = fake()->numberBetween(0, 5);
                    $reservation->res_beds = fake()->numberBetween(1, 5);
                    $reservation->res_nights = $item['dias_reserva'];
                    $reservation->res_price = $price;
                    $reservation->res_price_dolar = 0;
                    $reservation->res_price_final = $finalPrice;
                    $reservation->res_advance_payment = $advance;
                    $reservation->res_status = 'approved'; //fake()->randomElement(['pending', 'approved', 'canceled']);
                    $reservation->res_channel = fake()->randomElement(['direct', 'booking', 'airbnb']);
                    $reservation->res_comments = fake()->text(100);
                    $reservation->res_pro_id = $proId;
                    $reservation->res_gue_id = $gueId;
                    $reservation->res_uni_id = $unit->uni_id;
                    $reservation->res_usu_id = $user->id;
                    $reservation->save();
                    $dates = getDaysBetweenDates($item['check_in'],  $item['check_out']);
                    foreach ($dates as $date) {
                        $price = $reservation->res_price / $reservation->res_nights;


                        $countPrice = Price::where("pri_usu_id", $user->id)
                            ->where("pri_date", $date)
                            ->where('pri_uni_id', $unit->uni_id)
                            ->count();

                        if ($countPrice > 0) {
                            $newPrice = Price::where("pri_usu_id", $user->id)
                                ->where("pri_date", $date)
                                ->where('pri_uni_id', $unit->uni_id)
                                ->first();
                        } else {
                            $newPrice = new Price();
                        }

                        $newPrice->pri_date = $date;
                        $newPrice->pri_price = $price;
                        $newPrice->pri_uni_id = $unit->uni_id;
                        $newPrice->pri_res_id = $reservation->res_id;
                        $newPrice->pri_usu_id = $user->id;
                        $newPrice->save();

                    }

                }
            }

        }
    }


    public function validRangeDates() {
        // Fecha actual
        $fechaActual = new \DateTime();

        // Intervalo de tiempo (3 meses hacia adelante)
        $fechaLimite = (clone $fechaActual)->modify('+3 months');

        // Arreglo para almacenar los rangos de check-in y check-out
        $rangosReservas = [];

        // Iteramos desde la fecha actual hasta la fecha límite
        while ($fechaActual <= $fechaLimite) {
            // Clonamos la fecha actual para generar la fecha de check-in
            $checkIn = clone $fechaActual;

            // Generamos una duración aleatoria de 2, 3, 4 o 5 días para las reservaciones
            $dias = rand(2, 5);  // Elegir una duración aleatoria

            // Generamos la fecha de check-out
            $checkOut = (clone $checkIn)->modify("+$dias days");

            // Si el check-out no excede la fecha límite
            if ($checkOut <= $fechaLimite) {
                $rangosReservas[] = [
                    'check_in' => $checkIn->format('Y-m-d'),
                    'check_out' => $checkOut->format('Y-m-d'),
                    'dias_reserva' => $dias
                ];

                // Actualizamos la fecha actual al día siguiente del check-out
                $fechaActual = (clone $checkOut)->modify('+1 day');
            } else {
                // Si el check-out excede la fecha límite, rompemos el bucle
                break;
            }
        }

        return $rangosReservas;
    }


}
