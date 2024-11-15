<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	import Sidebar from '$lib/components/admin/sidebar.svelte';
	import Navbar from '$lib/components/admin/navbar.svelte';
	import '../../app.css';

	let { children } = $props();
</script>

<div class="flex bg-gray-900 text-white">
	<Sidebar />
	<div class="flex w-full flex-col gap-3">
		<Navbar />
		<div class="mx-auto w-full max-w-4xl">
			{@render children()}
		</div>
	</div>
</div>
