<script lang="ts">
	import Button from '$lib/components/atomic/public/button.svelte';
	import { ChevronLeft, ChevronRight, Plus, Search, Trash, Upload } from 'lucide-svelte';
	import { Prisma } from '@prisma/client';
	import { writable } from 'svelte/store';

	type PostWithIncludes = Prisma.PostGetPayload<{
		include: { FeaturedImage : true, Category: true }
	}>

	type TestPost = {
		id: number;
		featuredImage: string;
		title: string;
		category: string;
		content: string;
		views: number;
		status: string;
		createdAt: string;
	}

	const data : TestPost[] = [
		{
			id: 0,
			featuredImage: 'https://via.placeholder.com/150',
			title: 'Post 1',
			category: 'Category 1',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
			views: 100,
			status: 'Published',
			createdAt: '2021-09-01'
		},
		{
			id: 1,
			featuredImage: 'https://via.placeholder.com/150',
			title: 'Post 2',
			category: 'Category 2',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
			views: 200,
			status: 'Draft',
			createdAt: '2021-09-02'
		},
		{
			id: 2,
			featuredImage: 'https://via.placeholder.com/150',
			title: 'Post 3',
			category: 'Category 3',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
			views: 300,
			status: 'Published',
			createdAt: '2021-09-03'
		},
		{
			id: 3,
			featuredImage: 'https://via.placeholder.com/150',
			title: 'Post 4',
			category: 'Category 4',
			content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec, ultricies nunc. Nulla facilisi. Nullam nec nunc nec nunc.',
			views: 400,
			status: 'Draft',
			createdAt: '2021-09-04'
		}
	]

	const response = {
		page: 1,
		offset: 0,
		limit: 10,
		total: 100,
		totalPages: 10,
		data: data
	}

	let selectedPosts: number[] = [];
	let selectedPostCount = writable(0);

	const selectedPost = (e: Event, id: number) => {
		const target = e.target as HTMLInputElement;
		if (target.checked && !selectedPosts.includes(id)) {
			selectedPosts.push(id);
		} else {
			selectedPosts = selectedPosts.filter((post) => post !== id);
		}

		selectedPostCount.set(selectedPosts.length);
	}

	const selectAllPosts = () => {
		if (selectedPosts.length === response.data.length) {
			selectedPosts = [];
		} else {
			selectedPosts = response.data.map((post) => post.id);
		}

		selectedPostCount.set(selectedPosts.length);
	}

	let isAllSelected = false;
</script>

<svelte:head>
	<title>Dashboard - Posts</title>
</svelte:head>
<div class="flex flex-col gap-5">
	<h1 class="text-3xl font-bold text-gray-300">Posts</h1>
	<div class="inline-flex items-center justify-between">
		<div class="inline-flex items-center gap-4">
			<div class="group inline-flex items-center rounded-lg border border-gray-500 px-3 py-1">
				<Search class="h-5 w-5 text-gray-500 transition-colors group-focus-within:text-gray-300" />
				<input
					type="text"
					class="w-56 border-none bg-transparent text-sm text-gray-200 focus:border-none focus:outline-none focus:ring-0"
					placeholder="Search in posts"
				/>
			</div>
			<select name="" id="" class="appearance-none border text-sm rounded-lg block min-w-20 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
				<option selected value="">10</option>
				<option value="">20</option>
				<option value="">50</option>
				<option value="">100</option>
			</select>
		</div>
		<div class="inline-flex items-center gap-3 text-sm">
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
				<span class="ml-2">Delete ({$selectedPostCount} {$selectedPostCount > 1 ? 'posts' : 'post'})</span>
			</Button>
		</div>
	</div>
	<div class="relative overflow-x-auto show-md rounded-lg">
		<table class="w-full text-left text-sm text-gray-400">
			<thead class="bg-gray-700">
				<tr>
					<th scope="col" class="px-6 py-3">
						<input type="checkbox" bind:checked={isAllSelected} name="" id="" on:change={() =>selectAllPosts()} class="appearance-none bg-transparent rounded-md border-2">
					</th>
					<th class="px-4 py-3">Title</th>
					<th class="px-4 py-3">Content</th>
					<th class="px-4 py-3">Category</th>
					<th class="px-4 py-3">Views</th>
					<th class="px-4 py-3">Status</th>
					<th class="px-4 py-3">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each response.data as post}
					<tr class="odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700 text-white hover:bg-gray-600 transition-colors">
						<td class="px-6 py-2 border-b border-gray-600">
							<input type="checkbox" name="" id="" checked={isAllSelected} on:change={(e) => selectedPost(e, post.id)} class="appearance-none bg-transparent rounded-md border-2">
						</td>
						<td class="px-4 py-2 border-b border-gray-600">{post.title}</td>
						<td class="px-4 py-2 border-b border-gray-600">
							<p class="line-clamp-2 max-w-64">{post.content}</p>
						</td>
						<td class="px-4 py-2 border-b border-gray-600">{post.category}</td>
						<td class="px-4 py-2 border-b border-gray-600">{post.views}</td>
						<td class="px-4 py-2 border-b border-gray-600">{post.status}</td>
						<td class="px-4 py-2 border-b border-gray-600">
							<div class="inline-flex gap-2">
								<Button
								onclick={() => console.log('clicked')}
								type="info"
								disabled={false}
								loading={false}
							>
								Edit
							</Button>
							<Button
								onclick={() => console.log('clicked')}
								type="danger"
								disabled={false}
								loading={false}
							>
								Delete
							</Button>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot class=" text-gray-300">
				<tr>
					<th colspan="5" class="px-4 py-2 font-light">Showing posts from <span class="text-white font-bold">{response.offset} - {response.limit + response.offset}</span> of <span class="text-white font-bold">{response.total}</span></th>
					<th colspan="2" class="px-4 py-2">
						<div class="flex justify-end">
							<div class="inline-flex items-center font-medium">
								<button class="inline-flex items-center gap-1 px-2 border border-gray-700 h-8 hover:bg-gray-700 transition-colors rounded-s-lg">
										<ChevronLeft class="h-4 w-4" />
										<p>Previous</p>
								</button>
								<button class="border border-gray-700 px-1 h-8 w-8 bg-gray-700 transition-colors">
									<p class="px-">1</p>
								</button>
								<button class="border border-gray-700 px-1 h-8 w-8 hover:bg-gray-700 transition-colors">
									<p class="px-">2</p>
								</button>
								<button class="border border-gray-700 px-1 h-8 w-8 hover:bg-gray-700 transition-colors">
									<p class="px-">3</p>
								</button>
								<button class="border border-gray-700 px-1 h-8 w-8 hover:bg-gray-700 transition-colors">
									<p class="px-">4</p>
								</button>
								<button class="border border-gray-700 px-1 h-8 w-8 hover:bg-gray-700 transition-colors">
									<p class="px-">5</p>
								</button>
								<button class="inline-flex items-center gap-1 px-2 border border-gray-700 h-8 rounded-e-lg hover:bg-gray-700 transition-colors">
									<p>Next</p>
									<ChevronRight class="h-4 w-4" />
								</button>
							</div>
						</div>
					</th>
				</tr>
			</tfoot>
		</table>
	</div>
</div>