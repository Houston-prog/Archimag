import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage, router } from "@inertiajs/react";
import React, { useState, useMemo } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import { Input } from '@/Components/ui/input';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/Components/ui/pagination';
import SidebarCons from "@/Components/SidebarCons";
import SidebarHisto from "@/Components/SidebarHisto";

export default function Historique() {
    const pageProps = usePage().props || {};
    const historiquesProp = pageProps.historiques ?? [];

    // Normaliser le format: paginator vs simple array
    const paginator = historiquesProp && historiquesProp.data ? historiquesProp : null;
    const rows = paginator ? paginator.data : (Array.isArray(historiquesProp) ? historiquesProp : []);

    const [filters, setFilters] = useState({
        type: '',
        date_from: '',
        date_to: '',
        per_page: 15,
    });

    const applyFilters = (extra = {}) => {
        const data = {
            type: filters.type || undefined,
            date_from: filters.date_from || undefined,
            date_to: filters.date_to || undefined,
            per_page: filters.per_page || undefined,
            ...extra,
        };

        router.get(window.location.pathname, data, { preserveState: true, replace: true });
    };

    const handleExport = () => {
        const params = new URLSearchParams();
        if (filters.type) params.set('type', filters.type);
        if (filters.date_from) params.set('date_from', filters.date_from);
        if (filters.date_to) params.set('date_to', filters.date_to);
        if (filters.per_page) params.set('per_page', filters.per_page);
        params.set('export', 'csv');

        window.location = `${window.location.pathname}?${params.toString()}`;
    };

    const pageLinks = useMemo(() => (paginator && paginator.links) ? paginator.links : [], [paginator]);

    return (
        <AuthenticatedLayout>

            <div className="flex flex-row justify-between">

                <div className="basis-1/4">
                    <SidebarHisto />
                </div>

                <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                    <div className="p-4 bg-white">
                        <h1 className="text-2xl text-blue-600 font-semibold mb-4 py-8">
                            Historique des consultations
                        </h1>

                        <div className="mb-4 flex flex-wrap gap-2 items-end">
                            <div className="w-48">
                                <label className="block text-sm text-muted-foreground mb-1">Type / Action</label>
                                <Input value={filters.type} onChange={(e) => setFilters(f => ({...f, type: e.target.value}))} />
                            </div>
                            <div className="w-48">
                                <label className="block text-sm text-muted-foreground mb-1">Date depuis</label>
                                <Input type="date" value={filters.date_from} onChange={(e) => setFilters(f => ({...f, date_from: e.target.value}))} />
                            </div>
                            <div className="w-48">
                                <label className="block text-sm text-muted-foreground mb-1">Date jusqu'à</label>
                                <Input type="date" value={filters.date_to} onChange={(e) => setFilters(f => ({...f, date_to: e.target.value}))} />
                            </div>
                            <div className="w-32">
                                <label className="block text-sm text-muted-foreground mb-1">Par page</label>
                                <Input type="number" min={1} value={filters.per_page} onChange={(e) => setFilters(f => ({...f, per_page: e.target.value}))} />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={() => applyFilters()}>Filtrer</Button>
                                <Button variant="outline" onClick={() => { setFilters({ type: '', date_from: '', date_to: '', per_page: 15 }); applyFilters({ page: 1 }); }}>Réinitialiser</Button>
                                <Button variant="secondary" onClick={handleExport}>Exporter CSV</Button>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Objet</TableHead>
                                    <TableHead>Détails</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4}>Aucune activité trouvée.</TableCell>
                                    </TableRow>
                                ) : (
                                    rows.map((h) => (
                                        <TableRow key={h.id}>
                                            <TableCell>{h.created_at ?? h.createdAt ?? ''}</TableCell>
                                            <TableCell>{h.action ?? h.type ?? ''}</TableCell>
                                            <TableCell>{h.subject ?? h.model ?? ''}</TableCell>
                                            <TableCell className="max-w-xl truncate">{h.details ?? h.description ?? JSON.stringify(h.meta ?? '')}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>

                        {pageLinks.length > 0 && (
                            <div className="mt-4">
                                <Pagination>
                                    <PaginationContent>
                                        {pageLinks.map((link, idx) => (
                                            <PaginationItem key={idx}>
                                                {link.url ? (
                                                    <PaginationLink
                                                        href="#"
                                                        isActive={link.active}
                                                        onClick={(e) => { e.preventDefault(); router.get(link.url, {}, { preserveState: true, replace: true }); }}
                                                    >
                                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                                    </PaginationLink>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center h-9 w-9">{link.label}</span>
                                                )}
                                            </PaginationItem>
                                        ))}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
