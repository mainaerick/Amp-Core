<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // 🔍 Search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('slug', 'like', '%' . $request->search . '%')
                    ->orWhere('short_description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Filter by stock status
        if ($request->filled('stock_status')) {
            $query->where('stock_status', $request->stock_status);
        }

        // More filters example (featured / published)
        if ($request->boolean('is_featured')) {
            $query->where('is_featured', true);
        }

        if ($request->boolean('is_published')) {
            $query->where('is_published', true);
        }

        return Inertia::render('Admin/Products/Index', [
            'filters' => $request->only(['search', 'category', 'stock_status', 'is_featured', 'is_published']),
            'products' => $query->latest()->paginate(10)->withQueryString(),
            'categories' => Category::all(['id', 'name']), // for select dropdown
        ]);
    }

    public function create()
    {
        $categories = Category::latest()->get();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'brands' => Brand::where('status', 'active')->get()
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'nullable|unique:products,slug',
            'category_id' => 'required',
            'brand_id' => 'required',
            'short_description' => 'required',
            'description' => 'required',
            'price' => 'nullable|numeric',
            'images' => 'nullable|array',
            'specs' => 'required|array',
            'features' => 'nullable|array',
            'demo_video' => 'nullable|url',
            'is_new' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Product created.');
    }

    public function edit( $id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::latest()->get();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'brands' => Brand::where('status', 'active')->get()
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'nullable|unique:products,slug',
            'category_id' => 'required',
            'brand_id'=> 'required',
            'short_description' => 'required',
            'description' => 'required',
            'price' => 'nullable|numeric',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // multiple images
            'specs' => 'required|array',
            'features' => 'nullable|array',
            'demo_video' => 'nullable|url',
            'is_new' => 'boolean',
            'stock_quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'nullable|integer|min:0',
            'stock_status' => 'required|in:in-stock,out-of-stock,on-backorder',
            'track_inventory' => 'boolean',
            'allow_backorders' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $validator->validated();

        $images = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $file) {
                $path = $file->store('products', 'public'); // stored in storage/app/public/products
                $images[] = $path;
            }
        }

        $data['images'] = $images;
        $data['price'] = (float) $data['price'];
        $data['stock_quantity'] = (int) $data['stock_quantity'];
        $data['low_stock_threshold'] = (int) $data['low_stock_threshold'];
        $data['track_inventory'] = (bool) $data['track_inventory'];
        $data['allow_backorders'] = (bool) $data['allow_backorders'];
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

//        dd($data);
        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return back()->with('success', 'Product deleted.');
    }
}
