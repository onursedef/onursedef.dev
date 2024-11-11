<script lang="ts">
	import Navbar from './../lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';

	import '../app.css';
	import MenuModal from '$lib/components/menu-modal.svelte';

	let { children } = $props();
</script>

<!-- 
<main class="@container">
	<div class="relative ml-auto mr-auto max-w-2xl 2xl:max-w-3xl">
		
		{@render children()}
	</div>
</main> -->

<div class="relative ml-auto mr-auto max-w-2xl 2xl:max-w-3xl">
	<Navbar />
	<main class="@container">
		{@render children()}
	</main>
	<Footer />
</div>

<MenuModal />
