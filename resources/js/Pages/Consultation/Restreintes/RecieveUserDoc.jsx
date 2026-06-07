import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react';
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, EyeIcon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/Components/ui/input';

export default function RecieveUserDoc({ results, searchParams }) {

    const {
        data = [],
        last_page = 0,
        current_page = 1,
        per_page = 10,
        prev_page_url,
        next_page_url
    } = results || {};

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [searchValue, setSearchValue] = useState(searchParams?.description || '');

    // This useEffect is for live search, which is not explicitly requested but is good practice.
    // I will comment it out for now to stick to the user's request. If they want search, it can be added.
    /*
    useEffect(() => {
        const isSame = searchValue === (searchParams?.description || '');
        if (isSame) return;

        const debounce = setTimeout(() => {
            router.get(route('incoming.docs'), { description: searchValue }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchValue, searchParams]);
    */

    const columns = [
        {
            accessorKey: 'date_doc',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
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
        {
            id: 'sender',
            header: 'Expéditeur',
            cell: ({ row }) => row.original.user?.name || 'Inconnu',
        },
        {
            id: 'recipient',
            header: 'Destinataire',
            cell: ({ row }) => row.original.share_with?.name || 'Inconnu',
        },
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        pageCount: last_page,
        state: {
            sorting,
            columnFilters,
            pagination: {
                pageIndex: current_page - 1,
                pageSize: per_page,
            },
        },
        manualPagination: true,
    });

  return (
    <AuthenticatedLayout>
        <Head title="Documents Entrants" />

        <div className="flex flex-row justify-between">

            <div className='basis-1/4'>
                <SidebarCons />
            </div>

            <div className='basis-3/4 mr-24 lg:mr-16 sm:mr-auto py-6'>
                <div className="">
                    <div className="max-w-7xl sm:px-6 overflow-hidden bg-white sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 font-semibold">
                            <h1 className="text-2xl font-bold mb-6 text-blue-300">
                                Partages Entrants
                            </h1>

                            <div className="rounded-md border overflow-hidden w-full mr-auto">
                                <Table>
                                    <TableHeader>{table.getHeaderGroups().map(headerGroup => (<TableRow key={headerGroup.id}>{headerGroup.headers.map(header => (<TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>))}</TableRow>))}</TableHeader>
                                    <TableBody>
                                        {table.getRowModel().rows?.length ? (table.getRowModel().rows.map(row => (<TableRow key={row.id} className="hover:bg-muted/50 text-gray-600">{row.getVisibleCells().map(cell => (<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>))}</TableRow>))) : (<TableRow><TableCell colSpan={columns.length} className="h-24 text-center">Aucun document entrant approuvé.</TableCell></TableRow>)}
                                    </TableBody>
                                </Table>
                            </div>

                            <div className="flex items-center justify-end space-x-2 py-4">
                                <Button variant="outline" size="sm" onClick={() => router.visit(prev_page_url)} disabled={!prev_page_url}>Précédent</Button>
                                <Button variant="outline" size="sm" onClick={() => router.visit(next_page_url)} disabled={!next_page_url}>Suivant</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
