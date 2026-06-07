import { Link, usePage } from '@inertiajs/react'
import { FileEditIcon, HandCoinsIcon, ListChecksIcon, ListTodoIcon, Share2Icon, UsersRoundIcon, HomeIcon, SearchIcon, UserCircle2, DollarSign, FolderClockIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function SidebarCons() {
    const user = usePage().props.auth.user;
    const { auth } = usePage().props;
    const userRoles = auth.roles;

    return (
        <div className='h-screen authenticated-layout mt-5 w-80 sticky top-0'>
            <div className='justify-center items-center border-r'>
                <div className='h-14 border-b border-blue-300'>
                    <div className='uppercase tracking-wide truncate text-sm text-center justify-center py-6'>
                        Consultations Restreintes
                    </div>
                </div>

                <div className="overflow-y-auto overflow-x-hidden flex-grow">
                    <ul className="flex flex-col py-4 space-y-1 text-white">
                        <Link href={route('dashboard')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <HomeIcon size={15} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                Accueil
                            </span>
                        </Link>

                        <Link href={route('touteunite')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                            <span className="inline-flex justify-center items-center ml-4">
                                <SearchIcon size={15} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                Recherche
                            </span>
                        </Link>

                        { user.roles !== 'Super' ?
                            <span></span>
                            :
                            <Link href={route('archivbygroup')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <UsersRoundIcon size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Archives par unité
                                </span>
                            </Link>
                        }

                        {user?.roles !== 'Super' && (
                            <Link href={route('send.view')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <Share2Icon size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Partages Sortants
                                </span>
                            </Link>
                        )}

                        {user?.roles !== 'Super' && (
                            <Link href={route('incoming')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <HandCoinsIcon size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Partages Entrants
                                </span>
                            </Link>
                        )}

                        {user?.roles === 'Super' && (
                            <Link href={route('receivedoc')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <HandCoinsIcon size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Partages
                                </span>
                            </Link>
                        )}

                        {user?.roles === 'Super' && (
                            <Link href={route('dpa.view')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <FolderClockIcon size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Dossier Permanent Administration
                                </span>
                            </Link>
                        )}

                        {user?.roles === 'Super' && (
                            <Link href={route('dossierrh')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <UserCircle2 size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Dossier du Personnel (RH)
                                </span>
                            </Link>
                        )}

                        {user?.roles === 'Super' && (
                            <Link href={route('dette.view')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <DollarSign size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Dette flottante
                                </span>
                            </Link>
                        )}

                        {user?.departement === 'DPC' && user?.departement === 'DCOB' && (
                            <Link href={route('dpa.view')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <FolderClockIcon size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Dossier Permanent Administration
                                </span>
                            </Link>
                        )}

                        {user?.departement === 'S-DAG' && (
                            <Link href={route('dossierrh')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <UserCircle2 size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Dossier du Personnel (RH)
                                </span>
                            </Link>
                        )}

                        {user?.departement === 'DPC' && user?.departement === 'DCOB' && (
                            <Link href={route('dette.view')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                <span className="inline-flex justify-center items-center ml-4">
                                    <DollarSign size={15} />
                                </span>
                                <span className="ml-2 text-sm tracking-wide truncate font-semibold">
                                    Dette flottante
                                </span>
                            </Link>
                        )}

                    </ul>
                </div>

                {/* <div className="p-4 border-t h-full bg-green-100">
                    <div className="text-sm font-medium text-gray-700 truncate font-semibold">{ user?.name }</div>
                    <div className="text-xs text-gray-600 mb-2 truncate">{ user?.roles }</div>
                    <div className="flex">
                        <Link href={route('profile.edit')} className="text-xs mr-2 text-blue-700">Profil</Link>
                        <Link href={route('logout')} method="post" className="ml-auto text-xs text-red-700">Déconnexion</Link>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
