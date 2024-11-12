<script lang="ts">
	import Placeholder1 from '../../assets/images/placeholder-1.jpg';
	import ListPost from './atomic/list-post.svelte';

	let posts = {
		featured: [
			{
				slug: '#',
				title: 'Placeholder Post Title',
				image: Placeholder1,
				views: 4321
			},
			{
				slug: '#',
				title: 'How Good Is Anker Soundcore R50I',
				image: Placeholder1,
				views: 4321
			},
			{
				slug: '#',
				title: 'Should You Buy Gigabyte M27Q',
				image: Placeholder1,
				views: 4321
			},
			{
				slug: '#',
				title: 'What Is Test-Driven Development Mean',
				image: Placeholder1,
				views: 4321
			},
			{
				slug: '#',
				title: 'How I Built My Own Portfolio?',
				image: Placeholder1,
				views: 4321
			}
		],
		latest: [
			{
				slug: '#',
				title: 'How Good Is Anker Soundcore R50I',
				image: Placeholder1,
				views: 4321
			}
		]
	};
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-3xl font-bold">Featured</h1>
	<div class="flex max-h-[24rem] gap-2">
		<ListPost
			{...posts.featured[0]}
			size="large"
			category={null}
			description={null}
			tags={null}
			date={null}
			readTime={null}
		/>
		<div class="flex h-[24rem] w-2/5 flex-col justify-between">
			{#each posts.featured as post, i}
				{#if i > 0}
					<ListPost
						{...post}
						size="small"
						category={null}
						description={null}
						tags={null}
						date={null}
						readTime={null}
					/>
				{/if}
			{/each}
		</div>
	</div>
</div>
