<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    use HasFactory;

    const CREATED_AT = 'gue_created_at';
    const UPDATED_AT = 'gue_updated_at';
    protected $primaryKey = 'gue_id';
    protected $table = 'guests';
    protected $fillable = [
        'gue_name',
        'gue_last_name',
        'gue_identity_document',
        'gue_email',
        'gue_phone_number',
        'gue_birthday'
    ];

    public function getAge(){
        return date_diff(date_create($this->gue_birthday), date_create('now'))->y;
    }
}
