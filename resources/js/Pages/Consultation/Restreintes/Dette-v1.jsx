import SidebarCons from '@/Components/SidebarCons'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card'
import { Button } from '@/Components/ui/button'
import { DollarSign, Globe, Landmark } from 'lucide-react'

export default function Dette({ stats }) {
  // Configuration des cartes avec les données
  const cards = [
    {
      id: 'interieure',
      title: 'Dette intérieure',
      count: stats?.interieure || 0,
      icon: <Landmark className="h-5 w-5 text-blue-500" />,
      description: 'Total de la dette intérieure',
    },
    {
      id: 'exterieure',
      title: 'Dette extérieure',
      count: stats?.exterieure || 0,
      icon: <Globe className="h-5 w-5 text-green-500" />,
      description: 'Total de la dette extérieure',
    },
    {
      id: 'totale',
      title: 'Dette totale',
      count: stats?.totale || 0,
      icon: <DollarSign className="h-5 w-5 text-red-500" />,
      description: 'Total général de la dette',
    },
  ]

  return (
    <AuthenticatedLayout hideHeader={true}>
      <Head title="Dette" />

      <div className="flex flex-row gap-4">
        <SidebarCons />
      </div>

      <div className="py-8 ml-60 basis-4/5">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
            <div className="p-6 border-sky-200 font-bold">

              <h1 className="text-2xl font-bold mb-6 text-gray-800">Tableau de bord de la Dette</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                  <Card key={card.id} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                      {card.icon}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{card.count}</div>
                      <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
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
    </AuthenticatedLayout>
  )
}
