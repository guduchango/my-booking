<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(Request $request)
    {

        return ReservationResource::collection(
            Reservation::orderBy('res_created_at', 'desc')
                ->get()
        );
    }

    public function store(ReservationRequest $request){
        $reservation = Reservation::create($request->all());
        return new ReservationResource(Reservation::findOrFail($reservation->res_id));
    }
}
