<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PiecesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Chemin vers votre fichier CSV
        $csvFile = base_path('database/data/pieces-2.csv');

        // Lecture du fichier
        $handle = fopen($csvFile, 'r');

        // Sauter la ligne d'en-tête (id, name, description)
        fgetcsv($handle);

        $pieces = [];

        while (($data = fgetcsv($handle, 1000, ",")) !== false) {
            $pieces[] = [
                'id'          => $data[0],
                'name'        => $data[1],
                'description' => $data[2] ?? null,
                'deleted_at'  => now(),
                'created_at'  => now(),
                'updated_at'  => now(),
            ];
        }

        fclose($handle);

        // Insertion en masse (plus performant qu'une boucle d'inserts)
        DB::table('pieces')->upsert($pieces, ['id'], ['name', 'description']);

    }
}
