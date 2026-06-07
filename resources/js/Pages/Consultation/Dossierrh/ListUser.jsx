import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { pickBy } from 'lodash';

export default function ListUser({ dossiers, pieces_count, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    // Synchronisation de la recherche avec l'URL (Debounce recommandé en prod)
    useEffect(() => {
        const query = pickBy({ search });
        router.get(route('dossierrh.index'), query, {
            preserveState: true,
            replace: true
        });
    }, [search]);

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <Head title="Liste des employés" />

            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight">Gestion du Personnel</h1>
                    <p className="text-gray-500 mt-1">Consultez et gérez les dossiers de vos collaborateurs</p>
                </div>
                <Link
                    href={route('dossierrh.create')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 w-max"
                >
                    <i className="fas fa-plus"></i> Nouvel Employé
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou matricule..."
                            className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employé</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Matricule</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Conformité</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {dossiers.map((user) => {
                                const validatedCount = user.pieces.filter(p => {
                                    const files = JSON.parse(p.pivot.file_paths || '[]');
                                    return files.length > 0;
                                }).length;
                                const percentage = pieces_count > 0 ? Math.round((validatedCount / pieces_count) * 100) : 0;

                                return (
                                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-gray-800">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-600">{user.matricule}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3 w-32">
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${percentage === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">{percentage}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {percentage === 100 ? (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase">Complet</span>
                                            ) : (
                                                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase">Incomplet</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link href={route('dossierrh.show', user.id)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Voir le dossier">
                                                    <i className="fas fa-eye"></i>
                                                </Link>
                                                <Link href={route('dossierrh.edit', user.id)} className="p-2 text-gray-400 hover:text-yellow-600 transition-colors" title="Modifier">
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
