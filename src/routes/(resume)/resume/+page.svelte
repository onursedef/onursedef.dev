<script lang="ts">
	import { page } from '$app/stores';
	import EducationCard from '$lib/components/atomic/EducationCard.svelte';
	import ExperienceCard from '$lib/components/atomic/ExperienceCard.svelte';
	import ResumeProjectCard from '$lib/components/atomic/ResumeProjectCard.svelte';
	import Logo from '$lib/components/icons/Logo.svelte';
	import Icon from '@iconify/svelte';

    const { data } = $page;

    function formatPhoneNumber(phone: string) {
        // Extract the country code, area code, and the rest of the number
        const match = phone.match(/^\+(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);
        if (!match) {
            throw new Error('Invalid phone number format');
        }

        // Format the phone number according to the desired pattern
        const [, countryCode, areaCode, part1, part2, part3] = match;
        return `+${countryCode} (${areaCode}) ${part1} ${part2} ${part3}`;
    }


    function getLevel(level: string) {
        if (level === "native") {
            return "Native";
        }

        return `Level ${level.toUpperCase()}`;
    }
</script>

<div class="grid md:grid-cols-12 grid-cols-1 gap-2 mx-auto md:w-[21cm] md:my-14 md:h-fit w-full h-fit bg-neutral-300 dark:bg-neutral-800 px-8 py-8 place-items-start rounded-lg font-inter">
    <div class="flex items-start justify-between col-span-12 w-full">
        <div class="flex items-center gap-3">
            <Logo class="size-14 text-neutral-200" />
            <p class="font-semibold text-3xl whitespace-nowrap">
                {data.resume.full_name}
            </p>
        </div>
        <a href="https://directus.onursedef.dev/assets/{data.resume.downloadable_cv}/Onur Sedef Resume.pdf?download" target="_blank" download="Onur Sedef Resume.pdf" class="group inline-flex items-center gap-2 px-4 py-3 bg-neutral-900 rounded-md hover:bg-neutral-900/50 transition-colors">
            <Icon icon="solar:download-broken" width="24" height="24" class="size-5 text-neutral-400 group-hover:text-white transition-colors" />
            <p class="text-neutral-400 group-hover:text-white transition-colors text-sm">Download CV</p>
        </a>
    </div>
    <div class="md:col-span-4 mt-4 col-span-2 whitespace-nowrap text-sm flex flex-col gap-1">
        <p>{data.resume.location}</p>
        <p class=" dark:hover:text-violet-400 hover:text-violet-700 w-fit">
          <a href="{data.resume.portfolio_url}">{data.resume.portfolio_url.split("https://")[1]}</a>
        </p>
        <p class=" dark:hover:text-violet-400 hover:text-violet-700 w-fit">
          <a href="mailto:{data.resume.mail}">{data.resume.mail}</a>
        </p>
        <p class=" dark:hover:text-violet-400 hover:text-violet-700 w-fit">
          <a href="{data.resume.github_url}">@{data.resume.github_url.split("https://github.com/")[1]}</a>
        </p>
        <p class=" dark:hover:text-violet-400 hover:text-violet-700 w-fit">
          <a href="tel:{data.resume.phone_number}">{formatPhoneNumber(data.resume.phone_number)}</a>
        </p>
    </div>
    <div class="md:col-span-8 col-span-1 -mt-2 md:mt-2 font-light mb-2">
        <p>{data.resume.summary}</p>
    </div>
    {#each data.resume.experiences as experience}
        <ExperienceCard experience={experience} />
    {/each}
    <div class="md:col-span-12 col-span-1 mt-4 tracking-widest uppercase font-semibold text-sm text-neutral-500">
        Projects
    </div>
    {#each data.resume.projects as project}
        <ResumeProjectCard project={project} />
    {/each}
    <div class="md:col-span-12 col-span-1 mt-4 tracking-widest uppercase font-semibold text-sm text-neutral-500">
        Education
    </div>
    {#each data.resume.educations as education}
        <EducationCard education={education} />
    {/each}
    <div class="md:col-span-12 col-span-1 mt-4 tracking-widest uppercase font-semibold text-sm text-neutral-500">
        Languages
    </div>
    <div class="md:col-span-12 col-span-1">
        {#each data.resume.languages as language}
            <p>• <span class="font-semibold">{language.name}</span>: {getLevel(language.level)}</p>
        {/each}
    </div>
    <div class="md:col-span-12 col-span-1 mt-4 tracking-widest uppercase font-semibold text-sm text-neutral-500">
        Certificates
    </div>
    <div class="col-span-12">
        <div class="flex flex-col gap-2">
            {#each data.resume.certificates as certificate}
                <a href="{certificate.url}">
                    • {certificate.name}
                </a>
            {/each}
        </div>
    </div>
    <div class="md:col-span-12 col-span-1 mt-4 tracking-widest uppercase font-semibold text-sm text-neutral-500">
        Skills
    </div>
    {#each data.resume.skils as skill}
        <div class="md:col-span-12 mt-2 col-span-1">
            <p class="font-semibold text-xs uppercase text-neutral-500 mt-2 tracking-widest">{skill.name}</p>
            <p class="mt-2">{skill.data.join(" • ")}</p>
        </div>
    {/each}
</div>