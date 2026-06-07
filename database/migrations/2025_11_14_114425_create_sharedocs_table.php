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
        Schema::create('sharedocs', function (Blueprint $table) {
            $table->id();
            $table->string('typearchive');
            $table->string('description');
            $table->string('date_doc');
            $table->string('emplacement')->nullable();
            $table->string('emplacement2')->nullable();
            $table->string('rayon')->nullable();
            $table->string('travee')->nullable();
            $table->string('cote')->nullable();
            $table->string('format');
            $table->string('departement');
            $table->string('filepath')->nullable();
            $table->string('share_with');
            $table->string('status')->default('Pending');
            $table->string('note')->nullable();

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sharedocs');
    }
};
