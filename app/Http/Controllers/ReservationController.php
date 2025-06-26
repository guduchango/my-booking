<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomResource;
use App\Http\Resources\ReservationResource;
use App\Models\Price;
use App\Models\Reservation;
use App\Rules\ReservationRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller {
    public function index(Request $request) {
        try {
            return ReservationResource::collection(
                Reservation::where('res_usu_id',Auth::user()->id)
                    ->orderBy('res_created_at', 'desc')
                    ->get()
            );
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function store(Request $request) {
        $checkIn = $request->res_start_date;
        $checkOut = $request->res_end_date;
        $unitId = $request->res_uni_id;
        $resId = 0;
        $totalPeople = $request->res_children + $request->res_adults;

        try {

            $validate = Validator::make($request->all(),
                $this->getValidationRules()
            );

            if($validate->fails()){
                $response = new CustomResource(response(),401,$validate);
                return $response->show();
            }

            $validateRule = new ReservationRule($checkIn,$checkOut,$totalPeople,$unitId,$resId,Auth::user()->id);
            if($validateRule->validate() === false){
                $error = json_encode($validateRule->getErrorMessage());
                $response = new CustomResource(response(), 401, $error);
                return $response->show();
            }
            $reservation = new Reservation();
            $reservation->fill($request->all());
            $reservation->res_usu_id = Auth::user()->id;
            $reservation->save();
            $reservation->updateByStatus();
            return new ReservationResource(Reservation::findOrFail($reservation->res_id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function show(int $id) {
        try {
            return new ReservationResource(Reservation::findOrFail($id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function update(Request $request, int $id) {

        $checkIn = $request->res_start_date;
        $checkOut = $request->res_end_date;
        $unitId = $request->res_uni_id;
        $resId = $request->res_id;
        $maxPeople = $request->res_children + $request->res_adults;

        try {
            $validate = Validator::make($request->all(),
                $this->getValidationRules()
            );

            if($validate->fails()){
                $response = new CustomResource(response(),401,$validate);
                return $response->show();
            }

            $validateRule = new ReservationRule($checkIn,$checkOut,$maxPeople,$unitId,$resId,Auth::user()->id);
            if($validateRule->validate() === false){
                $error = $validateRule->getErrorMessage();
                $response = new CustomResource(response(), 401, $error);
                return $response->show();
            }

            $reservation = Reservation::findOrFail($id);
            $reservation->fill($request->all());
            $reservation->res_usu_id = Auth::user()->id;
            $reservation->save();
            $reservation->updateByStatus();
            return new ReservationResource(Reservation::findOrFail($reservation->res_id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    private function getValidationRules(): array {
        return  [
            'res_start_date' => 'required|date',
            'res_end_date' => 'required|date',
            'res_adults' => 'integer|required',
            'res_children' => 'integer',
            'res_beds' => 'integer',
            'res_nights' => 'integer',
            'res_price' => 'required|numeric',
            'res_price_dolar' => 'integer',
            'res_price_final' => 'required|numeric',
            'res_advance_payment' => 'required|numeric',
            'res_status' => 'required|string',
            'res_channel' => 'required|string',
            'res_pro_id' => 'integer',
            'res_gue_id' => 'integer|required',
            'res_uni_id' => 'integer|required',
        ];
    }
}
