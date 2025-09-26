'use client'

import { useState } from 'react'
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState
} from '@tanstack/react-table'
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { router } from '@inertiajs/react'
import { notification } from 'antd'
import { Brand } from '@/Pages/Admin/Brands/Core/types';

interface Props {
    data: Brand[]
}

export function BrandsTable({ data }: Props) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const statusVariantMap: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
        active: "default",
        inactive: "secondary"
    }
    const columns: ColumnDef<Brand>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false
        },
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>
        },
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>
        },
        {
            accessorKey: 'slug',
            header: 'Slug',
            cell: ({ row }) => <div className="text-muted-foreground">{row.getValue('slug')}</div>
        },
        {
            accessorKey: 'products_count',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Products
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => <div>{row.getValue('products_count')}</div>
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const status = row.getValue('status') as string
                return (
                    <Badge variant={statusVariantMap[status] || "secondary"}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                )
            }
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const brand = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                <span onClick={() => router.get(route('admin.brands.edit', brand.id))}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(brand.id)}>
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        }
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    })

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this brand?')) {
            router.delete(route('admin.brands.destroy', id), {
                onSuccess: () => {
                    notification.success({
                        message: 'Brand Deleted',
                        description: 'The brand was successfully deleted.'
                    })
                }
            })
        }
    }

    const selectedIds = table.getSelectedRowModel().flatRows.map((row) => row.original.id)

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return
        if (window.confirm('Are you sure you want to delete selected brands?')) {
            router.post(
                route('admin.brands.bulkDelete'),
                { ids: selectedIds },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setRowSelection({})
                        notification.success({
                            message: 'Selected Brands Deleted',
                            description: 'The brands were successfully deleted.'
                        })
                    }
                }
            )
        }
    }

    const handleBulkExport = async () => {
        if (selectedIds.length === 0) return
        const params = new URLSearchParams()
        selectedIds.forEach((id) => params.append('ids[]', id))
        window.location.href = route('admin.brands.bulkExport') + '?' + params.toString()
    }

    return (
        <div className="w-full">
            {selectedIds.length > 0 && (
                <div className="flex gap-2 mb-4">
                    <Button variant="destructive" onClick={handleBulkDelete} disabled={selectedIds.length === 0}>
                        Delete Selected
                    </Button>
                    <Button variant="outline" onClick={handleBulkExport} disabled={selectedIds.length === 0}>
                        Export Selected
                    </Button>
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No brands found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
