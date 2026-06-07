<?php

namespace App\Observers;

use App\Models\Log;
use App\Models\Sharedoc;
use Illuminate\Support\Facades\Auth;

class SharedocObserver
{
    /**
     * Handle the Sharedocs "created" event.
     */
    public function created(Sharedoc $sharedocs): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Partager',
            'description' => "Document partagé : " .$sharedocs->description,

        ]);
    }

    /**
     * Handle the Sharedocs "updated" event.
     */
    public function updated(Sharedoc $sharedocs): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Modification du partage',
            'description' => "Mise à jour de l'ID du document partagé # : " .$sharedocs->id,
        ]);
    }

    /**
     * Handle the Sharedocs "deleted" event.
     */
    public function deleted(Sharedoc $sharedocs): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Suppression du partage',
            'description' => "Suppression du document partagé : " .$sharedocs->description,
        ]);
    }

    /**
     * Handle the Sharedocs "restored" event.
     */
    public function restored(Sharedoc $sharedocs): void
    {
        //
    }

    /**
     * Handle the Sharedocs "force deleted" event.
     */
    public function forceDeleted(Sharedoc $sharedocs): void
    {
        //
    }
}
