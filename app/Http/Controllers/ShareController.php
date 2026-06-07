<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Sharedoc;
use App\Models\Docarchives;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;

class ShareController extends Controller
{
    public function senddoc($id): Response
    {
        $elements = Docarchives::findOrFail($id);

        // Recuperer tous les utilisateurs pour le select 'Utilisateurs'
        $users = User::all();

        return Inertia::render('Consultation/Restreintes/Senddoc', [
            'elements' => $elements,
            'users' => $users,
            'paths' => Storage::url($elements->filepath)
        ]);
    }

    public function store (Request $request): RedirectResponse
    {
        $users_id = Auth::id();

        $request->validate([
            'note' => 'nullable|string|max:255',
            'share_with' => 'required|string|max:255',
            'docarchives_id' => 'required|exists:docarchives,id',
        ]);

        Sharedoc::create([
            'typearchive' => $request->input('typearchive'),
            'date_doc' => $request->input('date_doc'),
            'description' => $request->input('description'),
            'format' => $request->input('format'),
            'emplacement' => $request->input('emplacement'),
            'emplacement2' => $request->input('emplacement2'),
            'rayon' => $request->input('rayon'),
            'travee' => $request->input('travee'),
            'cote' => $request->input('cote'),
            'departement' => $request->input('departement'),
            'share_with' => $request->input('share_with'),
            'note' => $request->input('note'),
            'user_id' => $users_id,
            'filepath' => $request->input('filepath')
        ]);

        return redirect()->route('send.store')->with([
            'toastMessage' => [
                'type' => 'success',
                'message' => 'Archive partagée avec succès.'
            ]
        ]);
    }

    public function sendview(Request $request): Response
    {
        $query = Sharedoc::with('share_with')->where('user_id', Auth::id());

        if ($request->input('description')) {
            $query->whereRaw('LOWER(description) LIKE ?', ['%' . mb_strtolower($request->input('description')) . '%']);
        }
        if ($request->input('typearchive')) {
            $query->where('typearchive', 'like', '%' . $request->input('typearchive') . '%');
        }
        if ($request->input('date_doc')) {
            $query->where('date_doc', 'like', '%' . $request->input('date_doc') . '%');
        }

        $results = $query->paginate(10)->withQueryString();

        return Inertia::render('Consultation/SendDoc', [
            'results' => $results,
            'searchParams' => $request->all()
        ]);
    }

    public function receiveview(Request $request): Response
    {
        // Fetch shared docs with sender (user) and recipient relationships
        // Assuming 'recipient' relationship exists on Sharedoc model (belongsTo User on share_with)
        $user = Auth::user();
        $query = Sharedoc::with('user', 'share_with');

        if ($user->roles === 'Super') {
            // Super Admin sees all shared documents, no extra filter needed.
        } elseif ($user->roles === 'Admin') {
            // Admin sees shared documents from their department.
            $query->where('departement', $user->departement);
        } else {
            // Other users only see documents shared with them.
            $query->where('share_with', $user->id);
        }

        if ($request->input('description')) {
            $query->whereRaw('LOWER(description) LIKE ?', ['%' . mb_strtolower($request->input('description')) . '%']);
        }

        $results = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Consultation/ReceiveDoc', [
            'results' => $results,
            'searchParams' => $request->all()
        ]);
    }

    public function approve($id): RedirectResponse
    {
        $share = Sharedoc::findOrFail($id);
        $share->status = 'Approved';
        $share->save();

        // TODO: Informer l'utilisateur destinataire.
        // La création d'une notification nécessite un système de notification complet (par exemple, Laravel Notifications)
        // qui comprend des migrations de base de données, des modèles et des composants d'interface utilisateur.
        // Ci-dessous un exemple de la manière dont cela pourrait être déclenché.
        /*
        $recipient = User::find($share->share_with);
        if ($recipient) {
            // En supposant qu'une classe de notification 'DocumentApproved' existe.
            $recipient->notify(new \App\Notifications\DocumentApproved($share));
        }
        */

        return redirect()->back()->with('success', 'Partage autorisé.');
    }

    public function incomingDocsView(Request $request): Response
    {
        $user = Auth::user();
        $query = Sharedoc::with(['user', 'share_with'])
            ->where('status', 'Approved')
            ->where('departement', $user->departement);

        $results = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Consultation/Restreintes/RecieveUserDoc', [
            'results' => $results,
            'searchParams' => $request->all()
        ]);
    }

    public function showShare($id): Response
    {
        $share = Sharedoc::with(['user', 'share_with'])->findOrFail($id);

        return Inertia::render('Consultation/ShareDetail', [
            'share' => $share,
            'path' => Storage::url($share->filepath)
        ]);
    }

    public function destroy($id): RedirectResponse
    {
        $share = Sharedoc::findOrFail($id);

        // Vérification de sécurité : seul l'expéditeur ou un Super Admin peut annuler
        if (Auth::id() !== $share->user_id && Auth::user()->roles !== 'Super') {
            return redirect()->back()->with('error', 'Action non autorisée.');
        }

        $share->delete();

        return redirect()->back()->with([
            'toastMessage' => [
                'type' => 'success',
                'message' => 'Partage annulé avec succès.'
            ]
        ]);
    }

}
