<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'brand_id',
        'short_description',
        'description',
        'price',
        'images',
        'specs',
        'features',
        'demo_video',
        'is_new',
        'stock_quantity',
        'low_stock_threshold',
        'stock_status',
        'track_inventory',
        'allow_backorders',
    ];

    protected $casts = [
        'images' => 'array',
        'specs' => 'array',
        'features' => 'array',
        'is_new' => 'boolean',
        'price' => 'decimal:2',
        'stock_quantity' => 'integer',
        'low_stock_threshold' => 'integer',
        'track_inventory' => 'boolean',
        'allow_backorders' => 'boolean',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id', 'id');
    }
}
