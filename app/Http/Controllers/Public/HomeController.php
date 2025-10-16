<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;

class HomeController extends Controller
{
    public function index()
    {
        return inertia('Public/Home/Index', [
            'categories' => Category::where('status', 'active')
                ->take(5)
                ->get(['id', 'name', 'slug', 'description', 'logo']),

            'featured_products' => Product::where('is_new', true)
                ->with(['images' => function ($q) {
                    $q->select('id', 'product_id', 'path');
                }])
                ->take(4)
                ->get(['id', 'name', 'slug', 'price', 'stock_status'])
                ->map(function ($product) {
                    $product->image_urls = $product->images->map(fn ($img) => asset('storage/' . $img->path));
                    return $product;
                }),

            'brands' => Brand::where('status', 'active')
                ->take(6)
                ->get(['id', 'name', 'logo']),
        ]);
    }
}
