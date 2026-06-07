<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class BackupController extends Controller
{
    public function backupApp()
    {
        // Logique pour sauvegarder les fichiers (zip)
        Artisan::call('backup:run --only-files');

        return response()->json(['message' => 'Sauvegarde des fichiers lancées.']);
    }

    public function backupDb()
    {
        // Logique pour sauvegarder la base de données
        Artisan::call('backup:run --only-db');

        return response()->json(['message' => 'Sauvegarde de la base de données lancées']);
    }
}
