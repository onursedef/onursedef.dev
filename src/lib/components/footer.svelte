<script>
	import NowPlaying from './atomic/now-playing.svelte';
	import SocialCard from './atomic/social-card.svelte';
</script>

<footer class="w-full">
	<div class="flex w-full items-center gap-5 py-6">
		<div class="block h-px w-full bg-gray-400"></div>
		<NowPlaying />
		<div class="block h-px w-full bg-gray-400"></div>
	</div>
	<div class="grid gap-3 px-3 pb-3 md:grid-cols-2 lg:px-0 2xl:grid-cols-3">
		<SocialCard
			size="md"
			background="bg-black/45"
			link="https://x.com/irukaga"
			iconColor="fill-white"
			titleBg="bg-white/50 hover:bg-white"
			title="Follow Me"
			titleColor="text-black"
			description="@irukaga.dev"
			border={true}
			borderColor="border-black"
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>X</title><path
					d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-black/45"
			link="https://github.com/onursedef"
			iconColor="fill-white"
			titleBg="bg-white/50 hover:bg-white"
			title="Follow Me"
			titleColor="text-black"
			description="@onursedef"
			border={true}
			borderColor="border-black"
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>GitHub</title><path
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-gradient-to-r from-[#53FC19]/45 to-black/45"
			link="https://kick.com/irukaga"
			iconColor="fill-white"
			titleBg="bg-[#53FC19]/50 hover:bg-[#53FC19]"
			title="Follow Me"
			titleColor="text-black"
			description="@irukaga"
			border={true}
			borderColor="border-black"
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>Kick</title><path
					d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-black/45"
			link="https://medium.com/onursedef"
			iconColor="fill-white"
			titleBg="bg-white/50 hover:bg-white"
			title="Follow Me"
			titleColor="text-black"
			description="@onursedef"
			border={true}
			borderColor="border-black"
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>Medium</title><path
					d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-[#0A0A0A]/45"
			link="https://dev.to/onursedef"
			iconColor="fill-white"
			titleBg="bg-white/50 hover:bg-white"
			title="Follow Me"
			titleColor="text-black"
			description="@onursedef"
			border={true}
			borderColor="border-black"
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>dev.to</title><path
					d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-gradient-to-r from-[#FF0000]/45 to-black/45"
			link="https://youtube.com/onursedef"
			iconColor="fill-white"
			titleBg="bg-[#FF0000]/50 hover:bg-[#FF0000]"
			title="Follow Me"
			titleColor="text-white"
			description="@onursedef"
			border={true}
			borderColor="border-black"
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>YouTube</title><path
					d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
				/></svg
			>
		</SocialCard>
	</div>
</footer>
