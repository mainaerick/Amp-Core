<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'slug' => 'nullable|unique:products,slug',
            'category' => 'required',
            'short_description' => 'required',
            'description' => 'required',
            'price' => 'nullable|numeric',
            'images' => 'nullable|array',
            'specs' => 'required|array',
            'features' => 'nullable|array',
            'demo_video' => 'nullable|url',
            'is_new' => 'boolean'
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        Product::create($data);

        return redirect()->route('admin.products.index')->with('success', 'Product created.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required',
            'slug' => 'nullable|unique:products,slug,' . $product->id,
            'category' => 'required',
            'short_description' => 'required',
            'description' => 'required',
            'price' => 'nullable|numeric',
            'images' => 'nullable|array',
            'specs' => 'required|array',
            'features' => 'nullable|array',
            'demo_video' => 'nullable|url',
            'is_new' => 'boolean'
        ]);

        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        $product->update($data);

        return redirect()->route('admin.products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return back()->with('success', 'Product deleted.');
    }
}
