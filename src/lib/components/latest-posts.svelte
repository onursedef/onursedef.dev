<script lang="ts">
	import { Eye, Tags } from 'lucide-svelte';
	import Placeholder1 from '../../assets/images/placeholder-1.jpg';
	import CategoryChip from './atomic/category-chip.svelte';
	import ListPost from './atomic/list-post.svelte';

	let posts = {
		featured: [
			{
				slug: '#',
				title: 'Placeholder Post Title',
				image: Placeholder1,
				views: 4321,
				category: 'Technology',
				description:
					'Anker Soundcore R50I is a great pair of earbuds that you can buy. It has a great sound quality and a great battery life.',
				tags: ['technology', 'earbuds'],
				date: '2023-10-01',
				readTime: '5 min read'
			},
			{
				slug: '#',
				title: 'How Good Is Anker Soundcore R50I',
				image: Placeholder1,
				views: 4321,
				category: 'Technology',
				description:
					'Anker Soundcore R50I is a great pair of earbuds that you can buy. It has a great sound quality and a great battery life.',
				tags: ['technology', 'earbuds'],
				date: '2023-10-01',
				readTime: '5 min read'
			},
			{
				slug: '#',
				title: 'Should You Buy Gigabyte M27Q',
				image: Placeholder1,
				views: 4321,
				category: 'Technology',
				description:
					'Anker Soundcore R50I is a great pair of earbuds that you can buy. It has a great sound quality and a great battery life.',
				tags: ['technology', 'earbuds'],
				date: '2023-10-01',
				readTime: '5 min read'
			},
			{
				slug: '#',
				title: 'What Is Test-Driven Development Mean',
				image: Placeholder1,
				views: 4321,
				category: 'Technology',
				description:
					'Anker Soundcore R50I is a great pair of earbuds that you can buy. It has a great sound quality and a great battery life.',
				tags: ['technology', 'earbuds'],
				date: '2023-10-01',
				readTime: '5 min read'
			},
			{
				slug: '#',
				title: 'How I Built My Own Portfolio?',
				image: Placeholder1,
				views: 4321,
				category: 'Technology',
				description:
					'Anker Soundcore R50I is a great pair of earbuds that you can buy. It has a great sound quality and a great battery life.',
				tags: ['technology', 'earbuds'],
				date: '2023-10-01',
				readTime: '5 min read'
			}
		],
		latest: [
			{
				slug: '#',
				title: 'How Good Is Anker Soundcore R50I',
				image: Placeholder1,
				views: 4321,
				category: 'Technology',
				description:
					'Anker Soundcore R50I is a great pair of earbuds that you can buy. It has a great sound quality and a great battery life.',
				tags: ['technology', 'earbuds'],
				date: '2023-10-01',
				readTime: '5 min read'
			}
		]
	};

	let categories = [
		{
			name: 'Technology',
			slug: 'technology'
		},
		{
			name: 'Life',
			slug: 'life'
		},
		{
			name: 'Science',
			slug: 'science'
		}
	];
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-3xl font-bold">Latest</h1>
	<div class="inline-flex gap-2">
		<a
			href=""
			class="rounded-lg border-2 border-slate-800 bg-slate-700/65 px-6 py-1 transition-colors hover:bg-slate-800"
		>
			All
		</a>
		{#each categories as category}
			<CategoryChip {...category} selected={false} />
		{/each}
	</div>
	<div class="mt-2 grid grid-cols-1 gap-2">
		{#each posts.latest as post}
			<ListPost {...post} size="medium" />
		{/each}
	</div>
</div>
