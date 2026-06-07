import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { Activity, FileText, FolderOpen } from 'lucide-react'

export default function Dpa({ stats }) {
  // Configuration des cartes avec les données (simulées ou issues des props)
  const cards = [
    {
      id: 'administration',
      title: 'Ministères',
      count: stats?.administration || 0,
      icon: <FolderOpen className="h-5 w-5 text-blue-500" />,
      description: 'Total DPA pour les Ministères: ',
    },
    {
      id: 'ets',
      title: 'Etablissements publics administratifs)',
      count: stats?.ets || 0,
      icon: <FolderOpen className="h-5 w-5 text-green-500" />,
      description: 'Total DPA pour les Etablissements publics:',
    },
    {
      id: 'entreprise',
      title: 'Entreprises publiques',
      count: stats?.entreprise || 0,
      icon: <FolderOpen className="h-5 w-5 text-green-500" />,
      description: 'Total DPA pour les Entreprises publiques:',
    },
    {
      id: 'projet',
      title: 'Programmes et Projets',
      count: stats?.projet || 0,
      icon: <FolderOpen className="h-5 w-5 text-blue-500" />,
      description: 'Total DPA pour les Projets:',
    },
    {
      id: 'ctd',
      title: 'CTD (Collectivités territoriales décentralisées)',
      count: stats?.ctd || 0,
      icon: <FolderOpen className="h-5 w-5 text-red-500" />,
      description: 'Total DPA pour les CTD:',
    },
  ]

  return (
    <AuthenticatedLayout>
      <Head title="DPA" />

      <div className="flex flex-row justify-between">

        <div className='basis-1/4'>
            <SidebarCons />
        </div>

        <div className='basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6'>
            <div className="py-8">
                <div className="mx-auto max-w-11xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 font-bold">

                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Dossier Permanent Administration (DPA)</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cards.map((card) => (
                            <Card key={card.id} className="shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xl font-medium">
                                        {card.title}
                                    </CardTitle>
                                    {card.icon}
                                </CardHeader>
                                <CardContent>
                                    <div className='flex flex-row justify-between'>
                                        <div className='basis-3/4'>
                                            <p className="text-md text-muted-foreground mt-4">
                                                {card.description}
                                            </p>
                                        </div>
                                        <div className='basis-1/4'>
                                            <div className="text-md text-muted-foreground font-bold text-right mt-4">
                                                {card.count}
                                              </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full bg-green-400">
                                        <Link href={route('dpa.entities', { type: card.id })}>
                                            Voir les détails
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                            ))}
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
