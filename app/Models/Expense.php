<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Expense extends Model
{
    use HasFactory;
    const CREATED_AT = 'exp_created_at';
    const UPDATED_AT = 'exp_updated_at';
    protected $primaryKey = 'exp_id';
    protected $fillable = [
        'exp_uni_id',
        'exp_type',
        'exp_price',
        'exp_price_dolar',
        'exp_date',
        'exp_comments',
    ];


    protected function casts(): array {

        return [
            'exp_uni_id' => 'integer',
            'exp_type' => 'string',
            'exp_price' => 'float',
            'exp_price_dolar' => 'float',
            'exp_date' => 'string',
            'exp_comments' => 'string',
        ];
    }

    public function unit(): HasOne
    {
        return $this->hasOne(Unit::class,'uni_id', 'exp_uni_id');
    }

}
