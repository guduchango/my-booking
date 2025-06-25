<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomResource;
use App\Http\Resources\PromotionResource;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PromotionController extends Controller {
    public function index(Request $request) {
        try {
            return PromotionResource::collection(
                Promotion::where('pro_usu_id',1)
                ->orderBy('pro_created_at', 'desc')

                    ->get()
            );
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }
}
