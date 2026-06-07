<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('piecerhs', function (Blueprint $table) {
            $table->id();
            $table->json('file_paths')->nullable();
            $table->timestamps();

            $table->foreignId('piece_id')->constrained('pieces')->onDelete('cascade');
            $table->foreignId('docrh_id')->constrained('docrhs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('piecerhs');
    }
};
