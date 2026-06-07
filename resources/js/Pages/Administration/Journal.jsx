import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import SidebarAdmin from './SidebarAdmin';
import { useForm, Head, router } from '@inertiajs/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TextInput from '@/Components/TextInput';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";
import { ChevronFirstIcon, ChevronLastIcon } from 'lucide-react';

export default function Journal({ logs, users = [], filters = {} }) {
    const { data, setData, get } = useForm({
        user_id: filters.user_id || '',
        action: filters.action || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('journal'), {
            preserveState: true,
            preserveScroll: true,
        });
    }

    const columns = React.useMemo(() => [
        {
            accessorKey: 'user.name',
            header: 'Utilisateur',
            cell: ({ row }) => row.original.user?.name || 'Système'
        },
        {
            accessorKey: 'action',
            header: 'Action',
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => {
                const item = row.original;
                const description = item.description ? item.description.replace(/_/g, ' ') : '';

                if (item.filepath && item.format === 'Document PDF') {
                    return (
                        <span className='text-blue-500 hover:text-blue-700 hover:underline whitespace-normal'>
                            {description}
                        </span>
                    );
                }
                return <div className="whitespace-normal">{description}</div>;
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Date',
            cell: ({ row }) => {
                return new Date(row.original.created_at).toLocaleString('fr-FR');
            }
        },
    ], []);

    const table = useReactTable({
        data: logs?.data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: logs.last_page,
        state: {
            pagination: {
                pageIndex: logs.current_page - 1,
                pageSize: logs.per_page
            },
        },
        manualPagination: true
    })

  return (
    <AuthenticatedLayout>
        <Head title="Journal d'activité" />
        <div className="flex flex-row justify-between">

            <div className='basis-1/4'>
                <SidebarAdmin/>
            </div>

            <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200">
                            <h2 className='text-2xl font-bold mb-4'>
                                Journal d'activité des utilisateurs
                            </h2>

                            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end mb-6 p-4 border rounded-lg bg-gray-50">
                                <div>
                                    <label htmlFor="user_id" className="block text-sm font-medium text-gray-700 mb-1">Utilisateur</label>
                                    <Select onValueChange={(value) => setData('user_id', value)} value={data.user_id || "all"}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Tous les utilisateurs" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Tous les utilisateurs</SelectItem>
                                            {users.map(user => (
                                                <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                                    <TextInput
                                        id="action"
                                        className="w-full"
                                        value={data.action}
                                        onChange={(e) => setData('action', e.target.value)}
                                        placeholder="ex: création, suppression..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date_from" className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                                    <TextInput
                                        id="date_from"
                                        type="date"
                                        className="w-full"
                                        value={data.date_from}
                                        onChange={(e) => setData('date_from', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date_to" className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                                    <TextInput
                                        id="date_to"
                                        type="date"
                                        className="w-full"
                                        value={data.date_to}
                                        onChange={(e) => setData('date_to', e.target.value)}
                                    />
                                </div>
                                <Button type="submit">Rechercher</Button>
                            </form>

                            <div className='rounded-md border overflow-hidden'>
                                <Table>
                                    <TableHeader>
                                        { table.getHeaderGroups().map((headerGroup) => (
                                            <TableRow key={headerGroup.id}>
                                                { headerGroup.headers.map((header) => (
                                                    <TableHead key={header.id} className="font-bold">
                                                        { flexRender( header.column.columnDef.header, header.getContext() ) }
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHeader>
                                    <TableBody>
                                        { table.getRowModel().rows.length ? (
                                            table.getRowModel().rows.map((row) => (
                                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className='text-gray-600'>
                                                    { row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            { flexRender( cell.column.columnDef.cell, cell.getContext() ) }
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
                            <div className='flex items-center justify-end space-x-2 py-4'>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get(logs.prev_page_url, {}, { preserveState: true, preserveScroll: true })}
                                    disabled={!logs.prev_page_url}
                                >
                                    <ChevronFirstIcon size={15} />
                                    Précédent
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.get(logs.next_page_url, {}, { preserveState: true, preserveScroll: true })}
                                    disabled={!logs.next_page_url}
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

    </AuthenticatedLayout>
  )
}
