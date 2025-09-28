<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function show(Request $request, $slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();

        $query = Product::where('category_id', $category->id);

        // Price filter
        if ($request->filled('min_price') && $request->filled('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        // Stock status filter
        if ($request->filled('stock_status')) {
            $query->where('stock_status', $request->stock_status);
        }

        // Brand filter (array of brand IDs)
        if ($request->filled('brands')) {
            $query->whereIn('brand_id', $request->brands);
        }

        // Sort
        if ($request->filled('sort')) {
            switch ($request->sort) {
                case 'price-asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-desc':
                    $query->orderBy('price', 'desc');
                    break;
                default:
                    $query->latest();
            }
        }

        $products = $query->paginate(12)->withQueryString();

        return inertia('Public/Categories/Show', [
            'category' => $category,
            'products' => $products,
            'filters' => $request->all(),
            'availableBrands' => \App\Models\Brand::select('id', 'name')->get(),
        ]);
    }
}
