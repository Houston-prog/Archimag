import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { DollarSign, FolderOpen, Globe, Landmark } from 'lucide-react'

export default function Dette({ stats }) {
  // Configuration des cartes avec les données
  const cards = [
    {
      id: 'interieure',
      title: 'Dette Commerciale',
      count: stats?.interieure || 0,
      icon: <FolderOpen className="h-5 w-5 text-blue-500" />,
      description: 'Total pour la dette commerciale',
    },
    {
      id: 'exterieure',
      title: 'Dette Locative',
      count: stats?.exterieure || 0,
      icon: <FolderOpen className="h-5 w-5 text-green-500" />,
      description: 'Total pour la dette locative',
    },
    {
      id: 'totale',
      title: 'Dette Sociale',
      count: stats?.totale || 0,
      icon: <FolderOpen className="h-5 w-5 text-red-500" />,
      description: 'Total pour la dette sociale',
    },
  ]

  return (
    <AuthenticatedLayout>
      <Head title="Dette" />

      <div className="flex flex-row justify-between">

        <div className='basis-1/4'>
            <SidebarCons />
        </div>

        <div className='basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6'>
            <div className="py-8">
                <div className="mx-auto w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 font-bold">

                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Dette flottante</h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {cards.map((card) => (
                            <Card key={card.id} className="shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xl font-medium">{card.title}</CardTitle>
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
                                        <Link href={route('dette.details', { type: card.id })}>
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
