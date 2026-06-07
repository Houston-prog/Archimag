import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EditRh({ user, availablePieces, userPiecesIds }) {
    // Initialisation du formulaire avec Inertia useForm
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Nécessaire pour simuler un PUT avec des fichiers
        name: user.name,
        matricule: user.matricule,
        selectedPieces: userPiecesIds.reduce((acc, id) => ({ ...acc, [id]: true }), {}),
        pieceFiles: {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // On utilise POST car les fichiers ne passent pas toujours bien en PUT natif
        post(route('dossierrh.updatePieces', user.id));
    };

    const handleFileChange = (pieceId, files) => {
        setData('pieceFiles', {
            ...data.pieceFiles,
            [pieceId]: Array.from(files)
        });
    };

    const togglePiece = (pieceId) => {
        setData('selectedPieces', {
            ...data.selectedPieces,
            [pieceId]: !data.selectedPieces[pieceId]
        });
    };

    return (
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <Head title={`Modifier ${user.name}`} />

            <div className="mb-8">
                <Link href={route('users.show', user.id)} className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center gap-2 mb-2">
                    <i className="fas fa-arrow-left"></i> Retour au dossier
                </Link>
                <h2 className="text-3xl font-bold text-gray-800">Modifier l'Employé</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section Infos de base */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom et Prénom</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
                            <input
                                type="text"
                                value={data.matricule}
                                onChange={e => setData('matricule', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.matricule && <p className="text-red-500 text-xs mt-1">{errors.matricule}</p>}
                        </div>
                    </div>
                </div>

                {/* Section Pièces */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Constitution du dossier</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {availablePieces.map((piece) => (
                                <div key={piece.id} className={`border rounded-lg p-4 transition-colors ${data.selectedPieces[piece.id] ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={!!data.selectedPieces[piece.id]}
                                            onChange={() => togglePiece(piece.id)}
                                            className="mt-1 w-4 h-4 text-blue-600 rounded"
                                        />
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-800">{piece.name}</h4>
                                            {userPiecesIds.includes(piece.id) && (
                                                <span className="text-[10px] bg-green-200 text-green-800 px-1.5 py-0.5 rounded font-bold uppercase mt-1 inline-block">Déjà présent</span>
                                            )}
                                        </div>
                                    </label>

                                    {data.selectedPieces[piece.id] && (
                                        <div className="mt-3 pt-3 border-t border-blue-200 border-dashed">
                                            <input
                                                type="file"
                                                multiple
                                                onChange={e => handleFileChange(piece.id, e.target.files)}
                                                className="text-xs w-full"
                                            />
                                            {data.pieceFiles[piece.id] && (
                                                <ul className="mt-2 space-y-1">
                                                    {data.pieceFiles[piece.id].map((f, i) => (
                                                        <li key={i} className="text-[10px] text-blue-600 truncate italic">
                                                            <i className="fas fa-paperclip mr-1"></i> {f.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href={route('users.show', user.id)} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium">
                        Annuler
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-bold shadow-lg disabled:opacity-50 flex items-center gap-2"
                    >
                        {processing ? <><i className="fas fa-spinner fa-spin"></i> Mise à jour...</> : "Enregistrer les modifications"}
                    </button>
                </div>
            </form>
        </div>
    );
}
