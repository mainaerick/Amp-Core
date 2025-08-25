<?php

namespace App\Http\Controllers;

use App\Exports\CategoriesExport;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::withCount('products')->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
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
    public function store(StoreCategoryRequest $request)
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'slug'        => ['nullable', 'string', 'max:255', 'unique:categories,slug'],
            'description' => ['nullable', 'string'],
            'status'      => ['required', 'in:active,inactive'],
        ]);

        // Auto-generate slug if not given
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // Generate ID like CAT-001
        $validated['id'] = 'CAT-' . str_pad(Category::count() + 1, 3, '0', STR_PAD_LEFT);

        Category::create($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category created successfully.');
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
    public function update(UpdateCategoryRequest $request, $id)
    {
        $category = Category::findOrFail($id);
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:255'],
            'slug'        => ['nullable', 'string', 'max:255', 'unique:categories,slug,' . $category->id . ',id'],
            'description' => ['nullable', 'string'],
            'status'      => ['required', 'in:active,inactive'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $category->update($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category updated successfully.');
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
