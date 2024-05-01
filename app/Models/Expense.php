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

    public function unit(): HasOne
    {
        return $this->hasOne(Unit::class,'uni_id', 'exp_uni_id');
    }

}
