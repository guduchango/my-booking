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

    protected $fillable = [
        'cur_country',
        'cur_price',
    ];

    protected function casts(): array {

        return [
            'cur_country' => 'string',
            'cur_price' => 'float',
        ];
    }


}
