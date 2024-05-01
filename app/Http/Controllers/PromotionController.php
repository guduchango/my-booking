<?php

namespace App\Http\Controllers;

use App\Http\Resources\PromotionResource;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function index(Request $request)
    {
        return PromotionResource::collection(
            Promotion::orderBy('pro_created_at', 'desc')
                ->get()
        );
    }
}
