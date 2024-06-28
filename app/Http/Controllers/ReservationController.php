<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Resources\CustomResource;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller {
    public function index(Request $request) {
        try {
            return ReservationResource::collection(
                Reservation::orderBy('res_created_at', 'desc')
                    ->get()
            );
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function store(ReservationRequest $request) {
        try {
            $reservation = Reservation::create($request->all());
            return new ReservationResource(Reservation::findOrFail($reservation->res_id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function update(ReservationRequest $request, int $id) {
        try {
            $reservation = Reservation::findOrFail($id);
            $reservation->fill($request->all());
            $reservation->save();
            return new ReservationResource(Reservation::findOrFail($reservation->res_id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }
}
