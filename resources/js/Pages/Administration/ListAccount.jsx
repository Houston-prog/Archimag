import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react';
import React, { useMemo, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronFirstIcon, ChevronLastIcon, EyeClosedIcon, EyeIcon, SendIcon } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/Components/ui/pagination';
import BreadcrumbAccount from './BreadcrumbAccount';
import SidebarAdmin from './SidebarAdmin';

export default function ListAccount({ lists }) {
    const handleViewId = (id) => {
        router.visit(`/search/${id}`)
    }

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
            header: 'ID'
        },
        {
            accessorKey: 'name',
            header: 'Noms et Prenoms'
        },
        {
            accessorKey: 'matricule',
            header: 'Matricule'
        },
        {
            accessorKey: 'email',
            header: 'Identifiant'
        },
        {
            accessorKey: 'username',
            header: 'Email'
        },
        {
            accessorKey: 'phone',
            header: 'Telephone'
        },
        {
            accessorKey: 'departement',
            header: 'Service'
        },
        {
            id: "view",
            header: 'Status',
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className='flex gap-2'>
                        <Link href={route('compte')} className='items-center justify-center text-center'>
                            <EyeIcon size={20} className='text-blue-400' />
                        </Link>
                    </div>
                )
            },
            size: 28,
            enableSorting: false,
            enableHiding: false,
        },
    ]

    const table = useReactTable({
        data: lists.data, // les données actuelles de la page
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: lists.last_page, // nombre total de pages
        state: {
            pagination: {
                pageIndex: lists.current_page - 1, // tanstack utilise un index de base 0
                pageSize: lists.per_page
            },
        },
        manualPagination: true //indique que la pagination est manuelle/serveur
    })

  return (
    <AuthenticatedLayout>

        <div className="flex flex-row justify-between">

            <div className='basis-1/4'>
                <SidebarAdmin />
            </div>

            <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 creation-title font-bold">
                            <BreadcrumbAccount />

                            <Head title='Accounts' />
                            <div className='container mx-auto p-4'>

                                <h1 className='text-2xl font-semibold mb-4'>
                                    Liste des utilisateurs
                                </h1>

                                <div className='p-4'>
                                    <div className='rounded-md border overflow-hidden'>
                                        <Table>
                                            <TableHeader>
                                                { table.getHeaderGroups().map((headerGroup) => (
                                                    <TableRow key={headerGroup.id}>
                                                        { headerGroup.headers.map((header) => (
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
                                                { table.getRowModel().rows.length ? (
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
                                                            Aucun resultat.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className='flex flex-row items-center justify-end space-x-2 py-4'>
                                        <div className='basis-1/3 text-gray-600'>
                                            {/* Results per page */}
                                            <div className="">
                                                <Select
                                                    value={table.getState().pagination.pageSize.toString()}
                                                    onValueChange={(value) => {
                                                        table.setPageSize(Number(value))
                                                    }}
                                                    aria-label="Results par page"
                                                >
                                                    <SelectTrigger
                                                        id="results-per-page"
                                                        className="w-fit whitespace-nowrap"
                                                    >
                                                        <SelectValue placeholder="Select number of results" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {[5, 10, 25, 50].map((pageSize) => (
                                                            <SelectItem key={pageSize} value={pageSize.toString()}>
                                                                {pageSize} / page
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        {/* Page number information */}
                                        <div className='basis-1/3'>
                                            <div className="flex grow justify-end text-sm whitespace-nowrap text-muted-foreground">
                                                <p
                                                    className="text-sm whitespace-nowrap text-muted-foreground"
                                                    aria-live="polite"
                                                >
                                                    <span className="text-foreground">
                                                        {table.getState().pagination.pageIndex *
                                                            table.getState().pagination.pageSize +
                                                            1}
                                                        -
                                                        {Math.min(
                                                            Math.max(
                                                            table.getState().pagination.pageIndex *
                                                                table.getState().pagination.pageSize +
                                                                table.getState().pagination.pageSize,
                                                            0
                                                            ),
                                                            table.getRowCount()
                                                        )}
                                                    </span>
                                                    {" "} sur {" "}
                                                    <span className="text-foreground">
                                                        {table.getRowCount().toString()}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className='basis-1/3 flex flex-1 justify-end space-x-4 text-gray-300'>
                                            <div className="flex items-center justify-end space-x-2 py-4 text-gray-800">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => table.previousPage()}
                                                    disabled={!table.getCanPreviousPage()}
                                                >
                                                    <ChevronFirstIcon size={15} />
                                                    Précedent
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => table.nextPage()}
                                                    disabled={!table.getCanNextPage()}
                                                >
                                                    Suivant
                                                    <ChevronLastIcon size={15} />
                                                </Button>
                                            </div>
                                        </div>
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
