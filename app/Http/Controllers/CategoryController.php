<?php

namespace App\Http\Controllers;

use App\Exports\CategoriesExport;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Category::query();

        // Search
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('slug', 'like', '%' . $request->search . '%');
        }

        // Status filter
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Categories/Create',[
            'mode' => 'create',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'logo_file' => 'nullable|image|max:2048',
        ]);

        $data = $validator->validate();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        if ($request->hasFile('logo_file')) {
            $data['logo'] = $request->file('logo_file')->store('categories', 'public');
        }
        // Generate ID like CAT-001
        $data['id'] = 'CAT-' . str_pad(Category::count() + 1, 3, '0', STR_PAD_LEFT);

        Category::create($data);

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $id)
    {
        $category = Category::findOrFail($id);

        return Inertia::render('Admin/Categories/Edit', [
            'mode' => 'edit',
            'category' => $category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug,' . $category->id . ',id',
            'description' => 'nullable|string',
            'status' => 'required|in:active,inactive',
            'logo_file' => 'nullable|image|max:2048',
        ]);

        $data = $validator->validate();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        if ($request->hasFile('logo_file')) {
            // delete old logo if exists
            if ($category->logo && Storage::disk('public')->exists($category->logo)) {
                Storage::disk('public')->delete($category->logo);
            }
            $data['logo'] = $request->file('logo_file')->store('categories', 'public');
        }

        $category->update($data);

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Category::whereIn('id', $ids)->delete();

        return back()->with('success', 'Selected categories deleted successfully.');
    }

    public function bulkExport(Request $request)
    {
        $ids = $request->input('ids', []);
        return Excel::download(new CategoriesExport($ids), 'categories.xlsx');
    }
}
