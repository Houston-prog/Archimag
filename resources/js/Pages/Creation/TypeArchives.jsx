import DangerButton from '@/Components/DangerButton'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import Sidebar from '@/Components/Sidebar'
import SubmitButton from '@/Components/SubmitBtn'
import TextInput from '@/Components/TextInput'
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert'
import { Button } from '@/Components/ui/button'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useForm, usePage } from '@inertiajs/react'
import { SquarePen, Trash2, XIcon, CircleCheckIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CloseButton } from '@headlessui/react'
import { cn } from "@/lib/utils"
import { toast } from 'sonner'

export default function TypeArchives() {
    const { data, setData, post, processing, errors, reset } = useForm({
        intitule: '',
        dua:''
    });

    const { flash } = usePage().props;
    const flashMessage = flash?.success || flash?.error;
    const [ showAlert, setShowAlert ] = useState( flashMessage ? true : false );

    useEffect(() => {
        if (flashMessage) {
            const timer = setTimeout(() => setShowAlert(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [flashMessage]);

    const submit = (e) => {
        e.preventDefault();

        toast("Type d'archive créé avec succès.", {
            type: "success",
                action: {
                    label: <CloseButton />
            }
        })

        post(route('typearchives.store'), {
            onFinish: () => reset('intitule', 'dua'),
        });
    };

  return (
    <AuthenticatedLayout>
        <div className='flex flex-row justify-between'>

            <div className='basis-1/4'>
                <Sidebar />
            </div>

            <div className='basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6'>
                <div className="py-8 pl-4">
                    <div className="w-full px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                            <div className="p-6 border-sky-200 creation-title font-bold">
                                Nouveau type d'archives
                            </div>

                            <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4'>
                                { showAlert && flashMessage && (
                                    <Alert className={ flash?.success ? 'bg-green-500' : (flash?.error ? 'bg-red-500' : '') }>
                                        <AlertTitle className='font-bold'>
                                            { flash.success ? 'Success!' : 'Error!'}
                                        </AlertTitle>

                                        <AlertDescription>
                                            { flashMessage }
                                        </AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={submit}>

                                    <div className="mx-auto w-full">
                                        <div className="inline-flex relative">
                                            <InputLabel htmlFor="intitule" value="Intitulé du type:"/>
                                            <span className="text-red-500">
                                                &nbsp;*
                                            </span>
                                        </div>

                                        <TextInput
                                            id="intitule"
                                            type="text"
                                            name="intitule"
                                            value={data.intitule}
                                            className="mt-1 block w-full"
                                            autoComplete="intitule"
                                            isFocused={true}
                                            onChange={(e) => setData('intitule', e.target.value)}
                                        />

                                        <InputError message={errors.intitule} className="mt-2" />
                                    </div>

                                    <div className="mx-auto py-8 w-full">
                                        <div className="inline-flex relative">
                                            <InputLabel htmlFor="dua" value="Durée d'utilité Administrative (DUA):"/>
                                            <span className="text-red-500">
                                                &nbsp;*
                                            </span>
                                        </div>

                                        <TextInput
                                            id="dua"
                                            type="text"
                                            name="dua"
                                            value={data.dua}
                                            className="mt-1 block w-full"
                                            autoComplete="dua"
                                            isFocused={true}
                                            onChange={(e) => setData('dua', e.target.value)}
                                        />

                                        <InputError message={errors.dua} className="mt-2" />
                                    </div>

                                    <div className="mx-4 sm:mx-8 py-4 w-full">
                                        <span className="italic">
                                            <span className="text-red-500">(*)</span> Tous les champs sont obligatoires
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between py-2 my-4 mx-4 sm:mx-8 gap-4">
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
        </div>

    </AuthenticatedLayout>
  )
}
