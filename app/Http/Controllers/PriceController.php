<?php

namespace App\Http\Controllers;

use App\Http\Resources\PriceResource;
use App\Models\Price;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    public function index(Request $request)
    {

        return PriceResource::collection(
            Price::orderBy('pri_created_at', 'desc')
                ->get()
        );
    }
}
