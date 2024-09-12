<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\DB;

class Price extends Model {
    use HasFactory;

    const CREATED_AT = 'pri_created_at';
    const UPDATED_AT = 'pri_updated_at';
    protected $primaryKey = 'pri_id';
    protected $fillable = [
        'pri_date',
        'pri_price',
        'pri_price_dolar',
        'pri_uni_id',
        'pri_res_id',
        'pri_usu_id'
    ];

    protected function casts(): array {

        return [
            'pri_date' => 'string',
            'pri_price' => 'float',
            'pri_price_dolar' => 'float',
            'pri_uni_id' => 'integer',
            'pri_res_id' => 'integer',
            'pri_usu_id' => 'integer',
        ];
    }

    public function unit(): HasOne {
        return $this->hasOne(Unit::class, 'uni_id', 'pri_uni_id');
    }

}
