import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarCons from '@/Components/SidebarCons';
import { Button } from "@/components/ui/button";
import { Input } from '@/Components/ui/input';
import { ArrowUpDown, EyeIcon } from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DetteEntities({ detteType, entities, detteTypeName }) {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns = [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Nom de l'entité <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: 'category',
            header: "Catégorie",
            cell: ({ row }) => <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100">{row.getValue('category')}</span>
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button asChild variant="outline" size="sm" className="bg-green-400">
                    <Link href={route('dette.entity.details', {
                        detteType: detteType,
                        entityGroup: row.original.category.toLowerCase(),
                        item: row.original.name
                    })}>
                        <EyeIcon className="mr-2 h-4 w-4" /> Voir détails
                    </Link>
                </Button>
            ),
        },
    ];

    const table = useReactTable({
        data: entities,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <AuthenticatedLayout>

            <Head title={`Entités - ${detteTypeName}`} />
            <div className="flex flex-row justify-between">
                <div className='basis-1/4'>
                    <SidebarCons />
                </div>

                <div className='basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6'>
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Liste des Entités : {detteTypeName}</h1>

                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Rechercher une entité..."
                                value={globalFilter ?? ""}
                                onChange={(event) => setGlobalFilter(event.target.value)}
                                className="max-w-sm"
                            />
                        </div>

                        <div className="rounded-md border">
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
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow><TableCell colSpan={columns.length} className="h-24 text-center">Aucun résultat.</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
