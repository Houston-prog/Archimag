import BreadCrumb from '@/Components/BreadCrumb';
import SidebarCons from '@/Components/SidebarCons'
import { Input } from '@/Components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { Label } from '@/Components/ui/label';
import { Link } from '@inertiajs/react';
import { ArrowBigLeftDashIcon, BackpackIcon } from 'lucide-react';

export default function ViewArchivbyId({ elements, paths  }) {
    const dateFormat = new Date(elements.created_at).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

  return (
    <AuthenticatedLayout>


        <SidebarCons />

        <div className="py-8 md:pl-64 pl-4">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                    <div className="p-6 border-sky-200 creation-title font-bold">

                         <div className='flex flex-row gap-4'>
                            <div className='basis-1/4'>
                                <span className='text-blue-400 font-semibold'>
                                    Liste des documents
                                </span>
                            </div>
                            <div className='basis-3/4'>

                            </div>
                         </div>

                        <div class="py-5">
                            <div className='flex flex-row py-2 my-4 gap-4'>
                                <div className="basis-1/4 mx-8">
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Type d'archives
                                        </Label>
                                        <Input value={elements.typearchive} className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Date de signature
                                        </Label>
                                        <Input value={elements.date_doc} className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Format du document
                                        </Label>
                                        <Input value={elements.format} className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Emplacement physique
                                        </Label>
                                        <Input value={elements.emplacement} className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Emplacement virtuel
                                        </Label>
                                        <Input value={elements.emplacement2} className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Rayon
                                        </Label>
                                        <Input value={elements.rayon} className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Travee
                                        </Label>
                                        <Input value={elements.travee} className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Cote
                                        </Label>
                                        <Input value={elements.cote} className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Cote Définitive
                                        </Label>
                                        <Input value='' className='text-gray-600' disabled/>
                                    </div>
                                    <div className='py-1'>
                                        <Label className='py-4'>
                                            Date de creation
                                        </Label>
                                        <Input value={dateFormat} className='text-gray-600' disabled/>
                                    </div>
                                </div>
                                <div className="basis-3/4 mx-8">
                                    <Card className="max-w-4xl mx-auto">
                                        <CardHeader>
                                            { elements.description }
                                        </CardHeader>
                                        <CardContent>
                                            <div className="aspect-[3/4] w-full border border-gray-300 rounded-lg overflow-hidden">
                                                {/* Use an iframe for native browser PDF preview.
                                                    The 'type="application/pdf"' and 'height/width' attributes are important.
                                                */}
                                                <iframe
                                                    src={ paths }
                                                    title="Aperçu du document PDF"
                                                    width="100%"
                                                    height="100%"
                                                    type="application/pdf"
                                                    className="w-full h-full"
                                                    style={{ border: 'none' }}
                                                >
                                                    {/* Fallback content for browsers that can't render the iframe */}
                                                    <p>Your browser does not support PDF viewing. <a href={elements.filepath} target="_blank" rel="noopener noreferrer">Download the PDF</a> instead.</p>
                                                </iframe>
                                            </div>
                                        </CardContent>
                                    </Card>

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
