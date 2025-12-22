/* eslint-disable react-hooks/incompatible-library */
"use client";
import React, { useState } from 'react'
import {
    flexRender, getCoreRowModel, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '../ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table';
import Image from 'next/image';
import { Badge } from '../ui/badge';

export const columns: ColumnDef<TablePropertyCard>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
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
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => {
            const images = row.getValue("images") as string[];
            return images?.[0] ? (
                <Image src={images[0]} alt='Property' width={80} height={60} className='object-cover' />
            ) : (
                <div className="bg-muted w-20 h-16 rounded-md" />
            )
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: ({ row }) => {
            const title = row.getValue("title") as string;

            return (
                <div className="lowercase">
                    {title.length > 8 ? `${title.substring(0, 8)}...` : title}
                </div>
            )
        }
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <Badge variant="secondary">{row.original.type}</Badge>,
    },
    {
        accessorKey: "purpose",
        header: "Purpose",
        cell: ({ row }) => (
            <Badge variant={row.original.purpose === "sale" ? "default" : "outline"}>
                {row.original.purpose === "sale" ? "For Sale" : row.original.purpose === "rent" ? "For Rent" : "Sale/Rent"}
            </Badge>
        )
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Price (UGX)
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));

            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "UGX",
            }).format(amount);

            return <div className="font-medium">{formatted}</div>
        }
    },
    {
        accessorKey: "location",
        header: "Location"
    },
    // {
    //     accessorKey: "bedrooms",
    //     header: "Bedrooms",
    //     cell: ({ row }) => row.original.bedrooms || "-"
    // },
    // {
    //     accessorKey: "bathrooms",
    //     header: "Bathrooms",
    //     cell: ({ row }) => row.original.bathrooms || "-"
    // },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const isActive = row.original.status === "active";

            return (
                <Badge variant={isActive ? "default" : "secondary"}>
                    {row.original.status}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        cell: () => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        >
                            <Eye className='mr-2 h-4 w-4' />
                            <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Edit className='mr-2 h-4 w-4' />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Trash className='mr-2 h-4 w-4' />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]



const PropertiesTable = ({ data }: { data: TablePropertyCard[] }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

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
    });




    return (
        <div className='w-full'>
            <div className="flex items-center py-4 gap-2">
                <Input
                    placeholder="Filter title..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
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
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PropertiesTable