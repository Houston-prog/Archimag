import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SidebarAdmin from '../SidebarAdmin';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function Suspicious({ suspiciousConnections }) {
    const { auth } = usePage().props;

    const formatDate = (dateString) => {
        return format(new Date(dateString), "d MMMM yyyy 'à' HH:mm", { locale: fr });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Connexions Suspectes
                </h2>
            }
        >
            <Head title="Connexions Suspectes" />

            <div className="flex flex-row justify-between">

                <div className='basis-1/4'>
                    <SidebarAdmin />
                </div>

                <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className='text-blue-500 text-2xl m-4 p-4 font-semibold'>
                                Journal des connexions suspectes
                            </div>
                            <div className="p-6 text-gray-900">
                                <div className='w-full p-4 space-y-4'>
                                    <div className='rounded-md border overflow-hidden'>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Adresse IP</TableHead>
                                                    <TableHead>Nom d'hôte</TableHead>
                                                    <TableHead>Localisation</TableHead>
                                                    <TableHead>Tentatives</TableHead>
                                                    <TableHead>Dernière tentative</TableHead>
                                                    <TableHead className="w-[300px]">Agent utilisateur</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {suspiciousConnections.length > 0 ? (
                                                    suspiciousConnections.map((connection, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell className="font-medium">{connection.ip_address}</TableCell>
                                                            <TableCell>{connection.hostname || 'N/A'}</TableCell>
                                                            <TableCell>{connection.location}</TableCell>
                                                            <TableCell>{connection.attempts}</TableCell>
                                                            <TableCell>{formatDate(connection.last_attempt_at)}</TableCell>
                                                            <TableCell className="truncate max-w-xs">{connection.user_agent}</TableCell>
                                                        </TableRow>
                                                    ))
                                                ) : (
                                                    <TableRow>
                                                        <TableCell colSpan={6} className='h-24 text-center'>
                                                            Aucune connexion suspecte détectée.
                                                        </TableCell>
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        <p>
                                            <strong>Note:</strong> La détection du nom d'hôte et de la localisation a une fiabilité limitée et dépend de la configuration réseau et de services externes.
                                        </p>
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
