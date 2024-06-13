<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    const CREATED_AT = 'pro_created_at';
    const UPDATED_AT = 'pro_updated_at';
    protected $primaryKey = 'pro_id';
    protected $fillable = [
        'pro_name',
        'pro_value'
    ];

    protected function casts(): array {

        return [
            'pro_name' => 'string',
            'pro_value' => 'float'
        ];
    }
}
