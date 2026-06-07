<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Docarchives;
use Illuminate\Http\Request;

class DetteController extends Controller
{
    public function view(): Response
    {
        // NOTE: This is example logic for stats.
        $stats = [
            'interieure' => Docarchives::where('orientation', 'Dette Commerciale')->count(),
            'exterieure' => Docarchives::where('orientation', 'Dette Locative')->count(),
            'totale' => Docarchives::where('orientation', 'Dette Sociale')->count(),
        ];

        return Inertia::render('Consultation/Restreintes/Dette', [
            'stats' => $stats
        ]);
    }

    /**
     * Affiche les catégories d'entités pour un type de dette donné.
     */
    public function details(Request $request, $type): Response
    {
        // Mapping du type vers le libellé en base de données
        $detteArchiveType = match ($type) {
            'interieure' => 'Dette Commerciale',
            'exterieure' => 'Dette Locative',
            'totale' => 'Dette Sociale',
            default => abort(404),
        };

        // Construction de la requête de base
        $query = Docarchives::where('orientation', $detteArchiveType);

        // Gestion de la recherche (identique à l'ancienne méthode entityDetails)
        $search = $request->input('search');
        if ($search) {
            $query->whereRaw('LOWER(description) LIKE ?', ['%' . mb_strtolower($search) . '%']);
        }

        // Pagination
        $results = $query->paginate($request->input('per_page', 10))->withQueryString();

        return Inertia::render('Consultation/Restreintes/Detaildette', [
            'results' => $results,
            'title' => "Détails : " . $detteArchiveType,
            'type' => $type,
            'searchParams' => $request->all(['search', 'per_page']),
        ]);

    }

    /**
     * Affiche les documents détaillés pour une entité et un type de dette spécifiques.
     */
    public function entityDetails(Request $request, $detteType, $entityGroup, $item)
    {
        $detteArchiveType = '';
        $detteTypeName = '';
        switch ($detteType) {
            case 'interieure':
                $detteArchiveType = 'Dette Commerciale';
                $detteTypeName = 'Dette Commerciale';
                break;
            case 'exterieure':
                $detteArchiveType = 'Dette Locative';
                $detteTypeName = 'Dette Locative';
                break;
            case 'totale':
                $detteArchiveType = 'Dette Sociale';
                $detteTypeName = 'Dette Sociale';
                break;
        }

        $query = Docarchives::query()
            ->where('orientation', $detteArchiveType)
            ->where('orientation', $item);

        $search = $request->input('search');
        if ($search) {
            $query->whereRaw('LOWER(description) LIKE ?', ['%' . mb_strtolower($search) . '%']);
        }

        $results = $query->paginate($request->input('per_page', 10))->withQueryString();

        return Inertia::render('Consultation/Restreintes/Detaildette', [
            'results' => $results,
            'title' => "Détails de la ${detteTypeName} pour ${item}",
            'type' => $detteType,
            'searchParams' => $request->all(['search', 'per_page']),
        ]);
    }
}
