import DangerButton from '@/Components/DangerButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Sidebar from '@/Components/Sidebar'
import SubmitButton from '@/Components/SubmitBtn'
import Textarea from '@/Components/Textarea'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CloseButton } from '@headlessui/react'
import { useForm, usePage } from '@inertiajs/react'
import { SquarePen, Trash, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function Emplacement() {
    const { data, setData, post, processing, errors, reset } = useForm({
        sigle: '',
        nom: '',
        sous_direction: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();

        toast("Groupe d'accès créé avec succès.", {
            type: "success",
            action: {
                label: <CloseButton />
            }
        })

        post(route('groupeacces.store'), {
            onFinish: () => reset('sigle', 'nom', 'sous_direction', 'description'),
        });
    };

  return (
    <AuthenticatedLayout>
        <div className='flex flex-row justify-between'>

            <div className='basis-1/4'>
                <Sidebar />
            </div>

            <div className='basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6'>
                <div className="py-8">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                                <div className="p-6 border-sky-200 creation-title font-bold">
                                Nouveau groupe d'accès
                            </div>

                            <form onSubmit={submit} className="mx-6">

                                <div className="w-full">
                                        <div className="inline-flex relative">
                                            <InputLabel htmlFor="sigle" value="Sigle:"/>
                                            <span className="text-red-500">
                                                &nbsp;*
                                            </span>
                                        </div>

                                        <TextInput
                                            id="sigle"
                                            type="text"
                                            name="sigle"
                                            value={data.sigle}
                                            className="mt-1 block w-full"
                                            autoComplete="sigle"
                                            isFocused={true}
                                            onChange={(e) => setData('sigle', e.target.value)}
                                        />
                                    </div>

                                <div className="py-4 w-full">
                                    <div className="inline-flex relative">
                                        <InputLabel htmlFor="nom" value="Direction/Service:"/>
                                            <span className="text-red-500">
                                                &nbsp;*
                                            </span>
                                        </div>

                                        <TextInput
                                            id="nom"
                                            type="text"
                                            name="nom"
                                            value={data.nom}
                                            className="mt-1 block w-full"
                                            autoComplete="nom"
                                            isFocused={true}
                                            onChange={(e) => setData('nom', e.target.value)}
                                        />
                                    </div>

                                <div className="py-4 w-full">
                                    <div className="inline-flex relative">
                                        <InputLabel htmlFor="sous_direction" value="Sous Direction/Service:"/>
                                            <span className="text-red-500">
                                                &nbsp;*
                                            </span>
                                        </div>

                                        <TextInput
                                            id="sous_direction"
                                            type="text"
                                            name="sous_direction"
                                            value={data.sous_direction}
                                            className="mt-1 block w-full"
                                            autoComplete="sous_direction"
                                            isFocused={true}
                                            onChange={(e) => setData('sous_direction', e.target.value)}
                                        />
                                    </div>

                                <div className="py-4 w-full">
                                    <div className="inline-flex relative">
                                        <InputLabel htmlFor="description" value="Description de l'emplacement:"/>
                                                <span className="text-red-500">
                                                    &nbsp;*
                                                </span>
                                        </div>

                                        <Textarea
                                            id="description"
                                            name="description"
                                            value={data.description}
                                            placeholder="Description"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                        />
                                    </div>

                                <div className="py-4 w-full">
                                    <span className="italic">
                                        <span className="text-red-500">(*)</span> Tous les champs sont obligatoires
                                    </span>
                                </div>

                                <div className="flex items-center justify-between py-2 my-4 gap-4">
                                    <div className="w-1/2 sm:w-auto">
                                        <DangerButton className="w-full sm:w-auto">
                                            <Trash2 size={20} />&nbsp;&nbsp;Annuler
                                        </DangerButton>
                                    </div>
                                    <div className="w-1/2 sm:w-auto flex items-center justify-end">
                                        <SubmitButton className="w-full sm:w-auto">
                                            <SquarePen size={20}/> &nbsp;&nbsp;Valider
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
