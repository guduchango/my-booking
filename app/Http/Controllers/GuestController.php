<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuestRequest;
use App\Http\Resources\GuestResource;
use App\Models\Guest;
use Illuminate\Http\Request;

class GuestController extends Controller
{
    public function index(Request $request)
    {
        return GuestResource::collection(
            Guest::orderBy('gue_created_at', 'desc')
                ->get()
        );
    }

    public function store(GuestRequest $request){
        $guest = Guest::create($request->all());
        return new GuestResource(Guest::findOrFail($guest->gue_id));
    }
}
