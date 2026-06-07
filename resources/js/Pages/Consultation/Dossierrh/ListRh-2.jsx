import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { debounce } from 'lodash';
import PaginationRh from '@/Components/PaginationRh';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarCons from '@/Components/SidebarCons';

export default function ListRh({ users, availablePieces, totalPiecesCount, filters }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [pieceFilterId, setPieceFilterId] = useState(filters.pieceFilterId || '');
    const [pieceFilterStatus, setPieceFilterStatus] = useState(filters.pieceFilterStatus || '');

    // État pour la modale
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // --- LOGIQUE DE RECHERCHE (Debounce) ---
    const updateFilters = debounce((values) => {
        router.get(route('dossierrh.list'), values, {
            preserveState: true,
            replace: true
        });
    }, 300);

    useEffect(() => {
        updateFilters({ search, pieceFilterId, pieceFilterStatus });
    }, [search, pieceFilterId, pieceFilterStatus]);

    // --- LOGIQUE DE SUPPRESSION ---
    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const executeDelete = () => {
        router.delete(route('users.destroy', userToDelete.id), {
            onSuccess: () => setShowDeleteModal(false),
        });
    };

    return (
        <AuthenticatedLayout hideHeader={true}>
            <div className='flex flex-row justify-between'>
                <Head title="Liste du personnel" />

                <div className='basis-1/4'>
                    <SidebarCons />
                </div>

                <div className='basis-3/4 mr-10 py-6'>
                    <div className="p-6 bg-gray-100 min-h-screen">

                        {flash.message && (
                            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm">
                                <i className="fas fa-check-circle"></i> {flash.message}
                            </div>
                        )}

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Header & Filtres */}
                            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <h3 className="text-lg font-bold text-gray-800">
                                    <i className="fas fa-users text-blue-500 mr-2"></i> Liste du personnel
                                </h3>
                                <Link href={route('dossierrh.create')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
                                    <i className="fas fa-user-plus"></i> Ajouter un dossier
                                </Link>
                            </div>

                            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border-b">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Rechercher nom ou matricule..."
                                    className="border border-gray-300 rounded-lg p-2 text-sm"
                                />
                                <select
                                    value={pieceFilterId}
                                    onChange={(e) => setPieceFilterId(e.target.value)}
                                    className="border border-gray-300 rounded-lg p-2 text-sm"
                                >
                                    <option value="">-- Sélectionner une pièce --</option>
                                    {availablePieces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                <select
                                    value={pieceFilterStatus}
                                    onChange={(e) => setPieceFilterStatus(e.target.value)}
                                    disabled={!pieceFilterId}
                                    className="border border-gray-300 rounded-lg p-2 text-sm"
                                >
                                    <option value="">-- Statut --</option>
                                    <option value="has">✔️ Dispose de cette pièce</option>
                                    <option value="missing">❌ Ne dispose pas de cette pièce</option>
                                </select>
                            </div>

                            {/* Tableau */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b">
                                        <tr>
                                            <th className="px-6 py-4">Matricule</th>
                                            <th className="px-6 py-4">Nom et Prénom</th>
                                            <th className="px-6 py-4">Progression</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {users.data.map(user => {
                                            // Calcul de progression
                                            const validatedCount = user.pieces.filter(p => {
                                                const paths = JSON.parse(p.pivot.file_paths || '[]');
                                                return paths.length > 0;
                                            }).length;
                                            const percentage = totalPiecesCount > 0 ? Math.round((validatedCount / totalPiecesCount) * 100) : 0;
                                            const color = percentage === 100 ? 'bg-green-500' : (percentage >= 50 ? 'bg-yellow-400' : 'bg-red-500');

                                            return (
                                                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                                                    <td className="px-6 py-4 font-bold">{user.matricule}</td>
                                                    <td className="px-6 py-4">{user.name}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-xs mb-1 flex justify-between">
                                                            <span>{percentage}%</span>
                                                            <span>{validatedCount}/{totalPiecesCount}</span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                                                            <div className={`${color} h-full transition-all`} style={{ width: `${percentage}%` }}></div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                        <Link href={route('dossierrh.show', user.id)} className="p-2 bg-gray-100 rounded hover:text-blue-600"><i className="fas fa-eye"></i></Link>
                                                        <Link href={route('dossierrh.edit', user.id)} className="p-2 bg-gray-100 rounded hover:text-yellow-600"><i className="fas fa-pen"></i></Link>
                                                        <button onClick={() => confirmDelete(user)} className="p-2 bg-gray-100 rounded hover:text-red-600"><i className="fas fa-trash-alt"></i></button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <span className="text-sm text-gray-600">
                                            Affichage de <b>{users.from}</b> à <b>{users.to}</b> sur <b>{users.total}</b> dossiers
                                        </span>
                                        <PaginationRh links={users.links} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal de suppression */}
                        {showDeleteModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full">
                                    <h3 className="text-lg font-bold mb-2 text-center text-red-600">Supprimer le dossier ?</h3>
                                    <p className="text-gray-500 text-sm mb-4">Cette action est irréversible et supprimera tous les documents de <b>{userToDelete?.name}</b>.</p>
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 text-gray-600">Annuler</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
