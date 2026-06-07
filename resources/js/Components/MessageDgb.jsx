import React from 'react'

export default function MessageDgb() {
  return (
    <div className='grid grid-cols-2 gap-4'>
        <div className=''>
            <img src="images/photo_dgb.png" alt="" className="w-full mx-auto mb-4 rounded-lg" />

            <hr />
            <p className='text-center uppercase italic'>
                Monsieur EDOU Alo'o Cyrill
            </p>

            <p className='text-center font-semibold'>
                Directeur Général du Budget
            </p>
        </div>

        <div className=''>
            <h2 className='text-center text2 items-center justify-center font-semibold uppercase italic'>
                Mot de monsieur le Directeur General du Budget
            </h2>

            <p className='mt-10 text-justify font-semibold leading-10'>
                Les archives constituent pour toute organisation une source d’information capitale pour une prise de décision adéquate dans le cadre de l’exécution de ses différentes activités. Leur organisation et leur modernisation participent du processus de mise en place du contrôle interne dont l’aboutissement
                favorise l’atteinte de la performance.
                Le Code de transparence et de bonne gouvernance dans la gestion des finances publiques et la loi portant régime financier de l’Etat et des autres entités publiques au Cameroun prescrivent la mise en place du contrôle interne au sein des administrations publiques. Cette prescription a pour objectif d’assurer à ces
                entités que leurs activités sont convenablement maîtrisées à tous les niveaux, en vue de leur permettre d'atteindre ses objectifs. Il vise à assurer une bonne application de la réglementation et des procédures comptables et financières et permet ainsi de s'assurer que les décisions sont prises sur une base d'informations contrôlées,
                pertinentes et communiquées dans les meilleurs délais.
                La Direction Générale du budget amorce un pan important de son contrôle interne à travers ce projet d’archivage électronique.
                ARCHIDOC’DGB est un outil de conservation des données sur le moyen et le long terme avec des garanties d’authenticité et d’intégrité. Il vise à numériser les fichiers afin de dématérialiser les informations et les stocker de manière intelligente.
                Véritable <b>coffre-fort électronique</b> des informations de la Direction Générale du Budget, cet outil a pour but :
            </p>
            <ol type='square' className='mt-3 font-semibold leading-10'>
                <li>D’optimiser la qualité et la confidentialité des archives; </li>
				<li>De préserver la mémoire de la <i>DGB</i>;</li>
				<li>De donner un accès rapide aux documents. </li>
            </ol>
            <p className='mt-5 font-semibold leading-10'>
                <i>ARCHIDOC’DGB</i> est ainsi mis à la disposition de l’ensemble du personnel de la Direction Générale du Budget pour leur permettre de disposer en permanence des informations utiles à la mise en œuvre de leurs activités. Il constitue aussi une plateforme de partage d'Archives entre les structures.
            </p>
            <p className='mt-5 font-semibold leading-10'>
                <i>ARCHIDOC’DGB</i> servira d’aide à la décision pour la hiérarchie.
            </p>
        </div>
    </div>
  )
}
