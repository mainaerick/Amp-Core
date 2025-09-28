<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;
    protected $fillable = [
        'id', 'name', 'slug', 'description', 'status',
        'logo',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
    public function getProductCountAttribute()
    {
        return $this->products()->count();
    }
}
