<?php

namespace App\Console\Commands;

use App\Models\Price;
use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Console\Command;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Example usage
        $startDate = '2024-05-08';
        $endDate = '2024-05-12';
        $unit = 1;

        $units = Unit::get();

        foreach ($units as $uni){

           $price = new Price();
            if($price->canReservate($startDate,$endDate,$uni->uni_id)){
                echo "si puedo reservar";
            }else{
                echo "no puedo reservar";
            }


        }
    }


}
