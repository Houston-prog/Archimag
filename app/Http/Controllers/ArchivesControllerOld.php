<?php

namespace App\Http\Controllers;

use App\Models\Accessgroup;
use App\Models\Archives;
use App\Models\Docarchives;
use App\Models\Dossiersrh;
use App\Models\Locationemp;
use App\Models\Typedocs;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ArchivesController extends Controller
{
    public function store (Request $request): RedirectResponse
    {
        $rules = [
            'typearchive'=> 'required|string|max:255',
            'date_doc' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'format' => 'required|string|max:255',
            'emplacement' => 'required|string|max:255',
            'emplacement2' => 'required|string|max:255',
            'rayon' => 'nullable|string|max:255',
            'travee' => 'nullable|string|max:255',
            'cote' => 'nullable|string|max:255',
            'departement' => 'required|string|max:255',
            'filepath' => ['nullable', 'file', 'mimes:pdf', 'max:100000240'] // 100GB max,
        ];

        // If the authenticated user has role 'User', make emplacement fields nullable
        if (Auth::user() && Auth::user()->roles === 'User') {
            $rules['emplacement'] = 'nullable|string|max:255';
            $rules['emplacement2'] = 'nullable|string|max:255';
            $rules['rayon'] = 'nullable|string|max:255';
            $rules['travee'] = 'nullable|string|max:255';
            $rules['cote'] = 'nullable|string|max:255';
        }

        $validated = $request->validate($rules);

        $filepath = null;
        if ($request->hasFile('filepath')) {
            $filepath = $request->file('filepath')->store('fichier', 'public');
        }

        // Concaténer les données pour la description
        $concatenatedDescription = $request->input('typearchive') . '_' .
                                   $request->input('description') . '_' .
                                   $request->input('date_doc') . '_' .
                                   $request->input('departement');

        //Docarchives::create($validateData + ['filepath' => $filepath]);

        Docarchives::create([
            'typearchive' => $request->input('typearchive'),
            'date_doc' => $request->input('date_doc'),
            'description' => $concatenatedDescription,
            'format' => $request->input('format'),
            'emplacement' => $request->input('emplacement'),
            'emplacement2' => $request->input('emplacement2'),
            'rayon' => $request->input('rayon'),
            'travee' => $request->input('travee'),
            'cote' => $request->input('cote'),
            'departement' => $request->input('departement'),
            'user_id' => Auth::user()->id,
            'filepath' => $filepath,
        ]);


        return redirect()->route('archives.view')->with('success', 'Archive créée avec succès.');
    }

    public function view (Request $request): Response
    {
        $type = Typedocs::latest()->get();

        $groupe = Accessgroup::all();

        $location = Locationemp::all();

        return Inertia::render('Creation/Archives', [
            'types' => $type,
            'groupes' => $groupe,
            'locations' => $location,
        ]);
    }

    public function createrh (Request $request): Response
    {
        $location = Locationemp::all();

        return Inertia::render('Creation/DossierRh', [
            'locations' => $location,
        ]);
    }

    public function storerh (Request $request): RedirectResponse
    {
        $request->validate([
            'type_document'=> 'required|string|max:255',
            'name' => 'required|string|max:255',
            'format' => 'required|string|max:255',
            'emplacement' => 'required|string|max:255',
            'emplacement2' => 'required|string|max:255',
            'rayon' => 'nullable|string|max:255',
            'travee' => 'nullable|string|max:255',
            'cote' => 'nullable|string|max:255',
            'accesgroup' => 'required|string|max:255',
            'filepath' => ['nullable', 'file', 'mimes:pdf', 'max:100000240'] // 100GB max,
        ]);

        $filepath = $request->file('filepath')->store('Personnels', 'public');

        //Docarchives::create($validateData + ['filepath' => $filepath]);

        Dossiersrh::create([
            'type_document' => $request->input('type_document'),
            'name' => $request->input('name'),
            'format' => $request->input('format'),
            'emplacement' => $request->input('emplacement'),
            'emplacement2' => $request->input('emplacement2'),
            'rayon' => $request->input('rayon'),
            'travee' => $request->input('travee'),
            'cote' => $request->input('cote'),
            'accesgroup' => $request->input('accesgroup'),
            'user_id' => Auth::user()->id,
            'filepath' => $filepath,
        ]);

        return redirect()->route('dossierrh.createrh')->with([
            'toastMessage' => [
                'type' => 'success',
                'message' => 'Archive créée avec succès.'
            ]
        ]);
    }

    public function viewdossiersrh (): Response
    {
        $dossiers = Dossiersrh::all();

        return Inertia::render('Consultation/Dossierrh/DossierRh', [
            'dossiers' => $dossiers,
        ]);
    }
}
