<?php

namespace App\Exports;

use App\Models\Brand;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BrandsExport implements FromCollection, WithHeadings
{
    protected $ids;

    public function __construct($ids)
    {
        $this->ids = $ids;
    }

    public function collection()
    {
        return Brand::withCount('products') // 👈 adds products_count column
        ->whereIn('id', $this->ids)
            ->get(['id', 'name', 'slug', 'status', 'created_at'])
            ->map(function ($brand) {
                return [
                    'id' => $brand->id,
                    'name' => $brand->name,
                    'slug' => $brand->slug,
                    'products_count' => $brand->products_count,
                    'status' => $brand->status,
                    'created_at' => $brand->created_at,

                ];
            });
    }
    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Slug',
            'Products Count',
            'Status',
            'Created At',
        ];
    }
}
