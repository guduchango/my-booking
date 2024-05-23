<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnitRequest;
use App\Http\Resources\UnitResource;
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
}
