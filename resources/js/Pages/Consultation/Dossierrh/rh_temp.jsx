import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, FileIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/Components/ui/input';

export default function DossierRh({ dossiers }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);

    const columns = [
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
            size: 28,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'id',
            header: ({ column }) => (
                <Button
                    className="flex items-center gap-2 px-2 py-1 bg-white text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    ID
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: 'typearchive',
            header: ({ column }) => (
                <Button
                    className="flex items-center gap-2 px-2 py-1 bg-white text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Type de document
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: 'description',
            header: ({ column }) => (
                <Button
                    className="flex items-center gap-2 px-2 py-1 bg-white text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Nom du personnel
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const item = row.original;
                if (item.filepath) {
                    return (
                        <a
                            href={`/storage/${item.filepath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-blue-500 hover:text-blue-700 hover:underline'
                        >
                            {item.name}
                        </a>
                    );
                }
                return item.name;
            },
        },
        {
            accessorKey: 'departement',
            header: ({ column }) => (
                <Button
                    className="flex items-center gap-2 px-2 py-1 bg-white text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Groupe d'accès
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: 'format',
            header: ({ column }) => (
                <Button
                    className="flex items-center gap-2 px-2 py-1 bg-white text-gray-600 hover:bg-gray-100 rounded"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Format
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            ),
        },
        {
            id: "view",
            header: 'Visualiser',
            cell: ({ row }) => {
                const item = row.original;
                if (item.filepath) {
                    return (
                        <a
                            href={`/storage/${item.filepath}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='flex items-center justify-center text-blue-500 hover:text-blue-700'
                        >
                            <FileIcon size={20} />
                        </a>
                    );
                }
                return '-';
            },
            size: 28,
            enableSorting: false,
            enableHiding: false,
        }
    ]

    const table = useReactTable({
        data: dossiers || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <AuthenticatedLayout hideHeader={true}>
            <div className="flex flex-row gap-4">
                <SidebarCons />
            </div>

            <div className="py-8 ml-60 basis-4/5">
                <div className="mx-auto max-w-11xl sm:px-6 lg:px-88">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 creation-title font-bold">
                            <Head title='Dossiers du Personnel' />
                            <div className='container mx-auto p-4'>
                                <h1 className='text-2xl font-semibold mb-4'>
                                    Liste des dossiers du personnel
                                </h1>

                                <div className='w-full p-4 space-y-4'>
                                    <div className="flex items-center justify-between">
                                        <Input
                                            type="text"
                                            placeholder="Filtrer par nom..."
                                            value={(table.getColumn('name')?.getFilterValue() || '')}
                                            onChange={(e) => table.getColumn('name')?.setFilterValue(e.target.value)}
                                            className="px-3 py-2 border border-gray-300 rounded-md max-w-sm"
                                        />
                                    </div>
                                    <div className='rounded-md border overflow-hidden'>
                                        <Table>
                                            <TableHeader>
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                    <TableRow key={headerGroup.id}>
                                                        {headerGroup.headers.map((header) => (
                                                            <TableHead key={header.id}>
                                                                {
                                                                    flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )
                                                                }
                                                            </TableHead>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableHeader>
                                            <TableBody>
                                                {table.getRowModel().rows.length ? (
                                                    table.getRowModel().rows.map((row) => (
                                                        <TableRow key={row.id} className='text-gray-600'>
                                                            {
                                                                row.getVisibleCells().map((cell) => (
                                                                    <TableCell key={cell.id}>
                                                                        {
                                                                            flexRender(
                                                                                cell.column.columnDef.cell,
                                                                                cell.getContext()
                                                                            )
                                                                        }
                                                                    </TableCell>
                                                                ))
                                                            }
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                                                            Aucun dossier trouvé.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            {table.getFilteredSelectedRowModel().rows.length} of{' '}
                                            {table.getFilteredRowModel().rows.length} row(s) shown
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                                className="px-3 py-1 border rounded disabled:opacity-50 bg-teal-400 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-600"
                                            >
                                                Précédent
                                            </Button>
                                            <Button
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                                className="px-3 py-1 border rounded disabled:opacity-50 bg-teal-400 disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-600"
                                            >
                                                Suivant
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
