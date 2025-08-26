"use client"

import { useState } from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Edit, Trash, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Link } from '@inertiajs/react';

// Sample data
const data: Product[] = [
    {
        id: "PROD-1",
        name: "JBL Premium Speakers",
        category: "Speakers",
        price: 299.99,
        stock: 24,
        status: "in-stock",
    },
    {
        id: "PROD-2",
        name: 'Alpine Subwoofer 12"',
        category: "Subwoofers",
        price: 199.99,
        stock: 18,
        status: "in-stock",
    },
    {
        id: "PROD-3",
        name: "Pioneer 5-Channel Amplifier",
        category: "Amplifiers",
        price: 349.99,
        stock: 12,
        status: "in-stock",
    },
    {
        id: "PROD-4",
        name: "Kenwood Car Stereo",
        category: "Car Audio & Video",
        price: 279.99,
        stock: 8,
        status: "low-stock",
    },
    {
        id: "PROD-5",
        name: "Sony Wireless Speakers",
        category: "Speakers",
        price: 159.99,
        stock: 0,
        status: "out-of-stock",
    },
    {
        id: "PROD-6",
        name: 'JBL Subwoofer 10"',
        category: "Subwoofers",
        price: 149.99,
        stock: 15,
        status: "in-stock",
    },
    {
        id: "PROD-7",
        name: "Alpine Head Unit",
        category: "Car Audio & Video",
        price: 399.99,
        stock: 6,
        status: "low-stock",
    },
    {
        id: "PROD-8",
        name: "Pioneer DJ Speakers",
        category: "Speakers",
        price: 499.99,
        stock: 10,
        status: "in-stock",
    },
    {
        id: "PROD-9",
        name: "Audio Cable Kit",
        category: "Accessories",
        price: 49.99,
        stock: 30,
        status: "in-stock",
    },
    {
        id: "PROD-10",
        name: "Kenwood 2-Channel Amplifier",
        category: "Amplifiers",
        price: 199.99,
        stock: 0,
        status: "out-of-stock",
    },
]

type Product = {
    id: string
    name: string
    category: string
    price: number
    stock: number
    status: "in-stock" | "low-stock" | "out-of-stock"
}
interface Props {
    data:any
}

export function ProductsTable({data}:Props) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const columns: ColumnDef<Product>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Product Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <div>{row.getValue("category")}</div>,
        },
        {
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const price = Number.parseFloat(row.getValue("price"))
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(price)
                return <div>{formatted}</div>
            },
        },
        {
            accessorKey: "stock_quantity",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Stock
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue("stock_quantity")}</div>,
        },
        {
            accessorKey: "stock_status",
            header: "Status",
            cell: ({ row }) => {
                const stock_status = row.getValue("stock_status") as string
                return (
                    <Badge variant={stock_status === "in-stock" ? "default" : status === "low-stock" ? "warning" : "destructive"}>
                        {stock_status === "in-stock" ? "In Stock" : stock_status === "low-stock" ? "Low Stock" : "Out of Stock"}
                    </Badge>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const product = row.original

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
                                <Link href={`/admin/products/${product.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/products/${product.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
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
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
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
