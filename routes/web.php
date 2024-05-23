<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('api/reservation', \App\Http\Controllers\ReservationController::class);
Route::apiResource('api/guest', \App\Http\Controllers\GuestController::class);
Route::apiResource('api/unit', \App\Http\Controllers\UnitController::class);
Route::apiResource('api/price', \App\Http\Controllers\PriceController::class);
Route::apiResource('api/currency', \App\Http\Controllers\CurrencyController::class);
Route::apiResource('api/expense', \App\Http\Controllers\ExpenseController::class);
Route::apiResource('api/promotion', \App\Http\Controllers\PromotionController::class);

Route::post('api/price/range-price', [\App\Http\Controllers\PriceController::class,'savePriceByRange']);

