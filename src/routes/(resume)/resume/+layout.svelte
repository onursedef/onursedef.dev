<script lang="ts">
    import '../../../app.css';
    const { children } = $props();
</script>

<div class="antialiased bg-neutral-900 text-white">
    {@render children()}
</div>