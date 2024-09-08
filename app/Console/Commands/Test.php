<?php

namespace App\Console\Commands;

use App\Http\Resources\CustomResource;
use App\Http\Resources\UnitResource;
use App\Models\Price;
use App\Models\Reservation;
use App\Models\Unit;
use App\Models\User;
use App\Rules\ReservationRule;
use Carbon\Carbon;
use Illuminate\Console\Command;

class Test extends Command {
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
    public function handle() {

       $reservation = new Reservation();
       $reservation = $reservation->find(1);
       $reservation->updateByStatus();




    }


}
