<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitRequest;
use App\Http\Resources\CustomResource;
use App\Http\Resources\UnitResource;
use App\Models\Price;
use App\Models\Unit;
use App\Rules\ReservationRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UnitController extends Controller {
    public function index(Request $request) {
        try {
            return UnitResource::collection(
                Unit::where('uni_usu_id',Auth::user()->id)
                    ->orderBy('uni_created_at', 'desc')
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

            $unit = new Unit();
            $unit->fill($request->all());
            $unit->uni_usu_id = Auth::user()->id;
            $unit->save();
            return new UnitResource(Unit::findOrFail($unit->uni_id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function update(Request $request, int $id) {
        try {
            $unit = Unit::findOrFail($id);
            $unit->fill($request->all());
            $unit->uni_usu_id = Auth::user()->id;
            $unit->save();
            return new UnitResource(Unit::findOrFail($unit->uni_id));
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function getAvailable(Request $request) {
        try {

            $validate = Validator::make($request->all(),
                $this->getValidationRulesPriceUnit()
            );

            if($validate->fails()){
                $response = new CustomResource(response(),401,$validate);
                return $response->show();
            }
            $checkIn = $request->check_in;
            $checkOut = $request->check_out;
            $people = $request->people;
            $units = Unit::where('uni_usu_id',Auth::user()->id)->get();

            Log::info('Available Units', [
                'check_in' => $checkIn,
                'check_out' => $checkOut,
                'people' => $people,
                'units' => $units->toArray()
            ]);


            $availableUnitsIds = [];

            foreach ($units as $unit) {
                $unitId = $unit->uni_id;
                $reservationRule = new ReservationRule($checkIn,$checkOut,$people,$unitId,0,Auth::user()->id);
                if ($reservationRule->validate()) {
                        $availableUnitsIds[] = $unit->uni_id;
                }
            }

            

            if ($availableUnitsIds !== []) {
                $availableUnits = UnitResource::collection($units->whereIn('uni_id',$availableUnitsIds));
                $response = UnitResource::collection($availableUnits);
            } else {
                $response = new CustomResource(response(), 500, $reservationRule->getErrorMessage());
                return $response->show();
            }

            return $response;
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    private function getValidationRules(): array {
        return  [
            'uni_name' => 'required|string|max:30|min:5',
            'uni_max_people' => 'required|integer',
            'uni_single_bed' => 'required|integer',
            'uni_double_bed' => 'required|integer',
            'uni_rooms' => 'required|integer',
        ];
    }

    private function getValidationRulesPriceUnit(): array {
        return  [
            'check_in' => 'required|date',
            'check_out' => 'required|date',
            'people' => 'required|integer',

        ];
    }
}
