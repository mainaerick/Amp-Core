<?php

namespace App\Exports;

use App\Models\Category;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class CategoriesExport implements FromCollection, WithHeadings
{
    protected $ids;

    public function __construct(array $ids = [])
    {
        $this->ids = $ids;
    }

    public function collection()
    {
        return Category::whereIn('id', $this->ids)
            ->get(['id', 'name', 'slug', 'description', 'status', 'created_at']);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Slug',
            'Description',
            'Status',
            'Created At',
        ];
    }
}
