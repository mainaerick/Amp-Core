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
import { ArrowUpDown, MoreHorizontal, Edit, Trash, Eye, ExternalLink } from "lucide-react"

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
const data: Dealer[] = [
    {
        id: "DEALER-1001",
        name: "SoundWave Audio Center",
        location: "New York, NY",
        region: "East",
        phone: "+1 (212) 555-7890",
        email: "contact@soundwaveaudio.com",
        website: "https://soundwaveaudio.com",
        status: "active",
    },
    {
        id: "DEALER-1002",
        name: "Premium Sound Systems",
        location: "Los Angeles, CA",
        region: "West",
        phone: "+1 (310) 555-1234",
        email: "info@premiumsound.com",
        website: "https://premiumsound.com",
        status: "active",
    },
    {
        id: "DEALER-1003",
        name: "Audio Excellence",
        location: "Chicago, IL",
        region: "North",
        phone: "+1 (312) 555-9876",
        email: "sales@audioexcellence.com",
        website: "https://audioexcellence.com",
        status: "active",
    },
    {
        id: "DEALER-1004",
        name: "Sound Innovations",
        location: "Houston, TX",
        region: "South",
        phone: "+1 (713) 555-4321",
        email: "contact@soundinnovations.com",
        website: "https://soundinnovations.com",
        status: "inactive",
    },
    {
        id: "DEALER-1005",
        name: "Acoustic Solutions",
        location: "Miami, FL",
        region: "South",
        phone: "+1 (305) 555-8765",
        email: "info@acousticsolutions.com",
        website: "https://acousticsolutions.com",
        status: "active",
    },
    {
        id: "DEALER-1006",
        name: "Elite Audio Systems",
        location: "Seattle, WA",
        region: "West",
        phone: "+1 (206) 555-2345",
        email: "sales@eliteaudio.com",
        website: "https://eliteaudio.com",
        status: "active",
    },
    {
        id: "DEALER-1007",
        name: "Sound Perfection",
        location: "Boston, MA",
        region: "East",
        phone: "+1 (617) 555-6789",
        email: "contact@soundperfection.com",
        website: "https://soundperfection.com",
        status: "active",
    },
    {
        id: "DEALER-1008",
        name: "Audio Experts",
        location: "Denver, CO",
        region: "West",
        phone: "+1 (303) 555-3456",
        email: "info@audioexperts.com",
        website: "https://audioexperts.com",
        status: "inactive",
    },
    {
        id: "DEALER-1009",
        name: "Sound Spectrum",
        location: "Atlanta, GA",
        region: "South",
        phone: "+1 (404) 555-7654",
        email: "sales@soundspectrum.com",
        website: "https://soundspectrum.com",
        status: "active",
    },
    {
        id: "DEALER-1010",
        name: "Global Audio Solutions",
        location: "Toronto, Canada",
        region: "International",
        phone: "+1 (416) 555-8901",
        email: "contact@globalaudio.com",
        website: "https://globalaudio.com",
        status: "active",
    },
]

type Dealer = {
    id: string
    name: string
    location: string
    region: string
    phone: string
    email: string
    website: string
    status: "active" | "inactive"
}

export function DealersTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const columns: ColumnDef<Dealer>[] = [
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
                        Dealer Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => <div>{row.getValue("location")}</div>,
        },
        {
            accessorKey: "region",
            header: "Region",
            cell: ({ row }) => <div>{row.getValue("region")}</div>,
        },
        {
            accessorKey: "phone",
            header: "Phone",
            cell: ({ row }) => <div>{row.getValue("phone")}</div>,
        },
        {
            accessorKey: "website",
            header: "Website",
            cell: ({ row }) => (
                <a
                    href={row.getValue("website")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                >
                    Visit
                    <ExternalLink className="ml-1 h-3 w-3" />
                </a>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string
                return (
                    <Badge variant={status === "active" ? "default" : "secondary"}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const dealer = row.original

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
                                <Link href={`/admin/dealers/${dealer.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/dealers/${dealer.id}/edit`}>
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
                                    No dealers found.
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
