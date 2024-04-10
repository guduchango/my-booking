<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reservation extends Model
{
    use HasFactory;

    const CREATED_AT = 'res_created_at';
    const UPDATED_AT = 'res_updated_at';
    protected $primaryKey = 'res_id';


    public function guest(): HasOne
    {
        return $this->hasOne(Guest::class, 'gue_id', 'res_gue_id');
    }

    public function unit(): HasOne
    {
        return $this->hasOne(Unit::class,'uni_id', 'res_uni_id');
    }
}
