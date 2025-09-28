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
                ->take(4)
                ->get(['id', 'name', 'slug', 'price', 'images', 'stock_status']),
            'brands' => Brand::where('status', 'active')
                ->take(6)
                ->get(['id', 'name', 'logo']),
        ]);
    }
}
