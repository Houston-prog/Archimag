import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, EyeIcon, ChevronDown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/Components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Detail({ results, title, type, searchParams }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [searchValue, setSearchValue] = useState(searchParams?.search || '');

    useEffect(() => {
        if (searchValue === (searchParams?.search || '')) {
            return;
        }

        const debounce = setTimeout(() => {
            router.get(route('dpa.details', { type }), {
                search: searchValue,
                per_page: results.per_page,
            }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchValue, searchParams?.search, results.per_page, type]);

    const handlePerPageChange = (value) => {
        router.get(route('dpa.details', { type }), { ...searchParams, search: searchValue, per_page: value }, { preserveState: true, preserveScroll: true });
    };

    const columns = [
        {
            accessorKey: 'id',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    ID
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: 'description',
            header: ({ column }) => (
                <Button variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Objet de l'archive
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const item = row.original;
                const description = item.description ? item.description.replace(/_/g, ' ') : '';

                if (item.format === 'Document PDF' || item.format === 'Document Papier') {
                    return (
                        <a href={route('touteunite.allunitid', { id: item.id })} className='text-blue-500 hover:text-blue-700 hover:underline whitespace-normal'>
                            {description}
                        </a>
                    );
                }
                return <div className="whitespace-normal">{description}</div>;
            },
        },
        // {
        //     id: "view",
        //     header: 'Visualiser',
        //     cell: ({ row }) => {
        //         const item = row.original;
        //         if (item.format === 'Document Papier') {
        //             return (
        //                 <div className='flex items-center justify-center'>
        //                     <Link href={route('touteunite.allunitid', { id: item.id })} className='text-blue-400 hover:text-blue-600'>
        //                         <EyeIcon size={20} />
        //                     </Link>
        //                 </div>
        //             )
        //         }
        //         return null;
        //     },
        //     enableSorting: false,
        //     enableHiding: false,
        // },
    ];

    const table = useReactTable({
        data: results.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        pageCount: results.last_page,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination: {
                pageIndex: results.current_page - 1,
                pageSize: results.per_page,
            },
        },
        manualPagination: true,
    })

  return (
    <AuthenticatedLayout>
        <Head title={title} />

        <div className="flex flex-row justify-between">

            <div className='basis-1/4'>
                <SidebarCons />
            </div>

            <div className='basis-3/4 mr-24 py-6'>
                <div className="py-8">
                    <div className="mx-auto w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-gray-100 shadow-sm sm:rounded-lg dark:bg-gray-100">
                            <div className="p-6 border-sky-200 font-bold">

                                <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>

                                <div className='w-full p-4 space-y-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-1 items-center gap-2">
                                            <Input
                                                placeholder="Filtrer..."
                                                value={searchValue}
                                                onChange={(event) => setSearchValue(event.target.value)}
                                                className="max-w-sm"
                                            />
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="ml-auto">
                                                    Colonnes <ChevronDown className="ml-2 h-4 w-4" />
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
                                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                                            >
                                                                {column.id === 'typearchive' ? 'Type' : column.id === 'date_doc' ? 'Date' : column.id}
                                                            </DropdownMenuCheckboxItem>
                                                        )
                                                    })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className='rounded-md border overflow-hidden'>
                                        <Table>
                                            <TableHeader>
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                    <TableRow key={headerGroup.id}>
                                                        {headerGroup.headers.map((header) => (
                                                            <TableHead key={header.id}>
                                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                            </TableHead>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableHeader>
                                            <TableBody>
                                                {table.getRowModel().rows.length ? (
                                                    table.getRowModel().rows.map((row) => (
                                                        <TableRow key={row.id} className='text-gray-600'>
                                                            {row.getVisibleCells().map((cell) => (
                                                                <TableCell key={cell.id}>
                                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                                                            Aucun résultat.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-600">
                                            {results.from}-{results.to} sur {results.total} éléments
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <p className="text-sm font-medium">Lignes par page</p>
                                            <Select
                                                value={`${results.per_page}`}
                                                onValueChange={handlePerPageChange}
                                            >
                                                <SelectTrigger className="h-8 w-[70px]">
                                                    <SelectValue placeholder={results.per_page} />
                                                </SelectTrigger>
                                                <SelectContent side="top">
                                                    {[10, 20, 30, 40, 50].map((pageSize) => (
                                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                                            {pageSize}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => results.prev_page_url && router.get(results.prev_page_url, {}, { preserveState: true, preserveScroll: true })}
                                                disabled={!results.prev_page_url}
                                            >
                                                Précédent
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => results.next_page_url && router.get(results.next_page_url, {}, { preserveState: true, preserveScroll: true })}
                                                disabled={!results.next_page_url}
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
        </div>

    </AuthenticatedLayout>
  )
}
