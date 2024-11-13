<script lang="ts">
    import Sidebar from '$lib/components/admin/sidebar.svelte';
	import Navbar from '$lib/components/admin/navbar.svelte';
    
    import '../../app.css';

    let { children } = $props();
</script>

<div class="flex text-white bg-gray-900">
    <Sidebar />
    <div class="flex flex-col w-full gap-3">
        <Navbar />
        {@render children()}
    </div>
</div>