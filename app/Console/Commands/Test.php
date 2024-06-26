<?php

namespace App\Console\Commands;

use App\Models\Price;
use App\Models\Unit;
use App\Models\User;
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
        $pet = new Pets("pepe");
        $pet->setTrait("hola");

        var_dump($pet->getData());

    }


}
