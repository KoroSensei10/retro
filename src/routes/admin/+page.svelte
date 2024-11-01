<script lang="ts">
	import loginWithEmailAndPassword, { disconnect } from '$lib/firebase/login';
	import OldButton from '../../components/OldButton.svelte';
	import { userStore } from '../../stores/auth/index.svelte';

	let email = $state('');
	let password = $state('');

	function submit(e: SubmitEvent) {
		e.preventDefault();
		try {
			// sendMagicLink(email);
			loginWithEmailAndPassword(email, password);
		} catch (error) {
			console.error(error);
		}
	}
</script>

<form
	action="?/login"
	method="POST"
	onsubmit={submit}
	class="flex w-fit flex-col gap-2 p-2 text-black dark:text-gray-100"
>
	<label for="meail">Email : </label>
	<input
		type="email"
		autocomplete=""
		name="email"
		bind:value={email}
		id="email"
		class="border border-black bg-gray-100 dark:bg-gray-800"
	/>
	<label for="password">Mot de passe : </label>
	<input
		type="password"
		name="password"
		autocomplete="current-password"
		bind:value={password}
		id="password"
		class="border border-black bg-gray-100 dark:bg-gray-800"
	/>
	<OldButton
		disabled={!!userStore.user}
		type="submit"
		class="bg-red-500 px-4 py-2 disabled:bg-gray-500"
	>
		Se connecter
	</OldButton>
</form>
<OldButton
	disabled={!userStore.user}
	type="button"
	onclick={disconnect}
	class="bg-blue-500 px-4 py-2 disabled:bg-gray-500"
>
	Se deconnecter
</OldButton>

{#if userStore.user}
	<div class="flex w-full flex-col items-center gap-2 text-center">
		<div class="text-center">Connecté en tant que {userStore.user.email}</div>
		<a href="/admin/editPage">
			<OldButton type="button" class="bg-blue-500 px-4 py-2">Editer ou créer une page</OldButton>
		</a>
	</div>
{/if}
