import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { Button } from "@/components/ui/button";
import { Input } from '@/Components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import SidebarAdmin from '../SidebarAdmin';
import { Checkbox } from "@/components/ui/checkbox";

export default function Password({ users, searchParams }) {
    const { auth } = usePage().props;
    const [rowSelection, setRowSelection] = useState({});
    const [searchValue, setSearchValue] = useState(searchParams?.search || '');

    useEffect(() => {
        if (searchValue === (searchParams?.search || '')) {
            return;
        }

        const debounce = setTimeout(() => {
            router.get(route('admin.password.requests'), {
                search: searchValue,
                per_page: users.per_page,
            }, { preserveState: true, preserveScroll: true, replace: true });
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchValue, searchParams?.search, users.per_page]);

    const handlePerPageChange = (value) => {
        router.get(route('admin.password.requests'), { ...searchParams, search: searchValue, per_page: value }, { preserveState: true, preserveScroll: true });
    };

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
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'id',
            header: 'ID',
        },
        {
            accessorKey: 'name',
            header: 'Nom',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            id: "actions",
            header: 'Actions',
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <div className='flex items-center justify-center'>
                        <Button asChild variant="ghost">
                            <Link href={route('admin.password.edit', { user: user.id })} title="Modifier le mot de passe">
                                <Edit className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                )
            },
        },
    ];

    const table = useReactTable({
        data: users.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        pageCount: users.last_page,
        state: {
            pagination: {
                pageIndex: users.current_page - 1,
                pageSize: users.per_page,
            },
            rowSelection,
        },
        manualPagination: true,
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Gestion des mots de passe
                </h2>
            }
        >
            <Head title="Gestion des mots de passe" />

            <div className="flex flex-row justify-between">

                <div className='basis-1/4'>
                    <SidebarAdmin />
                </div>

                <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className='text-blue-500 text-2xl m-4 p-4 font-semibold'>
                                Gestion des mots de passe oubli&eacute;s
                            </div>
                            <div className="p-6 text-gray-900">

                                <div className='w-full p-4 space-y-4'>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-1 items-center gap-2">
                                            <Input
                                                placeholder="Filtrer par nom ou email..."
                                                value={searchValue}
                                                onChange={(event) => setSearchValue(event.target.value)}
                                                className="max-w-sm"
                                            />
                                        </div>
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
                                                        <TableRow key={row.id}>
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
                                                            Aucun utilisateur trouvé.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-muted-foreground">
                                            {users.from}-{users.to} sur {users.total} résultats
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <p className="text-sm font-medium">Lignes par page</p>
                                            <Select
                                                value={`${users.per_page}`}
                                                onValueChange={handlePerPageChange}
                                            >
                                                <SelectTrigger className="h-8 w-[70px]">
                                                    <SelectValue placeholder={users.per_page} />
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
                                                onClick={() => users.prev_page_url && router.get(users.prev_page_url, {}, { preserveState: true, preserveScroll: true })}
                                                disabled={!users.prev_page_url}
                                            >
                                                Précédent
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => users.next_page_url && router.get(users.next_page_url, {}, { preserveState: true, preserveScroll: true })}
                                                disabled={!users.next_page_url}
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
    );
}
