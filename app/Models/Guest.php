<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    const CREATED_AT = 'gue_createdAt';
    const UPDATED_AT = 'gue_updatedAt';
    protected $primaryKey = 'gue_id';
}
