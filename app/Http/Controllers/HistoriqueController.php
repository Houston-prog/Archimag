<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Historique;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class HistoriqueController extends Controller
{
    public function index(Request $request)
    {
        // Si la table n'existe pas, retourner une page vide
        if (! Schema::hasTable('historiques')) {
            return Inertia::render('Consultation/Historique/Historique', [
                'historiques' => [],
            ]);
        }

        $query = Historique::query();

        // Par défaut, restreindre à l'utilisateur connecté lorsque disponible
        // if (auth()->check()) {
        //     $query->where('user_id', auth()->id());
        // }

        // Filtre par type/action
        if ($request->filled('type')) {
            $type = $request->input('type');
            $query->where(function ($q) use ($type) {
                $q->where('action', $type)->orWhere('type', $type);
            });
        }

        // Filtre par date
        if ($request->filled('date_from')) {
            $query->where('created_at', '>=', $request->input('date_from'));
        }
        if ($request->filled('date_to')) {
            $query->where('created_at', '<=', $request->input('date_to'));
        }

        $perPage = (int) $request->input('per_page', 15);

        // Export CSV si demandé
        if ($request->input('export') === 'csv') {
            $items = $query->orderBy('created_at', 'desc')->get();

            $filename = 'historique_' . now()->format('Ymd_His') . '.csv';
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            ];

            $callback = function () use ($items) {
                $out = fopen('php://output', 'w');
                // entêtes
                fputcsv($out, ['id', 'created_at', 'action', 'type', 'subject', 'details', 'user_id']);
                foreach ($items as $i) {
                    fputcsv($out, [
                        $i->id,
                        $i->created_at,
                        $i->action ?? $i->type ?? '',
                        $i->type ?? '',
                        $i->subject ?? $i->model ?? '',
                        $i->details ?? $i->description ?? json_encode($i->meta ?? ''),
                        $i->user_id,
                    ]);
                }
                fclose($out);
            };

            return response()->streamDownload($callback, $filename, $headers);
        }

        $paginator = $query->orderBy('created_at', 'desc')->paginate($perPage)->withQueryString();

        return Inertia::render('Consultation/Historique/Historique', [
            'historiques' => $paginator,
        ]);
    }
}
