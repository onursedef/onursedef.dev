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
    }
</script>

<div class="flex flex-col max-w-96 w-fit xl:w-1/4 h-fit bg-slate-700 p-6 rounded-2xl font-jetbrains shadow-lg">
    <h2 class="text-2xl font-bold">Login</h2>
    <div class="flex flex-col gap-3 mt-6">
        <div class="flex flex-col gap-2">
            <label for="email" class="text-gray-300 text-sm">Email</label>
            <input type="email" name="email" id="email" class="bg-transparent border border-gray-400 rounded-lg placeholder:text-gray-300 focus:ring-0" placeholder="acme@mail.com" autocomplete="off">
        </div>
        <div class="flex flex-col gap-2">
            <label for="password" class="text-gray-300 text-sm">Password</label>
            <div class="group inline-flex border border-gray-400 rounded-lg items-center w-full focus-within:ring-2 ring-indigo-500">
                <input type="password" name="password" id="password" class="w-full bg-transparent placeholder:text-gray-300 border-none focus:ring-0" placeholder="********">
                <button class="px-3" on:click={togglePassword}>
                    {#if $isPasswordVisible}
                        <Eye class="h-5 w-5 text-gray-300" />
                    {:else}
                        <EyeOff class="h-5 w-5 text-gray-300" />
                    {/if}
                </button>
            </div>
        </div>
        <button type="submit" class="bg-indigo-600 w-full py-2 rounded-lg mt-2">Login</button>
    </div>
</div>