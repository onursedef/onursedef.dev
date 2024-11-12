<script lang="ts">
	let { name, slug, selected } = $props<{
		name: string;
		slug: string;
		selected: boolean;
	}>();
</script>

<a
	href="?category={slug}"
	class="rounded-lg border-2 border-slate-800 px-6 py-1 transition-colors hover:bg-slate-800 {selected
		? 'bg-slate-700/65'
		: ''}"
>
	{name}
</a>
