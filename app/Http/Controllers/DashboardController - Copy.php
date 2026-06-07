<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Docrh;
use App\Models\Pieces;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Database\Eloquent\Builder;

class DashboardController extends Controller
{
    public function index()
    {
        $totalPieces = Pieces::count();
        $users = Docrh::with('pieces')->get();

        $totalUsers = $users->count();
        $completeDossiersCount = 0;

        $usersNeedingAttention = collect();

        foreach ($users as $user) {
            $validatedPieces = 0;

            foreach ($user->pieces as $piece) {
                // On vérifie si le pivot contient des fichiers
                $files = json_decode($piece->pivot->file_paths, true);
                if (is_array($files) && count($files) > 0) {
                    $validatedPieces++;
                }
            }

            $percentage = $totalPieces > 0 ? round(($validatedPieces / $totalPieces) * 100) : 0;

            if ($percentage == 100) {
                $completeDossiersCount++;
            }

            // On prépare les données pour la liste de priorité
            if ($percentage < 100) {
                $usersNeedingAttention->push([
                    'id' => $user->id,
                    'name' => $user->name,
                    'matricule' => $user->matricule,
                    'percentage' => $percentage,
                    'missing_count' => $totalPieces - $validatedPieces
                ]);
            }
        }

        return Inertia::render('Consultation/Dossierrh/DossierRh', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'completeDossiersCount' => $completeDossiersCount,
                'incompleteDossiersCount' => $totalUsers - $completeDossiersCount,
                'complianceRate' => $totalUsers > 0 ? round(($completeDossiersCount / $totalUsers) * 100) : 0,
            ],
            'worstDossiers' => $usersNeedingAttention->sortBy('percentage')->take(5)->values(),
            'recentUsers' => Docrh::latest()->take(5)->get()->map(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'created_at' => $user->created_at->format('d/m/Y'),
            ]),
        ]);
    }

    public function listview(Request $request)
    {
        $query = Docrh::with('pieces')->latest();

        // 1. Recherche (Adapté PostgreSQL 'ilike')
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function (Builder $q) use ($search) {
                $q->where('name', 'ilike', '%' . $search . '%')
                  ->orWhere('matricule', 'ilike', '%' . $search . '%');
            });
        }

        // 2. Filtre par Pièce
        if ($request->filled(['pieceFilterId', 'pieceFilterStatus'])) {
            $pieceId = $request->pieceFilterId;
            $status = $request->pieceFilterStatus;

            $pieceCondition = function (Builder $q) use ($pieceId) {
                $q->where('pieces.id', $pieceId)
                  ->whereNotNull('piecerhs.file_paths')
                  ->whereJsonLength('piecerhs.file_paths', '>', 0);
            };

            if ($status === 'has') {
                $query->whereHas('pieces', $pieceCondition);
            } elseif ($status === 'missing') {
                $query->whereDoesntHave('pieces', $pieceCondition);
            }
        }

        $results = $query->paginate(10)->withQueryString();

        return Inertia::render('Consultation/Dossierrh/ListRh', [
            'users' => $results,
            'availablePieces' => Pieces::all(),
            'totalPiecesCount' => Pieces::count(),
            'filters' => $request->only(['search', 'pieceFilterId', 'pieceFilterStatus'])
        ]);
    }

}
