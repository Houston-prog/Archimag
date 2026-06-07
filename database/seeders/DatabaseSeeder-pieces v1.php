<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Pieces;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Pieces::factory()->create([
            'id' => 1,
            'name' => 'Fiche de renseignement',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);

        Pieces::factory()->create([
            'id' => 2,
            'name' => 'Acte d\'intégration ou contrat (Integration decision or contract)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);

        Pieces::factory()->create([
            'id' => 3,
            'name' => 'Avenant contrat de contrat',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);

        Pieces::factory()->create([
            'id' => 4,
            'name' => 'Dernier certificat de prise de service (Last assumption or resumption of duty certificate)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);

        Pieces::factory()->create([
            'id' => 5,
            'name' => 'Décrets, arrêtés ou décision de nomination (Appointment decision)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 6,
            'name' => 'Note d\'affectation (Transfert decision) à la DGB',
            'description' => '',
            'user_id'=> 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 7,
            'name' => 'Dernier acte d\'avancement (Last advancement decision)',
            'description' => '',
            'user_id'=> 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 8,
            'name' => 'Présence effective au poste (Attestation of effective presence)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);

        // Pieces::factory()->create([
        //     'id' => 9,
        //     'name' => 'Certificat de prise de service',
        //     'description' => '',
        //     'user_id' => 1,
        // ]);

        Pieces::factory()->create([
            'id' => 9,
            'name' => 'Acte de reclassement',
            'description' => '',
            'user_id' => 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 10,
            'name' => 'Photocopie de l\'acte de mariage éventuellement (Photocopy of mariage certificate where applicable)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 11,
            'name' => 'Photocopie du diplôme le plus élevé (Photocopy highest diploma)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);

        Pieces::factory()->create([
            'id' => 12,
            'name' => 'Photocopie du diplôme d\'intégration (Photocopy integration diploma)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);


        Pieces::factory()->create([
            'id' => 13,
            'name' => 'Photocopie de la CNI (Photocopy of National ID Card)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);

        Pieces::factory()->create([
            'id' => 14,
            'name' => 'Photocopie du récépissé COPPE (Photocopy of the last head count census receipt)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 15,
            'name' => 'Photocopies des actes de naissance des enfants mineurs',
            'description' => '',
            'user_id' => 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 16,
            'name' => 'Photocopie du permis de conduire éventuellement (Photocopy of driving licence where applicable)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 17,
            'name' => 'Certificat ou attestation de formation éventuellement (Training Certificate where applicable)',
            'description' => '',
            'user_id' => 1,
            'status' => 'Optionnelle',
        ]);

        Pieces::factory()->create([
            'id' => 18,
            'name' => 'Photocopie de l\'acte de naissance (Photocopies of birth certificate) ',
            'description' => '',
            'user_id' => 1,
            'status' => 'Obligatoire',
        ]);

    }

}
