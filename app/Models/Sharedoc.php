<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sharedoc extends Model
{
    // protected fillable
    protected $fillable = [
        'typearchive',
        'description',
        'date_doc',
        'emplacement',
        'emplacement2',
        'rayon',
        'travee',
        'cote',
        'format',
        'departement',
        'filepath',
        'share_with',
        'status',
        'note',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtenir l'utilisateur avec qui le document est partagé.
     */
    public function share_with(): BelongsTo
    {
        return $this->belongsTo(User::class, 'share_with');
    }


}
