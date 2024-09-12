<?php

namespace Database\Seeders;

use App\Models\Price;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = Unit::all();
        $users = User::all();

        foreach ($units as $unit) {

            $datesArrays = [
                [
                    'start_date' => date('Y-m-01'),
                    'end_date' => date('Y-m-t'),
                ],
                [
                    'start_date' => date('Y-m-01', strtotime('first day of next month')),
                    'end_date' => date('Y-m-t', strtotime('first day of next month')),
                ]

            ];

            foreach ($users as $user) {
                foreach ($datesArrays as $dates) {
                    try{
                        $startDate = $dates['start_date'];
                        $endDate = $dates['end_date'];
                        $rangeDates = getDaysBetweenDates($startDate, $endDate);
                        foreach ($rangeDates as $date) {
                            $price = new Price();
                            $price->pri_date = $date;
                            $price->pri_price = 15;
                            $price->pri_uni_id = $unit->uni_id;
                            $price->pri_usu_id = $user->id;
                            $price->save();
                        }
                    }catch (\Exception $e){
                        echo $e->getMessage();
                        continue;
                    }

                }
            }


        }
    }

}
