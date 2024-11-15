<script lang="ts">
	import Navbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import MenuModal from '$lib/components/public/menu-modal.svelte';

	import '../../app.css';

	let { children } = $props();
</script>

<div class="relative ml-auto mr-auto max-w-2xl font-jetbrains 2xl:max-w-3xl">
	<Navbar />
	<main class="@container">
		{@render children()}
	</main>
	<Footer />
</div>

<MenuModal />
