<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'category_id', 'short_description', 'description', 'price',
        'images', 'specs', 'features', 'demo_video', 'is_new'
    ];

    protected $casts = [
        'images' => 'array',
        'specs' => 'array',
        'features' => 'array',
        'is_new' => 'boolean',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
