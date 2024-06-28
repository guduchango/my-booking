<?php

namespace App\Http\Controllers;

use App\Http\Resources\CurrencyResource;
use App\Http\Resources\CustomResource;
use App\Models\Currency;
use Illuminate\Http\Request;

class CurrencyController extends Controller {

    public function index(Request $request) {
        try {
            return CurrencyResource::collection(
                Currency::orderBy('cur_created_at', 'desc')
                    ->get()
            );
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }
}
