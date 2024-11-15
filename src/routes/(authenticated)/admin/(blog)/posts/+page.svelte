<script>
	import Button from '$lib/components/atomic/public/button.svelte';
	import { Plus, Search, Trash, Upload } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Dashboard - Posts</title>
</svelte:head>
<div class="flex flex-col gap-5">
	<h1 class="text-3xl font-bold text-gray-300">Posts</h1>
	<div class="inline-flex items-center justify-between">
		<div class="group inline-flex items-center rounded-lg border border-gray-500 px-3 py-1">
			<Search class="h-5 w-5 text-gray-500 transition-colors group-focus-within:text-gray-300" />
			<input
				type="text"
				class="w-56 border-none bg-transparent text-sm text-gray-200 focus:border-none focus:outline-none focus:ring-0"
				placeholder="Search in posts"
			/>
		</div>
		<div class="inline-flex items-center gap-4 text-sm">
			<Button onclick={() => console.log('clicked')} type="info" disabled={false} loading={false}>
				<Plus class="h-5 w-5 text-white" />
				<span class="ml-2">New</span>
			</Button>
			<Button
				onclick={() => console.log('clicked')}
				type="success"
				disabled={false}
				loading={false}
			>
				<Upload class="h-5 w-5 text-white" />
				<span class="ml-2">Import</span>
			</Button>
			<Button onclick={() => console.log('clicked')} type="danger" disabled={false} loading={false}>
				<Trash class="h-5 w-5 text-white" />
				<span class="ml-2">Delete</span>
			</Button>
		</div>
	</div>
</div>
