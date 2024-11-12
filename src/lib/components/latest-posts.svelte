<script lang="ts">
	import { Eye, Menu, Tags } from 'lucide-svelte';
	import Placeholder1 from '../../assets/images/placeholder-1.jpg';
	import CategoryChip from './atomic/category-chip.svelte';
	import ListPost from './atomic/list-post.svelte';
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import CategoryDropdown from './atomic/category-dropdown.svelte';

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

	const {
		elements: { menu, item, trigger, arrow }
	} = createDropdownMenu();
</script>

<div class="flex lg:hidden flex-col gap-2">
	<div class="flex justify-between">
		<h1 class="text-3xl font-bold">Latest</h1>
		<div class="hidden lg:inline-flex gap-2">
			<CategoryChip name="All" slug="all" selected={true} />
			{#each categories as category}
			<CategoryChip {...category} selected={false} />
			{/each}
		</div>
		<CategoryDropdown categories={categories} />
	</div>
	<div class="mt-2 grid grid-cols-2 gap-2">
		{#each posts.latest as post}
			<ListPost {...post} size="medium" />
		{/each}
	</div>
</div>
<div class="hidden lg:flex flex-col gap-2">
	<h1 class="text-3xl font-bold">Latest</h1>
	<div class="inline-flex gap-2">
		<CategoryChip name="All" slug="all" selected={true} />
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
