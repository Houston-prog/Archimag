import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarCons from '@/Components/SidebarCons';
import { Input } from '@/Components/ui/input';

export default function DpaEntities({ type, entities }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const pageConfig = useMemo(() => {
    switch (type) {
      case 'administration':
        return {
          title: 'Ministère',
          itemType: 'Ministère',
          emptyText: 'Aucun ministère trouvée.',
        };
      case 'epa':
        return {
          title: 'Etablissements Publics Administratifs (EPA)',
          itemType: 'Entreprise',
          emptyText: 'Aucune entreprise trouvée.',
        };
      case 'ctd':
        return {
          title: 'Collectivités Territoriales Décentralisées (CTD)',
          itemType: 'Collectivité',
          emptyText: 'Aucune collectivité trouvée.',
        };
      default:
        return {
          title: 'Entités',
          itemType: '',
          emptyText: 'Veuillez sélectionner un type.',
        };
    }
  }, [type]);

  const { title, itemType, emptyText } = pageConfig;

  const items = entities || [];

  const filteredItems = useMemo(() =>
    items.filter(entity =>
      entity.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [items, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const goToPreviousPage = () => setCurrentPage((page) => Math.max(page - 1, 1));
  const goToNextPage = () => setCurrentPage((page) => Math.min(page + 1, totalPages));

  return (
    <AuthenticatedLayout>
      <Head title={title} />
      <div className="flex flex-row gap-4">

        <div className='basis-1/4'>
            <SidebarCons />
        </div>

        <div className='basis-3/4 mr-24 lg:mr-24 sm:mr-10 md:mr-24 py-6'>
            <div className="py-8">
                <div className="mx-auto w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 font-bold">
                            <h1 className="text-2xl font-bold mb-6 text-gray-800">{title}</h1>
                        <div className="flex items-center py-4">
                            <Input
                            placeholder="Rechercher une entité..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="max-w-sm"
                            />
                        </div>
                        {paginatedItems.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {paginatedItems.map((entity, index) => (
                                        <Card key={entity.name} className="shadow-md hover:shadow-lg transition-shadow">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-sm font-medium">
                                                    {entity.name}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-2xl font-bold">{entity.count}</div>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Dossier(s) DPA
                                                </p>
                                            </CardContent>
                                            <CardFooter>
                                                <Button asChild className="w-full bg-green-400">
                                                    <Link href={route('dpa.details', { type: type, item: entity.name })}>
                                                        Voir les détails
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                                <div className="flex items-center justify-end space-x-2 py-4">
                                    <div className="flex-1 text-sm text-muted-foreground">
                                        Page {currentPage} sur {totalPages}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                    >
                                        Précédent
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages || totalPages === 0}
                                    >
                                        Suivant
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center text-gray-500 py-10">
                                {searchTerm ? 'Aucun résultat trouvé pour votre recherche.' : emptyText}
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
