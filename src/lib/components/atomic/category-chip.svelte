<script lang="ts">
	let { name, slug, selected } = $props<{
		name: string;
		slug: string;
		selected: boolean;
	}>();
</script>

<a
	href="?category={slug}"
	class="block rounded-lg border-2 border-slate-500 px-6 py-1 transition-colors hover:bg-slate-400 dark:border-slate-800 dark:hover:bg-slate-800 {selected
		? 'bg-slate-400/75 dark:bg-slate-700/65'
		: ''}"
>
	{name}
</a>
