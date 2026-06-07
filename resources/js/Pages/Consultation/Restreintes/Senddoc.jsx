import BreadCrumb from '@/Components/BreadCrumb';
import SidebarCons from '@/Components/SidebarCons'
import { Input } from '@/Components/ui/input';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { Label } from '@/Components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useForm } from '@inertiajs/react';
import SubmitButton from '@/Components/SubmitBtn';
import { SendIcon } from 'lucide-react';
import Textarea from '@/Components/Textarea';
import { toast } from 'sonner';
import { CloseButton } from '@headlessui/react';

export default function Senddoc({ elements, paths, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        typearchive: elements.typearchive ?? '',
        date_doc: elements.date_doc ?? '',
        description: elements.description ?? '',
        format: elements.format ?? '',
        emplacement: elements.emplacement ?? '',
        emplacement2: elements.emplacement2 ?? '',
        rayon: elements.rayon ?? '',
        travee: elements.travee ?? '',
        cote: elements.cote ?? '',
        departement: elements.departement ?? '',
        share_with: '',
        note: '',
        docarchives_id: elements.id,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('send.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                toast("Document partagé avec succès.", {
                    type: "success",
                    action: {
                        label: <CloseButton />
                    }
                })
            },
        });
    };

  return (
    <AuthenticatedLayout>

        <div className='flex flex-row justify-between'>

            <div className='basis-1/4'>
                <SidebarCons />
            </div>

            <div className="basis-3/4 mr-24 lg:mr-16 sm:mr-auto py-4">
                <div className="py-8">
                    <div className="overflow-hidden w-full bg-gray-100 sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 creation-title font-bold">

                            <div className=''>
                                <p className='text-blue-400 font-semibold'>
                                    Document à partager
                                </p>
                            </div>

                            <form onSubmit={submit}>
                                <div className='py-2 mx-auto w-full gap-4'>
                                    <div className="">
                                        <div className='py-2'>
                                            <Label className='py-4'>
                                                Objet du document
                                            </Label>
                                            <Input
                                                value={data.description}
                                                name="description"
                                                onChange={(e) => setData('description', e.target.value)}
                                                className='text-gray-600'
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-4'>
                                        <div className='basis-1/2'>
                                            <div className='py-1'>
                                                <Label className='py-4'>
                                                    Type d'archives
                                                </Label>
                                                <Input
                                                    value={data.typearchive}
                                                    name="typearchive"
                                                    onChange={(e) => setData('typearchive', e.target.value)}
                                                    className='text-gray-600'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='basis-1/2'>
                                            <div className='py-1'>
                                                <Label className='py-4'>
                                                    Date de signature
                                                </Label>
                                                <Input
                                                    value={data.date_doc}
                                                    name="date_doc"
                                                    onChange={(e) => setData('date_doc', e.target.value)}
                                                    className='text-gray-600'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-4'>
                                        <div className='basis-1/2'>
                                            <div className='py-2'>
                                                <Label className='py-4'>
                                                    Format du document
                                                </Label>
                                                <Input
                                                    value={data.format}
                                                    name="format"
                                                    onChange={(e) => setData('format', e.target.value)}
                                                    className='text-gray-600'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='basis-1/2'>
                                            <div className='py-2'>
                                                <Label className='py-4'>
                                                    Emplacement physique
                                                </Label>
                                                <Input
                                                    value={data.emplacement}
                                                    name="emplacement"
                                                    onChange={(e) => setData('emplacement', e.target.value)}
                                                    className='text-gray-600'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-4'>
                                        <div className='basis-1/2'>
                                            <div className='py-2'>
                                                <Label className='py-4'>
                                                    Emplacement virtuel
                                                </Label>
                                                <Input
                                                    value={data.emplacement2}
                                                    name="emplacement2"
                                                    onChange={(e) => setData('emplacement2', e.target.value)}
                                                    className='text-gray-600'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='basis-1/2'>
                                            <div className='py-2'>
                                                <Label className='py-4'>
                                                    Rayon
                                                </Label>
                                                <Input
                                                    value={data.rayon}
                                                    name="rayon"
                                                    onChange={(e) => setData('rayon', e.target.value)}
                                                    className='text-gray-600'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-row gap-4'>
                                        <div className='basis-1/2'>
                                            <div className='py-2'>
                                                <Label className='py-4'>
                                                    Travee
                                                </Label>
                                                <Input
                                                    value={data.travee}
                                                    name="travee"
                                                    onChange={(e) => setData('travee', e.target.value)}
                                                    className='text-gray-600'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                        <div className='basis-1/2'>
                                            <div className='py-2'>
                                                <Label className='py-4'>
                                                    Cote
                                                </Label>
                                                <Input
                                                    value={data.cote}
                                                    name="cote"
                                                    onChange={(e) => setData('cote', e.target.value)}
                                                    className='text-gray-600'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='py-2 mx-auto w-full gap-4'>
                                    <p className='text-gray-400 font-semibold'>
                                        Partegez le document avec:
                                    </p>
                                </div>

                                <div className='py-2 mx-auto w-full gap-4'>
                                    <div className="[--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]">
                                        <Label htmlFor="share_with">
                                            Utilisateurs:
                                        </Label>

                                        <Select
                                            // Use the `onValueChange` prop to update Inertia's form data
                                            onValueChange={(value) => setData('share_with', value)}
                                            // Set the currently selected value based on the form data
                                            value={data.share_with}
                                            name='share_with'
                                        >
                                            <SelectTrigger id="share_with">
                                                {/* The SelectValue displays the currently selected item's text */}
                                                <SelectValue placeholder="Selectionner le type d'archive..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map((user) => (
                                                    <SelectItem key={user.id} value={String(user.id)}>
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                    </div>
                                </div>

                                <div className='gap-4 ml-64py-2 mx-auto w-full gap-4'>
                                    <div className='py-2'>
                                        <Label className='py-4'>
                                            Note (observation)
                                        </Label>
                                        <Textarea
                                            value={data.note}
                                            name='note'
                                            onChange={(e) => setData('note', e.target.value)}
                                            className='text-gray-600 w-full'
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row py-2 my-4 mx-8 gap-4">
                                    <div className="basis-1/2">

                                    </div>
                                    <div className="basis-1/2 flex justify-end">
                                        <SubmitButton disabled={processing}>
                                            <SendIcon size={20}/> &nbsp;&nbsp;Partager
                                        </SubmitButton>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
