<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    const CREATED_AT = 'pro_createdAt';
    const UPDATED_AT = 'pro_updatedAt';
    protected $primaryKey = 'pro_id';
}
