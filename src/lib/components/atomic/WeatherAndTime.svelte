<script lang="ts">
	import Icon from "@iconify/svelte";
    import { onMount } from "svelte";

    let weather = $state<string>('');
    let time = $state<string>('');
    let isDay = $state<boolean>(true);
    let loadingWeather = $state<boolean>(true);
    let loadingTime = $state<boolean>(true);

    onMount(async () => {
        try {
            const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.027&longitude=28.6773&current=rain,showers,snowfall,weather_code,is_day&timezone=Europe%2FMoscow');
            const data = await res.json();
            const code = data?.current?.weather_code;
            isDay = data?.current?.is_day === 1;
            if (code === 0) weather = 'Clear';
            else if ([1, 2, 3].includes(code)) weather = 'Partly Cloudy';
            else if ([45, 48].includes(code)) weather = 'Fog';
            else if ([51, 53, 55].includes(code)) weather = "Rain Drizzle";
            else if ([61, 63, 65, 80, 81, 82].includes(code)) weather = "Rain";
            else if ([71, 73, 75, 85, 86].includes(code)) weather = "Snow";
            else if ([95, 96, 99].includes(code)) weather = "Thunderstorm";
        } catch (error) {
            console.error("Failed to load weather:", error);
        } finally {
            loadingWeather = false;
        }
    });

    $effect(() => {
        loadingTime = true;
        const intervalId = setInterval(() => {
            const istanbulTime = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Europe/Istanbul',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            }).format(new Date());
            time = istanbulTime;
            loadingTime = false;
        }, 1000);

        return () => clearInterval(intervalId);
    });
</script>

<div class="bg-black/70 px-3 pt-3 pb-2 rounded-md hover:bg-black/80 transition-colors w-fit">
    <div class="inline-flex gap-3 items-center text-sm whitespace-nowrap flex-shrink-0">
        <div class="relative inline-flex items-center">
            <div class="group relative inline-block">
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                    <div class="relative">
                        <div class="bg-neutral-900 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap shadow-md">
                            {#if loadingWeather}
                                Loading Weather...
                            {:else}
                                {weather}
                            {/if}
                        </div>
                    </div>
                </div>
                {#if loadingWeather}
                    <Icon icon="line-md:loading-loop" width="24" height="24" class="size-6 text-white" />
                {:else if weather === "Clear" && isDay}
                    <Icon icon="lucide:sun" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Clear" && !isDay}
                    <Icon icon="lucide:moon" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Partly Cloudy" && isDay}
                    <Icon icon="lucide:cloud-sun" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Partly Cloudy" && !isDay}
                    <Icon icon="lucide:cloud-moon" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Fog"}
                    <Icon icon="lucide:cloud-fog" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Rain Drizzle"}
                    <Icon icon="lucide:cloud-drizzle" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Rain" && isDay}
                    <Icon icon="lucide:cloud-sun-rain" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Rain" && !isDay}
                    <Icon icon="lucide:cloud-moon-rain" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Snow"}
                    <Icon icon="lucide:cloud-snow" width="24" height="24" class="size-6 text-white"/>
                {:else if weather === "Thunderstorm"}
                    <Icon icon="lucide:cloud-lightning" width="24" height="24" class="size-6 text-white"/>
                {/if}
            </div>
        </div>
        {#if loadingTime}
            <span class="inline-flex items-center gap-2">-:-- IST <Icon icon="twemoji:flag-for-flag-turkey" width="24" height="24" /></span>
        {:else}
            <span class="inline-flex items-center gap-2">{time} IST <Icon icon="twemoji:flag-for-flag-turkey" width="24" height="24" /></span>
        {/if}
    </div>
</div>
