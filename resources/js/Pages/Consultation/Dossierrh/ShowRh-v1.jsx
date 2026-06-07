import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft, Edit, FileArchive, Download,
    CheckCircle2, AlertCircle, ExternalLink, FileText, Search, Filter,
    AlertCircleIcon
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SidebarCons from '@/Components/SidebarCons';

export default function ShowRh({ user, stats, piecesPossedees, piecesManquantes }) {
    // États pour la recherche et le filtre
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'validated', 'missing'

    // Logique de filtrage combinée
    const filteredResults = useMemo(() => {
        let results = [];

        // 1. Fusionner ou choisir les listes selon le statut
        if (filterStatus === 'all' || filterStatus === 'validated') {
            results = [...results, ...piecesPossedees.map(p => ({ ...p, status: 'validated' }))];
        }
        if (filterStatus === 'all' || filterStatus === 'missing') {
            results = [...results, ...piecesManquantes.map(p => ({ ...p, status: 'missing' }))];
        }

        // 2. Appliquer la recherche textuelle
        return results.filter(piece =>
            piece.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, filterStatus, piecesPossedees, piecesManquantes]);

    const downloadAll = () => {
        window.location.href = route('dossierrh.download-all', user.id);
    };

    const downloadPiece = (pieceId) => {
        window.location.href = route('dossierrh.download-piece', [user.id, pieceId]);
    };

    return (
        <AuthenticatedLayout>
            <div className='flex flex-row justify-between'>
                <Head title={`Dossier de ${user.name}`} />

                <div className='basis-1/4'>
                    <SidebarCons />
                </div>

                <div className='basis-3/4 mr-10 py-6'>
                    <div className="max-w-7xl mx-auto p-4 lg:p-8">

                        {/* Header existant... */}
                        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <Link href={route('dossierrh')} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 mb-2 transition-colors">
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la liste
                                </Link>
                                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                                <p className="text-gray-500">Matricule : <span className="font-semibold text-gray-700">{user.matricule}</span> | {user.email}</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={downloadAll} className="px-4 py-2 bg-green-400 hover:bg-green-200 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
                                    <FileArchive className="w-4 h-4" /> Tout télécharger (.zip)
                                </button>
                            </div>
                        </div>

                        {/* Barre de recherche et Filtres */}
                        <div className="mb-6 flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un document..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex bg-white border border-gray-300 rounded-xl p-1 shadow-sm">
                                <button
                                    onClick={() => setFilterStatus('all')}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'all' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Tous
                                </button>
                                <button
                                    onClick={() => setFilterStatus('validated')}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'validated' ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Validés
                                </button>
                                <button
                                    onClick={() => setFilterStatus('missing')}
                                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'missing' ? 'bg-red-100 text-red-700' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Manquants
                                </button>
                            </div>
                        </div>

                        {/* Grille de documents dynamique */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((piece) => (
                                    <div key={piece.id} className={`bg-white border ${piece.status === 'validated' ? 'border-green-200' : 'border-gray-200 border-dashed'} rounded-xl p-5 shadow-sm relative overflow-hidden`}>
                                        {piece.status === 'validated' ? (
                                            <>
                                                <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="font-bold text-gray-800">{piece.name}</h4>
                                                    <button onClick={() => downloadPiece(piece.id)} className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded-lg">
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="space-y-2">
                                                    {piece.files.map((file, idx) => (
                                                        <a key={idx} href={`/storage/${file}`} target="_blank" className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm hover:bg-blue-50 transition-colors">
                                                            <FileText className="text-red-500 w-4 h-4" />
                                                            <span className="truncate">{file.split('/').pop()}</span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex items-start gap-3 opacity-70">
                                                <AlertCircle className="text-red-400 w-5 h-5 mt-0.5" />
                                                <div>
                                                    <h4 className="font-bold text-gray-600">{piece.name}</h4>
                                                    <p className="text-xs text-gray-500 mt-1 italic">Document manquant</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <p className="text-gray-500">Aucun document ne correspond à votre recherche.</p>
                                </div>
                            )}
                        </div>

                        {/* Missing Pieces */}
                        {piecesManquantes.length > 0 && (
                            <div className='py-4'>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2 opacity-80">
                                    <AlertCircleIcon className="text-red-400 w-5 h-5" /> Pièces manquantes
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {piecesManquantes.map((piece) => (
                                        <div key={piece.id} className="bg-gray-50 border border-gray-200 border-dashed rounded-xl p-4 opacity-70">
                                            <h4 className="text-sm font-bold text-gray-600">{piece.name}</h4>
                                            {piece.description && <p className="text-xs text-gray-500 mt-1">{piece.description}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
