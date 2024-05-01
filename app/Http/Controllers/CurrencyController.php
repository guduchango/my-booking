<?php

namespace App\Http\Controllers;

use App\Http\Resources\CurrencyResource;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller
{
    public function index(Request $request)
    {

        return CurrencyResource::collection(
            Currency::orderBy('cur_created_at', 'desc')
                ->get()
        );
    }
}
