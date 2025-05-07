<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dealer extends Model
{
    /** @use HasFactory<\Database\Factories\DealerFactory> */
    use HasFactory;
    protected $fillable = [
        'custom_id',
        'name',
        'location',
        'region',
        'phone',
        'email',
        'website',
        'status',
    ];
}
