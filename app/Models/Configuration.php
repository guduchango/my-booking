<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuration extends Model
{
    use HasFactory;

    const CREATED_AT = 'con_created_at';
    const UPDATED_AT = 'con_updated_at';

    protected $primaryKey = 'con_id';
    protected $table = 'configurations';

}
