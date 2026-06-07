import DangerButton from '@/Components/DangerButton'
import InputLabel from '@/Components/InputLabel'
import Sidebar from '@/Components/Sidebar'
import SubmitButton from '@/Components/SubmitBtn'
import Textarea from '@/Components/Textarea'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm } from '@inertiajs/react'
import { SquarePen, Trash2 } from 'lucide-react'
import { CloseButton } from '@headlessui/react'
import { toast } from 'sonner'

export default function Emplacement() {
    const { data, setData, post, processing, errors, reset } = useForm({
        magasin: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();

        toast("Emplacement créé avec succès.", {
            type: "success",
            action: {
                label: <CloseButton />
            }
        })

        post(route('emplacement.store'), {
            onFinish: () => reset('magasin', 'description'),
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
                                Nouvel emplacement
                            </div>

                            <form onSubmit={submit} className="mx-6">
                                <div className="w-full">
                                    <div className="inline-flex relative">
                                        <InputLabel htmlFor="magasin" value="Magasin:"/>
                                        <span className="text-red-500">
                                            &nbsp;*
                                        </span>
                                    </div>

                                    <TextInput
                                        id="magasin"
                                        type="text"
                                        name="magasin"
                                        value={data.magasin}
                                        className="mt-1 block w-full"
                                        autoComplete="magasin"
                                        isFocused={true}
                                        onChange={(e) => setData('magasin', e.target.value)}
                                    />
                                </div>

                                <div className="py-8 w-full">
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
