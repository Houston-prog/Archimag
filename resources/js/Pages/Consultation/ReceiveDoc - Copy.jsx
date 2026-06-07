import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, EyeIcon, CheckCircle } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from '@/Components/ui/input';

export default function ReceiveDoc({ results, searchParams }) {
    const { auth } = usePage().props;
    const isSuper = auth.user.roles === 'Super';

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

    useEffect(() => {
        const isSame = searchValue === (searchParams?.description || '');
        if (isSame) return;

        const debounce = setTimeout(() => {
            router.get(route('receive.view'), { description: searchValue }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchValue, searchParams]);

    const handleApprove = (id) => {
        router.post(route('share.approve', id));
    };

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
            header: 'Objet',
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
        {
            accessorKey: 'status',
            header: 'Statut',
            cell: ({ row }) => {
                const status = row.original.status || 'En attente';
                const isApproved = status === 'Approved';
                return (
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {isApproved ? 'Autorisé' : 'En attente'}
                    </span>
                );
            }
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex items-center gap-2">
                        <Link href={route('share.show', item.id)}>
                            <Button variant="ghost" size="icon">
                                <EyeIcon className="h-4 w-4" />
                            </Button>
                        </Link>
                        {isSuper && item.status !== 'Approved' && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleApprove(item.id)}
                                title="Autoriser"
                            >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                        )}
                    </div>
                );
            },
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
    <AuthenticatedLayout hideHeader={true}>
        <div className="flex flex-row gap-4">
            <SidebarCons />
        </div>

        <div className="py-8 ml-60 basis-4/5">
            <div className="max-w-7xl ml-60 sm:px-6 overflow-hidden bg-gray-100 sm:rounded-lg dark:bg-gray-100">
                <div className="">
                    <div className="p-6 border-sky-200 font-semibold">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Dossiers Partagés</h1>

                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Rechercher par objet..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="max-w-sm"
                            />
                        </div>

                        <div className="rounded-md border overflow-hidden w-full mr-auto">
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
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id} className="hover:bg-muted/50 text-gray-600">
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                Aucun résultat.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-end space-x-2 py-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.visit(prev_page_url)}
                                disabled={!prev_page_url}
                            >
                                Précédent
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => router.visit(next_page_url)}
                                disabled={!next_page_url}
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}
