<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Piecerh extends Model
{
    /** @use HasFactory<\Database\Factories\PieceFactory> */
    use HasFactory, SoftDeletes;
}
