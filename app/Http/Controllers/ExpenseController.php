<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomResource;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller {

    public function index(Request $request) {
        try {
            return ExpenseResource::collection(
                Expense::orderBy('exp_created_at', 'desc')
                    ->get()
            );

        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }
}
