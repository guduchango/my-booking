<?php

namespace App\Http\Controllers;

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
}
