<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Typedocs;
use App\Models\Docarchives;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JournalController extends Controller
{
    // public function journalview(): Response
    // {
    //     $type = Typedocs::latest()->get();

    //     return Inertia::render('Administration/Journal', [
    //         'types' => $type
    //     ]);
    // }

    public function show(Request $request): Response
    {
        $description = $request->input('description');
        $typearchive = $request->input('typearchive');
        $date_doc = $request->input('date_doc');
        $created_at = $request->input('created_at');

        $query = Docarchives::query();

        if (Auth::check()) {
            // filter based on from fields
            if ($request->has('description') && $description) {
                $query->whereRaw('LOWER(description) LIKE ?', ['%' . mb_strtolower($description) . '%']);
            }

            if ($request->has('typearchive') && $typearchive) {
                $query->where('typearchive', 'like', '%' . $typearchive . '%');
            }

            if ($request->has('date_doc') && $date_doc) {
                $query->where('date_doc', 'like', '%' . $date_doc . '%');
            }

            if ($request->has('created_at') && $created_at) {
                $query->where('created_at', 'like', '%' . $created_at . '%');
            }

            // add more filter

            $results = $query->paginate(10);
        }

        return Inertia::render('Administration/Journal/JournalView', [
            'results' => $results,
            'searchParams' => $request->all()
        ]);
    }

    /**
     * Affiche la liste des journaux d'activité avec filtres et pagination.
     */
    public function index(Request $request): Response
    {
        $query = Log::with('user')->latest();

        // Filtre par utilisateur
        if ($request->filled('user_id') && $request->input('user_id') !== 'all') {
            $query->where('user_id', $request->input('user_id'));
        }

        // Filtre par action (recherche partielle)
        if ($request->filled('action')) {
            $query->where('action', 'like', '%' . $request->input('action') . '%');
        }

        // Filtre par date de début
        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->input('date_from'));
        }

        // Filtre par date de fin
        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->input('date_to'));
        }

        // Pagination des résultats en conservant les paramètres de filtre dans les liens
        $logs = $query->paginate(20)->withQueryString();

        return Inertia::render('Administration/Journal', [
            'logs' => $logs,
            'users' => User::orderBy('name')->get(['id', 'name']),
            'filters' => $request->only(['user_id', 'action', 'date_from', 'date_to']),
        ]);
    }
}
