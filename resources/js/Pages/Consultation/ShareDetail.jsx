import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Head } from '@inertiajs/react';

export default function ShareDetail({ share, path }) {
  return (
    <AuthenticatedLayout>
        <Head title="Détails du partage" />

        <div className="flex flex-row gap-4">
            <SidebarCons />
        </div>

        <div className="py-8 ml-60 basis-4/5">
            <div className="max-w-7xl ml-60 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-gray-100 sm:rounded-lg dark:bg-gray-100">
                    <div className="p-6 border-sky-200 font-bold">
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Détails du document partagé</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <Label>Expéditeur</Label>
                                <Input value={share.user?.name || 'Inconnu'} disabled className="mt-1" />
                            </div>
                            <div>
                                <Label>Destinataire</Label>
                                <Input value={share.share_with?.name || 'Inconnu'} disabled className="mt-1" />
                            </div>
                            <div>
                                <Label>Type d'archive</Label>
                                <Input value={share.typearchive} disabled className="mt-1" />
                            </div>
                            <div>
                                <Label>Date du document</Label>
                                <Input value={share.date_doc} disabled className="mt-1" />
                            </div>
                            <div className="md:col-span-2">
                                <Label>Objet</Label>
                                <Input value={share.description} disabled className="mt-1" />
                            </div>
                            <div className="md:col-span-2">
                                <Label>Note</Label>
                                <Input value={share.note || 'Aucune note'} disabled className="mt-1" />
                            </div>
                        </div>

                        <div className="aspect-[3/4] w-full border border-gray-100 rounded-lg overflow-hidden h-[800px]">
                            <iframe
                                src={path}
                                title="Aperçu du document PDF"
                                width="100%"
                                height="100%"
                                type="application/pdf"
                                className="w-full h-full"
                                style={{ border: 'none' }}
                            >
                                <p>Votre navigateur ne supporte pas l'affichage PDF. <a href={path} target="_blank" rel="noopener noreferrer">Télécharger le PDF</a>.</p>
                            </iframe>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}
