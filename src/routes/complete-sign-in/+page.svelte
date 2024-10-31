<!-- src/routes/complete-sign-in/+page.svelte -->
<script>
	import { completeMagicLinkSignIn } from '$lib/firebase/magic_link';
	import { onMount } from 'svelte';

	onMount(async () => {
		const signedInUser = await completeMagicLinkSignIn();
		if (signedInUser) {
			window.location.href = '/'; // Redirect after successful sign-in
		}
	});
</script>

<p>Completing sign-in...</p>
