<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    const CREATED_AT = 'uni_created_at';
    const UPDATED_AT = 'uni_updated_at';
    protected $primaryKey = 'uni_id';
    protected $table = 'units';
    protected $fillable = [
        'uni_name',
        'uni_max_people',
        'uni_single_bed',
        'uni_double_bed',
        'uni_rooms',
        'uni_usu_id'
    ];

    protected function casts(): array {

        return [
            'uni_name' => 'string',
            'uni_max_people' => 'integer',
            'uni_single_bed' => 'integer',
            'uni_double_bed' => 'integer',
            'uni_rooms' => 'integer',
            'uni_usu_id' => 'integer',
        ];
    }
}
