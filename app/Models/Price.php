<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    use HasFactory;

    const CREATED_AT = 'pri_createdAt';
    const UPDATED_AT = 'pri_updatedAt';
    protected $primaryKey = 'pri_id';
}
