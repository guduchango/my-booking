<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    const CREATED_AT = 'gue_created_at';
    const UPDATED_AT = 'gue_updated_at';
    protected $primaryKey = 'gue_id';
    protected $table = 'guests';
}
