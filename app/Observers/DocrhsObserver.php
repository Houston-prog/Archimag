<?php

namespace App\Observers;

use App\Models\Log;
use App\Models\Docrh;
use Illuminate\Support\Facades\Auth;

class DocrhsObserver
{
    /**
     * Handle the Docrhs "created" event.
     */
    public function created(Docrh $docrhs): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Creation',
            'description' => "Ajout du document : " .$docrhs->description,

        ]);
    }

    /**
     * Handle the Docrhs "updated" event.
     */
    public function updated(Docrh $docrhs): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Modification',
            'description' => "Mise à jour du document ID # : " .$docrhs->id,
        ]);
    }

    /**
     * Handle the Docrhs "deleted" event.
     */
    public function deleted(Docrh $docrhs): void
    {
        Log::create([
            'user_id' => Auth::id(),
            'action' => 'Suppression',
            'description' => "Suppression du document : " .$docrhs->description,
        ]);
    }

    /**
     * Handle the Docrhs "restored" event.
     */
    public function restored(Docrh $docrhs): void
    {
        //
    }

    /**
     * Handle the Docrhs "force deleted" event.
     */
    public function forceDeleted(Docrh $docrhs): void
    {
        //
    }
}
