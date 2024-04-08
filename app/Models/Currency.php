<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    const CREATED_AT = 'cur_createdAt';
    const UPDATED_AT = 'cur_updatedAt';

    protected $primaryKey = 'cur_id';
    protected $table = 'currencies';

}
