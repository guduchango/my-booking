<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitRequest;
use App\Http\Resources\UnitResource;
use App\Models\Price;
use App\Models\Unit;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function index(Request $request)
    {
        return UnitResource::collection(
            Unit::orderBy('uni_created_at', 'desc')
                ->get()
        );
    }

    public function store(UnitRequest $request){
        $unit = new Unit();
        $unit->fill($request->all());
        $unit->save();
        return new UnitResource(Unit::findOrFail($unit->uni_id));
    }

    public function update(UnitRequest $request, int $id){
        $unit = Unit::findOrFail($id);
        $unit->fill($request->all());
        $unit->save();
        return new UnitResource(Unit::findOrFail($unit->uni_id));
    }

    public function getAvailable(Request $request){
        $checkIn = $request->check_in;
        $checkOut = $request->check_out;
        $people = $request->people;
        $units = Unit::get();
        $price = new Price();
        $availableUnits = [];
        foreach($units as  $unit){
            if($price->canReservate($checkIn,$checkOut,$unit->uni_id)){
                if($people <= $unit->uni_max_people){
                    $availableUnits[] = $unit->uni_id;
                }
            }
        }

        if($availableUnits !== []){
            $units = Unit::whereIn('uni_id',$availableUnits)->get();
            $response = UnitResource::collection($units);
        }else{
            $response =  response()->noContent();
        }

        return $response;
    }
}
