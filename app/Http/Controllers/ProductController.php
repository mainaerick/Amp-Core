<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'short_description' => 'required',
            'description' => 'required',
            'price' => 'nullable|numeric',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'specs' => 'required|array',
            'features' => 'nullable|array',
            'demo_video' => 'nullable|url',
            'is_new' => 'boolean',
            'stock_quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'nullable|integer|min:0',
            'stock_status' => 'nullable|in:in-stock,out-of-stock,on-backorder',
            'track_inventory' => 'boolean',
            'allow_backorders' => 'boolean',
        ]);


        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $data = $validator->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        // 1. Create product first
        $product = Product::create($data);

        // 2. Save uploaded images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create([
                    'path' => $path,
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created.');
    }


    public function edit( $id)
    {
        $product = Product::with('images')->findOrFail($id);

//        dd($product);
        $categories = Category::latest()->get();
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
            'brands' => Brand::where('status', 'active')->get()
        ]);
    }
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'nullable|unique:products,slug,' . $product->id,
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'short_description' => 'required',
            'description' => 'required',
            'price' => 'nullable|numeric',
            'specs' => 'required|array',
            'features' => 'nullable|array',
            'demo_video' => 'nullable|url',
            'is_new' => 'boolean',
            'stock_quantity' => 'required|integer|min:0',
            'low_stock_threshold' => 'nullable|integer|min:0',
            'stock_status' => 'nullable|in:in-stock,out-of-stock,on-backorder',
            'track_inventory' => 'boolean',
            'allow_backorders' => 'boolean',
            'existing_images' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }
        $data = $validator->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        // 1. Update product fields
        $product->update($data);

        // 2. Handle existing images
        if ($request->filled('existing_images')) {
            // Find images to delete
            $imagesToDelete = $product->images()
                ->whereNotIn('path', $request->existing_images)
                ->get();

            foreach ($imagesToDelete as $img) {
                Storage::disk('public')->delete($img->path); // delete physical file
                $img->delete(); // delete DB row
            }
        } else {
            // Delete all images if none are kept
            foreach ($product->images as $img) {
                Storage::disk('public')->delete($img->path);
                $img->delete();
            }
        }
        // 3. Upload new images
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');

                // Try explicit creation
                $productImage = new \App\Models\ProductImage();
                $productImage->product_id = $product->id;
                $productImage->path = $path;
                $productImage->save();
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated.');
    }


    public function destroy(Product $product)
    {
        $product->delete();

        return back()->with('success', 'Product deleted.');
    }
}
