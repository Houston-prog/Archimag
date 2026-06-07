import { Link, usePage } from '@inertiajs/react'
import { ChartLineIcon, FileEditIcon, Fingerprint, HandCoinsIcon, HardDriveDownloadIcon, ListChecksIcon, ListTodoIcon, ScrollTextIcon, Share2Icon, Users, UsersRoundIcon, HomeIcon, ShieldAlert } from 'lucide-react'
import React from 'react'

export default function SidebarAdmin() {
  const user = usePage().props.auth.user

  return (
    <div className='h-screen authenticated-layout text-white mt-5 w-80 sticky top-0'>
        <div className='justify-center items-center border-r'>
            <div className='h-14 border-b border-blue-300'>
                <div className='uppercase tracking-wide truncate text-sm text-center justify-center py-6'>
                    Administration
                </div>
            </div>

            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-4 space-y-1 text-white">
                    <Link href={route('dashboard')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <HomeIcon size={15} />
                        </span>
                        <span className="ml-2 text-sm font-semibold tracking-wide truncate">
                            Accueil
                        </span>
                    </Link>
                    <Link href={route('password.requests')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <ShieldAlert size={15} />
                        </span>
                        <span className="ml-2 text-sm font-semibold tracking-wide truncate">
                            Mot de passe oubli&eacute;
                        </span>
                    </Link>
                    <Link href={route('suspicious.connections')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <Fingerprint size={15} />
                        </span>
                        <span className="ml-2 text-sm font-semibold tracking-wide truncate">
                            Connexion suspecte
                        </span>
                    </Link>
                    <Link href={route('statistiques')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <ChartLineIcon size={15} />
                        </span>
                        <span className="ml-2 text-sm font-semibold tracking-wide truncate">
                            Statistique
                        </span>
                    </Link>
                    <Link href={route('journal')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <ScrollTextIcon size={15} />
                        </span>
                        <span className="ml-2 text-sm font-semibold tracking-wide truncate">
                            Journal
                        </span>
                    </Link>
                    <Link href={route('compte')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <Users size={15} />
                        </span>
                        <span className="ml-2 text-sm font-semibold tracking-wide truncate">
                            Compte utilisateur
                        </span>
                    </Link>
                    <Link href={route('backup')} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                        <span className="inline-flex justify-center items-center ml-4">
                            <HardDriveDownloadIcon size={15} />
                        </span>
                        <span className="ml-2 text-sm font-semibold tracking-wide truncate">
                            Sauvegarde
                        </span>
                    </Link>
                </ul>
            </div>
        </div>
    </div>
  )
}
