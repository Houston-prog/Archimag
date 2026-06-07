<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Docarchives;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DpaController extends Controller
{
    public function view(): Response
    {
        $stats = Docarchives::whereIn('orientation', ['Administration', 'ETABLISSEMENT', 'ENTREPRISE', 'Projet','CTD'])
            ->select('orientation', DB::raw('count(*) as total'))
            ->groupBy('orientation')
            ->get()
            ->keyBy('orientation');

        $formattedStats = [
            'administration' => $stats->get('Administration')?->total ?? 0,
            'ets' => $stats->get('ETABLISSEMENT')?->total ?? 0,
            'entreprise' => $stats->get('ENTREPRISE')?->total ?? 0,
            'projet' => $stats->get('Projet')?->total ?? 0,
            'ctd' => $stats->get('CTD')?->total ?? 0,
        ];

        return Inertia::render('Consultation/Restreintes/dpa', [
            'stats' => $formattedStats
        ]);
    }

    public function listEntities(Request $request, $type): Response
    {
        $orientationValue = '';
        if ($type === 'administration') {
            $orientationValue = 'Administration';
        } elseif ($type === 'ets') {
            $orientationValue = 'ETABLISSEMENT';
        } elseif ($type === 'entreprise') {
            $orientationValue = 'ENTREPRISE';
        } elseif ($type === 'projet') {
            $orientationValue = 'Projet';
        } elseif ($type === 'ctd') {
            $orientationValue = 'CTD';
        } else {
            abort(404);
        }

        // Récupérer les entités et leurs comptes en une seule requête
        $entitiesWithStats = Docarchives::where('orientation', $orientationValue)
            ->whereNotNull('piece_jointe')
            ->select('piece_jointe as name', DB::raw('count(*) as count'))
            ->groupBy('piece_jointe')
            ->get();

        return Inertia::render('Consultation/Restreintes/DpaEntities', [
            'type' => $type,
            'entities' => $entitiesWithStats,
        ]);
    }

    public function details(Request $request, $type)
    {
        $item = $request->input('item');

        if (!$item) {
            abort(400, 'Entité non spécifiée.');
        }

        $orientationValue = '';
        if ($type === 'administration') {
            $orientationValue = 'Administration';
        } elseif ($type === 'ets') {
            $orientationValue = 'ETABLISSEMENT';
        } elseif ($type === 'entreprise') {
            $orientationValue = 'ENTREPRISE';
        } elseif ($type === 'projet') {
            $orientationValue = 'Projet';
        } elseif ($type === 'ctd') {
            $orientationValue = 'CTD';
        } else {
            abort(404);
        }

        $query = Docarchives::query()
            ->where('piece_jointe', $item);

        if ($orientationValue) {
            $query->where('orientation', $orientationValue);
        }

        $search = $request->input('search');
        if ($search) {
            $query->whereRaw('LOWER(description) LIKE ?', ['%' . mb_strtolower($search) . '%']);
        }

        $results = $query->paginate($request->input('per_page', 10))->withQueryString();

        $title = "Dossiers DPA pour ${item}";

        return Inertia::render('Consultation/Restreintes/Detail', [
            'results' => $results,
            'title' => $title,
            'type' => $type,
            'searchParams' => $request->all(['search', 'per_page', 'item']),
        ]);
    }
}
