<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reservation extends Model
{
    use HasFactory;

    const CREATED_AT = 'res_created_at';
    const UPDATED_AT = 'res_updated_at';
    protected $primaryKey = 'res_id';
    protected $fillable = [
        'res_start_date',
        'res_end_date',
        'res_adults',
        'res_children',
        'res_beds',
        'res_nights',
        'res_price',
        'res_price_dolar',
        'res_price_final',
        'res_advance_payment',
        'res_status',
        'res_channel',
        'res_comments',
        'res_pro_id',
        'res_gue_id',
        'res_uni_id',
        'res_usu_id',

    ];

    protected function casts(): array {

        return [
            'res_start_date' => 'string',
            'res_end_date' => 'string',
            'res_adults' => 'integer',
            'res_children' => 'integer',
            'res_beds' => 'integer',
            'res_nights' => 'integer',
            'res_price' => 'float',
            'res_price_dolar' => 'float',
            'res_price_final' => 'float',
            'res_advance_payment' => 'float',
            'res_status' => 'string',
            'res_channel' => 'string',
            'res_comments' => 'string',
            'res_pro_id' => 'integer',
            'res_gue_id' => 'integer',
            'res_uni_id' => 'integer',
            'res_usu_id' => 'integer',
        ];
    }


    public function guest(): HasOne
    {
        return $this->hasOne(Guest::class, 'gue_id', 'res_gue_id');
    }

    public function unit(): HasOne
    {
        return $this->hasOne(Unit::class,'uni_id', 'res_uni_id');
    }

    public function promotion(): HasOne
    {
        return $this->hasOne(Promotion::class,'pro_id', 'res_pro_id');
    }

    public function prices(): HasMany
    {
        return $this->hasMany(Price::class,'pri_id', 'res_pro_id');
    }

    public function getBeautyDates(){
        $startDate = Carbon::createFromFormat('Y-m-d',$this->res_start_date);
        $endDate = Carbon::createFromFormat('Y-m-d',$this->res_end_date);
        return $startDate->isoFormat('D MMM')." - ".$endDate->isoFormat('D MMM YYYY');
    }

    public function updateByStatus(){

        $resId = $this->res_id;
        $checkIn = $this->res_start_date;
        $checkOut = $this->res_end_date;
        $uniId = $this->res_uni_id;
        $usuId = $this->res_usu_id;

        if($this->res_status == 'approved'){
            Price::where('pri_date', '>=' ,$checkIn)
                ->where('pri_date', '<' ,$checkOut)
                ->where('pri_uni_id',$uniId)
                ->where('pri_usu_id',$usuId)
                ->update(
                    ['pri_res_id' => $resId]
                );
        }else{
            Price::where('pri_res_id', $resId)->update(['pri_res_id' => 0]);
        }
    }
}
