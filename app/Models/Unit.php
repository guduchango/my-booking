<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    const CREATED_AT = 'uni_createdAt';
    const UPDATED_AT = 'uni_updatedAt';
    protected $primaryKey = 'uni_id';
}
