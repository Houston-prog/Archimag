<?php

namespace App\Models;

use App\Models\Pieces;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Docrh extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'matricule',
    ];

    public function pieces()
    {
        return $this->belongsToMany(Pieces::class, 'piecerhs', 'docrh_id', 'piece_id')
                    ->withPivot('file_paths')
                    ->withTimestamps();
    }
}
