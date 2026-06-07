<?php

namespace App\Observers;

use App\Models\Log;
use App\Models\Docarchives;
use Illuminate\Support\Facades\Auth;

class DocarchiveObserver
{
    /**
     * Handle the Docarchives "created" event.
     */
    public function created(Docarchives $docarchives): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Creation',
            'description' => "Ajout du document : " .$docarchives->description,

        ]);
    }

    /**
     * Handle the Docarchives "updated" event.
     */
    public function updated(Docarchives $docarchives): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Modification',
            'description' => "Mise à jour du document ID # : " .$docarchives->id,
        ]);
    }

    /**
     * Handle the Docarchives "deleted" event.
     */
    public function deleted(Docarchives $docarchives): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Suppression',
            'description' => "Suppression du document : " .$docarchives->description,

        ]);
    }

    /**
     * Handle the Docarchives "restored" event.
     */
    public function restored(Docarchives $docarchives): void
    {
        //
    }

    /**
     * Handle the Docarchives "force deleted" event.
     */
    public function forceDeleted(Docarchives $docarchives): void
    {
        //
    }
}
