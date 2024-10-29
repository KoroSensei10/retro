<script lang="ts">
	import OldButton from '../components/OldButton.svelte';
	import { headingsStore } from '../stores/headings/index.svelte';

	headingsStore.headings = ['Les Différents Chapitres', 'Les Personnages', 'Les Lieux'];
	const lists = [
		['Chapitre 1', 'Chapitre 2', 'Chapitre 3'],
		['Le héros', 'Le voyageur', 'Le propriétaire de la maison', 'Le tavernier', "L'écrivain"],
		[
			'Le pâturage',
			'Forêt de Gnomépièc',
			'Maison du propriétaire',
			'Royaume de Gnomépièc',
			'Village de Gnomépièc',
			'Taverne',
			'Forêt magique',
			'Tour de Gnomépièc'
		]
	];
</script>

<div class="flex flex-col gap-2 p-2">
	<blockquote
		class=" bg-fuel-yellow-200 mx-8 flex overflow-hidden border-4
	border-black text-black shadow-lg"
	>
		<div class="bg-fuel-yellow-500 flex w-20 items-center justify-center">
			<div class="translate-y-1 font-serif text-2xl font-bold">"</div>
		</div>
		<cite class=" text-balance p-4">
			Une ombre s'étend sur le nord du royaume de Gnomépiec alors que la Gang'reine détruit
			implacablement les terres jadis luxuriantes, transformant les réserves naturelles en déserts
			stériles et empoisonnant les rivières qui foisonnaient autrefois de vie.
		</cite>
	</blockquote>
	<div class="text-justify indent-8">
		Bienvenue sur le Wiki de <span class=" font-bold">Legend of Kingdom 2 !</span> Découvrez ce jeu de
		point & click étonnant qui a surgi de nulle part, créé par une équipe de développeurs mystérieux.
		Plongez dans un monde captivant rempli d'énigmes, d'aventures et de découvertes inattendues. Trouvez
		ici des guides pratiques, des astuces et des infos sur les personnages et lieux. Que vous soyez un
		joueur chevronné ou novice, préparez-vous à explorer un univers fascinant ! N'hésitez pas à commenter
		ou ajouter des articles pour faire partie de la communauté !
	</div>
	<div class=" self-center">
		<OldButton class=" px-4 py-2" title="Découvrir"></OldButton>
	</div>
	{#each headingsStore.headings as heading, i (heading)}
		<div class="w-full">
			<h2 id={heading} class="w-full text-left text-2xl font-bold">{heading}</h2>
			<ul class="w-full list-inside list-disc px-4 text-left">
				{#each lists[i] as list}
					<li>{list}</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>
