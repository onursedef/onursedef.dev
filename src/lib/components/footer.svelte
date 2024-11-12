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
	<div class="grid gap-3 px-3 pb-3 md:grid-cols-2 lg:px-0 2xl:grid-cols-3 ">
		<SocialCard
			size="md"
			background="bg-black dark:bg-black/45"
			link="https://x.com/irukaga"
			iconColor="fill-white"
			titleBg="bg-white/75 dark:bg-white/50 hover:bg-white"
			title="Follow Me"
			titleColor="text-black"
			description="@irukaga.dev"
			border={true}
			borderColor="border-black"
			textColor={null}
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>X</title><path
					d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-black dark:bg-black/45"
			link="https://github.com/onursedef"
			iconColor="fill-white"
			titleBg="bg-white/75 dark:bg-white/50 hover:bg-white"
			title="Follow Me"
			titleColor="text-black"
			description="@onursedef"
			border={true}
			borderColor="border-black"
			textColor={null}
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>GitHub</title><path
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-gradient-to-r from-[#53FC19]/65 to-black dark:from-[#53FC19]/45 dark:to-black/45"
			link="https://kick.com/irukaga"
			iconColor="fill-white"
			titleBg="bg-[#53FC19]/85 dark:bg-[#53FC19]/50 hover:bg-[#53FC19]"
			title="Follow Me"
			titleColor="text-black"
			description="@irukaga"
			border={true}
			borderColor="border-black"
			textColor="text-black"
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>Kick</title><path
					d="M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-black dark:bg-black/45"
			link="https://medium.com/onursedef"
			iconColor="fill-white"
			titleBg="bg-white/75 dark:bg-white/50 hover:bg-white"
			title="Follow Me"
			titleColor="text-black"
			description="@onursedef"
			border={true}
			borderColor="border-black"
			textColor={null}
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>Medium</title><path
					d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-gradient-to-r from-[#0A66C2]/75 to-black dark:from-[#0A66C2]/45 dark:to-black/45"
			link="https://dev.to/onursedef"
			iconColor="fill-white"
			titleBg="bg-white/75 dark:bg-white/50 hover:bg-white"
			title="Let's Connect"
			titleColor="text-black"
			description="@onursedef"
			border={true}
			borderColor="border-black"
			textColor={null}
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>LinkedIn</title><path
					d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
				/></svg
			>
		</SocialCard>
		<SocialCard
			size="md"
			background="bg-gradient-to-r from-[#FF0000]/75 to-black dark:from-[#FF0000]/45 dark:to-black/45"
			link="https://youtube.com/onursedef"
			iconColor="fill-white"
			titleBg="bg-[#FF0000]/75 dark:bg-[#FF0000]/50 hover:bg-[#FF0000]"
			title="Subscribe"
			titleColor="text-white"
			description="@onursedef"
			border={true}
			borderColor="border-black"
			textColor={null}
		>
			<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
				><title>YouTube</title><path
					d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
				/></svg
			>
		</SocialCard>
	</div>
</footer>
