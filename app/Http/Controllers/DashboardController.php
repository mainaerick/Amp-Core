<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return inertia('Admin/Dashboard/Index', [
            'stats' => [
                'products' => Product::count(),
                'categories' => Category::count(),
                'brands' => Brand::count(),
                'low_stock' => Product::where('stock_quantity', '<', 5)->count(),
            ],
            'recent_products' => Product::latest()->take(5)->get(['id','name','price','stock_status']),
            'recent_categories' => Category::latest()->take(5)->get(['id','name','status']),
            'recent_brands' => Brand::latest()->take(5)->get(['id','name','status']),
        ]);
    }
}
