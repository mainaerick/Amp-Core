<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
//        $query = Product::query()->with('category', 'brand');
        $query = Product::with(['images', 'category', 'brand']);

        // 🔹 Search
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%")
                    ->orWhereHas('brand', fn($b) => $b->where('name', 'like', "%{$searchTerm}%"))
                    ->orWhereHas('category', fn($c) => $c->where('name', 'like', "%{$searchTerm}%"));
            });
        }

        // 🔹 Filters
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('brand')) {
            $query->where('brand_id', $request->brand);
        }

        if ($request->filled('stock_status')) {
            $query->where('stock_status', $request->stock_status);
        }

        if ($request->filled('min_price') && $request->filled('max_price')) {
            $query->whereBetween('price', [$request->min_price, $request->max_price]);
        }

        // 🔹 Sorting
        switch ($request->get('sort')) {
            case 'price-asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price-desc':
                $query->orderBy('price', 'desc');
                break;
            default:
                $query->latest();
        }

        $products = $query->paginate(12)->withQueryString();

        return inertia('Public/Products/Index', [
            'products' => $products,
            'filters' => $request->all(),
            'categories' => Category::select('id', 'name')->get(),
            'brands' => Brand::select('id', 'name')->get(),
        ]);
    }

    public function show($slug)
    {
        $product = Product::with(['images', 'brand', 'category'])
            ->where('slug', $slug)
            ->firstOrFail();
        $category = Category::findOrFail($product->category_id);
        // Fetch related products from same category
        $relatedProducts = Product::with('images')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->take(4)
            ->get();

        return inertia('Public/Products/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'category' => $category,
        ]);
    }
}
