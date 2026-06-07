import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import {
    BellMinusIcon,
    ChevronDownIcon,
    LogOutIcon,
    SquarePenIcon,
    ListTodo,
    Settings2,
    ChartSplineIcon,
    ScrollTextIcon,
    UserRoundIcon,
    HardDriveDownloadIcon,
    NotebookIcon,
    SearchCheck,
    StickyNoteIcon,
    FolderInput,
    ShieldAlertIcon,
    Fingerprint,
    UserPlus2,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Toaster } from '@/Components/ui/sonner';


export default function AuthenticatedLayout({ children, hideHeader = false }) {
    const user = usePage().props.auth.user;
    const { auth } = usePage().props;
    const userRoles = auth.roles;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-200">

            { !hideHeader && (
            <header className="border-b px-4 md:px-6 authenticated-layout">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Left side */}
                    <div className="flex items-center gap-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#" className="text-foreground">
                                        <Link href={route('dashboard')}>
                                            <img src="images/head.png" alt="" className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200 rounded-full"/>
                                        </Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                                <BreadcrumbItem className="md:hidden">
                                    <DropdownMenu>
                                    <DropdownMenuTrigger className="hover:text-foreground">
                                        <BreadcrumbEllipsis />
                                        <span className="sr-only">Toggle menu</span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem asChild>
                                            <Link href={route('dashboard')}>
                                                Accueil
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <a href="#">Projects</a>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </BreadcrumbItem>
                                <BreadcrumbItem className="max-md:hidden text-white">
                                    <BreadcrumbLink href={route('dashboard')}>
                                        Accueil
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="max-md:hidden">
                                    {" "}
                                    /{" "}
                                </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-white">
                                                <BreadcrumbLink>
                                                    Créations
                                                </BreadcrumbLink>
                                                <ChevronDownIcon
                                                    size={16}
                                                    className="opacity-60"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-64">
                                            { user.roles !== 'Super' && user.roles !== 'Admin' ?
                                                <span></span>
                                                :
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <SquarePenIcon size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('typearchives.view')}>
                                                                Type d'archives
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            }

                                            <DropdownMenuSeparator />
                                            { user.roles !== 'Super' && user.roles !== 'Admin' ?
                                                <span></span>
                                                :
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <SquarePenIcon size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('emplacement.view')}>
                                                                Emplacements
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            }

                                            <DropdownMenuSeparator />
                                            { user.roles !== 'Super' && user.roles !== 'Admin' ?
                                                <span></span>
                                                :
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <SquarePenIcon size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('groupeacces.view')}>
                                                                Groupes d'accès
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            }

                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <SquarePenIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('archives.view')}>
                                                            Archives
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>

                                            <DropdownMenuSeparator />
                                            { user.roles !== 'Super' && user.roles !== 'Admin' ?
                                                <span></span>
                                                :
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <UserPlus2 size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('dossierrh.create')}>
                                                                Nouveau Dossier RH
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            }
                                        </DropdownMenuContent>

                                    </DropdownMenu>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-white">
                                                <BreadcrumbLink>
                                                    Consultations
                                                </BreadcrumbLink>
                                                <ChevronDownIcon
                                                    size={16}
                                                    className="opacity-60"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-64">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Publiques
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <FolderInput size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('touteunite')}>
                                                            Restreintes
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <StickyNoteIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('historique.index')}>
                                                            Historique
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-white">
                                                <BreadcrumbLink>
                                                    Administration
                                                </BreadcrumbLink>
                                                <ChevronDownIcon
                                                    size={16}
                                                    className="opacity-60"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-64">
                                            <DropdownMenuGroup>
                                                { user.roles !== 'Super' ?
                                                    <span></span>
                                                    :
                                                    <DropdownMenuItem>
                                                        <ShieldAlertIcon size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('password.requests')}>
                                                                Mot de passe oubli&eacute;
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                }
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                { user.roles !== 'Super' ?
                                                    <span></span>
                                                    :
                                                    <DropdownMenuItem>
                                                        <Fingerprint size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('suspicious.connections')}>
                                                                Connexion suspecte
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                }
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ChartSplineIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('statistiques')}>
                                                            Statistiques
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                { user.roles !== 'Super' && user.roles !== 'Admin' ?
                                                    <span></span>
                                                    :
                                                    <DropdownMenuItem>
                                                        <ScrollTextIcon size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('journal')}>
                                                                Journal
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                }
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                { user.roles !== 'Super' ?
                                                    <span></span>
                                                    :
                                                    <DropdownMenuItem>
                                                        <UserRoundIcon size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('compte')}>
                                                                Compte utilisateur
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                }
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            { user.roles !== 'Super' ?
                                                <span></span>
                                                :
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem>
                                                        <HardDriveDownloadIcon size={16} className="opacity-60" aria-hidden="true" />
                                                        <span>
                                                            <BreadcrumbLink href={route('backup')}>
                                                                Sauvegarde
                                                            </BreadcrumbLink>
                                                        </span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                            }
                                            <DropdownMenuSeparator />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-white">
                                                <BreadcrumbLink>
                                                    Textes reglémentaires
                                                </BreadcrumbLink>
                                                <ChevronDownIcon
                                                    size={16}
                                                    className="opacity-60"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-64">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <SearchCheck size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Recherche
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            {/* <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <NotebookIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Lois
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <NotebookIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Ordonnances
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <NotebookIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Décrets
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <NotebookIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Arretés
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <NotebookIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Décisions
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <NotebookIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Circulaires
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <NotebookIcon size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href={route('public')}>
                                                            Instructions
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />*/}
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/Loi_001_Regissant_Archives_Cameroun_24072024.pdf" target="_blank">
                                                            Loi sur les archives 2024
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/Loi_2000-010_19-dec_Regissant_Archives_Cameroun.pdf" target="_blank">
                                                            Loi sur les archives 2000
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/Loi_Cybersecurite_Criminalite.pdf" target="_blank">
                                                            Loi sur la Cybersécurité et Cybercriminalité
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/Loi_Commerce_Electronique.pdf" target="_blank">
                                                            Loi sur le Commerce Électronique
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                             <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/LOI_COMMUNICATIONS_ ELECTRONIQUES.pdf" target="_blank">
                                                            Loi sur le Communication Électronique
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/Decret_Archive.pdf" target="_blank">
                                                            Decret sur les archives
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-white">
                                                <BreadcrumbLink>
                                                    Organigramme DGB
                                                </BreadcrumbLink>
                                                <ChevronDownIcon
                                                    size={16}
                                                    className="opacity-60"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-64">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/ORGANIGRAMME_DGB.pdf" target="_blank">
                                                            Organigramme DGB
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/DECRET_066_PORTANT_ORGANISATION_MINFI_28022013_PR.pdf" target="_blank">
                                                            Decret portant orginanisation MINFI 2013
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/DECRET_365_PORTANT_ORGANISATION_MINFI_08112008.pdf" target="_blank">
                                                            Decret portant orginanisation MINFI 2008
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/DECRET_088_COMPLETANT_DISPOSITIONS_DECRET_217_09091998_PORTANT_ORGANISATION_MINEFI_17042001.pdf" target="_blank">
                                                            Decret portant orginanisation MINFI 2001
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/DECRET_282_MODIFIANT_DISPOSITION_DECRET_168_16081995_PORTANT_ORGANISATION_MINISTERE_ECEONOMIE_FINANCES_02121996.pdf" target="_blank">
                                                            Decret portant orginanisation MINFI 1996
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                                <BreadcrumbItem>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-auto p-0 hover:bg-transparent text-white">
                                                <BreadcrumbLink>
                                                    Organisation des archives de la DGB
                                                </BreadcrumbLink>
                                                <ChevronDownIcon
                                                    size={16}
                                                    className="opacity-60"
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="max-w-64">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/Rapport_Audit_Archivage-Novembre-2019.pdf" target="_blank">
                                                            Rapport d'audit des archives de la DGB
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <ListTodo size={16} className="opacity-60" aria-hidden="true" />
                                                    <span>
                                                        <BreadcrumbLink href="documents/Réseau_Archivage_DGB.pdf" target="_blank">
                                                            Reseau des référents des archives de la DGB
                                                        </BreadcrumbLink>
                                                    </span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator> / </BreadcrumbSeparator>
                                { user.roles !== 'Super' ?
                                    <BreadcrumbItem className="max-md:hidden text-white">
                                        <BreadcrumbLink href={route('services')}>

                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    :
                                    <BreadcrumbItem className="max-md:hidden text-white">
                                        <BreadcrumbLink href={route('services')}>
                                            Service Archives
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                }

                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* Notification */}
                        <BellMinusIcon className="text-white" />
                        {/* User menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
                                    <Avatar>
                                        <AvatarImage src="images/placeholder.png" alt="Profile image" />
                                        <AvatarFallback>KK</AvatarFallback>
                                    </Avatar>
                                    <ChevronDownIcon
                                        size={16}
                                        className="opacity-60"
                                        aria-hidden="true"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="max-w-64">
                                <DropdownMenuLabel className="flex min-w-0 flex-col">
                                    <span className="truncate text-sm font-medium text-foreground">
                                        { user.name }
                                    </span>
                                    <span className="truncate text-xs font-normal text-muted-foreground">
                                        { user.email }
                                    </span>
                                    <span className="truncate text-xs font-normal text-muted-foreground">
                                        { user.roles }
                                    </span>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <SquarePenIcon size={16} className="opacity-60" aria-hidden="true" />
                                        <Link href={route('profile.edit')}>
                                            <span>Editer</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
                                    <Link href={route('logout')} method='post'>
                                        <span>Deconnexion</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
            ) }

            <main>{children}</main>
            <Toaster />
        </div>
    );
}
