<?php

namespace App\Http\Controllers;

use App\Http\Requests\PriceRangeRequest;
use App\Http\Resources\PriceResource;
use App\Models\Price;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PriceController extends Controller
{
    public function index(Request $request)
    {
        return PriceResource::collection(
            Price::where('pri_date', '>=', date('Y-m-d'))
                ->orderBy('pri_created_at', 'desc')
                ->get()
        );
    }

    public function savePriceByRange(PriceRangeRequest $request){

        $pri_from = date('Y-m-d' , strtotime($request->pri_from));
        $pri_to = date('Y-m-d' , strtotime($request->pri_to));
        $pri_uni_id = $request->pri_uni_id;

       $period = new \DatePeriod(new \DateTime($pri_from),
            new \DateInterval('P1D'),
            new \DateTime($pri_to.' +1 day'));

        foreach ($period as $date) {

            $price = DB::table('prices')
                ->where('pri_date', '=', $date)
                ->where('pri_uni_id', '=', $pri_uni_id);

            if($price->count() == 0){
                $price = new Price();
                $price->pri_date = $date;
                $price->pri_price = $request->pri_value;
                $price->pri_uni_id = $request->pri_uni_id;
                $price->save();
            }else {
                $priceOld = $price->first();
                $price = Price::find($priceOld->pri_id);
                $price->pri_date = $date;
                $price->pri_price = $request->pri_value;
                $price->pri_uni_id = $request->pri_uni_id;
                $price->save();
            }
        }

        return PriceResource::collection($price->get());
    }
}
