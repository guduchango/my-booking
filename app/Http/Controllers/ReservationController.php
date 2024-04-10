<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        return ReservationResource::collection(
            Reservation::orderBy('res_created_at', 'desc')
                ->paginate(10)
        );
    }
}
