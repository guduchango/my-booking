<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('api/reservation', \App\Http\Controllers\ReservationController::class)
    ->middleware('auth:sanctum');
Route::apiResource('api/guest', \App\Http\Controllers\GuestController::class)
    ->middleware('auth:sanctum');
Route::apiResource('api/unit', \App\Http\Controllers\UnitController::class)
    ->middleware('auth:sanctum');
Route::apiResource('api/price', \App\Http\Controllers\PriceController::class)
    ->middleware('auth:sanctum');
Route::apiResource('api/currency', \App\Http\Controllers\CurrencyController::class);
Route::apiResource('api/expense', \App\Http\Controllers\ExpenseController::class);
Route::apiResource('api/promotion', \App\Http\Controllers\PromotionController::class)
    ->middleware('auth:sanctum');

Route::post('api/price/range-price', [\App\Http\Controllers\PriceController::class,'savePriceByRange'])
    ->middleware('auth:sanctum');
Route::post('api/unit/units-available', [\App\Http\Controllers\UnitController::class,'getAvailable'])
    ->middleware('auth:sanctum');

Route::post('api/user/create', [\App\Http\Controllers\AuthController::class,'create']);
Route::post('api/user/login', [\App\Http\Controllers\AuthController::class,'login']);


Route::post('api/tokens/create', function (\Illuminate\Http\Request $request) {
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});




Route::get('/artisan/migarte-refresh',function(){
    Artisan::call('migrate:refresh');
    return 'exito';
});

Route::get('/artisan/db-seed',function(){
    Artisan::call('db:seed');
    return 'exito';
});

