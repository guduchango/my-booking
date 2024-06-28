<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomResource;
use App\Http\Resources\GuestResource;
use App\Models\Guest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GuestController extends Controller {
    public function index(Request $request) {
        try {
            return GuestResource::collection(
                Guest::orderBy('gue_created_at', 'desc')
                    ->get()
            );

        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function store(Request $request) {
        try {
            $validate = Validator::make($request->all(),
                $this->getValidationRules()
               );

            if($validate->fails()){
                $response = new CustomResource(response(),401,$validate);
                return $response->show();
            }

            $guest = new Guest();
            $guest->fill($request->all());
/*            $guest->gue_birthday = Carbon::createFromFormat('Y-m-d', $guest->gue_birthday)
                ->format('Y/m/d');*/
            $guest->save();
            return new GuestResource(Guest::findOrFail($guest->gue_id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function update(Request $request, int $id) {
        try {
            $validate = Validator::make($request->all(),
                $this->getValidationRules()
            );

            if($validate->fails()){
                $response = new CustomResource(response(),401,$validate);
                return $response->show();
            }
            $guest = Guest::findOrFail($id);
            $guest->fill($request->all());
/*            $guest->gue_birthday = Carbon::createFromFormat('Y-m-d', $guest->gue_birthday)
                ->format('Y/m/d');*/
            $guest->save();
            return new GuestResource(Guest::findOrFail($guest->gue_id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    private function getValidationRules(): array {
        return  [
            'gue_name' => 'required|max:50',
            'gue_last_name' => 'required|max:50',
            'gue_identity_document' => 'required|numeric',
            'gue_email' => 'email|max:50|unique:guests,gue_email',
            'gue_phone_number' => 'required|numeric|max:50',
            'gue_birthday' => 'required|date'
        ];
    }
}
