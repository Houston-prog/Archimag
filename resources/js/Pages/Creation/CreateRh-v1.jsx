import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import SidebarCons from '@/Components/SidebarCons';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function CreateRh({ availablePieces }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        matricule: '',
        selectedPieces: {}, // Format: { id: true/false }
        pieceFiles: {},     // Format: { id: [File, File] }
    });

    // Filtrage des pieces par status
    const pieceOblig = availablePieces.filter((piece) => piece.status === 'Obligatoire');

    const pieceOption = availablePieces.filter((piece) => piece.status === 'Optionnelle');

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('dossierrh.store'), {
            forceFormData: true,
            onFinish: () => reset('name', 'matricule'),
        }); // Adaptez le nom de votre route


    };

    const togglePiece = (id) => {
        setData('selectedPieces', {
            ...data.selectedPieces,
            [id]: !data.selectedPieces[id]
        });
    };

    const handleFileChange = (id, files) => {
        setData('pieceFiles', {
            ...data.pieceFiles,
            [id]: Array.from(files)
        });
    };


    return (
        <AuthenticatedLayout>
            <div className='flex flex-row justify-between'>
                <Head title='Creation Dossier RH' />

                <div className='basis-1/4'>
                    <Sidebar />
                </div>

                <div className='basis-3/4 mr-10 py-6'>
                    <div className="max-w-6xl mx-auto p-8">

                        <form onSubmit={handleSubmit}>
                            {/* Infos de base */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b">
                                    <h3 className="text-lg font-bold text-gray-800">Nouveua Dossier du Personnel</h3>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Nom et Prénom</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Matricule</label>
                                        <input
                                            type="text"
                                            value={data.matricule}
                                            onChange={e => setData('matricule', e.target.value)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                        {errors.matricule && <div className="text-red-500 text-xs mt-1">{errors.matricule}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Pièces Jointes */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b">
                                    <h3 className="text-lg font-bold text-blue-800">Constitution du dossier</h3>
                                </div>

                                <div className="bg-gray-100 px-6 py-4 border-b">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Pièces obligatoires
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {pieceOblig.map((piece) => (
                                            <div key={piece.id} className={`border rounded-lg p-4 transition-colors ${data.selectedPieces[piece.id] ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>

                                                <label className="flex items-start gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => togglePiece(piece.id)}
                                                        className="mt-1 rounded border-gray-300 text-blue-600"
                                                    />
                                                    <div>
                                                        <h4 className="text-sm font-semibold">{piece.name}</h4>
                                                        <p className="text-xs text-gray-500">{piece.description}</p>
                                                    </div>
                                                </label>

                                                {data.selectedPieces[piece.id] && (
                                                    <div className="mt-3 pt-3 border-t border-blue-200 border-dashed">
                                                        <label className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 bg-white px-3 py-2 rounded border border-blue-200 shadow-sm w-max">
                                                            <span>📁 Importer</span>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                multiple
                                                                onChange={e => handleFileChange(piece.id, e.target.files)}
                                                            />
                                                        </label>

                                                        {data.pieceFiles[piece.id] && (
                                                            <ul className="mt-2">
                                                                {data.pieceFiles[piece.id].map((file, idx) => (
                                                                    <li key={idx} className="text-xs text-gray-600 truncate">
                                                                        📄 {file.name}
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
                                <div className="bg-gray-100 px-6 py-4 border-b">
                                    <h3 className="text-lg font-bold text-gray-800">
                                        Pièces optionnelles
                                    </h3>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {pieceOption.map((piece) => (
                                            <div key={piece.id} className={`border rounded-lg p-4 transition-colors ${data.selectedPieces[piece.id] ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>

                                                <label className="flex items-start gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        onChange={() => togglePiece(piece.id)}
                                                        className="mt-1 rounded border-gray-300 text-blue-600"
                                                    />
                                                    <div>
                                                        <h4 className="text-sm font-semibold">{piece.name}</h4>
                                                        <p className="text-xs text-gray-500">{piece.description}</p>
                                                    </div>
                                                </label>

                                                {data.selectedPieces[piece.id] && (
                                                    <div className="mt-3 pt-3 border-t border-blue-200 border-dashed">
                                                        <label className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2 bg-white px-3 py-2 rounded border border-blue-200 shadow-sm w-max">
                                                            <span>📁 Importer</span>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                multiple
                                                                onChange={e => handleFileChange(piece.id, e.target.files)}
                                                            />
                                                        </label>

                                                        {data.pieceFiles[piece.id] && (
                                                            <ul className="mt-2">
                                                                {data.pieceFiles[piece.id].map((file, idx) => (
                                                                    <li key={idx} className="text-xs text-gray-600 truncate">
                                                                        📄 {file.name}
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

                            {/* Actions */}
                            <div className="flex justify-end gap-4">
                                <button type="button" className="px-6 py-2 border rounded-lg bg-red-500">Annuler</button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-300 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
                                >
                                    {processing ? 'Enregistrement...' : "Enregistrer le dossier"}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
