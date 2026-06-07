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
        Schema::create('docarchives', function (Blueprint $table) {
            $table->id();
            $table->string('typearchive');
            $table->text('description');
            $table->string('date_doc');
            $table->string('emplacement')->nullable();
            $table->string('emplacement2')->nullable();
            $table->string('rayon')->nullable();
            $table->string('travee')->nullable();
            $table->string('cote')->nullable();
            $table->string('format');
            $table->string('departement');
            $table->string('piece_jointe')->nullable();
            $table->string('orientation')->nullable();
            $table->string('zip_file')->nullable();
            $table->string('filepath')->nullable();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('docarchives');
    }
};
