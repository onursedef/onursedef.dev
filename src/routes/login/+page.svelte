<script lang="ts">
	import { Eye, EyeOff } from 'lucide-svelte';
	import '../../app.css';
	import { writable } from 'svelte/store';

	let isPasswordVisible = writable(false);
	const togglePassword = () => {
		const password = document.getElementById('password') as HTMLInputElement;

		if (password.type === 'password') {
			password.type = 'text';
			isPasswordVisible.set(true);
		} else {
			password.type = 'password';
			isPasswordVisible.set(false);
		}
	};
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>
<div
	class="flex h-fit w-fit max-w-96 flex-col rounded-2xl bg-slate-700 p-6 font-jetbrains shadow-lg xl:w-1/4"
>
	<h2 class="text-2xl font-bold">Login</h2>
	<div class="mt-6 flex flex-col gap-3">
		<div class="flex flex-col gap-2">
			<label for="email" class="text-sm text-gray-300">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				class="rounded-lg border border-gray-400 bg-transparent placeholder:text-gray-300 focus:ring-0"
				placeholder="acme@mail.com"
				autocomplete="off"
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="password" class="text-sm text-gray-300">Password</label>
			<div
				class="group inline-flex w-full items-center rounded-lg border border-gray-400 ring-indigo-500 focus-within:ring-2"
			>
				<input
					type="password"
					name="password"
					id="password"
					class="w-full border-none bg-transparent placeholder:text-gray-300 focus:ring-0"
					placeholder="********"
				/>
				<button class="px-3" on:click={togglePassword}>
					{#if $isPasswordVisible}
						<Eye class="h-5 w-5 text-gray-300" />
					{:else}
						<EyeOff class="h-5 w-5 text-gray-300" />
					{/if}
				</button>
			</div>
		</div>
		<button type="submit" class="mt-2 w-full rounded-lg bg-indigo-600 py-2">Login</button>
	</div>
</div>
