<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    const CREATED_AT = 'res_createdAt';
    const UPDATED_AT = 'res_updatedAt';
    protected $primaryKey = 'res_id';
}
