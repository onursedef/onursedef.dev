<script>
	import Computer_3d from '$lib/components/atomic/computer-3d.svelte';
	import HomePost from '$lib/components/atomic/home-post.svelte';
	import { Canvas } from '@threlte/core';
	import { Eye, Folder } from 'lucide-svelte';

	const posts = [
		{
			title: 'Exploring the Future of Artificial Intelligence',
			short_description:
				'An in-depth look at how AI is shaping industries, from healthcare to finance, and the ethical questions surrounding it.',
			image_url: 'https://placehold.co/600x400',
			tags: ['AI', 'technology', 'future'],
			category: 'Tech',
			view_count: 2347
		},
		{
			title: 'The Benefits of a Plant-Based Diet',
			short_description:
				'Discover the health and environmental benefits of incorporating more plant-based meals into your diet.',
			image_url: 'https://placehold.co/600x400',
			tags: ['health', 'diet', 'wellness'],
			category: 'Health',
			view_count: 1589
		},
		{
			title: 'Top Travel Destinations for 2024',
			short_description:
				'A guide to some of the best places to visit in 2024, from hidden gems to popular tourist hotspots.',
			image_url: 'https://placehold.co/600x400',
			tags: ['travel', 'destinations', 'guide'],
			category: 'Travel',
			view_count: 3290
		},
		{
			title: 'Mastering the Basics of Photography',
			short_description:
				'A beginner’s guide to understanding the fundamentals of photography and capturing stunning images.',
			image_url: 'https://placehold.co/600x400',
			tags: ['photography', 'basics', 'art'],
			category: 'Art',
			view_count: 2745
		},
		{
			title: 'The Rise of Remote Work in 2024',
			short_description:
				'An analysis of the shift towards remote work and how companies are adapting to this new normal.',
			image_url: 'https://placehold.co/600x400',
			tags: ['remote work', 'business', 'trends'],
			category: 'Business',
			view_count: 4120
		}
	];
</script>

<div class="my-5 flex justify-between">
	<div class="flex flex-col gap-3">
		<h1 class="text-4xl font-bold">Onur Sedef</h1>
		<p class="font-light">
			💻 Coding since 2017. Software developer with <span class="font-bold"
				>2.5+ years experience</span
			>.<br />
			🌍 Software Developer @
			<a
				href="https://ottoo.com"
				target="_blank"
				class="font-bold text-blue-400 transition-all duration-75 hover:text-blue-600 hover:underline"
				>Ottoo</a
			>.<br />
			✒️ Writing about software development, web technologies, and more.<br />
		</p>
	</div>
	<div class="max-w-96">
		<Canvas>
			<Computer_3d />
		</Canvas>
	</div>
</div>
<div class="my-5 flex flex-col">
	<div class="inline-flex w-full items-end justify-between py-3">
		<h1 class="text-2xl font-bold">Latest Posts</h1>
		<a href="/blog" class="text-sm font-light text-indigo-400">See More</a>
	</div>
	<div class="flex flex-col gap-3">
		{#each posts as post}
			<HomePost {post} />
		{/each}
	</div>
</div>
