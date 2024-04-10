<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    const CREATED_AT = 'cur_created_at';
    const UPDATED_AT = 'cur_updated_at';

    protected $primaryKey = 'cur_id';
    protected $table = 'currencies';

}
