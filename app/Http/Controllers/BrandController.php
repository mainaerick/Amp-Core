<?php

namespace App\Http\Controllers;

use App\Exports\BrandsExport;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Brands/Index', [
            'brands' => Brand::withCount('products')->paginate(10)
        ]);
    }

    /**
     * Show the form fo creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Brands/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|unique:brands,slug',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'logo' => 'nullable|image|max:2048',
        ]);

        $data['id'] = 'BRAND-' . strtoupper(Str::random(6));
        if (!$data['slug']) {
            $data['slug'] = Str::slug($data['name']);
        }

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('brands', 'public');
        }

        Brand::create($data);

        return redirect()->route('admin.brands.index')->with('success', 'Brand created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $brand = Brand::findOrFail($id);
        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $brand = Brand::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:brands,slug,' . $brand->id . ',id',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'logo_file' => 'nullable|image|max:2048',
        ]);

        $data = $validator->validate();

        if ($request->hasFile('logo_file')) {
            // delete old logo if exists
            if ($brand->logo && Storage::disk('public')->exists($brand->logo)) {
                Storage::disk('public')->delete($brand->logo);
            }
            $data['logo'] = $request->file('logo_file')->store('brands', 'public');
        }

        $brand->update($data);

        return redirect()->route('admin.brands.index')->with('success', 'Brand updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        $brand = Brand::findOrFail($id);
        if ($brand->logo && Storage::disk('public')->exists($brand->logo)) {
            Storage::disk('public')->delete($brand->logo);
        }

        $brand->delete();

        return back()->with('success', 'Brand deleted successfully.');
    }
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Brand::whereIn('id', $ids)->delete();

        return back()->with('success', 'Selected brands deleted successfully.');
    }
    public function bulkExport(Request $request)
    {
        $ids = $request->query('ids', []);
        return Excel::download(new BrandsExport($ids), 'brands.xlsx');
    }
}
