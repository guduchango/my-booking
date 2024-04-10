<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reservation extends Model
{
    use HasFactory;

    const CREATED_AT = 'res_createdAt';
    const UPDATED_AT = 'res_updatedAt';
    protected $primaryKey = 'res_id';


    public function guest(): HasOne
    {
        return $this->hasOne(Guest::class);
    }

    public function unit(): HasOne
    {
        return $this->hasOne(Unit::class);
    }
}
