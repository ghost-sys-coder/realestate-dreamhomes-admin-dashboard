/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

type Inquiry = {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  source: string;
  status: "New" | "Contacted" | "Site Visit" | "Qualified" | "Converted" | "Lost";
  agent: string;
};

const mockData: Inquiry[] = [
  {
    id: "inq-001",
    date: "2026-01-07",
    name: "Dr. Sarah Nakato",
    email: "sarah.nakato@example.com",
    phone: "+256 772 123456",
    property: "Cadenza Residences - 3BR Penthouse",
    source: "Website Form",
    status: "New",
    agent: "Unassigned",
  },
  {
    id: "inq-002",
    date: "2026-01-06",
    name: "Mr. James Okello",
    email: "jokello@business.ug",
    phone: "+256 701 987654",
    property: "Nakasero Luxury Apartment",
    source: "Facebook Ads",
    status: "Contacted",
    agent: "Aisha Namagembe",
  },
  {
    id: "inq-003",
    date: "2026-01-05",
    name: "Eng. Peter Mwanga",
    email: "pmwanga@gmail.com",
    phone: "+256 782 555444",
    property: "Cadenza Residences - 2BR",
    source: "Referral",
    status: "Site Visit",
    agent: "Aisha Namagembe",
  },
  {
    id: "inq-004",
    date: "2026-01-04",
    name: "Ms. Grace Kizza",
    email: "gracekizza@outlook.com",
    phone: "+256 750 111222",
    property: "Kololo Villa",
    source: "Google Ads",
    status: "Qualified",
    agent: "John Ssemanda",
  },
  {
    id: "inq-005",
    date: "2026-01-03",
    name: "Mr. Ahmed Khalil",
    email: "ahmed.khalil@invest.ug",
    phone: "+256 777 888999",
    property: "Cadenza Residences - Studio",
    source: "Website Form",
    status: "Converted",
    agent: "John Ssemanda",
  },
  {
    id: "inq-006",
    date: "2026-01-03",
    name: "Mr. Ahmed Khalil",
    email: "ahmed.khalil@invest.ug",
    phone: "+256 777 888999",
    property: "Cadenza Residences - Studio",
    source: "Website Form",
    status: "Converted",
    agent: "John Ssemanda",
  },
  {
    id: "inq-007",
    date: "2026-01-03",
    name: "Mr. Ahmed Khalil",
    email: "ahmed.khalil@invest.ug",
    phone: "+256 777 888999",
    property: "Cadenza Residences - Studio",
    source: "Website Form",
    status: "Converted",
    agent: "John Ssemanda",
  },
  {
    id: "inq-008",
    date: "2026-01-03",
    name: "Mr. Ahmed Khalil",
    email: "ahmed.khalil@invest.ug",
    phone: "+256 777 888999",
    property: "Cadenza Residences - Studio",
    source: "Website Form",
    status: "Converted",
    agent: "John Ssemanda",
  },
];

const statusBadgeVariant = {
  New: "destructive",
  Contacted: "secondary",
  "Site Visit": "default",
  Qualified: "outline",
  Converted: "default",
  Lost: "destructive",
} as const;

export default function InquiriesPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Inquiry>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => new Date(row.getValue("date")).toLocaleDateString("en-GB"),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "property",
      header: "Interested Property",
    },
    {
      accessorKey: "source",
      header: "Source",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof statusBadgeVariant;
        return <Badge variant={statusBadgeVariant[status] as any}>{status}</Badge>;
      },
    },
    {
      accessorKey: "agent",
      header: "Assigned Agent",
    },
    {
      id: "actions",
      cell: ({}) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Assign Agent</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: mockData,
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

  // Summary calculations (updated for today's date: Jan 07, 2026)
  const total = mockData.length;
  const newToday = mockData.filter((i) => i.date === "2026-01-07").length;
  const pending = mockData.filter((i) => ["New", "Contacted"].includes(i.status)).length;
  const converted = mockData.filter((i) => i.status === "Converted").length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
        <p className="text-muted-foreground">
          Manage and track all property inquiries for Vaal Properties.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Follow-up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{converted}</div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Input
          placeholder="Search by name or email..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Select
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) =>
              table.getColumn("status")?.setFilterValue(value || undefined)
            }
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Site Visit">Site Visit</SelectItem>
              <SelectItem value="Qualified">Qualified</SelectItem>
              <SelectItem value="Converted">Converted</SelectItem>
              <SelectItem value="Lost">Lost</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id === "select" ? "Select" : column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
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
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No inquiries found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}