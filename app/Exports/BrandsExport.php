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
        return Brand::whereIn('id', $this->ids)
            ->get(['id', 'name', 'slug', 'status', 'created_at']);
    }
    public function headings(): array
    {
        return [
            'ID',
            'Name',
            'Slug',
            'Status',
            'Created At',
        ];
    }
}
