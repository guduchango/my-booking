<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Price extends Model
{
    use HasFactory;

    const CREATED_AT = 'pri_created_at';
    const UPDATED_AT = 'pri_updated_at';
    protected $primaryKey = 'pri_id';

    public function unit(): HasOne
    {
        return $this->hasOne(Unit::class,'uni_id', 'pri_uni_id');
    }
}
