<?php

namespace App\Http\Controllers;

use App\Http\Requests\PriceRangeRequest;
use App\Http\Resources\CustomResource;
use App\Http\Resources\PriceResource;
use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PriceController extends Controller {

    public function index(Request $request) {

        try {
            return PriceResource::collection(
                Price::where('pri_usu_id',Auth::user()->id)
                    ->orderBy('pri_id', 'asc')
                    ->get()
            );
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    public function savePriceByRange(Request $request) {

        try {
            $validate = Validator::make($request->all(),
                $this->getValidationRules()
            );

            if($validate->fails()){
                $response = new CustomResource(response(),401,$validate);
                return $response->show();
            }

            $pri_from = date('Y-m-d', strtotime($request->pri_from));
            $pri_to = date('Y-m-d', strtotime($request->pri_to));
            $pri_uni_id = $request->pri_uni_id;


            $period = getDaysBetweenDates($pri_from,$pri_to);

            foreach ($period as $date) {

                $prices = DB::table('prices')
                    ->where('pri_date', '=', $date)
                    ->where('pri_uni_id', '=', $pri_uni_id)
                    ->where('pri_usu_id',Auth::user()->id);

                if ($prices->count() == 0) {
                    $price = new Price();
                    $price->pri_date = $date;
                    $price->pri_price = $request->pri_value;
                    $price->pri_uni_id = $request->pri_uni_id;
                    $price->pri_usu_id = Auth::user()->id;
                    $price->save();
                } else {
                    $priceOld = $prices->first();
                    if($priceOld->pri_res_id == 0){
                        $price = Price::find($priceOld->pri_id);
                        $price->pri_date = $date;
                        $price->pri_price = $request->pri_value;
                        $price->pri_uni_id = $request->pri_uni_id;
                        $price->pri_usu_id = Auth::user()->id;
                        $price->save();
                    }
                }
            }

            $priceList = DB::table('prices')
                ->where('pri_uni_id', '=', $pri_uni_id)
                ->where('pri_usu_id',Auth::user()->id)
                ->where('pri_date', '>=', $pri_from)
                ->where('pri_date', '<=', $pri_to)
                ->get();

            return PriceResource::collection($priceList);
        } catch (\Throwable $th) {
            $response = new CustomResource(response(), 500, $th);
            return $response->show();
        }
    }

    private function getValidationRules(): array {
        return  [
            'pri_from' => 'required|',
            'pri_to' => 'required',
            'pri_value' => 'required|numeric',
            'pri_uni_id' => 'integer|required',
        ];
    }
}
