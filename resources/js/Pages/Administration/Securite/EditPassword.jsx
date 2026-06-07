import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/Components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/Components/InputError';
import SidebarAdmin from '../SidebarAdmin';

export default function EditPassword({ user }) {
    const { auth } = usePage().props;
    const { data, setData, put, processing, errors, reset } = useForm({
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.password.update', { user: user.id }), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {`Modifier le mot de passe de ${user.name}`}
                </h2>
            }
        >
            <Head title={`Modifier mot de passe - ${user.name}`} />

            <div className="flex flex-row justify-between">

                <div className='basis-1/4'>
                    <SidebarAdmin />
                </div>

                <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                    <div className="w-full sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className='text-blue-500 text-2xl m-4 font-semibold'>
                                Modification du mot de passe de {user.name}
                            </div>

                            <div className="p-6 text-gray-900">
                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="password">Nouveau mot de passe</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div>
                                        <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2" />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Button disabled={processing}>Enregistrer</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
