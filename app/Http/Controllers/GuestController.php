<?php

namespace App\Http\Controllers;

use App\Http\Requests\GuestRequest;
use App\Http\Resources\GuestResource;
use App\Models\Guest;
use Carbon\Carbon;
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
        $guest = new Guest();
        $guest->fill($request->all());
        $guest->gue_birthday =  Carbon::createFromFormat('Y-m-d', $guest->gue_birthday)
            ->format('Y/m/d');
        $guest->save();
        return new GuestResource(Guest::findOrFail($guest->gue_id));
    }

    public function update(GuestRequest $request, int $id){
        $guest = Guest::findOrFail($id);
        $guest->fill($request->all());
        $guest->gue_birthday =  Carbon::createFromFormat('Y-m-d', $guest->gue_birthday)
            ->format('Y/m/d');
        $guest->save();
        return new GuestResource(Guest::findOrFail($guest->gue_id));
    }
}
